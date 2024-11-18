import React, { useContext } from 'react';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../InputMax/InputMax.module.scss';

const InputMax = (): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const setMaxPriceRange = homePageData.setMaxPriceRange;

	const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>): void => {
		if (maxRange.key === 'Enter') {
			if(maxRange.currentTarget.value === ""){
				setMaxPriceRange(500000);
			}
			else{
				setMaxPriceRange(Number(maxRange.currentTarget.value));
			}
		}
	};

	return <input className={styles.rangePriceInput} type='number' placeholder='Max Price' name='Max Price' min ="29" max ="1299" onKeyDown={saveInputMax} />;
};

export default InputMax;
