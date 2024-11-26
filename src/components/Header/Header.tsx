import { AppBar, IconButton, Toolbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { toggleCart } from "../../store/pizzaSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const isActiveCart = useAppSelector((state) => state.pizzaCart.isActiveCart);
  const totalCart = useAppSelector((state) => state.pizzaCart.cart);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="appBar"
        sx={{ backgroundColor: "white", color: "black", padding: "10px" }}
      >
        <Toolbar>
          <Typography
            component={Link}
            to={"/"}
            color=""
            variant="h6"
            sx={{ textDecorationLine: "none", marginRight: "auto" }}
          >
            Главная
          </Typography>

          <Typography>
            {totalCart.reduce((acc, cur) => (acc += cur.totalPriceProduct), 0)}
          </Typography>

          <Typography variant="h6" component="div">
            Корзина
          </Typography>
          <IconButton
            color="inherit"
            style={{ color: isActiveCart ? "orange" : "inherit" }}
            onClick={() => dispatch(toggleCart())}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Header };
