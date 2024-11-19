import React, { useContext } from 'react';
import { HomePageContext, productDBCategoriesContext } from '../../../../Context/Context';
import styles from '../CategoryButton/CategoryButton.module.scss';
import type { Category } from '../../../../Interfaces/Category';

const CategoryButton = (): JSX.Element => {
	const categories = useContext(HomePageContext).categories;;
	const setCategories = useContext(HomePageContext).setCategories;
	const categoriesDB = useContext(productDBCategoriesContext);
	const [productCategories] = categoriesDB;

	const addCategory = (category: Category): void => {
		let categoriesList = [...categories];
		if (categories.includes(category)) {
			categoriesList = categories.filter(element => element !== category);
		} else {
			categoriesList = [...categoriesList, category];
		}
		setCategories(categoriesList);
	};

	return (
		<div className={styles.buttonCategoriesPadding}>
			{productCategories.map((category: Category) => (
				<div className={styles.buttonPadding} key={category.id}>
					<input
						className={styles.categoryButton}
						type='checkbox'
						checked={categories.includes(category)}
						onChange={() => addCategory(category)}
					/>
					<div className={styles.filterNames}>
						<div className={styles.filtersButton} onClick={() => addCategory(category)}>
							{category.name}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CategoryButton;
