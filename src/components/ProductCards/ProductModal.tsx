import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ProductModalProps,
  oneProductType,
  additivesType,
} from "../../types/types";
import { AdditivesList } from "./AdditivesList";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addPosition } from "../../store/pizzaSlice";

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  handleClose,
  namePizza,
  urlImg,
  count,
  setCount,
  price,
}) => {
  const additives = useAppSelector((state) => state.pizzaCart.additives);
  const [oneProduct, setOneProduct] = useState<oneProductType>({
    additive: [],
    priceAdditives: 0,
    nameProduct: namePizza,
    count: count,
  });

  const [isRedOnion, setRedOnion] = useState(false);
  const [isChineseCabbage, setChineseCabbage] = useState(false);
  const [sauce, setSauce] = useState("");

  const dispatch = useAppDispatch();

  const removeCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addAdditives = (additive: additivesType) => {
    const { nameAdditives, price } = additive;

    const existingAdditive = oneProduct.additive.find(
      (item) => item.nameAdditives === nameAdditives
    );

    if (existingAdditive) {
      if (existingAdditive.count < 2) {
        setOneProduct({
          ...oneProduct,
          additive: oneProduct.additive.map((item) =>
            item.nameAdditives === nameAdditives
              ? { ...item, count: item.count + 1 }
              : item
          ),
          priceAdditives: oneProduct.priceAdditives + price,
        });
      }
    } else {
      setOneProduct({
        ...oneProduct,
        additive: [...oneProduct.additive, { nameAdditives, price, count: 1 }],
        priceAdditives: oneProduct.priceAdditives + price,
      });
    }
  };

  const calculatePrice = () => {
    const additivesPrice = oneProduct.additive.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    return (additivesPrice + price) * count;
  };
  const totalPriceProduct = calculatePrice();

  const removeAdditive = (additive: additivesType) => {
    const { nameAdditives, price } = additive;

    const existingAdditive = oneProduct.additive.find(
      (item) => item.nameAdditives === nameAdditives
    );

    if (existingAdditive && existingAdditive.count > 1) {
      setOneProduct({
        ...oneProduct,
        additive: oneProduct.additive.map((item) =>
          item.nameAdditives === nameAdditives
            ? { ...item, count: item.count - 1 }
            : item
        ),
        priceAdditives: oneProduct.priceAdditives - price,
      });
    } else if (existingAdditive && existingAdditive.count === 1) {
      setOneProduct({
        ...oneProduct,
        additive: oneProduct.additive.filter(
          (item) => item.nameAdditives !== nameAdditives
        ),
        priceAdditives: oneProduct.priceAdditives - price,
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addPosition({
        product: oneProduct,
        rededOnion: isRedOnion,
        chineseCabbage: isChineseCabbage,
        sauce,
        totalPriceProduct: totalPriceProduct,
      })
    );
    handleClose();
    setOneProduct({
      additive: [],
      priceAdditives: 0,
      nameProduct: namePizza,
      count: count,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <img src={urlImg} alt={namePizza} />
        <div className="modal-container-ingredients">
          <p>{namePizza}</p>
          <p>Добавить</p>

          <AdditivesList
            additives={additives}
            addAdditives={addAdditives}
            oneProduct={oneProduct}
            removeAdditive={removeAdditive}
          />
          <p>Убрать:</p>
          <label>
            <input
              type="checkbox"
              onChange={() => setRedOnion(!isRedOnion)}
              checked={isRedOnion}
            />{" "}
            <span>красный лук</span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setChineseCabbage(!isChineseCabbage)}
              checked={isChineseCabbage}
            />{" "}
            <span>пекинская капуста</span>
          </label>
          <div>
            <p>Выберите соус:</p>
            <ToggleButtonGroup
              value={sauce}
              exclusive
              onChange={(e, newValue) => setSauce(newValue)}
            >
              <ToggleButton value="Сырный"> Сырный</ToggleButton>
              <ToggleButton value="Кисло-сладкий"> Кисло-сладкий</ToggleButton>
              <ToggleButton value="Горчица"> Горчица</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            <div>
              <span>{totalPriceProduct}</span>
              <Button
                onClick={removeCount}
                sx={{ color: "orange", fontSize: "20px" }}
              >
                -
              </Button>
              <span>{count}</span>
              <Button
                onClick={() => setCount(count + 1)}
                className="but-mui"
                sx={{ color: "orange", fontSize: "20px" }}
              >
                +
              </Button>
              <button className="bubbly-button" onClick={handleAddToCart}>
                Добавить
              </button>
            </div>
          </div>
        </div>

        <button className="clouse-modal" onClick={handleClose}>
          <span>x</span>
        </button>
      </Box>
    </Modal>
  );
};

export { ProductModal };
