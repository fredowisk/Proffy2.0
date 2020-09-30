import { Request, Response } from "express";
import database from "../database/connection";

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    //pegue a tabela connections e conte todos os campos ID, retornando com o nome de total
    const totalConnections = await database('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({total});
  }

  async create(request: Request, response: Response) {
    //criando uma conexão
    const { user_id } = request.body;

    await database('connections').insert({
      user_id
    });

    return response.status(201).send();
  }
}
