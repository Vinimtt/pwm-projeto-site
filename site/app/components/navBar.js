import Link from "next/link"
import React from "react";
import styles from "../styles/NavBar.module.css";
import { FaShoppingCart, FaHome  } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";


const NavBar = () => {
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
                    <Link href={"/"} className={styles.navbarLink}> <FaShoppingCart /> </Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link href={"/Login"}> Login </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
