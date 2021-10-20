import axios from "axios";
import Cart from "../types/Cart";
import ProductDetail from "../types/ProductDetail";
import User from "../types/User";
import Product from "../types/Product";
import WishList from "../types/WishList";
const BASE_URL = "http://fakestoreapi.com/";

function getLatestCartPerChild(fetchedCarts: Cart[]) {
  let childrenIds: number[] = [];
  fetchedCarts.forEach((cart) => {
    if (!childrenIds.includes(cart.userId)) childrenIds.push(cart.userId);
  });

  const cartGroupsByChild = childrenIds.map((childId) => fetchedCarts.filter((cart) => cart.userId === childId));
  const latestCartPerChild = cartGroupsByChild.map((cartGroup) => {
    if (cartGroup.length > 1)
      return cartGroup.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })[0];
    else return cartGroup[0];
  });
  return latestCartPerChild;
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

function createWishLists(carts: Cart[], children: User[], productDetails: ProductDetail[]) {
  const wishLists: WishList[] = carts.map((cart) => {
    return {
      cartId: cart.id,
      date: cart.date,
      userId: cart.userId,
      userFirstName: children.find((user) => user.id === cart.userId)!.name.firstname,
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

async function fetchCarts() {
  const res = await axios.get(BASE_URL + "carts");
  const carts = getLatestCartPerChild(res.data as Cart[]);
  return carts;
}

async function getWishLists() {
  const carts = await fetchCarts();
  const productDetails = await fetchProductDetailsInCarts(carts);
  const users = await fetchCartOwners(carts);
  const wishLists = createWishLists(carts, users, productDetails);
  console.log(wishLists);
  return wishLists;
}

const api = { getWishLists };

export default api;
