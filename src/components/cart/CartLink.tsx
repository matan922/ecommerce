import React from "react";
import "./CartLink.scss";
import { useAppSelector } from "../../app/hooks";
import {
  getNumItems,
  getMemoizedNumItems,
} from "../../features/cart/cartSlice";

import { Link } from "react-router-dom";

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Link to="/cart" className="cart-link">
      <span className="cart-link-text">
        🛒&nbsp;&nbsp; {numItems ? numItems : "Cart"}
      </span>
    </Link>
  );
}
