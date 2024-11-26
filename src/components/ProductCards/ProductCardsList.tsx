import { useAppDispatch, useAppSelector } from "../../store/hook";
import { ProductCard } from "./ProductCard";
import { fetchCartBuy, fetchPizza } from "../../store/pizzaSlice";
import { useEffect } from "react";
import "./ProductCards.css";

const ProductCards = () => {
  const { pizzas, loading } = useAppSelector((state) => state.pizzaCart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPizza());
    dispatch(fetchCartBuy());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {pizzas.map((elem) => (
        <ProductCard
          key={elem.id}
          id={elem.id}
          namePizza={elem.namePizza}
          price={elem.price}
          urlImg={elem.urlImg}
        />
      ))}
    </div>
  );
};

export { ProductCards };
