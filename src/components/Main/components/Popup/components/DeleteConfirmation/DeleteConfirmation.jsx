import { useRef } from 'react';

import useFormSubmit from '@hooks/useFormSubmit';

function DeleteConfirmation({ handleClosePopup, handleCardDelete, card }) {
  // 1. Ref para o formulário
  const formRef = useRef(null);

  // 2. Hook personalizado para submissão: envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError: retorna a função handleSubmit e a variável de estado isLoading (para o render da solicitação à API): chama a função de delete do card que é passada como prop, passando o objeto do cartão atual como argumento; isso permite que o componente pai (App) gerencie a lógica de deletar o cartão e atualize o estado dos cartões; a função é definida no componente App e é responsável por enviar a solicitação para a API
  const { handleSubmit, isLoading } = useFormSubmit(
    () => handleCardDelete(card), // (onSubmit)
    handleClosePopup, // (onSuccess)
    (error) => {
      console.error(
        `Erro ao excluir o cartão: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // (onError)
  );

  return (
    <form
      className="popup__container_trash"
      name="trash"
      noValidate
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title-form_trash">Tem certeza?</h3>
      <button
        className="popup__btn-form_trash"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Deletando...' : 'Sim'}
      </button>
    </form>
  );
}

export default DeleteConfirmation;
