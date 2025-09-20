import Link from "next/link";
import React, {useState} from "react";

const Register = () => {

    // TODO: função de se registrar
    const handleSubmit = () => {

    }
    
    //TODO: redirecionar após cadastro
    return (
        <div>
            <h1> Registre-se: </h1>
            <div>
                <form action={signup}>
                    <label htmlFor="email">Email: </label>
                    <input name="email" id="email" placeholder="example@mail.com"/>
                    <label htmlFor="password">Senha: </label>
                    <input name="password" id="password" placeholder="*******"/>
                    <button type="submit" name="button"> Cadastrar! </button>
                </form>
            </div>
        </div>
    );
}

export default Register;