import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  initialStateType,
  oneProductType,
  PizzaType,
  cartBuy,
} from "../types/types";
import { additivesType } from "../types/types";

const initialState: initialStateType = {
  pizzas: [],
  isActiveCart: false,
  loading: false,
  additives: [],
  modalActive: false,
  cart: [],
};

export const fetchCartBuy = createAsyncThunk<
  cartBuy[],
  void,
  { rejectValue: string }
>("pizzaCart/fetchCartBuy", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://62e4721cfef28d1f.mokky.dev/cartBuy"
    );
    return response.data;
  } catch (error) {
    console.log(rejectWithValue("Ошибка " + error));
  }
});

export const fetchPizza = createAsyncThunk<
  PizzaType[],
  void,
  { rejectValue: string }
>("pizzaCart/fetchPizza", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://62e4721cfef28d1f.mokky.dev/pizza"
    );
    return response.data;
  } catch (error) {
    console.log(rejectWithValue("Ошибка " + error));
  }
});

export const fetchAdditives = createAsyncThunk<
  additivesType[],
  void,
  { rejectValue: string }
>("pizzaCart/fetchAdditives", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://62e4721cfef28d1f.mokky.dev/additives"
    );
    return response.data;
  } catch (error) {
    console.log(rejectWithValue("Ошибка " + error));
  }
});

export const addPosition = createAsyncThunk<
  void,
  {
    product: oneProductType;
    rededOnion: boolean;
    chineseCabbage: boolean;
    sauce: string;
    totalPriceProduct: number;
  },
  { rejectValue: string }
>("pizzaCart/addPosition", async function (data, { rejectWithValue }) {
  try {
    const response = await axios.post(
      "https://62e4721cfef28d1f.mokky.dev/cartBuy",
      data
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Ошибка " + error);
  }
});

const pizzaSlice = createSlice({
  name: "pizzaCart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isActiveCart = !state.isActiveCart;
    },
    toogleModalBuy(state) {
      state.modalActive = !state.modalActive;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdditives.fulfilled, (state, action) => {
        state.additives = action.payload;
      })
      .addCase(fetchCartBuy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartBuy.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      });
  },
});
export const { toggleCart, toogleModalBuy } = pizzaSlice.actions;

export default pizzaSlice.reducer;
