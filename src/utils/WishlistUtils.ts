import WishList from "../types/WishList";
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
