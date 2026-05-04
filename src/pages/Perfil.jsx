import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
    const navigate = useNavigate();
      const [user, setUser] = useState();
      const [trabalhos, setTrabalhos] = useState([]);
   const userData = JSON.parse(localStorage.getItem("aniicuserdta"));
const API_URL = import.meta.env.VITE_API_URL;


  const handleLogout = () => {
    // 🔑 Limpa dados da sessão/localStorage
    localStorage.clear();   // ou localStorage.clear();
 

    // Redireciona para login
    navigate("/login");
  };

  const carregardadosdoutilizador = async (userid) => {
   try {
   const response = await fetch(
      `${API_URL}/ANNIC/utilizador/byID/?id=${userid}`,
      {
        method: "GET",
      }
    );



      if (response.ok) {
        const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
        setUser(data[0]);
      }

    
      else if (data && Object.keys(data).length > 0) {
        setUser(data);
      }
       
       
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    
    }
  }

    const carregartrabalhos = async (userid) => {
   try {
   const response = await fetch(
      `${API_URL}/ANNIC/TU/byPseudonimo/?pseudonimo=${userid}`,
      {
        method: "GET",
      }
    );



      if (response.ok) {
        const data = await response.json();
console.log(data)
          if (Array.isArray(data) && data.length > 0) {
        setTrabalhos(data);
      }

    
      else if (data && Object.keys(data).length > 0) {
        setTrabalhos(data);
      }
       
       
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    
    }
  }
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      // Se não existir sessão, redireciona para login
      navigate("/login");
    }else{
      
      //userData.pseudonimo
      carregardadosdoutilizador(userData.id);
      carregartrabalhos(userData.pseudonimo);
    }
  }, [ navigate]);

  if (!userData) {
  
    return <p>Redirecionando para login...</p>;
  }
  return (
    <div className="containerd">

   
    <div className="perfil-container-wrapper">
    
      <div className="perfil-container">
        <aside className="sidebar card">
          <div className="user-info">
<img
  src={
    user?.fotografia && user.fotografia.includes("/")
      ? user.fotografia
      : "/img/nofoto.jpg"
  }
  alt="Foto do usuário"
  className="user-photo"
  onError={(e) => {
    // evita loop infinito se a imagem de fallback também falhar
    if (e.currentTarget.src !== window.location.origin + "/img/nofoto.png") {
      e.currentTarget.src = "/img/nofoto.png";
    }
  }}
/>

            <h3 style={{color:'#be0808'}}>{user?.nome || "Nome do Usuário"}</h3>
            <p>{user?.email || "email@exemplo.com"}</p>
          </div>
          <nav style={{marginTop:'20px'}}>
            <ul>
              <li><a href="#" style={{color:'#be0808'}}>Meu Perfil  </a></li>
              <li><a href="#">Editar Informações</a></li>
              <li><a href="#">Galeria de Trabalhos</a></li>
              <li><a href="#">Alterar Palavra-passe</a></li>
              <li><a href="#" onClick={handleLogout} className="logout">Sair</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <h1>Área do Artista</h1>
          <p style={{position:'relative', top:'-10px'}}>Bem-vindo(a),  <b>{user?.nome || "Nome do Usuário"}</b> </p>
          <div className="row card" style={{backgroundColor:'#fcf7f7'}}>
            
            <img
  src={
    user?.fotografia && user.fotografia.includes("/")
      ? user.fotografia
      : "/img/nofoto.jpg"
  }
  alt="Foto do usuário"
className="user-photo-large"
  onError={(e) => {
    // evita loop infinito se a imagem de fallback também falhar
    if (e.currentTarget.src !== window.location.origin + "/img/nofoto.png") {
      e.currentTarget.src = "/img/nofoto.png";
    }
  }}
/>
            <div className="user-data">
              <h4 style={{color:'#be0808'}}>Usuário</h4>
              <span style={{backgroundColor:'#be0808', color:'#fff', borderRadius:'6px', paddingLeft:'6px', paddingRight:'6px'}}>Guitarista</span>
           
           <div style={{marginTop:'15px'}}>
            <p>Luanda  - Angola</p>
             <p>+{+user?.telemovel}</p>
 <p>{user?.email || "email@exemplo.com"}</p>
           </div>
            </div>
            <div className="menu-links">
              <a href="#" style={{}}>Editar Perfil</a>
                 <a href="#"  style={{backgroundColor:'#be0808'}}>Carregar Trabalho</a>
                    <a href="#">Atualizar Perfil</a>
            </div>
          </div>
          <div className="content-area card">
            <h3>Meus Trabalhos</h3>
{
  (trabalhos && trabalhos.length > 0) ? (
    <div className="trabalhos-lista">
      {trabalhos.map((item, index) => (
        <div key={index} className="trabalho-item">
          <a href={item.Midia} className="trabalho-titulo">
            {item.Designacao}
          </a>
          <span>
            Publicado em: <span className="trabalho-data">{item.data_registo}</span>
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p>Os trabalhos do artista e posts aparecerão aqui.</p>
  )
}

           
          </div>
        </main>
      </div>
    </div>
     </div>
  );
}
