import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

import react from 'eslint-plugin-react';

import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
      react,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      //react.configs.recommended, // estava causando erro no npm run lint, removido e adicionadas regras principais manualmente
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'vendor/**',
      'public/**',
    ],
    rules: {
      // regras principais de react/recommended:
      'react/display-name': 'off', // Desativa o aviso de componentes sem nome, útil para arrow functions anônimas
      'react/jsx-boolean-value': ['error', 'never'], // Exige que valores booleanos em props JSX sejam passados de forma explícita apenas se necessário (ex: <Button disabled /> em vez de <Button disabled={true} />)
      'react/jsx-key': 'warn', // Emite aviso se esquecer de adicionar a prop 'key' em listas, o que pode causar bugs na renderização
      'react/jsx-no-comment-textnodes': 'warn', // Emite aviso se houver comentários dentro de JSX que são interpretados incorretamente como texto
      'react/jsx-no-duplicate-props': 'error', // Impede duplicação de props no mesmo elemento (ex: `<img alt="a" alt="b" />`)
      'react/jsx-no-target-blank': 'off', // Permite usar target="_blank" mesmo sem rel="noreferrer", útil em casos controlados
      'react-hooks/rules-of-hooks': 'error', // Garante que os hooks sejam usados corretamente (ex: só no topo de funções e na ordem certa)
      'react-hooks/exhaustive-deps': 'warn', // Emite aviso se o array de dependências de um useEffect/useCallback estiver incompleto
      // Configuração do Prettier: usePrettierrc: habilita o carregamento do arquivo de configuração do Prettier (padrão: true). Pode ser útil se você estiver usando várias ferramentas que entram em conflito entre si ou não quiser misturar suas configurações do ESLint com a configuração do Prettier.
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true, // 👈 carrega do .prettierrc
        },
      ], // Aponta erro se o código não seguir as regras do Prettier (ex: indentação, aspas, vírgulas finais)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Permite variáveis não usadas apenas se começarem com letra maiúscula (ex: CONSTANTES ou mapeamentos globais)

      // Sugere transformar elementos sem filhos em auto-fechamento (ex: `<img />` ao invés de `<img></img>`)
      'react/self-closing-comp': [
        'warn',
        {
          component: true, // para componentes React
          html: true, // para elementos HTML
        },
      ],

      // outras regras:
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // permite exportar componentes constantes sem aviso

      'react/prop-types': 'off', // desativa validação de prop-types, conforme instruído no projeto (Boas práticas com props, por exemplo, avisa se uma prop obrigatória (por propTypes) estiver faltando)
    },
  },
]);
