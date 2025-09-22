"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Parse from "../services/parse.js";
import styles from "../styles/TeladeLogin.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await Parse.User.logIn(email, password);
      alert(`Bem-vindo ${user.get("username")}!`);
      // redirecionar para outra página se quiser
      router.push("/")
    } catch (err) {
      setError("Email ou senha inválidos");
      console.error(err);
    }
  };

  const router = useRouter()

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>

          <p className={styles.registerLink}>
              Não tem uma conta? <Link href="/Register">Registre-se</Link>
          </p>
      </form>
    </div>
  );
}
