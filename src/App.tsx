import { ApolloProvider } from '@apollo/client';
import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartList from './Pages/CartPage/CartList';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import client from './ServerData/ApolloClient/ApolloClient';
import Query from './ServerData/Query/Query';
import type { Category } from './Category';
import type { Product } from './Product';

export const newProductListContext = createContext<[Product[], React.Dispatch<React.SetStateAction<Product[]>>]>([[], () => {}]);
export const amountContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => {}]);
export const productListDBContext = createContext<[Product[], React.Dispatch<React.SetStateAction<Product[]>>]>([[], () => {}]);
export const productDBCategoriesContext = createContext<[Category[], React.Dispatch<React.SetStateAction<Category[]>>]>([[], () => {}]);

const App = (): JSX.Element => {
	const [newProductList, setNewProductList] = useState<Product[]>([]);
	const [amount, setAmount] = useState<number>(0);
	const [productListDB, setProductListDB] = useState<Product[]>([]);
	const [productCategories, setProductCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	return (
		<ApolloProvider client={client}>
			<productListDBContext.Provider value={[productListDB, setProductListDB]}>
				<productDBCategoriesContext.Provider value={[productCategories, setProductCategories]}>
					<newProductListContext.Provider value={[newProductList, setNewProductList]}>
						<amountContext.Provider value={[amount, setAmount]}>
							<Query setProductCategories={setProductCategories} setProductListDB={setProductListDB} setLoading={setLoading} />
							{loading ? (
								<></>
							) : (
								<BrowserRouter>
									<Routes>
										<Route path='/' element={<HomePage />} />
										<Route path='/CartList' element={<CartList />} />
										<Route path='/ProductPage/:id' element={<ProductPage />} />
										<Route path='*' element={<NotFoundPage />} />
									</Routes>
								</BrowserRouter>
							)}
						</amountContext.Provider>
					</newProductListContext.Provider>
				</productDBCategoriesContext.Provider>
			</productListDBContext.Provider>
		</ApolloProvider>
	);
};
export default App;
