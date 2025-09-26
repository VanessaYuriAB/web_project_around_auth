import { useState, useContext } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext.js';

import useFormValidator from '@hooks/useFormValidator.js';

import { configEdt } from '@utils/constants.js';

import useFormSubmit from '@hooks/useFormSubmit.js';

function EditProfile({ handleClosePopup }) {
  // 1. Contexto: obtém o usuário atual do contexto: assina o contexto CurrentUserContext, permitindo que o componente acesse as informações do usuário atual, como nome e descrição
  const userContext = useContext(CurrentUserContext); // extrai o contexto do usuário atual
  const { currentUser, handleUpdateUser } = userContext; // extrai o usuário atual e a função de atualização do usuário do contexto

  // 2. useStates: define o estado inicial do formulário com os valores do usuário atual, garantindo que o formulário seja preenchido com as informações corretas quando aberto
  const [name, setName] = useState(currentUser?.name || ''); // adiciona variável de estado para nome e usa o nome do usuário atual como valor inicial do estado, caso seja undefined, usa uma string vazia
  const [about, setAbout] = useState(currentUser?.about || ''); // adiciona variável de estado para descrição e usa a descrição do usuário atual como valor inicial do estado, caso seja undefined, usa uma string vazia

  // 3. Validação do formulário: este não utiliza o reset da validação, portanto não precisa do validatorRef
  const { formRef } = useFormValidator(configEdt);

  // 5. Hook personalizado para submissão: envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError
  const { handleSubmit, isLoading } = useFormSubmit(
    () => handleUpdateUser({ name, about }), // chama a função de atualização do usuário com os valores atuais do formulário, passando o nome e a descrição atualizados em forma simplificada (shorthand) de criar objetos quando os nomes da propriedade e da variável são os mesmos (onSubmit, primeiro argumento do hook)
    handleClosePopup, // fecha o popup após a atualização, só fecha se a atualização for bem-sucedida (onSuccess, segundo argumento do hook)
    (error) => {
      console.error(
        `Erro ao atualizar o perfil: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // (onError, terceiro e último argumento do hook)
  );

  // 6. Handlers
  function handleNameChange(event) {
    setName(event.target.value); // atualiza o estado do nome sempre que o usuário digita
  }

  function handleAboutChange(event) {
    setAbout(event.target.value); // atualiza o estado da descrição (about) sempre que o usuário digita
  }

  return (
    <form
      className="popup__container_edt"
      name="edt"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit} // handleSubmit vem do hook useFormSubmit — ele já inclui preventDefault, loading, onSubmit, onSuccess e onError
      ref={formRef} // ref compartilhada para validação e envio
    >
      <h3 className="popup__title-form_edt">Editar perfil</h3>
      <input
        className="popup__input-form_edt"
        id="name-input"
        name="name"
        type="text"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
        value={name} // vincula nome ao campo de entrada, usando o valor do estado 'name' para preenchê-lo
        onChange={handleNameChange}
        aria-label="Nome do perfil" // adiciona um rótulo acessível para o campo de entrada
      />
      <span
        className="popup__input-error_edt name-input-error"
        id="profile-name-error"
      />
      <input
        className="popup__input-form_edt"
        id="about-input"
        name="about"
        type="text"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
        value={about} // vincula descrição ao campo de entrada, usando o valor do estado 'about' para preenchê-lo
        onChange={handleAboutChange}
        aria-label="Descrição do perfil"
      />
      <span
        className="popup__input-error_edt about-input-error"
        id="profile-about-error"
      />
      <button
        className="popup__btn-form_edt"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}

export default EditProfile;
