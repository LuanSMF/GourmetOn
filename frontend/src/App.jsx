import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [receitas,setReceitas] = useState([]);
  const [carregando,setCarregando] = useState(true);
  const [erro,setErro] = useState("");
  const [mensagem, setMensagem] =useState("")

  useEffect(() => {
    async function carregarReceitas() {
      try{
        //const url = import.meta.env.DEV
        //  ? "http://localhost:3001/api/receitas?query=pasta"
        //  : "/api/receitas?query=pasta";
        //const resposta= await fetch(url)
        const resposta = await fetch("/receitas.json")

        if(!resposta.ok){
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados = await resposta.json();
        setReceitas(dados);
      }catch(erroCapturado){
        setErro(erroCapturado.message);
      }finally{
        setCarregando(false);
      }
    }
    carregarReceitas();
  },[]);

 const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
    
    const receitasFiltradas = receitas.filter((receitas) =>{
      if(categoriaSelecionada ==="Todos"){
        return true;
      }
      return receitas.categoria === categoriaSelecionada;
    }); 

  return (
    <>
      <header>
        <a>Gourme On</a>
        <nav aria-label='Navegação Principal'>
          <a href='#Inicio'>Início</a>
          <a href='#ComoFunciona'>Como funciona</a>
          <a href='#Pratos'>Pratos</a>
          <a href='#Avaliacoes'>Avaliações</a>
          <a href='#Contato'>Contato</a>

          <button>Baixar App📈</button>
        </nav>

      </header>
        <main>

        </main>
        <section>

        </section>
        <section>
            <div>
              <button onClick={()=> setCategoriaSelecionada("Todos")}>Todos</button>
              <button onClick={()=> setCategoriaSelecionada("Massas")}>Massas</button>
              <button onClick={()=> setCategoriaSelecionada("Saudaveis")}>Saudáveis</button>
              <button onClick={()=> setCategoriaSelecionada("Sobremesas")}>Sobremesas</button>
            </div>
            <section>
              {carregando &&(
                <div className='loading'>
                  <div className='spinner'></div>
                  <p>Carregando Receitas...</p>
                </div>
              )}
              {erro && <p>{erro}</p>}

              {!carregando && !erro && receitasFiltradas.map((receitas) =>(
              <article key={receitas.id}>
                <h3>{receitas.title}</h3>
                <img src={receitas.image}></img>
                <a href=''>↗</a>
              </article>  
              ))}
            </section>
        </section>
        <section>

        </section>
        <footer>
          <h4>Uma Oferta gostosa na sua caixa de entrada.</h4>
          <span>Cadastre seu e-mail para receber novidades e promoções</span>
          <input placeholder='Seu melhor e-mail' id='email'></input>
          <button onClick={()=> salvarDados()}>Cadastrar ➡</button>
        </footer>
    </>
  )
}

export default App
