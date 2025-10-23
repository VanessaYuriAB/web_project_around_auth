import { useContext, useRef, useEffect } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext';

import useFormValidator from '@hooks/useFormValidator.js';

import { configAdd } from '@utils/constants';

import useFormSubmit from '@hooks/useFormSubmit.js';

function NewCard({ handleClosePopup, popup }) {
  // Refs para inputs: não é necessário gerenciamento de estado e re-renderização
  const placeRef = useRef(null);
  const linkRef = useRef(null);

  // Contexto: obtém o usuário atual: assina o contexto CurrentUserContext
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  // Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configAdd);

  // Efeito colateral para reset de validação
  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  // Envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError
  const { handleSubmit, isLoading } = useFormSubmit(
    () =>
      handleAddPlaceSubmit({
        name: placeRef.current.value,
        link: linkRef.current.value,
      }), // onSubmit
    () => {
      formRef.current.reset();
      handleClosePopup();
    }, // onSuccess
    (error) => {
      console.error(
        `Erro ao adicionar novo cartão: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // onError
  );

  return (
    <form
      className="popup__container_add"
      name="add"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3 className="popup__title-form_add">Novo local</h3>
      <input
        className="popup__input-form_add"
        id="place-input"
        name="place" // o nome do input é place, mas o servidor espera name
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        ref={placeRef}
        aria-label="Título do cartão"
        ref={placeRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
      />
      <span
        className="popup__input-error_add place-input-error"
        id="card-name-error"
      />
      <input
        className="popup__input-form_add"
        id="link-input"
        name="link"
        type="url"
        placeholder="Link de imagem"
        required
        ref={linkRef}
        aria-label="Link da imagem do cartão"
        ref={linkRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
      />
      <span
        className="popup__input-error_add link-input-error"
        id="card-link-error"
      />
      <button
        className="popup__btn-form_add"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Criando...' : 'Criar'}
      </button>
    </form>
  );
}

export default NewCard;
