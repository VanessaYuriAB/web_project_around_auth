import { myCards } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // método (privado) para tratamento das respostas dos métodos da classe
  _checkResponse = async (res) => {
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`); // se o servidor retornar um erro, lance o erro, a ser tratado na função de chamada do método
    } else {
      return res.json();
    }
  };

  // carrega as informações de usuário do servidor
  _getUserInfo = async () => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers, // a solicitação GET é enviada com content-type, mas não interfere no resultado
    });
    return this._checkResponse(res);
  };

  // envia meus cards iniciais ao usuário do servidor
  createInitialCards = async () => {
    const promises = myCards.map(async (card) => {
      const res = await fetch(`${this._baseUrl}/cards/`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.place, // o nome do input em myCards é place
          link: card.link,
        }),
      });
      return this._checkResponse(res);
    });

    return Promise.all(promises); // retorna uma Promise que só resolve quando todos os cards do map forem enviados
  };

  // captura cards do usuário do servidor
  _getCards = async () => {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  };

  // atualiza infos do perfil
  updateProfileInfo = async (dataProfile) => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataProfile.name,
        about: dataProfile.about,
      }),
    });
    return this._checkResponse(res);
  };

  // atualiza foto do perfil
  updateProfileAvatar = async (dataPhoto) => {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataPhoto,
      }),
    });
    return this._checkResponse(res);
  };

  // adiciona um novo cartão no usuário do servidor
  createNewCard = async (dataCard) => {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name, // o nome do input e em NewCard.jsx é place, mas o servidor espera name
        link: dataCard.link,
      }),
    });
    return this._checkResponse(res);
  };

  // curte um cartão
  _likeCard = async (cardId) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._checkResponse(res);
  };

  // descurte um cartão
  _unlikeCard = async (cardId) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  };

  // altera o status de curtir/descurtir um cartão
  toggleLikeCard(cardId, shouldLike) {
    // se o cartão não foi curtido, curta-o, caso contrário, descurta
    return shouldLike ? this._likeCard(cardId) : this._unlikeCard(cardId);
  }

  // deleta um cartão do servidor
  deleteCard = async (cardId) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  };

  // captura cartões somente após carregar as informações do usuário no servidor
  getServerUserAndCards() {
    return Promise.all([this._getUserInfo(), this._getCards()]);
  }
}

// instância de Api: myApi (fetch)
const myApi = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: '3c7ad9a7-200c-4d07-b160-7978cd40d815',
    'Content-Type': 'application/json',
  },
});

export default myApi;
