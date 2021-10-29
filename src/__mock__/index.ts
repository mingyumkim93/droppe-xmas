import ProductDetail from "types/ProductDetail";
import User from "types/User";
import Cart from "types/Cart";

export const fakeCarts: Cart[] = [
  {
    date: new Date(),
    id: 1,
    userId: 1,
    products: [{ productId: 1, quantity: 2 }]
  }
];

export const fakeProductDetails: ProductDetail[] = [
  {
    category: "testing",
    description: "This is for test",
    id: 1,
    image: "image",
    price: 1,
    rating: { count: 2, rate: 2 },
    title: "test"
  }
];

export const fakeUsers: User[] = [
  {
    address: {
      city: "testing",
      geolocation: { lat: 123, long: 123 },
      number: 123,
      street: "testing",
      zipcode: "testing"
    },
    id: 1,
    email: "testing",
    name: { firstname: "testing", lastname: "testing" },
    password: "testing",
    phone: "123",
    username: "testing"
  }
];

const api = {
  fetchCarts: jest.fn().mockResolvedValue(fakeCarts),
  fetchProductsByIds: jest.fn().mockResolvedValue(fakeProductDetails),
  fetchUsers: jest.fn().mockResolvedValue(fakeUsers)
};

export default api;
