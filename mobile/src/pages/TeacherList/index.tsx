import React, {useCallback, useState} from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import {useFocusEffect} from "@react-navigation/native";
import Icons from 'react-native-vector-icons/Feather';

import {
  Container,
  TeacherScrollList,
  SearchForm,
  Label,
  Input,
  InputGroup,
  InputBlock,
  IconButton,
  SubmitButton,
  SubmitButtonText,
} from './styles';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);
  //definindo que o favorites vai receber um array de números
  const [favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites() {
    //precisamos converter pra texto, no caso JSON
    //pois o localstorage só salva textos
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        //pegando apenas os ids do teachers
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          },
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(useCallback(() => {
    setTeachers([]);
  }, []));

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  //filtrando os professores
  async function handleFiltersSubmit() {
    //carregando os favoritos logo quando filtrar os professores
    loadFavorites();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <IconButton onPress={handleToggleFiltersVisible}>
            <Icons name="filter" size={20} color="#FFF" />
          </IconButton>
        }>
        {isFiltersVisible && (
          <SearchForm>
            <Label>Matéria</Label>
            <Input
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </InputBlock>
            </InputGroup>

            <SubmitButton onPress={handleFiltersSubmit}>
              <SubmitButtonText>Filtrar</SubmitButtonText>
            </SubmitButton>
          </SearchForm>
        )}
      </PageHeader>

      <TeacherScrollList
        //colocando os paddings direto no scroll, para a tela não cortar
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        {/* mapeando os professores em tela */}
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              //verificando se o id está nos favoritos
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </TeacherScrollList>
    </Container>
  );
}

export default TeacherList;
