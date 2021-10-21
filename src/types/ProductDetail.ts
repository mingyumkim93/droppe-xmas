import Rating from "./Rating";

export default interface ProductDetail {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}
