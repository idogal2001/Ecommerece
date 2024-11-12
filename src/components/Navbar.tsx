import React ,{ useContext } from 'react';
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { amountContext } from '../App';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
    
    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }
    
    const [amount, ] = amountData;

    return (
        <nav className={styles.navbar}>
        <div className={styles.leftNav}><Link to="/" className={styles.navbarInfo}>Home</Link></div>
        <div className={styles.rightNav}>
        <Link to="/CartList"><button className={styles.cartButton}>{amount}<span className={styles.cartButtonPadding}> Cart</span><FaCartShopping /></button></Link>
        </div>
    </nav>
    )
}

export default Navbar;