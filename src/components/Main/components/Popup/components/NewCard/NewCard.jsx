import { useContext, useRef, useEffect } from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext';

import useFormValidator from '@hooks/useFormValidator';

import { configAdd } from '@utils/constants';

import useFormSubmit from '@hooks/useFormSubmit.js';

function NewCard({ handleClosePopup, popup }) {
  // 1. Refs para inputs: cria referências para os campos do formulário, não é necessário usar useState aqui, pois os valores serão obtidos diretamente do formulário quando o usuário enviar
  const placeRef = useRef(null);
  const linkRef = useRef(null);

  // 2. Contexto: obtém o usuário atual do contexto: assina o contexto CurrentUserContext
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  // 3. Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configAdd);

  // 4. Efeito colateral para reset de validação
  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  // 5. Hook personalizado para submissão: envio do formulário: inclui preventDefault, loading, onSubmit, onSuccess e onError: recebe o evento de envio, previne o comportamento padrão do formulário e chama a função handleAddPlaceSubmit com os dados do novo cartão
  const { handleSubmit, isLoading } = useFormSubmit(
    () =>
      handleAddPlaceSubmit({
        name: placeRef.current.value,
        link: linkRef.current.value,
      }), // (onSubmit, argumento do hook)
    () => {
      formRef.current.reset(); // limpa os campos do formulário após o envio bem-sucedido
      handleClosePopup(); // fecha o popup após o envio, só fecha se a adição for bem-sucedida
    }, // (onSuccess)
    (error) => {
      console.error(
        `Erro ao adicionar novo cartão: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
    } // (onError)
  );

  return (
    <form
      className="popup__container_add"
      name="add"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit} // handleSubmit vem do hook useFormSubmit — ele já inclui preventDefault, loading, onSubmit, onSuccess e onError
      ref={formRef} // ref compartilhada para validação e envio
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
