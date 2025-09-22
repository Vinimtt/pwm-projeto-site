"use client";
<<<<<<< HEAD
import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import NavBar from './components/navBar.js';
import styles from './page.module.css';
pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY_POKEMON });
=======
import { useState, useEffect } from 'react';
import Parse from './services/parse.js';
import NavBar from './components/navBar.js';

>>>>>>> 64c92bf5949942f8101263a0b0896eb497931364

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
    <div>
      <NavBar />
      <h2>Cartas Mega (mais recentes primeiro)</h2>
      {erro && <p>Erro: {erro}</p>}
      {carregando ? (
        <p>Carregando cartas...</p>
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
        <p>Nenhuma carta encontrada.</p>
      )}
    </div>
  );
};

export default Page;