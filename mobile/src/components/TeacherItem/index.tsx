import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Linking} from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

import {
  Container,
  Profile,
  Avatar,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  HeartIcon,
  ContactButton,
  WhatsappIcon,
  ContactButtonText,
} from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  price: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
  //estado que verifica se o professor está favoritada
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    //criando uma conexão quando o usuário clicar no simbolo do whatsapp
    api.post('/connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    //pegando os favoritos no cache
    const favorites = await AsyncStorage.getItem('favorites');

    //criando um array, pois pode acontecer de não existir nenhum favorito
    let favoritesArray = [];

    //se ele tiver conteúdo...
    if (favorites) {
      //formate os itens recebidos e guarde eles
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      //procure o index no array de favoritos para tentar encontrar
      //se o professor tem o mesmo id que os professores favoritados
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher ) => {
        return teacherItem.id === teacher.id;
      });

      //dizendo em qual posição eu quero remover, e quantas posições iremos remover
      //a partir do indice informado
      favoritesArray.splice(favoriteIndex, 1);
      //avisando o estado que o professor não é mais favorito
      setIsFavorited(false);
    } else {
      //fazendo um push, para acrescentar o professor no fim do array
      favoritesArray.push(teacher);

      //avisando o estado de que o professor está favoritado
      setIsFavorited(true);
    }
    //salvando no cache o professor, e formatando o array para string
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <Container>
      <Profile>
        <Avatar source={{uri: teacher.avatar}} />
        <ProfileInfo>
          <Name>{teacher.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>{teacher.bio}</Bio>

      <Footer>
        <Price>
          Preço/hora {'   '}
          <PriceValue>R$ {teacher.price},00</PriceValue>
        </Price>

        <ButtonsContainer>
          <FavoriteButton
            onPress={handleToggleFavorite}
            favorited={isFavorited}>
            {/* se estiver favoritado mostre o icone de desfavoritar
            se não mostre o de favoritar */}
            {isFavorited ? (
              <HeartIcon source={unfavoriteIcon} />
            ) : (
              <HeartIcon source={heartOutlineIcon} />
            )}
          </FavoriteButton>

          <ContactButton>
            <WhatsappIcon source={whatsappIcon} />
            <ContactButtonText onPress={handleLinkToWhatsapp}>
              Entrar em contato
            </ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
