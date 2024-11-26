export type PizzaType = {
  namePizza: string;
  urlImg: string;
  price: number;
  id: number;
};

export type initialStateType = {
  pizzas: PizzaType[];
  isActiveCart: boolean;
  loading: boolean;
  additives: additivesType[];
  modalActive: boolean;
  cart: cartBuy[];
};

export type additivesType = {
  nameAdditives: string;
  price: number;
  count: number;
};
export type oneProductType = {
  additive: additivesType[];
  priceAdditives: number;
  nameProduct: string;
  count: number;
};

export type ProductModalProps = {
  open: boolean;
  handleClose: () => void;
  namePizza: string;
  urlImg: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  price: number;
};
export type AdditivesListType = {
  additives: additivesType[];
  addAdditives: (additive: additivesType) => void;
  oneProduct: oneProductType;
  removeAdditive: (additive: additivesType) => void;
};
export type cartBuy = {
  product: oneProductType;
  rededOnion: boolean;
  chineseCabbage: boolean;
  sauce: string;
  totalPriceProduct: number;
};
