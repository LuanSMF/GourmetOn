# GourmetOn

Landing page conceitual de um aplicativo de delivery de comida, desenvolvida para o Check-point 05 de Web Development with JS da FIAP. A página apresenta o aplicativo, benefícios, um cardápio de receitas, depoimentos ilustrativos e um formulário de cadastro de e-mail.

## Tecnologias

- React e Vite para a interface.
- Tailwind CSS para a estilização.
- Node.js e Express para a rota da API.
- Fetch e JSON para consultar a Spoonacular e carregar as receitas.
- Google Cloud Translation para traduzir os títulos das receitas no backend.
- `localStorage` para armazenar os e-mails cadastrados no navegador.

## Funcionalidades

- Cardápio com as abas Todos, Massas, Saudáveis e Sobremesas. Cada aba solicita uma nova busca ao backend.
- Tradução dos títulos dos pratos para português antes de enviá-los ao navegador.
- Estados de carregamento e erro durante a busca de receitas.
- Página responsiva, menu que acompanha a rolagem e navegação suave entre seções.
- Formulário de e-mail com armazenamento local no navegador.

> Este projeto é uma demonstração de landing page. Os depoimentos são ilustrativos, os e-mails não são enviados a uma lista de campanhas e os botões de download não instalam um aplicativo.

## Como executar localmente

Requer Node.js compatível com a versão do Vite instalada. Na raiz do projeto:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com as chaves usadas pelo backend:

```env
CHAVES=sua_chave_spoonacular(https://spoonacular.com/food-api)
GOOGLE_TRANSLATE_KEY=sua_chave_google_cloud_translation(https://console.cloud.google.com/freetrial?redirectPath=%2Fmarketplace%2Fproduct%2Fgoogle%2Ftranslate.googleapis.com&facet_utm_source=google&facet_utm_campaign=Cloud-SS-DR-GCP-1713660-GCP-DR-LATAM-BR-pt-Google-BKWS-EXA-&facet_utm_medium=cpc&facet_url=https%3A%2F%2Fcloud.google.com%2Ftranslate)
```

O arquivo `.env` está no `.gitignore`; não publique suas chaves. Em um terminal, inicie o backend **a partir da pasta `backend`**, pois a configuração atual procura `../.env`:

```bash
cd backend
node server.cjs
```

Em outro terminal, na raiz do projeto:

```bash
npm run dev
```

Abra o endereço local mostrado pelo Vite. 

## Publicação e entrega

A interface faz requisições para `/api/receitas` no ambiente publicado. É necessário publicar essa rota no mesmo domínio e configurar `CHAVES` e `GOOGLE_TRANSLATE_KEY` nas variáveis de ambiente da hospedagem; publicar somente os arquivos gerados pelo Vite não disponibiliza o backend.

- Site publicado: **adicionar link após o deploy**
- Repositório: **adicionar link do repositório do grupo**

## Integrantes

- **Luan Sá RM 569136**
- **Flavia Camerim RM 570979**
- **João Nóbrega RM 570322**
- **Kevin Simões RM 571942**
