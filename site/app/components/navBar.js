"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react";
import styles from "../styles/NavBar.module.css";
import { FaShoppingCart, FaHome  } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { logoutUser, getCurrentUser } from "../services/auth";


const NavBar = () => {
    
    const [loginState, setLoginState] = useState();

    useEffect (() => {
        setLoginState(getCurrentUser());
    }, []);

    const handleLogOut = async () => {
        await logoutUser();
        setLoginState(null);
        alert(`Logout efetuado com sucesso !`);
    }


    return (
        <div className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <Link href={"/"}> Home <FaHome /> </Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link href={"/"}> Mercado <AiOutlineStock /> </Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link href={"/carrinho"} className={styles.navbarLink}> <FaShoppingCart /> </Link>
                </li>
                <li className={styles.navbarItem}>
                    {loginState ? (
                        <a href={"/"} onClick={handleLogOut}>Logout</a>
                    ): (
                        <Link href={"/Login"}> Login </Link>

                    )}
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
