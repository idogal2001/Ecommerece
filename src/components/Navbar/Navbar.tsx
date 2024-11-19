import React, { useContext } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { amountContext } from '../../Context/Context';
import styles from '../Navbar/Navbar.module.scss';

const Navbar = (): JSX.Element => {
	const [amount] = useContext(amountContext);

	return (
		<nav className={styles.navbar}>
			<div className={styles.leftNav}>
				<Link to='/' className={styles.navbarInfo}>
					Home
				</Link>
			</div>
			<div className={styles.rightNav}>
				<Link to='/CartList'>
					<button className={styles.cartButton}>
						{amount}
						<div className={styles.cartButtonPadding}>Cart</div>
						<FaCartShopping />
					</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
