import { createContext } from 'react';

// Cria um contexto para armazenar as informações do usuário atual, será usado para compartilhar o usuário atual entre os componentes
const CurrentUserContext = createContext();

export default CurrentUserContext;
