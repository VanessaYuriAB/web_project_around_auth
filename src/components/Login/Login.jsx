import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import AuthContext from '@contexts/AuthContext.js';

import useFormValidator from '@hooks/useFormValidator.js';

import { configLogin } from '@utils/constants.js';

import useFormSubmit from '@hooks/useFormSubmit.js';

import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Login({ tooltip, setTooltip, isSuccess, setIsSuccess }) {
  // Informações de login do usuário atual
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Contexto: obtém a função para enviar as infos do formulário,
  // assinando o contexto AuthContext
  const { handleLogin } = useContext(AuthContext);

  // Validação do formulário
  const { formRef, validatorRef } = useFormValidator(configLogin);

  // Submissão do formulário com o hook personalizado (inclui preventDefault,
  // loading, onSubmit, onSuccess e onError)
  const { handleSubmit, isLoading } = useFormSubmit(
    () =>
      handleLogin({
        email: email,
        password: password,
      }), // onSubmit
    () => {
      // Limpa os campos do formulário resetando os valores dos estados dos inputs,
      // não utiliza o .reset() do form, pois é um formulário controlado
      setEmail('');
      setPassword('');
      validatorRef.current?.resetValidation(); // só reseta se existir
    }, // onSuccess
    (error) => {
      console.error(
        `Erro ao logar: ${error} \n Nome: ${error.name} \n Mensagem: ${error.message}`
      );
      setIsSuccess(false); // define o tooltip de falha
      setTooltip(true); // renderiza a tela com a msg de erro
    } // onError
  );

  // Handlers: atualiza o estado sempre que o usuário digita
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form
      className="form page__form form_page form_login"
      name="login"
      id="login-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3 className="form__title form__title_page form__title_login">Entrar</h3>
      <input
        className="form__input form__input_page form__input_login"
        id="email-span"
        name="email"
        type="email"
        placeholder="E-mail"
        minLength="10"
        required
        value={email}
        onChange={handleEmailChange}
        aria-label="E-mail de loggin do usuário"
      />
      <span
        className="form__span form__span_page form__span_login email-span-error"
        id="login-email-error"
      />
      <input
        className="form__input form__input_page form__input_login"
        id="password-span"
        name="password"
        type="password"
        placeholder="Senha"
        minLength="8"
        maxLength="15"
        required
        value={password}
        onChange={handlePasswordChange}
        aria-label="Senha de login do usuário"
      />
      <span
        className="form__span form__span_page form__span_login password-span-error"
        id="login-email-error"
      />

      {/* Só renderzira o tooltip em caso de erro no login > configuração no onError do handleSubmit*/}

      {tooltip && (
        <InfoTooltip
          tooltip={tooltip}
          isSuccess={isSuccess}
          onClose={() => setTooltip(false)}
        />
      )}

      <button
        className="form__button form__button_page form__button_login"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
      <p className="form__text form__text_page">
        Ainda não é membro?
        <Link className="form__link form__link_page" to="/signup">
          Increva-se aqui!
        </Link>
      </p>
    </form>
  );
}

export default Login;
