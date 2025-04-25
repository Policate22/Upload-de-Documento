📄 Corretor de Redações com IA
Este projeto é uma aplicação web que permite ao usuário enviar documentos .docx, extrair seu conteúdo e receber correções automáticas com auxílio de Inteligência Artificial (IA) utilizando a API do Gemini (Google Generative AI).

✨ Funcionalidades
Upload de documentos .docx

Extração de texto usando a biblioteca mammoth

Correção e sugestões de melhoria utilizando IA

Interface amigável e responsiva

Correções destacadas com negrito

🚀 Tecnologias Utilizadas
Node.js

Express

EJS

Multer

Mammoth

Google Generative AI (Gemini)

HTML, CSS e JavaScript

🧠 Como Funciona
O usuário acessa a página inicial e envia um arquivo .docx.

O conteúdo do documento é extraído via mammoth.

O texto é enviado à API do Gemini para análise e correção.

O sistema exibe o texto corrigido, com destaques em negrito (**) transformados em <strong>.

📂 Estrutura do Projeto
bash
Copiar
Editar
├── app.js                # Arquivo principal da aplicação Express
├── IA.js                 # Módulo responsável pela integração com a IA
├── .env                  # Arquivo de configuração com chave da API
├── /uploads              # Pasta onde os arquivos são salvos
├── /mvc/views            # Templates EJS (index.ejs, correcao.ejs)
├── /publico              # Arquivos estáticos (CSS, imagens, etc)
⚙️ Como Executar Localmente
1. Clone o repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Configure a chave da API
Crie um arquivo .env com o seguinte conteúdo:

env
Copiar
Editar
GEMINI_API_KEY=sua_chave_api_aqui
🔐 Sua chave pode ser obtida em: https://ai.google.dev/

4. Inicie o servidor
bash
Copiar
Editar
node app.js
Acesse em: http://localhost:3000

🖼️ Interface
Página de Upload
Interface moderna e responsiva

Feedback visual ao selecionar o arquivo

Página de Correção
Exibe o conteúdo original do .docx

Mostra a resposta da IA com destaques

📌 Observações
Apenas arquivos .docx são aceitos.

A IA pode levar alguns segundos para responder.

O sistema depende de uma chave válida do Gemini API.

