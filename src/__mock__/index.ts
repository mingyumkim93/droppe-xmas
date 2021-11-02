import ProductDetail from "types/ProductDetail";
import User from "types/User";
import Cart from "types/Cart";
import { createWishLists } from "utils/WishlistUtils";
import WishList from "types/WishList";

export const fakeCarts: Cart[] = [
  {
    date: new Date(),
    id: 1,
    userId: 1,
    products: [{ productId: 1, quantity: 3 }]
  }
];

export const fakeProductDetails: ProductDetail[] = [
  {
    category: "fake product category",
    description: "fake product description",
    id: 1,
    image: "fake product image",
    price: 100,
    rating: { count: 2, rate: 2 },
    title: "fake product title"
  }
];

export const fakeUsers: User[] = [
  {
    address: {
      city: "fake user city",
      geolocation: { lat: 123, long: 123 },
      number: 123,
      street: "fake user street",
      zipcode: "fake user zipcode"
    },
    id: 1,
    email: "fake user email",
    name: { firstname: "fake user firstname", lastname: "fake user lastname" },
    password: "fake user pasword",
    phone: "fake user phone",
    username: "fake user username"
  }
];

export const fakeWishLists: WishList[] = createWishLists(fakeCarts, fakeUsers, fakeProductDetails);

const api = {
  fetchCarts: jest.fn().mockResolvedValue(fakeCarts),
  fetchProductsByIds: jest.fn().mockResolvedValue(fakeProductDetails),
  fetchUsers: jest.fn().mockResolvedValue(fakeUsers)
};

export default api;
