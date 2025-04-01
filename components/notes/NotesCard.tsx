import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Stack, styled } from "@mui/system";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { glow } from "../../mui/customCss";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

const StyledCard = styled(motion(Card))(({ theme, isValidated }) => ({
  borderRadius: 16,
  height: "100%",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  boxShadow: theme.shadows[5],
  backgroundColor: isValidated ? "#d4edda" : theme.palette.background.paper,
  position: "relative",
  flex: 1,

  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[10],
  },
}));

const NoteCard = ({ element, onEdit, onDelete }) => {
  const isValidated = element.status === "valid";
  const isPending = element.status === "pending";
  const isRejected = element.status === "rejected";
  return (
    <StyledCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      isValidated={isValidated}
    >
      <CardContent>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={1} alignItems="center" pb={1}>
            <Typography variant="h6" gutterBottom>
              {element.designationProjet}
            </Typography>
          </Stack>
          {isValidated ? (
            <VerifiedIcon fontSize="large" />
          ) : isRejected ? (
            <UnpublishedIcon fontSize="large" color="warning" />
          ) : isPending ? (
            <>
              <PendingActionsIcon
                fontSize="large"
                sx={{
                  animation: isPending
                    ? `${glow} 2s infinite alternate`
                    : "none",
                }}
              />
            </>
          ) : (
            <Stack
              flexWrap="wrap"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="flex-end"
              gap={1}
            >
              <IconButton
                onClick={() => onEdit(element)}
                component={motion.div}
                whileHover={{ scale: 1.2 }}
              >
                <Edit color="action" />
              </IconButton>
              <IconButton
                onClick={() => onDelete(element)}
                component={motion.div}
                whileHover={{ scale: 1.2 }}
              >
                <Delete color="error" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2" color="textSecondary">
            <strong>Date:</strong> {element.date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Code Rubrique:</strong> {element.codeRubrique}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>N° Immatriculation:</strong> {element.noImmatriculation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Code Projet:</strong> {element.codeProjet}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>N° Client:</strong> {element.noClient}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Nom Client:</strong> {element.nomClient}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Quantité:</strong> {element.quantite}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Montant du Frais:</strong> {element.montantFrais}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Commentaires:</strong> {element.commentaires}
          </Typography>
          {element.pieceJointe && (
            <Typography variant="body2" color="textSecondary">
              <strong>Pièce Jointe:</strong>{" "}
              <a
                href={URL.createObjectURL(element.pieceJointe)}
                download={element.pieceJointe.name}
              >
                {element.pieceJointe.name}
              </a>
            </Typography>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default NoteCard;
