"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/auth";
import styles from "../styles/TeladeRegistro.module.css"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await registerUser(email, password);
            setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");

            setTimeout(() => {
                router.push("/Login");
            }, 2000);

        } catch (err) {
            setError(err.message || "Ocorreu um erro ao tentar cadastrar.");
            console.error(err);
        }
    };

    return (

        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.title}>Registre-se</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button type="submit" name="button" className={styles.button}>
                        Cadastrar!
                    </button>
                </form>

                {/* Combina classes para mensagens de erro/sucesso */}
                {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
                {success && <p className={`${styles.message} ${styles.success}`}>{success}</p>}

                <p className={styles.loginLink}>
                    Já tem uma conta? <Link href="/Login">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;