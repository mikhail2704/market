import { Badge } from "@mui/material";
import { AdditivesListType } from "../../types/types";

const AdditivesList: React.FC<AdditivesListType> = ({
  additives,
  addAdditives,
  oneProduct,
}) => {
  const handleClass = (isSelected: boolean): string => {
    if (oneProduct.additive.length >= 2) {
      return isSelected ? "selected-additive" : " disabled-button";
    }

    return isSelected ? "selected-additive" : " bubbly-button";
  };

  return (
    <div>
      {additives.map((elem) => {
        const isSelected = oneProduct.additive.includes(elem.nameAdditives);
        return (
          <Badge badgeContent={1} key={elem.nameAdditives}>
            <button
              key={elem.nameAdditives}
              className={handleClass(isSelected)}
              onClick={() => addAdditives(elem)}
              disabled={
                oneProduct.additive.length >= 2 &&
                !oneProduct.additive.includes(elem.nameAdditives)
              }
            >
              {elem.nameAdditives} <br /> {elem.price} ₽
            </button>
          </Badge>
        );
      })}
    </div>
  );
};

export { AdditivesList };
