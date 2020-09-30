import React, {ReactNode} from 'react';

import {
  Container,
  TopBar,
  TopBarButton,
  TopBarImage,
  LogoImage,
  Title,
  Header,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('Landing');
  }

  return (
    <Container>
      <TopBar>
        <TopBarButton onPress={handleGoBack}>
          <TopBarImage source={backIcon} resizeMode="contain" />
        </TopBarButton>

        <LogoImage source={logoImg} resizeMode="contain" />
      </TopBar>

      <Header>
        <Title>{title}</Title>

        {/* codigo que vai adicionar o icone ao lado do titulo Proffys */}
        {headerRight}
      </Header>

      {children}
    </Container>
  );
};

export default PageHeader;
