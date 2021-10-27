import Product from "./Product";

export interface CartBody {
  userId: number;
  date: Date;
  products: Product[];
}
