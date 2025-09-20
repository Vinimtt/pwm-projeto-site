"use client";
import { useState, useEffect } from 'react';
import Parse from './services/parse.js';
import NavBar from './components/navBar.js';

const url = "https://api.pokemontcg.io/v2"
const Page = () => {

    const [cartas, setCartas] = useState([]);
    const [erro, setErro] = useState(null);

    // TODO: alterar (ou criar nova) função para exibir apenas :
    // - nome
    // - foto (opcional)
    // - preços (mais baixo e mais alto)

    useEffect(() => {
        async function cartasNovas(){
            try{
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=subtypes:mega&orderBy=-set.releaseDate`);
                if(!response.ok){
                    throw new Error (`Response status: ${response.status}`);
                }
                const result = await response.json();
                setCartas(result);
                console.log(result);

            } catch (error){
                setErro(error.message);
            }
        }
    cartasNovas();
    }, []);
    

    return (
        <div>
            <NavBar />
            <div>
                <h2>Cartas Mega (mais recentes primeiro)</h2>
                {erro && <p>Erro: {erro}</p>}
                {cartas.length > 0 ? (
                    cartas.map((carta) => (
                    <p key={carta.id}>
                        {carta.name} ({carta.set.name})
                    </p>
                    ))
                ) : (
                    !erro && <p>Carregando cartas...</p>
                )}
            </div>
        </div>
    );

}

export default Page