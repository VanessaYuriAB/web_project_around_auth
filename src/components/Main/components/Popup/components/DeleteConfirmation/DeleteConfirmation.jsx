import { useRef } from 'react';

import useFormSubmit from '@hooks/useFormSubmit';

function DeleteConfirmation({ handleClosePopup, handleCardDelete, card }) {
  // Ref para o formulário
  const formRef = useRef(null);

  // Envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError
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
