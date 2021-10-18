import Product from "./Product";

export default interface Cart {
  id: number;
  date: Date;
  products: Product[];
  userId: number;
}
