# 🗺️ Around — EUA Afora (Auth / React)

**Around (EUA Afora) Auth** é a versão da aplicação _Around_ com **autenticação e**
**autorização no front‑end**, desenvolvida com **React**.

O projeto implementa **registro, login, controle de sessão com JWT** e **proteção de**
**rotas**, garantindo que apenas usuários autenticados possam acessar o conteúdo principal
da aplicação.

Este projeto foi desenvolvido durante a **Sprint 17 (Autenticação e Autorização**
**front-end)** do bootcamp de **Desenvolvimento Web Full‑Stack da TripleTen**, com foco em
**segurança no front‑end**, **controle de rotas**, **persistência de sessão** e
**experiência do usuário**.

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-acesse_aqui-lightblue)](https://vanessayuriab.github.io/web_project_around_auth/#/signin)

---

## 📌 Escopo do projeto

Esta versão da aplicação adiciona uma camada completa de **autenticação e autorização**,
incluindo:

- Registro de usuários (`/signup`)
- Login e geração de **token JWT** (`/signin`)
- Persistência de sessão com `localStorage`
- Validação automática do token ao carregar a aplicação
- Proteção de rotas privadas
- Redirecionamento condicional baseado no estado de autenticação
- Feedback visual de sucesso e erro no fluxo de autenticação

> A autenticação é realizada por meio de uma **API externa temporária da TripleTen**,
> enquanto a arquitetura foi preparada para integração com back‑end próprio nas próximas
> etapas.

---

## 🧩 Alinhamento com outros projetos

Este repositório faz parte da **evolução progressiva da aplicação Around**, desenvolvida
em múltiplas etapas:

- [_Around — JavaScript Vanilla_](https://github.com/VanessaYuriAB/web_project_around)

  Manipulação de DOM e consumo inicial de API

- [_Around — React_](https://github.com/VanessaYuriAB/web_project_around_react)

  Arquitetura baseada em componentes, estado global e UI declarativa

- [_Around — Back‑End (Express)_](https://github.com/VanessaYuriAB/web_project_around_express)

  API REST própria com MongoDB, usuários, cartões e regras de negócio

- [_Around — Full Stack (Sprint 18)_](https://github.com/VanessaYuriAB/web_project_api_full)

  Integração completa entre front‑end e back‑end, autenticação com JWT e deploy em ambiente cloud

Essa sequência reflete a evolução real de uma aplicação **full stack**, indo do front‑end
puro até uma solução completa com autenticação e segurança.

---

## 🧠 Principais conceitos aplicados

- Autenticação baseada em **JWT**
- Controle de sessão com `localStorage`
- Proteção de rotas com **ProtectedRoute**
- Roteamento com **React Router DOM**
- Renderização condicional baseada no estado de autenticação
- `Context API` para estado global
- Gerenciamento de efeitos colaterais com `useEffect`
- Feedback visual e **UX** para fluxos de autenticação

---

## 🛠️ Tecnologias

- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- JWT (JSON Web Token)
- REST API
- CSS (BEM Flat)
- ESLint & Prettier
- Git & GitHub

---

## 🌐 Projeto online

📍 GitHub Pages: https://vanessayuriab.github.io/web_project_around_auth/

> O deploy é demonstrativo e utiliza um back‑end temporário apenas para autenticação.

---

## 📘 Documentação técnica

Este repositório também contém um **README técnico** com explicações detalhadas sobre:

- Fluxo completo de **autenticação**
- Estrutura dos **componentes**
- Uso de **hooks** e **Context API**
- Integração com **API** de autenticação
- Boas práticas adotadas no projeto

👉 Consulte o arquivo [_README.technical.md_](https://github.com/VanessaYuriAB/web_project_around_auth/blob/main/README.technical.md)
para detalhes aprofundados.

---

## 🎥 Demonstração

🎬 Vídeo no Loom, clique [aqui](https://www.loom.com/share/a07547c857554d34ac811d72ff39d20b)
para assistir.

---

## 🚀 Próximos passos

- Integração com **back‑end próprio (Express)**
- **Autenticação e autorização** completas com **JWT** no **servidor**
- Proteção de rotas no back‑end
- **Deploy** da aplicação **full stack** em ambiente **cloud**
- Testes automatizados
