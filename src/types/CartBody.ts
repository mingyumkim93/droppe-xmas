import Product from "./Product";

export default interface CartBody {
  userId: number;
  date: Date;
  products: Product[];
}
