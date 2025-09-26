import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import DeleteConfirmation from '../Popup/components/DeleteConfirmation/DeleteConfirmation.jsx';

import { useContext } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext.js';

function Card({
  card,
  handleOpenPopup,
  handleClosePopup,
  onCardLike,
  onCardDelete,
}) {
  // 1. Desestruturação: propriedade isLiked do objeto card para utilizá-la diretamente na verificação (sem uso do objeto card)
  const { isLiked } = card;

  // 2. Contexto: obtém o usuário atual do contexto: assina o contexto CurrentUserContext e extrai o objeto com infos do usuário
  const { currentUser } = useContext(CurrentUserContext);

  // 3. Para verificar se o cartão é do usuário atual
  const isCardOwner = currentUser._id === card.owner;

  // 4. Verificação para classe do botão like: se o usuário atual “curtiu” o cartão, isLiked é true, a classe 'card__like-button_is-active' será aplicada para mostrar que o botão está no status "curtir"; se for false, nenhuma classe adicional é aplicada
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' : ''
  }`;

  // 5. Objetos para popups (image e trash): cada um será passado para a função handleOpenPopup,
  // Image: o popup de imagem recebe o card atual para exibir a imagem e o nome, a função handleOpenPopup é chamada quando a imagem do cartão é clicada
  const imagePopup = { children: <ImagePopup card={card} />, type: 'image' };

  // Trash: o popup de confirmação de exclusão recebe a função de fechar o popup, a função de deletar o popup e o objeto com os dados do card
  const deleteConfirmationPopup = {
    children: (
      <DeleteConfirmation
        handleClosePopup={handleClosePopup}
        handleCardDelete={onCardDelete}
        card={card}
      />
    ),
    type: 'delete',
  };

  // 6. Handlers: função para lidar com o clique no botão de curtir/descurtir cartão: para encapsulamento da prop e maior organização ou clareza: ela chama a função onCardLike, que é passada como prop, passando o cartão atual como argumento; isso permite que o componente pai (App) gerencie a lógica de curtir/descurtir o cartão e atualize o estado dos cartões; a função onCardLike é definida no componente App e é responsável por enviar a solicitação para a API
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="image card__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenPopup(imagePopup)}
      />
      {isCardOwner && (
        <button
          className="trash-btn card__trash-btn"
          id="tsh-model"
          type="button"
          aria-label="Deletar cartão"
          onClick={() => {
            handleOpenPopup(deleteConfirmationPopup);
          }}
        />
      )}
      <div className="text card__text">
        <h3 className="name card__name">{card.name}</h3>
        <button
          // Botão de curtir/descurtir cartão, que recebe a classe conforme estado, definido na variável cardLikeButtonClassName, para aplicar o estilo correto
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Curtir/descurtir cartão"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;
