require("dotenv").config({path:".env"});

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
     res.status(resposta.status).json(dados);
    }catch(erro){
        res.status(500).json({ erro: "Falha ao buscar receitas"});
    }
});

module.exports = app;
if(require.main === module){
    app.listen(3001, () => console.log("Backend: http://localhost:3001"))
}