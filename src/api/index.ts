import axios from "axios";
import Cart from "../types/Cart";
import ProductDetail from "../types/ProductDetail";
import User from "../types/User";
import Product from "../types/Product";
import WishList from "../types/WishList";
const BASE_URL = "http://fakestoreapi.com/";

function mergeCartsByUserId(before: Cart[]) {
  let mergedCarts: Cart[] = [];
  before.forEach((cart) => {
    const existingIndex = mergedCarts.findIndex((mergedCart) => mergedCart.userId === cart.userId);
    if (existingIndex < 0) mergedCarts.push(cart);
    else {
      const concatenatedProducts = mergedCarts[existingIndex].products.concat(cart.products);
      mergedCarts[existingIndex].products = mergeProductsById(concatenatedProducts);
    }
  });
  return mergedCarts;
}

function mergeProductsById(products: Product[]) {
  let mergedProducts: Product[] = [];
  products.forEach((product) => {
    const i = mergedProducts.findIndex((mergedProduct) => mergedProduct.productId === product.productId);
    if (i < 0) {
      mergedProducts.push(product);
    } else {
      mergedProducts[i].quantity += product.quantity;
    }
  });
  return mergedProducts;
}

function getProductIdsFromCarts(carts: Cart[]) {
  let productIds: number[] = [];
  carts.forEach((cart) => {
    cart.products.forEach((product) => {
      if (!productIds.includes(product.productId)) productIds.push(product.productId);
    });
  });
  return productIds;
}

async function fetchCarts() {
  const res = await axios.get(BASE_URL + "carts");
  const carts = mergeCartsByUserId(res.data as Cart[]);
  return carts;
}

async function fetchProductDetailsInCarts(carts: Cart[]) {
  const productIds = getProductIdsFromCarts(carts);
  const productFetchCalls = productIds.map((id) => {
    return axios.get(BASE_URL + "products/" + id);
  });

  const productsDetails = (await Promise.all(productFetchCalls)).map((value) => value.data as ProductDetail);
  return productsDetails;
}

async function fetchCartOwners(carts: Cart[]) {
  const userIds = carts.map((cart) => cart.userId);
  const userFetchCalls = userIds.map((id) => {
    return axios.get(BASE_URL + "users/" + id);
  });

  const users = (await Promise.all(userFetchCalls)).map((value) => value.data as User);
  return users;
}

function getWishLists(carts: Cart[], children: User[], productDetails: ProductDetail[]) {
  const wishLists: WishList[] = carts.map((cart) => {
    return {
      owner: children.find((user) => user.id === cart.userId)!.name.firstname,
      products: cart.products.map((product) => {
        return {
          productDetail: productDetails.find((detail) => detail.id === product.productId)!,
          quantity: product.quantity
        };
      })
    };
  });
  return wishLists;
}

async function fetchWishLists() {
  const carts = await fetchCarts();
  const productDetails = await fetchProductDetailsInCarts(carts);
  const children = await fetchCartOwners(carts);
  const wishLists = getWishLists(carts, children, productDetails);
  return wishLists;
}

const api = { fetchWishLists };

export default api;
