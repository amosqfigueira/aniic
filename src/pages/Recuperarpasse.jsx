import React, { useState } from "react";
import FormCard from "../components/FormCard";
import { useNavigate } from "react-router-dom"

export default function Recuperarpasse() {
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
        }else{
             setErroform("Vamos enviar um email para recuperação. Obrigado");
        }
       
    
       
    
       
      };

    return (
        <div className="container">
          <h2 className="page-title">Recuperar Senha</h2>
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
    
             
    
      {erroform && <p className="error">{erroform}</p>}
              <button type="submit" className="btn-primary">Recuperar</button>
            </form>
    
          
    
     
    
            <p className="subtitle">
              Ainda não tem conta? <a href="/cadastro">Cadastre-se</a>
            </p>
    
  
          </FormCard>
        </div>
      );
}