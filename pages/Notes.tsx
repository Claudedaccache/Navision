import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SpeedDial,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteDeFraisForm from "../components/notes/NotesForm";
import NoteCard from "../components/notes/NotesCard";
import Grid from "@mui/material/Grid2";
import { StyledTextField } from "../mui/customCss";

const initialElements = [
  {
    id: uuidv4(),
    designationProjet: "Project A",
    date: "2025-02-10",
    codeRubrique: "001",
    noImmatriculation: "ABC123",
    codeProjet: "P001",
    noClient: "C001",
    nomClient: "Client A",
    quantite: 10,
    montantFrais: 100,
    commentaires: "Comment A",
    pieceJointe: null,
    status: "valid",
  },
  {
    id: uuidv4(),
    designationProjet: "Project B",
    date: "2024-02-11",
    codeRubrique: "002",
    noImmatriculation: "DEF456",
    codeProjet: "P002",
    noClient: "C002",
    nomClient: "Client B",
    quantite: 20,
    montantFrais: 200,
    commentaires: "Comment B",
    pieceJointe: null,
    status: "pending",
  },
  {
    id: uuidv4(),
    designationProjet: "Project B",
    date: "2025-02-11",
    codeRubrique: "002",
    noImmatriculation: "DEF456",
    codeProjet: "P002",
    noClient: "C002",
    nomClient: "Client B",
    quantite: 20,
    montantFrais: 400,
    commentaires: "Comment B",
    pieceJointe: null,
    status: "none",
  },
  {
    id: uuidv4(),
    designationProjet: "Project F",
    date: "2025-02-11",
    codeRubrique: "002",
    noImmatriculation: "DEF456",
    codeProjet: "P002",
    noClient: "C002",
    nomClient: "Client B",
    quantite: 20,
    montantFrais: 400,
    commentaires: "Comment B",
    pieceJointe: null,
    status: "rejected",
  },
];

const Notes = () => {
  const [elements, setElements] = useState(initialElements);
  const [open, setOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentElement(null);
    setIsEdit(false);
  };

  const handleCreate = () => {
    handleOpen();
  };

  const handleEdit = (element) => {
    setCurrentElement(element);
    setIsEdit(true);
    handleOpen();
  };

  const handleDelete = (element) => {
    setElements(elements.filter((el) => el.id !== element.id));
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      setElements(
        elements.map((el) => (el.id === currentElement.id ? formData : el))
      );
    } else {
      const newElement = { ...formData, id: uuidv4() };
      setElements([...elements, newElement]);
    }
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const filteredElements = elements
    .filter((el) => {
      if (filter === "validated") return el.status === "valid";
      if (filter === "notValidated") return el.status !== "valid";
      return true;
    })
    .filter((el) =>
      el.designationProjet.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "date") return new Date(b.date) - new Date(a.date);
      if (sort === "amount") return b.montantFrais - a.montantFrais;
      return 0;
    });

  const totalNotes = elements.length;
  const validatedNotes = elements.filter((el) => el.status === "valid").length;
  const notValidatedNotes = totalNotes - validatedNotes;

  const validatedProjects = elements
    .filter((el) => el.status === "valid")
    .map((el) => el.designationProjet)
    .join(", ");
  const notValidatedProjects = elements
    .filter((el) => el.status !== "valid")
    .map((el) => el.designationProjet)
    .join(", ");

  return (
    <Stack component="section" marginTop="2rem">
      <Container>
        <Typography
          variant="h1"
          fontWeight="700"
          color={theme.palette.orange.main}
          mb="2rem"
        >
          Note de Frais:{" "}
        </Typography>
        <Box mb="2rem">
          <Stack direction="row" flexWrap="wrap" gap={{ xs: 2, md: 4 }}>
            <Typography variant="h6">Total Notes: {totalNotes}</Typography>
            <Tooltip title={validatedProjects} arrow>
              <Typography variant="h6" color="success.main">
                Validated Notes: {validatedNotes}
              </Typography>
            </Tooltip>
            <Tooltip title={notValidatedProjects} arrow>
              <Typography variant="h6" color="error.main">
                Not Validated Notes: {notValidatedNotes}
              </Typography>
            </Tooltip>
          </Stack>
        </Box>
        <Box mb="2rem">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            flexWrap="wrap"
            gap={1}
          >
            <StyledTextField
              sx={{
                minWidth: { xs: "100%", md: 120 },
                width: { xs: "100%", md: "auto" },
              }}
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Stack
              direction={{ xs: "row", md: "row" }}
              gap={1}
              width={{ xs: "50%", md: "auto" }}
            >
              <FormControl
                variant="outlined"
                sx={{ minWidth: { xs: "100%", md: 120 } }}
              >
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter"
                  sx={{
                    minWidth: { xs: "100%", md: 120 },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="validated">Validated</MenuItem>
                  <MenuItem value="notValidated">Not Validated</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                sx={{ minWidth: { xs: "100%", md: 120 } }}
              >
                <InputLabel>Sort</InputLabel>
                <Select
                  value={sort}
                  onChange={handleSortChange}
                  label="Sort"
                  sx={{
                    minWidth: { xs: "100%", md: 120 },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="amount">Amount</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
        {filteredElements.length === 0 ? (
          <Typography variant="h6" align="left">
            No notes available. Click the "+" button to add a new note.
          </Typography>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {filteredElements.map((element) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={element.id}
                sx={{ display: "flex" }}
              >
                <NoteCard
                  element={element}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <SpeedDial
          ariaLabel="SpeedDial CRUD"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            transition: "transform 0.3s ease",
          }}
          icon={<Add />}
          onClick={handleCreate}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                color={theme.palette.orange.main}
                fontWeight="700"
                fontSize="1.5rem"
              >
                {isEdit ? "Edit Note de Frais" : "Add Note de Frais"}
              </Typography>
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <NoteDeFraisForm
              onSubmit={handleSubmit}
              initialData={currentElement}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Stack>
  );
};

export default Notes;
