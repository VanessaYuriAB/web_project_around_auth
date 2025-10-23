import { useRef, useContext, useEffect } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext.js';

import useFormValidator from '@hooks/useFormValidator.js';

import { configPhoto } from '@utils/constants.js';

import useFormSubmit from '@hooks/useFormSubmit.js';

function EditAvatar({ handleClosePopup, popup }) {
  // Ref para o input: não é necessário gerenciar o estado do input com useState e útil para evitar re-renderizações desnecessárias
  const avatarRef = useRef(null);

  // Contexto: obtém o usuário atual: assina o contexto CurrentUserContext
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configPhoto);

  // Efeito colateral para reset de validação
  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  // Envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError
  const { handleSubmit, isLoading } = useFormSubmit(
    () => handleUpdateAvatar(avatarRef.current.value), // onSubmit
    () => {
      formRef.current.reset();
      handleClosePopup();
    }, // onSuccess
    (error) => {
      console.error(
        `Erro ao atualizar a foto do perfil: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // onError
  );

  return (
    <form
      className="popup__container_photo"
      name="photo"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3 className="popup__title-form_photo">Alterar a foto do perfil</h3>
      <input
        className="popup__input-form_photo"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
        ref={avatarRef}
        aria-label="Link da foto do perfil"
      />
      <span
        className="popup__input-error_photo photo-input-error"
        id="avatar-photo-error"
      />
      <button
        className="popup__btn-form_photo"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}

export default EditAvatar;
