// ----------------------------------------------------------
// Arquivo para interações de API relacionadas à autenticação
// ----------------------------------------------------------

// BASE_URL da API
export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

// POST - /signup — para registro de usuário
export const register = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Tenta extrair o corpo JSON da resposta, mesmo em caso de erro.
    // O trecho `.catch(() => ({}))` garante que, se `res.json()` falhar,
    // em vez de lançar um erro e interromper o fluxo (caindo no catch principal),
    // o código apenas retorna um objeto vazio `{}` e continua normalmente.
    //
    // Por que isso é útil:
    // - Algumas respostas (ex: status 500 ou 204 No Content) podem vir sem corpo
    // ou com um JSON inválido. Nesses casos, `res.json()` lança um erro (ex:
    // SyntaxError: Unexpected end of JSON input).
    // - Se isso acontecer, o erro impediria que `res.status` fosse verificado,
    // resultando em mensagens genéricas como “Erro ao cadastrar: Unexpected end
    // of JSON input”, sem tratar a real causa do erro (o status da resposta).
    // - Ao capturar o erro localmente com `.catch(() => ({}))`, o código evita
    // travamentos e permite que o fluxo continue normalmente, tratando o
    // `res.status` de forma controlada.
    //
    // Resumo: `.catch(() => ({}))` é uma proteção silenciosa que evita que o app
    // quebre quando a API responde sem JSON válido.
    const data = await res.json().catch(() => ({}));

    // Em caso de sucesso (201 Created, 200 OK, etc.)
    if (res.ok) {
      return data;
    }

    // Tratamento de erros por status
    let message;

    switch (res.status) {
      case 400:
        message = data.message || 'Um dos campos foi preenchido incorretamente';
        break;
      case 409:
        message = data.message || 'E-mail de usuário já cadastrado';
        break;
      case 500:
        message = 'Erro interno do servidor';
        break;
      default:
        message = 'Erro desconhecido durante o cadastro'; // mensagem genérica para outros erros
    }

    throw new Error(message);
  } catch (error) {
    console.error(`Erro ao cadastrar: ${error.message}`);
    throw error; // propagação do erro para o hook personalizado de envio
  }
};

// POST - /signin — para autorização de usuário
export const authorize = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return data;
    }

    let message;

    switch (res.status) {
      case 400:
        message = data.message || 'Um ou mais campos não foram fornecidos';
        break;
      case 401:
        message =
          data.message ||
          'O usuário com o e-mail especificado não foi encontrado';
        break;
      case 500:
        message = 'Erro interno do servidor';
        break;
      default:
        message = 'Erro desconhecido durante o login';
    }

    throw new Error(message);
  } catch (error) {
    console.error(`Erro ao logar: ${error.message}`);
    throw error;
  }
};

// GET - /users/me — para validar o token e obter o email (exibido no cabeçalho)
export const getContent = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return data;
    }

    let message;

    switch (res.status) {
      case 400:
        message =
          data.message || 'Token não fornecido ou fornecido em formato errado';
        break;
      case 401:
        message = data.message || 'O token fornecido é inválido';
        break;
      case 500:
        message = 'Erro interno do servidor';
        break;
      default:
        message = 'Erro desconhecido durante a busca de informações de login';
    }

    throw new Error(message);
  } catch (error) {
    console.error(`Erro ao buscar informações de login: ${error.message}`);
    throw error;
  }
};
