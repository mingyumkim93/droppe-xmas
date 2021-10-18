import ProductDetail from "./ProductDetail";

export default interface WishList {
  owner: string;
  products: {
    productDetail: ProductDetail;
    quantity: number;
  }[];
}
