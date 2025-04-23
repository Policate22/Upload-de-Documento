// app.js
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mammoth = require("mammoth");
const IA = require("./IA");

// Cria a pasta 'uploads' se não existir
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configura o express
const App = express();
App.set("view engine", "ejs");
App.set("views", path.join(__dirname, "mvc/views"));
App.use(express.static(path.join(__dirname, "publico")));
App.use('/uploads', express.static(uploadPath)); // Serve arquivos da pasta uploads
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// Configuração do multer para salvar arquivos em 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Página principal
App.get("/", (req, res) => {
  res.render("index.ejs", { chat: '' });
});

// Upload do arquivo e redirecionamento
App.post("/upload", upload.single("document"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  const filename = req.file.filename;
  const originalname = req.file.originalname;

  res.redirect(`/correcao?filename=${filename}&originalname=${originalname}`);
});

// Página de correção com leitura do DOCX e IA
App.post("/correcao",upload.single("document"), async (req, res) => {
  const { filename, originalname } = req.file;
  if (!filename || !originalname) {
    return res.redirect("/");
  }

  const filePath = path.join(uploadPath, filename);

  try {
    // Lê o arquivo .docx usando o mammoth
    const dataBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: dataBuffer });
    const textoExtraido = result.value; // Conteúdo do DOCX extraído

    // Envia o texto para a IA, solicitando a correção e avaliação
    let saida = await IA.executar(textoExtraido);
    
    if (!saida) {
      saida = "Erro ao processar a IA.";
    }

    let chatComBold = saida.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Converte negrito marcado com **

    res.render("correcao", {
      filename,
      originalname,
      textoExtraido,
      chat: chatComBold,
    });
  } catch (err) {
    console.error("Erro ao ler o DOCX:", err);
    res.status(500).send("Erro ao ler o conteúdo do DOCX.");
  }
});

// Iniciar o servidor
App.listen(3000, () => console.log("Aplicação No Ar"));
