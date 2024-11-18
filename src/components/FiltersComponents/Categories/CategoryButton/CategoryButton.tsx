import React, { useContext } from 'react';
import { productDBCategoriesContext } from '../../../../App';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../CategoryButton/CategoryButton.module.scss';
import type { Category } from '../../../../Category';

const CategoryButton = (): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const categories = homePageData.categories;
	const setCategories = homePageData.setCategories;
	const categoriesDB = useContext(productDBCategoriesContext);
	const [productCategories] = categoriesDB;

	const addCategory = (category: Category) : void=> {
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
					<input className={styles.categoryButton} type='checkbox' checked={categories.includes(category)} onChange={() => addCategory(category)} />
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
