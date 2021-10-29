import Cart from "types/Cart";
import CartBody from "types/CartBody";
import ProductDetail from "types/ProductDetail";
import User from "types/User";
import WishList from "types/WishList";
import { trimNumber } from "./MathUtils";

export function getTotalApprovedNumberByProductId(wishLists: WishList[], productId: number) {
  let totalApprovedNumber = 0;
  wishLists.forEach((wishList) =>
    wishList.products.forEach((item) => {
      if (productId === item.productDetail.id) totalApprovedNumber += item.approvedAmount;
    })
  );
  return totalApprovedNumber;
}

export function getCartPrice(wishLists: WishList[], wishList: WishList) {
  let price = 0;
  wishList.products.forEach((product) => {
    if (getTotalApprovedNumberByProductId(wishLists, product.productDetail.id) > 1)
      price += product.approvedAmount * product.productDetail.price * 0.9;
    else price += product.approvedAmount * product.productDetail.price;
  });
  return trimNumber(price);
}

export function getApprovedNumberSum(wishLists: WishList[]) {
  let sum = 0;
  wishLists.forEach((wishList) => wishList.products.forEach((product) => (sum += product.approvedAmount)));
  return sum;
}

export function getTotalPriceBeforeDiscount(wishLists: WishList[]) {
  let sum = 0;
  wishLists.forEach((wishList) =>
    wishList.products.forEach((product) => (sum += product.approvedAmount * product.productDetail.price))
  );
  return trimNumber(sum);
}

export function getTotalDiscount(wishLists: WishList[]) {
  let sum = 0;
  wishLists.forEach((wishList) =>
    wishList.products.forEach((product) => {
      if (getTotalApprovedNumberByProductId(wishLists, product.productDetail.id) > 1)
        sum += product.productDetail.price * product.approvedAmount * 0.1;
    })
  );
  return trimNumber(sum);
}

export function getFinalPrice(wishLists: WishList[]) {
  return trimNumber(parseFloat(getTotalPriceBeforeDiscount(wishLists)) - parseFloat(getTotalDiscount(wishLists)));
}

export function createSelectedItemsCarts(wishLists: WishList[]): CartBody[] {
  return wishLists
    .map((wishList) => {
      return {
        userId: wishList.userId,
        date: new Date(),
        products: wishList.products
          .filter((product) => product.approvedAmount > 0)
          .map((product) => {
            return { productId: product.productDetail.id, quantity: product.approvedAmount };
          })
      };
    })
    .filter((cartBody) => cartBody.products.length > 0);
}

export function createDiscardedItemsCarts(wishLists: WishList[]): CartBody[] {
  return wishLists
    .map((wishList) => {
      return {
        userId: wishList.userId,
        date: new Date(),
        products: wishList.products
          .filter((product) => product.approvedAmount < product.quantity)
          .map((product) => {
            return { productId: product.productDetail.id, quantity: product.quantity - product.approvedAmount };
          })
      };
    })
    .filter((cartBody) => cartBody.products.length > 0);
}

export function getSelectedWishLists(wishLists: WishList[]) {
  return wishLists
    .map((wishList) => {
      return { ...wishList, products: wishList.products.filter((product) => product.approvedAmount > 0) };
    })
    .filter((wishList) => wishList.products.length > 0);
}

export function getDiscardedWishLists(wishLists: WishList[]) {
  return wishLists
    .map((wishLists) => {
      return {
        ...wishLists,
        products: wishLists.products.filter((product) => product.approvedAmount < product.quantity)
      };
    })
    .filter((wishList) => wishList.products.length > 0);
}

export function getLatestCartPerChild(fetchedCarts: Cart[]) {
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

export function getProductIdsFromCarts(carts: Cart[]) {
  let productIds: number[] = [];
  carts.forEach((cart) => {
    cart.products.forEach((product) => {
      if (!productIds.includes(product.productId)) productIds.push(product.productId);
    });
  });
  return productIds;
}

export function createWishLists(carts: Cart[], users: User[], products: ProductDetail[]) {
  const wishLists: WishList[] = carts.map((cart) => {
    return {
      cartId: cart.id,
      date: cart.date,
      userId: cart.userId,
      userFirstName: users.find((user) => user.id === cart.userId)!.name.firstname,
      products: cart.products.map(({ productId, quantity }) => {
        return {
          productDetail: products.find((product) => product.id === productId)!,
          quantity: quantity,
          approvedAmount: quantity
        };
      })
    };
  });
  return wishLists;
}
