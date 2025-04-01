import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SpeedDial,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DaysOffForm from "./DaysOffForm";
import { StyledTextField } from "../../mui/customCss";
import CloseIcon from "@mui/icons-material/Close";

const initialRequests = [
  {
    id: uuidv4(),
    codeUtilisateur: "U001",
    nePlusAfficherPopup: false,
    codeRessource: "R001",
    prenom: "John",
    nom: "Doe",
    type: "Paid Leave",
    absence: "Vacation",
    codeTache: "T001",
    designation: "Vacation",
    compteursPossibles: "Yes",
    pieceJointe: null,
    detailsDuConge: "Family vacation",
    dateDebut: "2025-02-10",
    optionDateDebut: "Morning",
    dateFin: "2025-02-15",
    optionDateFin: "Evening",
    statut: "Pending",
    nbrDeJoursDeConges: 5,
    commentaire: "Looking forward to it!",
  },
  // Add more initial requests if needed
];

const DaysOffComponent = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [open, setOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("dateDebut");
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRequest(null);
    setIsEdit(false);
  };

  const handleCreate = () => {
    handleOpen();
  };

  const handleEdit = (request) => {
    setCurrentRequest(request);
    setIsEdit(true);
    handleOpen();
  };

  const handleDelete = (request) => {
    setRequests(requests.filter((req) => req.id !== request.id));
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      setRequests(
        requests.map((req) => (req.id === currentRequest.id ? formData : req))
      );
    } else {
      const newRequest = { ...formData, id: uuidv4() };
      setRequests([...requests, newRequest]);
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

  const filteredRequests = requests
    .filter((req) => {
      if (filter === "validated") return req.statut === "Validated";
      if (filter === "pending") return req.statut === "Pending";
      return true;
    })
    .filter((req) =>
      req.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "dateDebut")
        return new Date(a.dateDebut) - new Date(b.dateDebut);
      if (sort === "nbrDeJoursDeConges")
        return a.nbrDeJoursDeConges - b.nbrDeJoursDeConges;
      return 0;
    });

  const totalRequests = requests.length;
  const validatedRequests = requests.filter(
    (req) => req.statut === "Validated"
  ).length;
  const pendingRequests = totalRequests - validatedRequests;

  return (
    <Container>
      <Typography
        variant="h1"
        fontWeight="700"
        color={theme.palette.orange.main}
        mb="2rem"
      >
        Days Off Requests:{" "}
      </Typography>
      <Box mb="2rem">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          flexWrap="wrap"
          alignItems="center"
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
            direction={{ xs: "column", md: "row" }}
            gap={1}
            width={{ xs: "100%", md: "auto" }}
          >
            <FormControl
              variant="outlined"
              sx={{
                minWidth: { xs: "100%", md: 120 },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="validated">Validated</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{
                minWidth: { xs: "100%", md: 120 },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <InputLabel>Sort</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort">
                <MenuItem value="dateDebut">Date Debut</MenuItem>
                <MenuItem value="nbrDeJoursDeConges">
                  Nbr de Jours de Conges
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
      <Box mb="2rem">
        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Total Requests: {totalRequests}</Typography>
          <Tooltip title="Validated Requests" arrow>
            <Typography variant="h6" color="success.main">
              Validated: {validatedRequests}
            </Typography>
          </Tooltip>
          <Tooltip title="Pending Requests" arrow>
            <Typography variant="h6" color="error.main">
              Pending: {pendingRequests}
            </Typography>
          </Tooltip>
        </Stack>
      </Box>
      {filteredRequests.length === 0 ? (
        <Typography variant="h6" align="left">
          No requests available. Click the "+" button to add a new request.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredRequests.map((request) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={request.id}>
              <Paper style={{ padding: 16 }}>
                <Typography variant="h6">
                  {request.prenom} {request.nom}
                </Typography>
                <Typography variant="body2">Type: {request.type}</Typography>
                <Typography variant="body2">
                  Absence: {request.absence}
                </Typography>
                <Typography variant="body2">
                  Date Debut: {request.dateDebut}
                </Typography>
                <Typography variant="body2">
                  Date Fin: {request.dateFin}
                </Typography>

                <Button onClick={() => handleEdit(request)}>Edit</Button>
                <Button onClick={() => handleDelete(request)}>Delete</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <SpeedDial
        ariaLabel="SpeedDial CRUD"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
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
              {isEdit ? "Edit Request" : "Add Request"}{" "}
            </Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DaysOffForm onSubmit={handleSubmit} initialData={currentRequest} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DaysOffComponent;
