"use client";
import { useState, useEffect } from 'react';
import Parse from './services/parse.js';
import NavBar from './components/navBar.js';
import pokemon from 'pokemontcgsdk';
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
    <div>
      <NavBar />
      <h2>Cartas Mega (mais recentes primeiro)</h2>
      {erro && <p>Erro: {erro}</p>}
      {carregando ? (
        <p>Carregando cartas...</p>
      ) : cartas.length ? (
        <div className="cartas-grid">
          {cartas.map((carta) => {
            const nome = carta.name;
            const imagem = carta.images?.small;
            const precoLow = carta.tcgplayer?.prices?.holofoil?.low || "N/A";
            const precoHigh = carta.tcgplayer?.prices?.holofoil?.high || "N/A";

            return (
              <div key={carta.id} className="carta-card">
                {imagem && <img src={imagem} alt={nome} className="carta-imagem" />}
                <h3>{nome}</h3>
                <div className="precos">
                  <span>↓ R$ {precoLow}</span>
                  <span>↑ R$ {precoHigh}</span>
                </div>
                <button className="btn-compra">Lista de Compras</button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nenhuma carta encontrada.</p>
      )}
    </div>
  );
};

export default Page;