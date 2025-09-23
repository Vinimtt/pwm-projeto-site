// /carrinho/page.js

"use client"; // Necessário para usar hooks como useState e useEffect

import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Parse from 'parse';
import { getCurrentUser } from "../services/auth"; // Importe sua função de obter usuário
import styles from "../styles/Carrinho.module.css"; // Criaremos este arquivo de estilo

const CarrinhoPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect será executado quando o componente for montado
  useEffect(() => {
    const fetchCartItems = async () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setError("Faça login para ver seu carrinho.");
        setIsLoading(false);
        return;
      }

      // Cria uma consulta na classe "Carrinho"
      const query = new Parse.Query("Carrinho");
      
      // Filtra os resultados para mostrar apenas os do usuário atual
      query.equalTo("nomeUsuario", currentUser.get("username"));

      try {
        const results = await query.find();
        setItems(results); // Armazena os itens encontrados no state
      } catch (err) {
        console.error("Erro ao buscar itens do carrinho:", err);
        setError("Não foi possível carregar os itens do carrinho.");
      } finally {
        setIsLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchCartItems();
  }, []); // O array vazio [] garante que o efeito rode apenas uma vez

  // Calcula o valor total do carrinho
  const total = items.reduce((sum, item) => {
    return sum + item.get("valorCarta");
  }, 0);

  // Renderização do conteúdo
  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando carrinho...</p>;
    }
    if (error) {
      return <p className={styles.error}>{error}</p>;
    }
    if (items.length === 0) {
      return <p>Seu carrinho está vazio.</p>;
    }
    return (
      <>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.itemName}>{item.get("nomeCarta")}</span>
              <span className={styles.itemPrice}>
                {item.get("valorCarta").toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <strong>Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
        </div>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1>Seu Carrinho</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default CarrinhoPage;