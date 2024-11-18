import React, { useContext } from 'react';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../InputMin/InputMin.module.scss';

const InputMin = (): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const setMinPrice = homePageData.setMinPrice;

	const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>): void => {
		if(minRange.currentTarget.value === ""){
			setMinPrice(0);
		}
		else{
			setMinPrice(Number(minRange.currentTarget.value));
		}
	};

	return <input className={styles.rangePriceInput} type='number' placeholder='Min Price' name='Min Price' min ="29" max ="1299" onKeyDown={saveInputMin} />;
};

export default InputMin;
