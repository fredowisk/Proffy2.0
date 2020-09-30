import { Request, Response } from "express";

import database from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    //verificando se os filtros estão vazios
    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }
    //falando para o TS que o time é uma string
    const timeInMinutes = convertHourToMinutes(time);

    //acesse a tabela classess
    const classes = await database('classes')
    //criando uma subquery
    //se existir...
    .whereExists(function() {
      //selecione tudo do class_schedule
      this.select('class_schedule.*')
        .from('class_schedule')
        //se o class_id for igual ao id da tabela classes
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        //se o week_day for igual ao dia passado pelo usuário
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        //se o horário inicial for menor ou igual ao passado pelo usuário
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        //se o horário final for maior que o horário passado pelo usuário
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
    })
    //onde o subject deve ser igual ao subject informado pelo usuário
      .where('classes.subject', '=', subject)
      //junte a table usuario onde o id do usuário salvo na tabela classes
      //deve ser igual ao id do usuário na tabela users
      .join('users', 'classes.user_id', '=', 'users.id')
      //e selecione todas as informações das duas tabelas
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    //Desestruturando
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      price,
      schedule,
    } = request.body;

    //criando transaction pra caso algo der errado
    const trx = await database.transaction();

    try {
      //inserindo o professor no banco de dados
      //quando inserimos no banco, ele sempre irá retornar um array de IDs
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
      //pegando o primeiro ID do array
      const user_id = insertedUsersIds[0];

      //inserindo a aula, com o id do professor criado
      const insertedClassesIds = await trx("classes").insert({
        subject,
        price,
        user_id,
      });

      const class_id = insertedClassesIds[0];
      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        };
      });

      //o insert aceita um array, então não precisamos montar o objeto
      await trx("class_schedule").insert(classSchedule);

      //e finalmente insira tudo ao mesmo tempo
      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      //desfazendo qualquer alteração que tenha acontecido no banco de dados.
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
