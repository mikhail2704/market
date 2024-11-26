import React from "react";
import { ProductCards } from "../ProductCards/ProductCardsList";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page-conteiner">
      <ProductCards />
    </div>
  );
};

export { HomePage };
