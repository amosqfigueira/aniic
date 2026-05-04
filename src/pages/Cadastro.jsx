import React, { useState } from "react";
import FormCard from "../components/FormCard";

import "react-phone-input-2/lib/style.css";
// Importação alternativa para evitar o erro de "object"
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = PhoneInputPkg.default ? PhoneInputPkg.default : PhoneInputPkg;

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [artistico, setArtistico] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email, setEmail] = useState("");
  const [bilhete, setBilhete] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erroform, setErroform] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
const API_URL = import.meta.env.VITE_API_URL;
  // Regex para senha forte
  const senhaForteRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]); // guarda o ficheiro selecionado
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔎 Validações
    if (nome.trim() === "") {
      setErroform("Por favor insira o Nome.");
      return;
    }
    if (artistico.trim() === "") {
      setErroform("Por favor insira o Nome Artístico.");
      return;
    }
    if (telefone.trim() === "") {
      setErroform("Por favor insira o Telemóvel.");
      return;
    }
    // Validação de telemóvel com 12 dígitos
    const apenasNumeros = telefone.replace(/\D/g, ""); // remove espaços e símbolos

    if (apenasNumeros.length < 12) {
      setErroform("Por Favor Corriga o Telemóvel, ha dígitos em falta");
      return;
    }

    if (apenasNumeros.length > 12) {
      setErroform("Por Favor Corriga o Telemóvel, ha muitos dígitos");
      return;
    }

    /* if (telefone2.trim() !== "") {
     
        // Validação de telemóvel com 12 dígitos
    const apenasNumeros = telefone2.replace(/\D/g, ""); // remove espaços e símbolos
    console.log(apenasNumeros.length )
    if (apenasNumeros.length < 12) {
      setErroform("Por Favor Corriga o Telemóvel Alternativo, ha dígitos em falta");
      return;
    }
  
      if (apenasNumeros.length > 12) {
      setErroform("Por Favor Corriga o Telemóvel Alternativo, ha muitos dígitos");
      return;
    }
  
      
    } */
    if (email.trim() === "") {
      setErroform("Por favor insira o Email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErroform("Por favor insira um Email válido.");
      return;
    }
    if (bilhete.trim() === "") {
      setErroform("Por favor insira o Número de Bilhete.");
      return;
    }

    if (!senhaForteRegex.test(senha)) {
      setErroform(
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo."
      );
      return;
    }
    if (senha !== confirmar) {
      setErroform("As senhas não coincidem.");
      return;
    }

    // 🔑 Se passou nas validações, preparar payload
    const payload = {
      nome,
      pseudonimo: artistico,
      telemovel: telefone,
      telemovel2: telefone2,
      email,
      identidade: bilhete,
      password: senha,
      fotografia: fotoPerfil ? fotoPerfil.name : null, // apenas nome do ficheiro
    };


    try {
      const responses = await fetch(
        `${API_URL}/ANNIC/utilizador/exists/?identidade=${payload.identidade}&pseudonimo=${payload.pseudonimo}`,
        {
          method: "GET",


        }
      );
      if (responses.ok) {
        const data = await responses.json(); 
console.log(data)
        if (data.length > 0) {
          setErroform('Bilhete de Identidade ou Nome Artistico já existem!!')
        } else {
          try {
            const response = await fetch(
               `${API_URL}/ANNIC/utilizador/insert/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // ✅ precisa de JSON.stringify
              }
            );

            if (response.ok) {
              const data = await response.json();
             console.log(data)
             
              setErroform('Registro feito com sucesso!!, clique em Login para entrar'); // limpa erros
            // 🔑 Limpar todos os campos
  setNome("");
  setArtistico("");
  setTelefone("");
  setTelefone2("");
  setEmail("");
  setBilhete("");
  setSenha("");
  setConfirmar("");
  setFotoPerfil(null);
            } else {
              setErroform("Erro ao realizar cadastro.");
            }
          } catch (error) {
            console.error("Erro na requisição:", error);
            setErroform("Falha na conexão com o servidor.");
          }
        }

      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      setErroform("Falha na conexão com o servidor.");
    }


  };


  return (
    <div className="container">
      <h2 className="page-title">CADASTRO</h2>

      <FormCard>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label htmlFor="artistico">Nome Artístico</label>
          <input id="artistico" type="text" value={artistico} onChange={(e) => setArtistico(e.target.value)} required />

          <label>Telemóvel</label>
          <PhoneInput
            country={"ao"}
            value={telefone}
            onChange={setTelefone}
            inputStyle={{ width: "100%" }}
          />

          <label>Telemóvel Alternativo</label>
          <PhoneInput
            country={"ao"}
            value={telefone2}
            onChange={setTelefone2}
            inputStyle={{ width: "100%" }}
          />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="bilhete">Número Bilhete</label>
          <input id="bilhete" type="text" value={bilhete} onChange={(e) => setBilhete(e.target.value)} required />

          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

          <label htmlFor="confirmar">Confirmar Senha</label>
          <input id="confirmar" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />

          <label htmlFor="fotoPerfil">Foto de Perfil</label>
          <input id="fotoPerfil" type="file" accept="image/*" onChange={handleFileChange} />
          {erroform && <p style={{ color: '#856404', backgroundColor: '#fff3cd', borderColor: '#ffeeba', padding: '2px' }}>{erroform}</p>}
          <button type="submit" className="btn-primary">Submeter</button>
        </form>

        <p className="subtitle">Já tem conta? <a href="/login">Login</a></p>
      </FormCard>
    </div>
  );
}
