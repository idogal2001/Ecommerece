import type { Category } from "./Category";

export interface Product {
	id: number; 
	name: string; 
	date: string; 
	description: string 
	price: number; 
	sellerName: string; 
	imageUrl: string; 
	amount: number; 
	categories: Category[];
  }