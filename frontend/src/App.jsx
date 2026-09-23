import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [receitas,setReceitas] = useState([]);
  const [carregando,setCarregando] = useState(true);
  const [erro,setErro] = useState("");
  const [mensagem, setMensagem] =useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  useEffect(() => {
    console.log("Aba selecionada:", categoriaSelecionada);
    
    async function carregarReceitas() {
      try{
        const url = import.meta.env.DEV
          ? `http://localhost:3001/api/receitas?categoria=${encodeURIComponent(categoriaSelecionada)}`
          : `/api/receitas?categoria=${encodeURIComponent(categoriaSelecionada)}`;
        const resposta= await fetch(url)
        //const resposta = await fetch("/receitas.json")

        if(!resposta.ok){
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados = await resposta.json();
        console.log("IDs recebidos:", dados.results?.map((receita) => receita.id));
        setReceitas(dados.results ?? []);
      }catch(erroCapturado){
        setErro(erroCapturado.message);
      }finally{
        setCarregando(false);
      }
    }
    carregarReceitas();
  },[categoriaSelecionada]);

      const [email, setEmail] = useState('');
      const [bancoEmails, setBancoEmails] = useState(() => {
          try{
            const salvos = localStorage.getItem('banco_emails');
            return salvos ? JSON.parse(salvos) : [];
          }catch(error){
            console.error('Erro ao ler do localStorage:',error);
            return[]
          }
      });

      useEffect(()=> {
        try{
          localStorage.setItem('banco_emails', JSON.stringify(bancoEmails))
        }catch(error){
          console.error('Erro ao salvar no localStorage:', error);
        }
      },[bancoEmails]);

      const handleEnviar = (e) => {
        e.preventDefault();

        const emailLimpo = email.trim();
        if(!emailLimpo) return;

        setBancoEmails((emailsAnteriores) => [...emailsAnteriores, emailLimpo]);
        
        setEmail('');
      };

    

  return (
    <>
      <header className="bg-[#FFFCF7] px-6 md:px-16 lg:px-20 py-6 flex items-center justify-between sticky top-0 z-50">
        <a
          href="#Inicio"
          className="text-2xl font-extrabold text-[#173F32]">
          gourmet<span className="text-[#FF6648]">on</span>
        </a>

        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-10 font-semibold text-[#173F32]">

          <a href="#Inicio" className="hover:text-[#FF6648] transition">Início</a>
          <a href="#ComoFunciona" className="hover:text-[#FF6648] transition">Como funciona</a>
          <a href="#Pratos" className="hover:text-[#FF6648] transition">Pratos</a>
          <a href="#Avaliacoes" className="hover:text-[#FF6648] transition">Avaliações</a>
          <a href="#Contato" className="hover:text-[#FF6648] transition">Contato</a>
        </nav>

        <button className="hidden md:block bg-[#173F32] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition" href="#">
          Baixar app ↗
        </button>
        <button className="md:hidden text-3xl text-[#173F32]">
          ☰
        </button>
      </header>
    
      
      <main
        id="Inicio"
        className="bg-[#F5EBD8] px-6 md:px-16 lg:px-20 py-14 md:py-20">
       
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">

          {/* TEXTO */}
          <div>
            <span className="inline-block bg-[#FFDCD2] text-[#D84A32] px-4 py-2 rounded-full text-sm font-bold">
              ✦ COMIDA DE VERDADE
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-[#173F32]">
              Seu próximo prato favorito está{" "}
              <span className="text-[#FF6648]">a caminho.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#52655C]">
              Descubra sabores incríveis, escolha o que combina com você
              e receba tudo com praticidade na sua porta.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button className="bg-[#FF6648] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition">
                Baixar o app ↗
              </button>

              <a
                href="#Pratos"
                className="font-bold text-[#173F32] hover:text-[#FF6648] transition">
                Explorar pratos →
              </a>
            </div>
            
          </div>


          {/* ILUSTRAÇÃO */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#E8CBAA] flex items-center justify-center">

              <div className="w-[82%] h-[82%] bg-[#FFF8EB] rounded-full flex items-center justify-center">

                <div className="w-[82%] h-[82%] bg-[#F7A551] rounded-full flex items-center justify-center">

                  <div className="relative w-[82%] h-[82%] bg-[#F8D376] rounded-full">

                    <span className="absolute w-12 h-12 bg-[#C84D32] rounded-full top-[20%] left-[25%]"></span>
                    <span className="absolute w-14 h-14 bg-[#C84D32] rounded-full top-[25%] right-[20%]"></span>
                    <span className="absolute w-14 h-14 bg-[#C84D32] rounded-full bottom-[24%] left-[18%]"></span>
                    <span className="absolute w-16 h-16 bg-[#C84D32] rounded-full bottom-[20%] right-[18%]"></span>

                    <span className="absolute w-7 h-7 bg-[#3C7B4B] rounded-full top-[15%] left-[48%]"></span>
                    <span className="absolute w-6 h-6 bg-[#3C7B4B] rounded-full bottom-[15%] left-[35%]"></span>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
      

      <section
          id="ComoFunciona"
          className="bg-[#FFFCF7] px-6 md:px-16 lg:px-20 py-20">

          <div className="max-w-7xl mx-auto">
            <p className="text-[#FF6648] font-bold text-sm">
              POR QUE GOURMETON?
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#173F32] mt-3">
              Tudo fica mais gostoso quando é fácil
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-10">
              <div className="bg-[#F4F1EA] rounded-3xl p-8">
                <span className="inline-flex w-12 h-12 items-center justify-center bg-[#FFDCD2] text-[#D84A32] rounded-full font-bold">
                  01
                </span>

                <h3 className="text-xl font-bold text-[#173F32] mt-5">
                  Peça em minutos
                </h3>

                <p className="mt-2 text-[#52655C]">
                  Escolha seu prato sem complicação.
                </p>
              </div>

              <div className="bg-[#F4F1EA] rounded-3xl p-8">
                <span className="inline-flex w-12 h-12 items-center justify-center bg-[#FFDCD2] text-[#D84A32] rounded-full font-bold">
                  02
                </span>

                <h3 className="text-xl font-bold text-[#173F32] mt-5">
                  Sabores para todos
                </h3>

                <p className="mt-2 text-[#52655C]">
                  Encontre opções para cada vontade.
                </p>
              </div>

              <div className="bg-[#F4F1EA] rounded-3xl p-8">
                <span className="inline-flex w-12 h-12 items-center justify-center bg-[#FFDCD2] text-[#D84A32] rounded-full font-bold">
                  03
                </span>

                <h3 className="text-xl font-bold text-[#173F32] mt-5">
                  Pague do seu jeito
                </h3>

                <p className="mt-2 text-[#52655C]">
                  Finalize o pedido com facilidade.
                </p>
              </div>
            </div>
          </div>

      </section>


      <section
        id="Pratos"
        className="bg-[#E7F0E3] px-6 md:px-16 lg:px-20 py-20">
        
        <div className="max-w-7xl mx-auto">

          <p className="text-[#FF6648] font-bold text-sm">
            EXPLORE O CARDÁPIO
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#173F32] mt-3">
            O que vai ser hoje?
          </h2>

          <p className="text-[#52655C] mt-2">
            Pratos para descobrir e pedir quando bater a fome.
          </p>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-3 mt-8 mb-10">
            <button
              onClick={() => setCategoriaSelecionada("Todos")}
              className={`px-6 py-3 rounded-full font-bold transition ${
                categoriaSelecionada === "Todos"
                  ? "bg-[#173F32] text-white"
                  : "bg-white text-[#173F32]"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => {
                console.log("Cliquei em Massas");
                setCategoriaSelecionada("Massas");
              }}
              className={`px-6 py-3 rounded-full font-bold transition ${
                categoriaSelecionada === "Massas"
                  ? "bg-[#173F32] text-white"
                  : "bg-white text-[#173F32]"
              }`}>
              Massas
            </button>

            <button
              onClick={() => {
                console.log("Saudáveis");
                setCategoriaSelecionada("Saudáveis");
              }}
              className={`px-6 py-3 rounded-full font-bold transition ${
                categoriaSelecionada === "Saudáveis"
                  ? "bg-[#173F32] text-white"
                  : "bg-white text-[#173F32]"
              }`}>
              Saudáveis
            </button>

            <button
              onClick={() => {
                console.log("Sobremesas");
                setCategoriaSelecionada("Sobremesas");
              }}
              className={`px-6 py-3 rounded-full font-bold transition ${
                categoriaSelecionada === "Sobremesas"
                  ? "bg-[#173F32] text-white"
                  : "bg-white text-[#173F32]"
              }`}>
              Sobremesas
            </button>
          </div>

          {/* CARREGAMENTO */}
          {carregando && (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-4 border-[#BFD0BA] border-t-[#173F32] rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-[#52655C]">
                Carregando receitas...
              </p>
            </div>
          )}

          {/* ERRO */}
          {erro && (
            <p className="text-red-500 py-10">
              {erro}
            </p>
          )}

          {/* RECEITAS */}
          {!carregando && !erro && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {receitas.map((receita) => (
                <article
                  key={receita.id}
                  className="bg-white rounded-3xl p-3 hover:-translate-y-1 hover:shadow-lg transition">

                  <div className="bg-[#F3D9C8] rounded-2xl overflow-hidden">
                    <img
                      src={receita.image}
                      alt={receita.title}
                      className="w-full h-52 object-contain"/>
                  </div>

                  <div className="p-3">
                    <h3 className="text-xl font-bold text-[#173F32]">
                      {receita.title}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#6B756F]">
                        {receita.categoria}
                      </span>

                      <span className="text-[#FF6648] text-xl font-bold">
                        ↗
                      </span>
                    </div>
                  </div>

                </article>
              ))}

            </div>
          )}

        </div>
        
      </section>
       <section
        id="Avaliacoes"
        className="bg-[#FFFCF7] px-6 md:px-16 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">

          <p className="text-[#FF6648] font-bold text-sm">
            QUEM PROVA, RECOMENDA
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#173F32] mt-3">
            Comida boa também rende histórias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

            <article className="bg-[#F4F1EA] rounded-3xl p-8">
              <div className="text-[#F5A623] text-xl">
                ★★★★★
              </div>

              <p className="text-lg text-[#173F32] mt-4">
                “A comida é uma delícia e a entrega foi super rápida! Amei!”
              </p>

              <span className="block text-[#6B756F] mt-2">
                Marina A.
              </span>
            </article>

            <article className="bg-[#F4F1EA] rounded-3xl p-8">
              <div className="text-[#F5A623] text-xl">
                ★★★★★
              </div>

              <p className="text-lg text-[#173F32] mt-4">
                “O app é simples e os pratos são ótimos, com certeza pedirei novamente.”
              </p>

              <span className="block text-[#6B756F] mt-2">
                Rafael M.
              </span>
            </article>

          </div>
        </div>
      </section>
      <section
        id="Contato"
        className="bg-[#FFFCF7] px-6 md:px-16 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#173F32] rounded-[2rem] px-6 md:px-12 py-12 md:py-16 text-white">
            <div className="max-w-2xl">

              <p className="text-[#FF8A6E] font-bold text-sm">
                NOVIDADES NO SEU E-MAIL
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
                Uma oferta gostosa na sua caixa de entrada.
              </h2>

              <p className="text-[#D1DDD7] mt-4 text-lg">
                Cadastre seu e-mail para receber novidades e promoções.
              </p>
            </div>

            <form
              onSubmit={handleEnviar}
              className="mt-8 flex flex-col md:flex-row gap-3 max-w-2xl">

              <input
                type="email"
                placeholder="Digite seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-[#173F32] px-5 py-4 rounded-full outline-none"/>

              <button
                type="submit"
                className="bg-[#FF6648] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition">
                Cadastrar
              </button>

            </form>
          </div>
        </div>


      </section>    


        <footer className="bg-[#173F32] text-white px-6 md:px-16 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

              {/* LOGO */}
              <div>
                <a
                  href="#Inicio"
                  className="text-2xl font-extrabold"
                >
                  gourmet<span className="text-[#FF6648]">on</span>
                </a>

                <p className="text-sm text-[#D1DDD7] mt-3">
                  Comida boa, sem complicação.
                </p>
              </div>


              {/* LINKS */}
              <div className="flex flex-col gap-5">

                <nav className="flex flex-wrap gap-4 text-sm font-medium">
                  <a href="#Inicio" className="hover:text-[#FF6648] transition">
                    Início
                  </a>

                  <a href="#ComoFunciona" className="hover:text-[#FF6648] transition">
                    Como funciona
                  </a>

                  <a href="#Pratos" className="hover:text-[#FF6648] transition">
                    Pratos
                  </a>

                  <a href="#Contato" className="hover:text-[#FF6648] transition">
                    Contato
                  </a>
                </nav>

                <div className="flex flex-wrap gap-4 text-sm text-[#D1DDD7]">
                  <a href="#" className="hover:text-white transition">
                    Instagram
                  </a>

                  <a href="#" className="hover:text-white transition">
                    TikTok
                  </a>

                  <a href="#" className="hover:text-white transition">
                    Termos de uso
                  </a>

                  <a href="#" className="hover:text-white transition">
                    Privacidade
                  </a>
                </div>

              </div>
            </div>


            {/* COPYRIGHT */}
            <div className="mt-12 pt-6 border-t border-white/20">
              <p className="text-xs text-[#B8C9C0]">
                © 2026 GourmetOn. Conceito visual para o checkpoint.
              </p>
            </div>

          </div>
        </footer>          

    </>
  )
}

export default App
