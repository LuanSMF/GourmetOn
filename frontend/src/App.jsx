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
        const url = import.meta.env.DEV
          ? "http://localhost:3001/api/receitas?query=pasta"
          : "/api/receitas?query=pasta";
        const resposta= await fetch(url)
        
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
            <div>
              <button onClick={()=> setCategoriaSelecionada("Todos")}>Todos</button>
              <button onClick={()=> setCategoriaSelecionada("Massas")}>Massas</button>
              <button onClick={()=> setCategoriaSelecionada("Saudaveis")}>Saudáveis</button>
              <button onClick={()=> setCategoriaSelecionada("Sobremesas")}>Sobremesas</button>
            </div>
        </main>
    </>
  )
}

export default App
