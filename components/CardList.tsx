import Card from "./Card";
import { HomePageCards } from "../data/data";
import { Stack } from "@mui/material";

const CardList = () => {
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          // flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          padding: 3,
          mt: 3,
        }}
      >
        {HomePageCards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </Stack>
    </>
  );
};

export default CardList;
