import type { Category } from "./Category";

export interface Product {
	id: number;
	name: string;
	upload_date: string;
	description: string
	price: number;
	seller_name: string;
	image_url: string;
	amount: number;
	categories: Category[];
  }