import React, { useEffect, useState } from 'react';

import {
  Container,
  Banner,
  Title,
  TitleBold,
  ButtonsContainer,
  ButtonPrimary,
  ButtonSecondary,
  Icon,
  ButtonText,
  TotalConnections,
  TotalImage,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/connections').then(response => {
      const {total} = response.data;
      setTotalConnections(total);
    })
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigation.navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigation.navigate('Study');
  }

  return (
    <Container>
      {/* o contain não permite a imagem fica cortada ou distorcida */}
      <Banner resizeMode="contain" source={landingImg} />

      <Title>
        Seja bem-vindo, {'\n'}
        <TitleBold>O que deseja fazer ?</TitleBold>
      </Title>

      <ButtonsContainer>
        <ButtonPrimary onPress={handleNavigateToStudyPages}>
          <Icon source={studyIcon} />
          <ButtonText>Estudar</ButtonText>
        </ButtonPrimary>
        <ButtonSecondary onPress={handleNavigateToGiveClassesPage}>
          <Icon source={giveClassesIcon} />
          <ButtonText>Dar aulas</ButtonText>
        </ButtonSecondary>
      </ButtonsContainer>

      <TotalConnections>
        Total de {totalConnections} conexões já realizadas <TotalImage source={heartIcon} />
      </TotalConnections>
    </Container>
  );
}

export default Landing;
