import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

import {Container, TeacherScrollList} from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    //criando o estado de favoritos, que vai ser um array

    //precisamos converter pra texto, no caso JSON
    //pois o localstorage só salva textos
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader title="Meus proffys favoritos" />

      <TeacherScrollList
        //colocando os paddings direto no scroll, para a tela não cortar
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited
            />
          )
        })}
      </TeacherScrollList>
    </Container>
  );
}

export default Favorites;
