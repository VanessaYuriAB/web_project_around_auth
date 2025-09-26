import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';

import myApi from '@utils/api.js';

import CurrentUserContext from '@contexts/CurrentUserContext.js';

/*
Linha comentada para prevenir duplicação ao enviar cards iniciais. Executar apenas uma vez, quando necessário enviar os dados para a API.
// envia meus cards iniciais
// myApi.createInitialCards();
*/

function App() {
  // Estado para armazenar os cartões do usuário
  const [cards, setCards] = useState([]);

  // Estado para armazenar as informações do usuário atual
  const [currentUser, setCurrentUser] = useState({});

  // Estado para armazenar o popup atual, (não utilizado neste arquivo, mas necessário para manter a estrutura do código)
  const [popup, setPopup] = useState(null);

  // Obtém as informações e cartões do usuário atual do servidor quando o componente é montado; atualiza os estados de usuário e dos cartões com os dados retornados pela API - em Promisse.all
  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, cardsData] = await myApi.getServerUserAndCards();
        setCurrentUser(userData);
        setCards(cardsData);
      } catch (error) {
        console.error(
          `Erro ao obter informações ou cartões do usuário: \n Erro: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
        );
      }
    }

    fetchData();
  }, []);

  // Função para atualizar as informações do usuário, retorna uma Promise para que o tratamento de erro seja feito por quem chamou
  const handleUpdateUser = async (userData) => {
    const updatedUserData = await myApi.updateProfileInfo(userData);
    setCurrentUser(updatedUserData); // atualiza o estado do usuário atual com os dados retornados pela API
  };

  // Função para atualizar a foto do perfil, retorna uma Promise para que o tratamento de erro seja feito por quem chamou
  const handleUpdateAvatar = async (avatarData) => {
    const updatedAvatarData = await myApi.updateProfileAvatar(avatarData);
    setCurrentUser((prevUser) => ({
      ...prevUser, // mantém os dados anteriores do usuário
      avatar: updatedAvatarData.avatar, // atualiza apenas a foto do perfil
    }));
  };

  // Função para lidar com o evento de curtir/descurtir um cartão: ela recebe o cartão atual como argumento e verifica se ele já foi curtido ou não, se o cartão já foi curtido, a função envia uma solicitação para a API para remover o like, caso contrário, envia uma solicitação para adicionar o like - após a solicitação, atualiza o estado dos cartões com os dados retornados pela API
  const handleCardLike = async (card) => {
    try {
      // Verifica, mais um vez, se o cartão já foi curtido - é verificado no componente Card, mas é uma boa prática verificar novamente aqui
      const isLiked = card.isLiked;

      // Envia uma solicitação para a API e obtém os dados do cartão atualizados
      // !isLiked = ação inversa do estado atual de curtida - corresponde à shouldLike no método toggleLikeCard
      const updatedCard = await myApi.toggleLikeCard(card._id, !isLiked);

      setCards((prevCards) =>
        prevCards.map((item) => (item._id === card._id ? updatedCard : item))
      );
    } catch (error) {
      console.error(
        `Erro ao curtir/descurtir o cartão: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    }
  };

  // Função para lidar com a exclusão de um cartão: ela recebe o cartão atual como argumento e envia uma solicitação para a API para excluir o cartão, após a solicitação, atualiza o estado dos cartões removendo o cartão excluído
  const handleCardDelete = async (card) => {
    await myApi.deleteCard(card._id);
    setCards((stateCards) =>
      stateCards.filter(
        (currentCardInFilter) => currentCardInFilter._id !== card._id
      )
    ); // aplica filter para remover o card em questão da lista
  };

  // Função para lidar com o envio de um novo cartão: ela recebe os dados do cartão como argumento, envia uma solicitação para a API para criar o novo cartão e, após a solicitação, atualiza o estado dos cartões adicionando o novo cartão ao início da lista - a função é chamada no componente NewCard quando o formulário é enviado, deve ser assíncrona para lidar com a Promise retornada pela API - isso garante que o novo cartão apareça imediatamente na interface do usuário
  const handleAddPlaceSubmit = async (cardData) => {
    const newCardData = await myApi.createNewCard(cardData);
    setCards([newCardData, ...cards]); // adiciona o novo cartão ao início da lista de cartões
  };

  // Função para abrir o popup atual, ela recebe um objeto popup que contém os dados do popup a ser aberto
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Função para fechar o popup atual, limpando o estado do popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    // Provedor do contexto para compartilhar o usuário atual com os componentes filhos
    <CurrentUserContext.Provider
      value={{
        currentUser, // objeto com dados do usuário
        handleUpdateUser, // função para atualizar infos de perfil do usuário
        handleUpdateAvatar, // função para atualizar a foto de perfil do usuário
        handleAddPlaceSubmit, // função para adicionar novo card
      }}
    >
      <div className="page">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
