import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import myApi from '@utils/Api.js';

import CurrentUserContext from '@contexts/CurrentUserContext.js';
import AuthContext from '@contexts/AuthContext.js';

import * as auth from '@utils/auth.js';

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
  const navigate = useNavigate();

  // Controle de renderização do tooltip
  const [tooltip, setTooltip] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Status de login
  const [loggedIn, setLoggedIn] = useState(false);

  // E-mail do usuário atual
  const [emailLogged, setEmailLogged] = useState('');

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

  // Cadastra usuários
  const handleRegistration = async ({ email, password }) => {
    await auth.register(email, password);
    navigate('/signin', { replace: true });
  };

  // Loga usuários
  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    const data = await auth.authorize(email, password); // obtém o
    // token da resposta da função authorize
    if (data.token) {
      onLogin(data.token, email); // atualiza estados e redireciona
    }

    const [userData, cardsData] = await myApi.getServerUserAndCards();
    if (userData && cardsData) {
      setCurrentUser(userData); // atualiza dados de perfil do usuário atual
      setCards(cardsData); // atualiza cartões
    }
  };

  // Manipulador para sign out
  const onSignOut = async () => {
    if (!loggedIn) return; // evita execução dupla, já que o efeito de montagem do app também chama esta função
    localStorage.removeItem('jwt'); // remove o token do armazenamento local
    setLoggedIn(false); // desabilita o login
    setEmailLogged(''); // limpa o estado de e-mail de usuário logado
    navigate('/signin', { replace: true }); // redireciona para página de login
  };

  // Manipulador para login
  const onLogin = async (token, email) => {
    localStorage.setItem('jwt', token); // salva o token no armazenamento local
    setLoggedIn(true); // permite o login do usuário
    setEmailLogged(email); // salva o e-mail do usuário no estado,
    // compartilhado por contexto para acesso em todo o app
    navigate('/', { replace: true }); // redireciona para a página principal
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
        handleRegistration, // função para registrar novo usuário
        handleLogin, // função para armazenar dados de login
        emailLogged, // estado para email logado atual
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
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                  isSuccess={isSuccess}
                  setIsSuccess={setIsSuccess}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                  isSuccess={isSuccess}
                  setIsSuccess={setIsSuccess}
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
