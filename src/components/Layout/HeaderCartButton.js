import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);

  const [btnIsHighliteed, setBtnIsHighliteed] = useState(false);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighliteed ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setBtnIsHighliteed(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };

    setBtnIsHighliteed(true);
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
