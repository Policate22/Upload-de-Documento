// IA.js
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Verifique se a chave da API foi carregada corretamente
if (!process.env.GEMINI_API_KEY) {
  console.error("Erro: GEMINI_API_KEY não está definida no arquivo .env.");
  process.exit(1); // Interrompe o processo se a chave da API não for encontrada
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "" }],
    }
  ],
  generationConfig: {
    maxOutputTokens: 500,
  },
});

// Função para corrigir o texto
const IA = {
    executar: async function (texto) {
    if (!texto) return "Texto vazio não é permitido.";

    // Prompt para a IA corrigir o texto
    const prompt = `Por favor, corrija os erros no seguinte texto e faça melhorias onde necessário. O texto original é: \n\n${texto}`;

    try {
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const correctedText = response.text();

      if (!correctedText || correctedText.trim() === "") {
        return "Nenhuma correção fornecida pela IA.";
      }

      return correctedText;
    } catch (error) {
      console.error("Erro ao executar IA:", error);
      return "Erro ao processar a IA.";
    }
  }
}

module.exports = IA;
