import { Box, lighten, useTheme } from "@mui/material";
import { fadeIn } from "../mui/customCss";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";

type CardProps = {
  card: {
    id: number;
    title: string;
    link: string;
    description?: string;
  };
  index: number;
};
const Card = ({ card, index }: CardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (eltLink: string) => {
    navigate(eltLink);
  };
  return (
    <Box
      key={card.id}
      sx={{
        width: "100%",
        flex: 1,
        maxWidth: "60vw",
        height: "15vh",
        borderRadius: "50px 0 50px 0 ",
        boxShadow: 3,
        opacity: 0,
        animation: `${fadeIn} 0.5s forwards`,
        animationDelay: `${index * 0.3}s`,
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        },
      }}
    >
      <Box
        sx={{
          height: "15vh",
          borderRadius: "50px 0 50px 0 ",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <CardActionArea
          onClick={() => handleClick(card.link)}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: lighten(theme.palette.orange.main, 0.1),
            transition: "background-color 0.3s ease",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontSize: { xs: "1rem", md: "1.5rem", lg: "2rem" },
              }}
            >
              {card.title}
            </Typography>
            {card.description && (
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontSize: { xs: "0.5rem", md: "0.8rem" },
                }}
              >
                {card.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Box>
    </Box>
  );
};

export default Card;
