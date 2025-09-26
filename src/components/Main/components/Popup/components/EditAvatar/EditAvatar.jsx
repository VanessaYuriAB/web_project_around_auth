import { useRef, useContext, useEffect } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext.js';

import useFormValidator from '@hooks/useFormValidator.js';

import { configPhoto } from '@utils/constants.js';

import useFormSubmit from '@hooks/useFormSubmit.js';

function EditAvatar({ handleClosePopup, popup }) {
  // 1. Refs para input: referência é usada para obter o valor do input quando o formulário é enviado, facilitando o acesso ao valor do input sem a necessidade de gerenciar o estado do input com useState - permitindo acessar diretamente o elemento DOM com 'current.value' - é útil para evitar re-renderizações desnecessárias do componente, já que o input não precisa ser controlado pelo estado do React - a referência é criada usando useRef, que retorna um objeto com uma propriedade 'current' que pode ser usada para armazenar o valor do input
  const avatarRef = useRef(null);

  // 2. Contexto: obtém o usuário atual do contexto: assina o contexto CurrentUserContext, permitindo que o componente acesse as informações do usuário atual, como a função de atualização do avatar
  const { handleUpdateAvatar } = useContext(CurrentUserContext); // extrai apenas a função de atualização do avatar do provedor de contexto, que será usada para atualizar a foto do perfil quando o formulário for enviado

  // 3. Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configPhoto);

  // 4. Efeito colateral para reset de validação
  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  // 5. Hook personalizado para submissão: envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError: retorna a função handleSubmit e a variável de estado isLoading (para o render da solicitação à API)
  const { handleSubmit, isLoading } = useFormSubmit(
    () => handleUpdateAvatar(avatarRef.current.value), // chama a função de atualização do avatar com o valor do input de foto (onSubmit, primeiro argumento do hook)
    () => {
      formRef.current.reset(); // limpa o campo do formulário após o envio bem-sucedido
      handleClosePopup(); // fecha o popup após o envio, só fecha se a atualização for bem-sucedida
    }, // (onSuccess, segundo argumento do hook)
    (error) => {
      console.error(
        `Erro ao atualizar a foto do perfil: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // (onError, terceiro e último argumento do hook)
  );

  return (
    <form
      className="popup__container_photo"
      name="photo"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit} // handleSubmit vem do hook useFormSubmit — ele já inclui preventDefault, loading, onSubmit, onSuccess e onError
      ref={formRef} // ref compartilhada para validação e envio
    >
      <h3 className="popup__title-form_photo">Alterar a foto do perfil</h3>
      <input
        className="popup__input-form_photo"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
        ref={avatarRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
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
