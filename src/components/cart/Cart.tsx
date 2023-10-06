import React from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getTotalPrice,
  removeFromCart,
  updateQuantity,
  checkoutCart,
} from "../../features/cart/cartSlice";
import "./Cart.scss";

export function Cart() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.CheckoutState);
  const errorMessage = useAppSelector((state) => state.cart.errorMessage);

  function onQuantityChanged(
    e: React.FocusEvent<HTMLInputElement>,
    id: string
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }

  const tableClasses = classNames({
    table: true,
    checkoutError: checkoutState === "ERROR",
    checkoutLoading: checkoutState === "LOADING",
  });
  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]) => (
            <tr>
              <td>{products[id].title}</td>

              <td>
                <input
                  type="text"
                  className="input"
                  defaultValue={quantity}
                  onBlur={(e) => onQuantityChanged(e, id)}
                />
              </td>
              <td>{products[id].price}</td>
              <td>
                <button
                  aria-label={`Remove ${products[id].title}} from Shopping Cart`}
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className="total">${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage ? (
          <p className="errorBox">{errorMessage}</p>
        ) : null}
        <button className="checkOut-btn" type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
