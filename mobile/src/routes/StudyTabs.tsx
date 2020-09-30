import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const {Navigator, Screen} = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          //retirando a sombra de cima das abas, lá em baixo
          elevation: 0,
          //tirando a sombra no IOS
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo-Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        //cor da opção quando ela não está selecionada
        inactiveBackgroundColor: '#fafafc',
        //cor da opção quando ela está selecionada
        activeBackgroundColor: '#ebebf5',
        //cor do texto quando não está selecionado
        inactiveTintColor: '#c1bccc',
        //cor do texto quando está selecionado
        activeTintColor: '#32264d',
      }}>
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          //mudando o nome das opções
          tabBarLabel: 'Proffys',
          tabBarIcon: ({color, size, focused}) => {
            return <Icons
            name="ios-easel"
            size={size}
            color={focused ? '#8257e5' : color}
            />;
          },
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          //mudando o nome das opções
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({color, size, focused}) => {
            return <Icons
            name="ios-heart"
            size={size}
            color={focused ? '#8257e5' : color}
            />;
          },
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;
