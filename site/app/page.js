"use client";
import { useState, useEffect } from 'react';
import Parse from './services/parse.js';
import NavBar from './components/navBar.js';
import pokemon from 'pokemontcgsdk';
pokemon.configure({apiKey: process.env.REACT_APP_API_KEY_POKEMON});


const url = "https://api.pokemontcg.io/v2"
const Page = () => {

    const [cartas, setCartas] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);


    // TODO: alterar (ou criar nova) função para exibir apenas :
    // - nome
    // - foto (opcional)
    // - preços (mais baixo e mais alto)

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
            cartas.map((carta) => (
                <p key={carta.id}>
                {carta.name} ({carta.set?.name}) {carta.images.symbol}
                </p>
            ))
            ) : (
            <p>Nenhuma carta encontrada.</p>
            )}
        </div>
    );

}

export default Page