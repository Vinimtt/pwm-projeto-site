import Link from "next/link"
import React from "react";
import { FaShoppingCart, FaHome  } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";


const NavBar = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href={"/"}> Home <FaHome /> </Link>
                </li>
                <li>
                    <Link href={"/"}> Mercado <AiOutlineStock /> </Link>
                </li>
                <li>
                    <Link href={"/"}> <FaShoppingCart /> </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
