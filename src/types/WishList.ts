import ProductDetail from "./ProductDetail";

export default interface WishList {
  cartId: number;
  userId: number;
  userFirstName: string;
  date: Date;
  products: {
    productDetail: ProductDetail;
    quantity: number;
  }[];
}
