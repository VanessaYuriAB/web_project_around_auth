// ---------------------------------
// Arquivo para funções utilitárias
// ---------------------------------

const switchCase = ({
  resStatus,
  dataMessage,
  notFoundMsg,
  unauthorizedMsg = '', // valor padrão vazio, se não fornecido, no caso da requisição register
  defaultMsg,
}) => {
  let message;
  switch (resStatus) {
    case 400:
      message = dataMessage || notFoundMsg;
      break;
    case 401:
      message = dataMessage || unauthorizedMsg;
      break;
    case 500:
      message = 'Erro interno do servidor';
      break;
    default:
      message = defaultMsg;
  }
  return message;
};

export default switchCase;
