import React from 'react';
import styles from '../CategoriesList/CategoriesList.module.scss';
import CategoryButton from '../CategoryButton/CategoryButton';

const Categories = (): JSX.Element => (
	<div className={styles.categories}>
		<div>Categories:</div>
		<CategoryButton />
	</div>
);

export default Categories;
