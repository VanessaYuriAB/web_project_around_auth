# 🌍 Web_project_around_auth: EUA Afora

⮕ Este projeto compõe a **Sprint 17** da formação em **Desenvolvimento Web** pela **TripleTen**.

⮕ Objetivo: consolidar o domínio sobre **autenticação e autorização no front-end com React**, aplicando boas práticas de modularidade e experiência do usuário (UX).

⮕ Continuação do projeto anterior: [Web_project_around_react: EUA Afora](https://github.com/VanessaYuriAB/web_project_around_react)

<!-- 📘 Informações gerais -->

[![Project Status](https://img.shields.io/badge/status-active-success?style=flat&logo=git&logoColor=white)]()

---

## 📘 1. Descrição

**Web_project_around_auth** preserva toda a estrutura funcional do projeto anterior **EUA Afora em React** (cards, curtidas, popups e edição de perfil), adicionando uma camada completa de **autenticação e autorização** no front-end.

Agora é necessário que o usuário esteja autenticado para interagir com a aplicação, permitindo **registro, login e controle de sessão** por meio de **token JWT**, com persistência via `localStorage` e validação com a API de autenticação da TripleTen.

Os usuários podem:

- Criar uma conta (`/signup`)
- Fazer login (`/signin`)
- Acessar conteúdo protegido apenas após autenticação (`/`)
- Encerrar a sessão com segurança (`onSignOut`)

📌 O app conecta-se a um back-end temporário da TripleTen para a validação e autenticação.

<!-- ⚙️ Tecnologias principais -->

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![REST API](https://img.shields.io/badge/API-REST-009688?style=flat&logo=swagger&logoColor=white)]()

<!-- 🧰 Ferramentas e qualidade de código -->

[![ESLint](https://img.shields.io/badge/ESLint-Flat_Config-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Code_Formatter-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io/)
[![Build](https://img.shields.io/badge/build-passing-success?style=flat&logo=githubactions&logoColor=white)](https://github.com/VanessaYuriAB/web_project_around_auth/actions)
[![Lint](https://img.shields.io/badge/lint-passed-brightgreen?style=flat&logo=eslint&logoColor=white)]()
[![Code Style](https://img.shields.io/badge/style-consistent-1E90FF?style=flat&logo=stylelint&logoColor=white)]()

<!-- 💾 Infraestrutura e controle de versão -->

[![Git](https://img.shields.io/badge/Git-Control-orange?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/Repo-Available-181717?style=flat&logo=github&logoColor=white)](https://github.com/VanessaYuriAB/web_project_around_auth)

<!-- 🧪 Testes e segurança -->

[![Token Security](https://img.shields.io/badge/JWT-Secure_Token-orange?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![HTTPS](https://img.shields.io/badge/HTTPS-Enabled-006600?style=flat&logo=letsencrypt&logoColor=white)]()

<!-- 🌍 Compatibilidade -->

[![Responsive](https://img.shields.io/badge/UI-Responsive-00C7B7?style=flat&logo=responsivedesign&logoColor=white)]()
[![Cross Browser](https://img.shields.io/badge/Browser-Chrome_|_Edge_|_Firefox-4285F4?style=flat&logo=googlechrome&logoColor=white)]()

---

## ⚙️ 2. Funcionalidades implementadas

### 🔑 Autenticação e autorização

- **Rotas:**
  - Registro de novos usuários com e-mail e senha (`POST /signup`)
  - Login de usuários existentes (`POST /signin`)
  - Validação automática do token JWT (`GET /users/me`)
- **Token JWT:** armazenamento e recuperação via `localStorage`
- **Redirecionamento automático via `useNavigate()`:**
  - `/signin` → `/` após login bem-sucedido
  - `/signup` → `/signin` após cadastro
  - `/` → `/signin` se o usuário não estiver autenticado
- **Fluxo de logout:** limpeza do token e redirecionamento para `/signin` (`onSignOut`)
- **Verificação e validação automática do token:** ao carregar o app, via `useEffect`, garantindo a persistência da sessão entre recarregamentos

📌 Lógica de autenticação separada no módulo `auth.js`, responsável por requisições de registro, login e validação de token (`/signup`, `/signin`, `/users/me`)

---

### 🛡️ Proteção de rotas

Acesso à aplicação disponível somente após autenticação.

- Implementação do componente `ProtectedRoute`
- Bloqueio de acesso à rota principal (`/`) para usuários não autorizados
- Controle centralizado no componente `App.js`

---

### 🪟 Feedback visual e UX

- Componente **`InfoTooltip`**: exibe popup informativo de sucesso ou falha no registro e login
- **Header dinâmico**: exibição condicional para usuários logados e não logados
- **Formulários reativos e validados** com `useFormValidator`

📌 O comportamento do Header é controlado via `useLocation`, que identifica a rota atual e exibe links diferentes para `/signup`, `/signin` e `/`.

---

### 🔄 Fluxo de autenticação e autorização:

> Register → (POST /signup) → InfoTooltip (Sucesso) → Login → (POST /signin) → localStorage → ProtectedRoute → Main

📌 Garante o ciclo completo de registro, login, validação e manutenção da sessão entre recarregamentos, redirecionando o usuário de forma segura conforme o estado de autenticação.

---

## 🏗️ 3. Estrutura de pastas e arquitetura React

### 📁 Estrutura de pastas

```bash
src/
├── assets/
│
├── components/
│   ├── App.jsx
│   ├── Header/
│   │   └── Header.jsx
│   ├── Main/
│   │   ├── Main.jsx
│   │   └── components/
│   │       ├── Card/
│   │       │   └── Card.jsx
│   │       └── Popup/
│   │           ├── Popup.jsx
│   │           └── components/
│   │               ├── DeleteConfirmation/
│   │               │   └── DeleteConfirmation.jsx
│   │               ├── EditAvatar/
│   │               │   └── EditAvatar.jsx
│   │               ├── EditProfile/
│   │               │   └── EditProfile.jsx
│   │               ├── NewCard/
│   │               │   └── NewCard.jsx
│   │               └── ImagePopup/
│   │                   └── ImagePopup.jsx
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.jsx
│   ├── Login/
│   │   └── Login.jsx
│   ├── Register/
│   │   └── Register.jsx
│   ├── InfoTooltip/
│   │   └── InfoTooltip.jsx
│   └── Footer/
│       └── Footer.jsx
│
├── contexts/
│   ├── AuthContext.js
│   └── CurrentUserContext.js
│
├── hooks/
│   ├── useFormSubmit.js
│   └── useFormValidator.js
│
├── utils/
│   ├── api.js
│   ├── auth.js
│   ├── constants.js
│   └── FormValidator.js
│
├── index.css
└── main.jsx
```

---

### 🧠 Hooks, estados e contexto

| Hook               | Utilização                                                                            |
| ------------------ | ------------------------------------------------------------------------------------- |
| `useState`         | Controle de `loggedIn`, `emailLogged` e `currentUser`                                 |
| `useEffect`        | Verificação do token no carregamento inicial (`getTokenAndEmail`)                     |
| `useContext`       | Acesso global a `AuthContext`                                                         |
| `useRef`           | Reset e validação de formulários                                                      |
| `useFormValidator` | Hook customizado para validação em tempo real                                         |
| `useFormSubmit`    | Hook customizado para controle de envio assíncrono                                    |
| `useLocation`      | Identifica a rota atual para renderizar o Header adequado (`/signin`, `/signup`, `/`) |
| `useNavigate`      | Redirecionamento programático do usuário (ex.: após login ou logout)                  |

📌 A autenticação é centralizada em `App.js`, que repassa callbacks (`handleLogin`, `handleRegistration`, `onSignOut`) e os estados `loggedIn` e `emailLogged` aos componentes filhos, via contexto e props.

---

### 🌐 API utilizada

Base URL: `https://se-register-api.en.tripleten-services.com/v1`

| Endpoint                | Método                | Descrição                                   |
| ----------------------- | --------------------- | ------------------------------------------- |
| `/signup`               | `POST`                | Registro de novo usuário                    |
| `/signin`               | `POST`                | Login e geração de token                    |
| `/users/me`             | `GET`                 | Validação de token e obtenção de e-mail     |
| `/cards`, `/users` etc. | `GET/POST/PUT/DELETE` | Mantidos da API anterior (projeto em React) |

📌 A autenticação é gerenciada por um módulo dedicado (`auth.js`), enquanto as demais requisições de dados permanecem em `api.js`, facilitando a manutenção e segurança do código.

---

### 💾 Armazenamento local (JWT)

- Token armazenado no `localStorage` sob a chave `jwt`

- Verificação automática ao montar o `App`, no `useEffect` inicial

- Remoção segura do token ao sair (`onSignOut`)

- Redirecionamento automático para `/signin`, caso o token seja inválido:
  - Se o token não for fornecido ou fornecido sem o titular:

  ![Erro_Token_1](./.github/images/erro-token-1.png)
  - Se o token for inválido:

  ![Erro_Token_2](./.github/images/erro-token-2.png)

---

### ⚛️ Componentes novos

| Componente              | Função                                                                   |
| ----------------------- | ------------------------------------------------------------------------ |
| **`Register.js`**       | Formulário de cadastro com campos controlados (`email` e `password`)     |
| **`Login.js`**          | Formulário de autenticação com campos controlados (`email` e `password`) |
| **`ProtectedRoute.js`** | Wrapper para rota privada                                                |
| **`InfoTooltip.js`**    | Popup informativo para status de sucesso ou erro no fluxo de auth        |

---

## 🧰 4. Tecnologias e ferramentas

| Categoria                   | Ferramentas                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Front-end**               | React, Vite, JSX                                                               |
| **Gerenciamento de estado** | Hooks, Context API                                                             |
| **Autenticação**            | JWT, localStorage                                                              |
| **Roteamento**              | React Router DOM                                                               |
| **Requisições à API**       | Fetch API                                                                      |
| **Validação**               | Hooks customizados (`useFormValidator`, `useFormSubmit`)                       |
| **Estilo e layout**         | CSS modular (BEM Flat)                                                         |
| **Lint e formatação**       | ESLint (Flat Config) + Prettier                                                |
| **Build**                   | Vite (bases automáticas para dev/prod, `outDir: docs`, aliases personalizados) |

📌 Fetch API é utilizada em todas as requisições HTTP nos módulos `auth.js` e `api.js`, com headers e tratamento de respostas padronizados.

📌 O `vite.config.js` foi configurado para alternar automaticamente a base do projeto conforme o ambiente:

```js
base:
  mode === 'production'
    ? '/web_project_around_react/' // para GitHub Pages
    : '/', // para ambiente local (npm run dev)
```

_Essa configuração garante que o mesmo build funcione corretamente tanto no ambiente local quanto no deploy do GitHub Pages, sem necessidade de ajustes manuais._ 📦

---

### 🔐 Autenticação com JWT

Implementação de registro, login e persistência de sessão utilizando token JWT.

- `localStorage` para armazenar token de sessão
- Validação automática via endpoint `/users/me`
- Redirecionamento condicional com React Router DOM
- Header dinâmico (usuário logado ↔ visitante)

---

## ✨ 5. Boas práticas implementadas (ES6+)

- Uso de arrow functions e desestruturação

- Modularização de lógica em hooks customizados

- Async/await para requisições assíncronas

- Renderizações condicionais com `&&` e ternários

- Separação entre API pública (`auth.js`) e API privada (`api.js`)

- Validação declarativa via objetos de configuração, centralizados em `utils/constants.js`

- `Context API` com `AuthContext` para compartilhamento de dados relacionados à autenticação de usuários entre os componentes

- Funções `handlers` para lógica de submissão e controle de estado

- `try/catch` para tratamento de erros em funções assíncronas (requisições à API)

---

## 💻 6. Visualização em screenshots

| Tela                         | Descrição                                    |
| ---------------------------- | -------------------------------------------- |
| 🧾 **/signup**               | Registro de novo usuário                     |
| 🔐 **/signin**               | Login do usuário                             |
| ✅ **InfoTooltip (Sucesso)** | Feedback visual de cadastro bem-sucedido     |
| ❌ **InfoTooltip (Erro)**    | Feedback visual de erro no cadastro ou login |
| 🏠 **Página principal**      | Exibição autenticada com e-mail no Header    |

Abaixo estão as principais telas que compõem o fluxo completo de autenticação e autorização (JWT):

- Tela de Registro (`/signup`) 🧾

![Register](./.github/images/register.png)

- Tela de Login (`/signin`) 🔐

![Login](./.github/images/login.png)

- Tooltip de sucesso no cadastro do usuário ✅

![Tooltip_Success](./.github/images/tooltip-success.png)

- Tooltip de falha no cadastro do usuário ❌

![Tooltip_Fail_Register_1](./.github/images/tooltip-fail-register1.png)

![Tooltip_Fail_Register_2](./.github/images/tooltip-fail-register2.png)

- Tooltip de falha no login ❌

![Tooltip_Fail_Login_1](./.github/images/tooltip-fail-login1.png)

![Tooltip_Fail_Login_2](./.github/images/tooltip-fail-login2.png)

- Página autenticada com e-mail no Header 🏠

![Home_Profile](./.github/images/home-profile.png)

### 📱 Visualização em dispositivos móveis

As telas abaixo mostram a responsividade da aplicação em resoluções mobile, com o layout adaptado para smartphones.

- Tela de Registro (`/signup`) 🧾

![Register_Mobile](./.github/images/register-mobile.png)

- Tela de Login (`/signin`) 🔐

![Login_Mobile](./.github/images/login-mobile.png)

- Tooltip de sucesso ✅

![Tooltip_Success_Mobile](./.github/images/tooltip-success-mobile.png)

- Tooltip de falha ❌

![Tooltip_Fail_Mobile](./.github/images/tooltip-fail-mobile.png)

- Página autenticada com e-mail no Header 🏠

![Home_Profile_Mobile](./.github/images/home-profile-mobile.png)

---

## 💻 7. Acesse o projeto

📍 GitHub Pages: [https://vanessayuriab.github.io/web_project_around_auth/](https://vanessayuriab.github.io/web_project_around_auth/)

> O deploy via GitHub Pages é apenas demonstrativo — sem persistência real de dados, devido ao back-end temporário. 💡

---

## 🎥 8. Demonstração em vídeo

[Clique aqui para assistir no Loom ⏯️.](https://www.loom.com/share/a07547c857554d34ac811d72ff39d20b?sid=d31bcc46-65dc-4790-841e-14a3a266174e)

---

## 💡 9. Melhorias

### 🔐 Segurança e autenticação avançada:

- implementar **refresh token** para renovação automática da sessão

- adicionar **expiração do token** com alerta ao usuário

- incluir **logout automático** após tempo de inatividade

- adotar **variáveis de ambiente (.env)** para proteger chaves e endpoints

### 💬 Experiência do usuário (UX/UI):

- adicionar **animações suaves** nas transições de rotas e popups (`framer-motion`)

- implementar **dark mode** com persistência, de preferência no `localStorage`

- mostrar **indicador visual de senha forte** no registro

- melhorar/especificar mensagens de erro (400, 401, 409, 500, etc.) exibidas pelo `InfoTooltip`

### 🧱 Arquitetura e manutenção:

- migrar o controle de autenticação para um **hook dedicado** (`useAuth`)

- implementar **tratamento global de erros** com `ErrorBoundary`

- refatorar componentes de formulário em um **FormContainer** reutilizável

### 📱 Acessibilidade e responsividade:

- revisar contraste e tamanho de fonte segundo as diretrizes WCAG

- adicionar **focus outlines** visíveis para navegação por teclado

- incluir **mensagens ARIA** para tooltips e alertas de erro

### 🌐 Integrações e escalabilidade:

- adicionar **recuperação de senha** via e-mail (`/forgot-password`)

- permitir **edição de dados de login** (e-mail e senha) autenticada

- integrar **OAuth (Google/GitHub)** para login social

### 📘 Documentação e apresentação:

- adicionar **índice clicável** automático com links de navegação interna

---

## 📈 10. Próximos passos — Sprint 18

O projeto terá sua última expansão, integrando **back-end próprio**, aplicando **técnicas de segurança** no fluxo JWT, refinando o **tratamento de erros** e consolidando a **versão mobile aprimorada**. 🔮
