import React, { useEffect, useState } from "react";
import { PizzaType } from "../../types/types";
import { useAppDispatch } from "../../store/hook";
import { fetchAdditives } from "../../store/pizzaSlice";
import { ProductModal } from "./ProductModal";

const ProductCard: React.FC<PizzaType> = ({ namePizza, price, urlImg }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdditives());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card-container">
      <div>
        <img src={urlImg} alt={`${namePizza}`} />
      </div>
      <div>
        <p>{namePizza}</p>
        <div>
          <p>{price} ₽</p>
          <button className="bubbly-button" onClick={handleOpen}>
            +
          </button>
        </div>
      </div>

      <ProductModal
        open={open}
        handleClose={handleClose}
        namePizza={namePizza}
        urlImg={urlImg}
        count={count}
        setCount={setCount}
        price={price}
      />
    </div>
  );
};

export { ProductCard };
