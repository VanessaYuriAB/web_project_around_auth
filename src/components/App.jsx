import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import myApi from '@utils/api.js';

import CurrentUserContext from '@contexts/CurrentUserContext.js';
import AuthContext from '@contexts/AuthContext.js';

import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';

/*
Linha comentada para prevenir duplicação ao enviar cards iniciais.
Executar apenas uma vez, quando necessário enviar os dados para a API.
// envia meus cards iniciais
// myApi.createInitialCards();
*/

function App() {
  // Status de login
  const [loggedIn, setLoggedIn] = useState(false);

  // Informações de perfil do usuário atual
  const [currentUser, setCurrentUser] = useState({});

  // Cartões do usuário
  const [cards, setCards] = useState([]);

  // Status do popup
  const [popup, setPopup] = useState(null);

  // Montagem inicial do aplicativo: mount-only
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

  // Atualiza o perfil do usuário
  const handleUpdateUser = async (userData) => {
    const updatedUserData = await myApi.updateProfileInfo(userData);
    setCurrentUser(updatedUserData); // atualiza o estado do usuário atual com os dados retornados pela API
  };

  // Atualiza a foto de perfil
  const handleUpdateAvatar = async (avatarData) => {
    const updatedAvatarData = await myApi.updateProfileAvatar(avatarData);
    setCurrentUser((prevUser) => ({
      ...prevUser, // mantém os dados anteriores do usuário
      avatar: updatedAvatarData.avatar, // e atualiza apenas a foto do perfil
    }));
  };

  // Curte e descurte cards
  const handleCardLike = async (card) => {
    try {
      // Verifica, mais um vez, se o cartão já foi curtido - é verificado no componente Card, mas é uma boa prática verificar novamente aqui
      const isLiked = card.isLiked;

      // !isLiked = ação inversa do estado atual de curtida - corresponde à
      // shouldLike no método toggleLikeCard
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

  // Exclui cards
  const handleCardDelete = async (card) => {
    await myApi.deleteCard(card._id);
    setCards((stateCards) =>
      stateCards.filter(
        (currentCardInFilter) => currentCardInFilter._id !== card._id
      )
    ); // remove o card excluído do estado
  };

  // Adiciona novo cartão no início da lista de cards
  const handleAddPlaceSubmit = async (cardData) => {
    const newCardData = await myApi.createNewCard(cardData);
    setCards([newCardData, ...cards]);
  };

  // Abre popup
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Fecha popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    // Provedores de contexto para compartilhar dados de login e dados do usuário atual com componentes filhos
    <AuthContext.Provider
      value={{
        loggedIn, // booleano de estado para status de login
      }}
    >
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
      }}
    >
      <div className="page">
          <Header onSignOut={onSignOut} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signin"
              element={
                <Login
                />
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                />
              }
            />

            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
