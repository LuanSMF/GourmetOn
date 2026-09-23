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
     const categoria = req.query.categoria || "Todos";

    if (categoria === "Massas") {
    url.searchParams.set("query", "pasta");
    } else if (categoria === "Sobremesas") {
    url.searchParams.set("type", "dessert");
    } else if (categoria === "Saudáveis") {
    url.searchParams.set("maxCalories", "500");
    url.searchParams.set("maxFat", "20");
    }
    console.log("Categoria recebida:", categoria);
    console.log("Busca enviada:", url.toString());
     const resposta = await fetch(url, {
        headers:{"x-api-key": process.env.CHAVES},
     });

    if(!resposta.ok){
        return res.status(502).json({erro: "Falha ao buscar receitas"});
    }

     const dados = await resposta.json();
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
        ...receita,title:traducao.data.translations[indice].translatedText,
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