import styles from '../styles/Card.module.css';

export default function Card({ imagem, titulo, conjunto, preco }) {
  return (
    <div className={styles.card}>
      <img src={imagem} alt={titulo} />
      <div className={styles['card-title']}>{titulo}</div>
      <div className={styles['card-set']}>{conjunto}</div>
      <div className={styles['card-price']}>{preco}</div>
      <button
        className={styles['card-button']}
        onClick={() => alert(`Adicionado ${titulo} ao carrinho!`)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
