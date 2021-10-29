import axios from "axios";
import Cart from "../types/Cart";
import CartBody from "../types/CartBody";
import ProductDetail from "../types/ProductDetail";
import User from "../types/User";
import { getLatestCartPerChild } from "../utils/WishlistUtils";

const BASE_URL = "https://fakestoreapi.com/";

async function fetchProductsByIds(ids: number[]) {
  const productFetchCalls = ids.map((id) => {
    return axios.get(BASE_URL + "products/" + id);
  });

  const productsDetails = (await Promise.all(productFetchCalls)).map((value) => value.data as ProductDetail);
  return productsDetails;
}

async function fetchUsersByIds(ids: number[]) {
  const userFetchCalls = ids.map((id) => {
    return axios.get(BASE_URL + "users/" + id);
  });

  const users = (await Promise.all(userFetchCalls)).map((value) => value.data as User);
  return users;
}

async function fetchCarts() {
  const res = await axios.get(BASE_URL + "carts");
  const carts = getLatestCartPerChild(res.data as Cart[]);
  return carts;
}

async function postCarts(newCarts: CartBody[]) {
  const postCartCalls = newCarts.map((cart) => {
    return axios.post(BASE_URL + "carts/", cart);
  });
  const postedCarts = (await Promise.all(postCartCalls)).map((res) => res.data as Cart);
  return postedCarts;
}

const api = { fetchCarts, fetchUsersByIds, fetchProductsByIds, postCarts };

export default api;
