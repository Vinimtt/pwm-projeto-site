"use client";
import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import NavBar from './components/navBar.js';
import styles from './page.module.css';
import Parse from './services/parse.js';

Parse.initialize("oROi44bIA05p8RhgGbzBr6ivK5BFxLr6MwKMWH2t", "gOJwJ5OsL2p9pc9HiePVVakMQB8kUm0pId7FVzal");
Parse.serverURL = "https://parseapi.back4app.com/";
pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY_POKEMON });

const Page = () => {
  const [cartas, setCartas] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    async function cartasNovas() {
      try {
        const url = 'https://api.pokemontcg.io/v2/cards?q=subtypes:mega&orderBy=-set.releaseDate';
        const response = await fetch(url, { signal: ctrl.signal });
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const result = await response.json();
        setCartas(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }
    cartasNovas();
    return () => ctrl.abort();
  }, []);

  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <h2 className={styles['titulo-animado']}>
          <span className={styles['titulo-gradient']}>Cartas Mega</span>
          <br />
          <span className={styles['subtitulo']}>Mais recentes primeiro</span>
        </h2>
        <p className={styles['texto-destaque']}>
          Veja as cartas mais raras e poderosas do universo Pokémon!
        </p>
      </header>
      <main className={styles.main}>
        {carregando ? (
          <div className={styles['loader-container']}>
            <div className={styles['loader']}></div>
            <p className={styles['texto-destaque']}>Carregando cartas...</p>
          </div>
        ) : cartas.length ? (
          <div className={styles['cartas-grid']}>
            {cartas.map((carta) => (
              <Card
                key={carta.id}
                imagem={carta.images?.small}
                titulo={carta.name}
                conjunto={carta.set?.name || "Conjunto desconhecido"}
                preco={
                  carta.tcgplayer?.prices?.holofoil?.low
                    ? `R$ ${carta.tcgplayer.prices.holofoil.low}`
                    : "Preço indisponível"
                }
              />
            ))}
          </div>
        ) : (
          <p className={styles['texto-destaque']}>Nenhuma carta encontrada.</p>
        )}
        <section className={styles['dicas-section']}>
          <h3 className={styles['dicas-titulo']}>Dicas para colecionadores</h3>
          <ul className={styles['lista-estilizada']}>
            <li>Procure cartas com selo especial.</li>
            <li>Invista na sua coleção.</li>
            <li>Seja um colecionador!!.</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
</footer>
    </div>
  );
};

export default Page;