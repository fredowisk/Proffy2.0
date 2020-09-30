import React from 'react';

import {
  Container,
  Content,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

function GiveClasses() {

  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <Container>
      <Content source={giveClassesBgImage} resizeMode="contain">
        <Title>Quer ser um Proffy ?</Title>
        <Description>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Description>
      </Content>

      <OkButton onPress={handleNavigateBack}>
        <OkButtonText>Tudo bem</OkButtonText>
      </OkButton>
    </Container>
  );
}

export default GiveClasses;
