import { Badge } from "@mui/material";
import { AdditivesListType } from "../../types/types";

const AdditivesList: React.FC<AdditivesListType> = ({
  additives,
  addAdditives,
  removeAdditive,
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
        const additive = oneProduct.additive.find(
          (item) => item.nameAdditives === elem.nameAdditives
        );

        const isSelected = additive ? true : false;
        const count = additive?.count || 0;

        return (
          <Badge
            badgeContent={count}
            key={elem.nameAdditives}
            sx={{
              "& .MuiBadge-badge": {
                left: "-20px",
                top: "10px",
                backgroundColor: "orange",
                color: "white",
                fontSize: "12px",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
              },
            }}
          >
            <div>
              <button
                className={handleClass(isSelected)}
                onClick={() => addAdditives(elem)}
                disabled={oneProduct.additive.length >= 2 && !isSelected}
              >
                {elem.nameAdditives} <br /> {elem.price} ₽
              </button>
              {isSelected && count > 0 && (
                <button
                  onClick={() => removeAdditive(elem)}
                  className="delete-count"
                >
                  -
                </button>
              )}
            </div>
          </Badge>
        );
      })}
    </div>
  );
};

export { AdditivesList };
