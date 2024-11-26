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
  additivesСount?: number;
};
export type oneProductType = {
  additive: string[];
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
};
export type cartBuy = {
  product: oneProductType;
  rededOnion: boolean;
  chineseCabbage: boolean;
  sauce: string;
  totalPriceProduct: number;
};
