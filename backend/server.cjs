require("dotenv").config({path:"../.env"});

console.log("Pasta atual:", process.cwd());
console.log("Chave carregada?", Boolean(process.env.CHAVES));
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/receitas", async(req, res) => {
    try{
     const url=new URL("https://api.spoonacular.com/recipes/complexSearch");
     url.searchParams.set("query", req.query.query || "pasta");
     url.searchParams.set("number", "10");

     const resposta = await fetch(url, {
        headers:{"x-api-key": process.env.CHAVES},
     });

    const dados = await resposta.json();

    if (!resposta.ok) {
    console.log("Spoonacular status:", resposta.status);
    console.log("Spoonacular erro:", dados.message);
    return res.status(502).json({ erro: "Falha ao buscar receitas" });
    }
     const receitas = dados.results ?? [];

     if(receitas.length === 0){
        return res.json(dados);
     }

     const respostaTraducao = await fetch(
        "https://translation.googleapis.com/language/translate/v2",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                 "X-goog-api-key": process.env.GOOGLE_TRANSLATE_KEY,
            },
            body: JSON.stringify({
                q: receitas.map((receitas) => receitas.title),
                target: "pt",
                format: "text",
            }),
        }
     );

     if(!respostaTraducao.ok){
        return res.status(502).json({ erro: "Falha ao traduzir receitas"});
     }

     const traducao = await respostaTraducao.json();

     dados.results = receitas.map((receita,indice) => ({
        ...receita,title:traducao.data.translations[indice].transatedText,
     }));

     res.json(dados);
    }catch(erro){
        res.status(500).json({ erro: "Falha ao buscar receitas"});
    }
});

module.exports = app;
if(require.main === module){
    app.listen(3001, () => console.log("Backend: http://localhost:3001"))
}