// /carrinho/page.js

"use client"; // Necessário para usar hooks como useState e useEffect

import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Parse from 'parse';
import { getCurrentUser } from "../services/auth"; // Função para obter usuário logado
import styles from "../styles/Carrinho.module.css"; // Arquivo de estilo

const CarrinhoPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setError("Faça login para ver seu carrinho.");
        setIsLoading(false);
        return;
      }

      const query = new Parse.Query("Carrinho");
      query.equalTo("nomeUsuario", currentUser.get("username"));

      try {
        const results = await query.find();
        setItems(results);
      } catch (err) {
        console.error("Erro ao buscar itens do carrinho:", err);
        setError("Não foi possível carregar os itens do carrinho.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Calcula o valor total do carrinho
  const total = items.reduce((sum, item) => sum + item.get("valorCarta"), 0);

  // Renderiza o conteúdo do carrinho
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
              {/* Botão de remover */}
              <button
                className={styles.removeButton}
                onClick={async () => {
                  if (!confirm(`Deseja remover ${item.get("nomeCarta")} do carrinho?`)) return;
                  try {
                    await item.destroy(); // Remove do Back4App
                    setItems(items.filter((i) => i.id !== item.id)); // Atualiza o state
                  } catch (err) {
                    console.error("Erro ao remover item:", err);
                    alert("Não foi possível remover o item do carrinho.");
                  }
                }}
              >
                Remover
              </button>
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