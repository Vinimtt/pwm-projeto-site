// app/Register/page.js

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import para o redirecionamento
import { registerUser } from "../services/auth";

const Register = () => {
    // State para guardar os dados do formulário, erros e mensagens de sucesso
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter(); // Hook para lidar com o redirecionamento

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
        setError(""); // Limpa erros anteriores
        setSuccess(""); // Limpa mensagens de sucesso anteriores

        try {
            // Chama a função registerUser do seu serviço de autenticação
            await registerUser(email, password);
            setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");

            // Redireciona para a página de login após 2 segundos
            setTimeout(() => {
                router.push("/Login"); // Altere '/Login' para a rota da sua página de login
            }, 2000);

        } catch (err) {
            // Lida com erros da função de registro
            setError(err.message || "Ocorreu um erro ao tentar cadastrar.");
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Registre-se:</h1>
            <div>
                {/* Associa a função handleSubmit ao evento onSubmit do formulário */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                        value={email} // Componente controlado
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o state ao mudar
                        required
                    />
                    <label htmlFor="password">Senha: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*******"
                        value={password} // Componente controlado
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o state ao mudar
                        required
                    />
                    <button type="submit" name="button"> Cadastrar! </button>
                </form>

                {/* Exibe mensagens de erro ou sucesso */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <p>
                    Já tem uma conta? <Link href="/Login">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;