import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import AuthContext from '@contexts/AuthContext.js';

import useFormValidator from '@hooks/useFormValidator.js';

import { configRegister } from '@utils/constants.js';

import useFormSubmit from '@hooks/useFormSubmit.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Register({ tooltip, setTooltip, isSuccess, setIsSuccess }) {
  // Informações de cadastro de novo usuário
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Contexto: função para enviar as infos do formulário
  const { handleRegistration } = useContext(AuthContext);

  // Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configRegister);

  // Submissão do formulário com o hook personalizado
  const { handleSubmit, isLoading } = useFormSubmit(
    () =>
      handleRegistration({
        email: newEmail,
        password: newPassword,
      }), // onSubmit
    () => {
      // Limpa os campos do formulário resetando os valores dos estados dos inputs,
      // não utiliza o .reset() do form, pois é um formulário controlado
      setNewEmail('');
      setNewPassword('');
      validatorRef.current?.resetValidation(); // só reseta se existir
      // Tooltip de sucesso e sua renderização são tratados no handleRegistration,
      // em App.jsx, devido ao navigate() após o informativo > para o popup não
      // abrir e fechar instantaneamente, pois o componente Register seria desmontado
      // ao navegar para /signin
    }, // onSuccess
    (error) => {
      console.error(
        `Erro ao registrar usuário: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
      setIsSuccess(false); // define o tooltip de falha
      setTooltip(true); // renderiza a tela com a msg de erro
    } // onError
  );

  // Handlers: atualiza o estado sempre que o usuário digita
  function handleNewEmailChange(event) {
    setNewEmail(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  return (
    <>
      <form
        className="form page__form form_page form_register"
        name="register"
        id="new-user-form"
        noValidate
        onSubmit={handleSubmit} // hook useFormSubmit — inclui preventDefault,
        // loading, onSubmit, onSuccess e onError
        ref={formRef} // hook useFormValidator — ref compartilhada para
        // validação e envio do formulário
      >
        <h3 className="form__title form__title_page form__title_register">
          Inscrever-se
        </h3>
        <input
          className="form__input form__input_page form__input_register"
          id="new-email-span"
          name="email"
          type="email"
          placeholder="E-mail"
          minLength="10"
          required
          value={newEmail}
          onChange={handleNewEmailChange}
          aria-label="E-mail do novo usuário"
        />
        <span
          className="form__span form__span_page form__span_register new-email-span-error"
          id="new-email-error"
        />
        <input
          className="form__input form__input_page form__input_register"
          id="new-password-span"
          name="password"
          type="password"
          placeholder="Senha"
          minLength="8"
          maxLength="15"
          required
          value={newPassword}
          onChange={handleNewPasswordChange}
          aria-label="Senha do novo usuário"
        />
        <span
          className="form__span form__span_page form__span_register new-password-span-error"
          id="new-password-error"
        />
        <button
          className="form__button form__button_page form__button_register"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Inscrevendo-se...' : 'Inscrever-se'}
        </button>
        <p className="form__text form__text_page">
          Já é um membro?
          <Link className="form__link form__link_page" to="/signin">
            Faça o login aqui!
          </Link>
        </p>
      </form>

      {tooltip && (
        <InfoTooltip
          tooltip={tooltip}
          isSuccess={isSuccess}
          onClose={() => setTooltip(false)}
        />
      )}
    </>
  );
}

export default Register;
