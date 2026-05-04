import React, { useState } from "react";
import FormCard from "../components/FormCard";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [remember, setRemember] = useState(false);
  const [erroform, setErroform] = useState("");
const API_URL = import.meta.env.VITE_API_URL;
const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setErroform("Por favor insira o Email.");
      return;
    }
   
    if (senha.trim() === "") {
      setErroform("Por favor insira a palavra-passe.");
      return;
    }

   

    try {
   const response = await fetch(
      `${API_URL}/ANNIC/utilizador/login/?email=${email}&passwd=${encodeURIComponent(senha)}`,
      {
        method: "GET",
      }
    );



      if (response.ok) {
        const data = await response.json();

        if(data && Object.keys(data).length > 0){
 
          localStorage.setItem("aniicuserdta", JSON.stringify(data));
          navigate("/perfil");

        }else{
           setErroform("Email ou palavra-passe inválidos.");
        }
       
       
      } else {
        setErroform("Email ou palavra-passe inválidos.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErroform("Falha na conexão com o servidor.");
    }
  };

    const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // 🔑 Guarda dados no localStorage
      localStorage.setItem("aniicuserdta", JSON.stringify(decoded));

      // Redireciona para perfil
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao processar login Google:", error);
      setErroform("Falha no login com Google.");
    }
  };

  const handleGoogleError = () => {
    setErroform("Falha na autenticação com Google.");
  };
  return (
    <div className="container">
      <h2 className="page-title">LOGIN</h2>
      <FormCard>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErroform("");}}
           
          />

          <label htmlFor="senha">Palavra-passe</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => {setSenha(e.target.value);   setErroform("");}}
            required
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Lembrar de mim</label>
          </div>
  {erroform && <p className="error">{erroform}</p>}
          <button type="submit" className="btn-primary">Entrar</button>
        </form>

      

        <div className="links">
          <a href="/recuperar">Esqueceu a palavra-passe?</a>
        </div>

        <p className="subtitle">
          Ainda não tem conta? <a href="/cadastro">Cadastre-se</a>
        </p>

<p style={{color:'#000', marginBottom:'5px'}}>Ou</p>
      <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
  render={(renderProps) => (
    <button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="btn-google"
    >
      <img src="/img/google-icon.png" alt="Google" />
      Continuar com Google
    </button>
  )}
/>
      </FormCard>
    </div>
  );
}
