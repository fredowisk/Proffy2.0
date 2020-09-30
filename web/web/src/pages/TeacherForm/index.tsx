import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom';

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import api from "../../services/api";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();
  //criando estados para utilizar em cada input do formulário
  //vamos fazer da maneira mais raiz possível
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");

  //estado para preencher o dia e o horário das aulas
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  //função que é disparada para adicionar novos inputs de horário e data
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  //pegando o evento do formulário
  function handleCreateClass(e: FormEvent) {
    //utilizando o preventDefault para que toda vez que a gente faça um submit
    //a pagina não fala reload automaticamente
    e.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      price: Number(price),
      //mudando o nome, pois no backend recebemos uma propriedade chamada schedule
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      //Redirecionando o usuário para a página inicial
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  //a função recebe o indice do map, o nome do campo, e o valor que está dentro dele
  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      //se a posição do map for igual a posição passada como parâmetro
      if (index === position) {
        //retorne o item antigo, mudando o valor do campo que foi passado como parâmetro
        //utilizamos o [] para simbolizar que isso é a variavel passada pelo parâmetro
        //sobrescrevendo o valor antigo do campo passado no parâmetro
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              //setando um novo valor, toda vez que o input mudar
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              //setando um novo valor, toda vez que o input mudar
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              //setando um novo valor, toda vez que o input mudar
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              //setando um novo valor, toda vez que o input mudar
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              //propriedade que estamos criando, passando opções para o usuário selecionar
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação Física", label: "Educação Física" },
                { value: "Física", label: "Física" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
            />

            <Input
              name="price"
              label="Custo da sua hora por aula"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <div>
              <legend>
                Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>
            </div>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    //propriedade que estamos criando, passando opções para o usuário selecionar
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    value={scheduleItem.from}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    value={scheduleItem.to}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante!" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
