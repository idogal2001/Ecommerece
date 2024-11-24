import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productListDBContext, productDBCategoriesContext, cartProductListContext, amountContext, highestPriceContext } from './Context/Context';
import CartList from './Pages/CartPage/CartList';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import client from './ServerData/ApolloClient/ApolloClient';
import type { Category } from './Interfaces/Category';
import type { Product } from './Interfaces/Product';

const App = (): JSX.Element => {
	const [cartProductList, setCartProductList] = useState<Product[]>([]);
	const [amount, setAmount] = useState<number>(0);
	const [productListDB, setProductListDB] = useState<Product[]>([]);
	const [productCategories, setProductCategories] = useState<Category[]>([]);
	const [highestPrice, setHighestPrice] = useState<number>(0);

	return (
		<ApolloProvider client={client}>
			<productListDBContext.Provider value={{ productListDB, setProductListDB }}>
				<productDBCategoriesContext.Provider value={{ productCategories, setProductCategories }}>
					<cartProductListContext.Provider value={{ cartProductList, setCartProductList }}>
						<amountContext.Provider value={{ amount, setAmount }}>
							<highestPriceContext.Provider value={{ highestPrice, setHighestPrice }}>
								<BrowserRouter>
									<Routes>
										<Route path='/' element={<HomePage />} />
										<Route path='/CartList' element={<CartList />} />
										<Route path='/ProductPage/:id' element={<ProductPage />} />
										<Route path='*' element={<NotFoundPage />} />
									</Routes>
								</BrowserRouter>
							</highestPriceContext.Provider>
						</amountContext.Provider>
					</cartProductListContext.Provider>
				</productDBCategoriesContext.Provider>
			</productListDBContext.Provider>
		</ApolloProvider>
	);
};
export default App;
