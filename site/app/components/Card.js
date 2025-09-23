// Adicione "use client" no topo para indicar que é um Componente de Cliente
"use client";

import Parse from 'parse'; // Importe o Parse
import { getCurrentUser } from '../services/auth'; // Supondo que você tenha essa função
import styles from '../styles/Card.module.css';

export default function Card({ imagem, titulo, conjunto, preco }) {

  // Função para adicionar o item ao carrinho no Back4App
  const handleAddToCart = async () => {
    const currentUser = getCurrentUser();

    // 1. Verifica se o usuário está logado
    if (!currentUser) {
      alert("Você precisa estar logado para adicionar itens ao carrinho!");
      // Opcional: redirecionar para a página de login
      // router.push("/Login");
      return;
    }

    // 2. Converte o preço de string (ex: "R$ 25,50") para número (ex: 25.50)
    const numericPrice = parseFloat(preco.replace('R$', '').replace(',', '.').trim());
    if (isNaN(numericPrice)) {
        console.error("Preço inválido:", preco);
        alert("Não foi possível adicionar o item devido a um preço inválido.");
        return;
    }

    // 3. Cria um novo objeto da classe "Carrinho"
    const CartItem = Parse.Object.extend("Carrinho");
    const cartItem = new CartItem();

    // 4. Define os valores para as colunas
    cartItem.set("nomeCarta", titulo);
    cartItem.set("valorCarta", numericPrice);
    cartItem.set("nomeUsuario", currentUser.get("username"));

    // 5. (Opcional, mas recomendado) Define permissões de segurança (ACL)
    const acl = new Parse.ACL();
    acl.setReadAccess(currentUser, true);
    acl.setWriteAccess(currentUser, true);
    cartItem.setACL(acl);

    try {
      // 6. Salva o objeto no Back4App
      await cartItem.save();
      alert("${titulo}foi adicionado ao seu carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      alert("Ocorreu um erro ao adicionar o item ao carrinho.");
    }
  };

  return (
    <div className={styles.card}>
      <img src={imagem} alt={titulo} />
      <div className={styles['card-title']}>{titulo}</div>
      <div className={styles['card-set']}>{conjunto}</div>
      <div className={styles['card-price']}>{preco}</div>
      <button
        className={styles['card-button']}
        // Chama a nova função ao ser clicado
        onClick={handleAddToCart}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}