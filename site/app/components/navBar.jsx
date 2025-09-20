import Link from "next/link"
import { FaShoppingCart, FaHome, AiOutlineStock  } from "react-icons/fa";

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
