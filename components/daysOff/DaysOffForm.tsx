import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { daysOffSchema } from "../../joy/validationSchema";
import Grid from "@mui/material/Grid2";

const DaysOffForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    codeUtilisateur: "",
    codeRessource: "",
    prenom: "",
    nom: "",
    type: "",
    absence: "",
    codeTache: "",
    designation: "",
    compteursPossibles: "",
    pieceJointe: null,
    detailsDuConge: "",
    dateDebut: "",
    optionDateDebut: "",
    dateFin: "",
    optionDateFin: "",
    nbrDeJoursDeConges: "",
    commentaire: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pieceJointe: e.target.files[0] });
  };

  const validate = () => {
    const { error } = daysOffSchema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    onSubmit(formData);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Code Utilisateur"
              name="codeUtilisateur"
              value={formData.codeUtilisateur}
              onChange={handleChange}
              fullWidth
              error={!!errors.codeUtilisateur}
              helperText={errors.codeUtilisateur}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Code Ressource"
              name="codeRessource"
              value={formData.codeRessource}
              onChange={handleChange}
              fullWidth
              error={!!errors.codeRessource}
              helperText={errors.codeRessource}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              fullWidth
              error={!!errors.prenom}
              helperText={errors.prenom}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              error={!!errors.nom}
              helperText={errors.nom}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              error={!!errors.type}
              helperText={errors.type}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Absence"
              name="absence"
              value={formData.absence}
              onChange={handleChange}
              fullWidth
              error={!!errors.absence}
              helperText={errors.absence}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Code Tâche"
              name="codeTache"
              value={formData.codeTache}
              onChange={handleChange}
              fullWidth
              error={!!errors.codeTache}
              helperText={errors.codeTache}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Désignation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              fullWidth
              error={!!errors.designation}
              helperText={errors.designation}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Compteurs Possibles"
              name="compteursPossibles"
              value={formData.compteursPossibles}
              onChange={handleChange}
              fullWidth
              error={!!errors.compteursPossibles}
              helperText={errors.compteursPossibles}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Détails du Congé"
              name="detailsDuConge"
              value={formData.detailsDuConge}
              onChange={handleChange}
              fullWidth
              error={!!errors.detailsDuConge}
              helperText={errors.detailsDuConge}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Date Début"
              name="dateDebut"
              type="date"
              value={formData.dateDebut}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateDebut}
              helperText={errors.dateDebut}
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel>Option Date Début</InputLabel>
              <Select
                name="optionDateDebut"
                value={formData.optionDateDebut}
                onChange={handleChange}
                error={!!errors.optionDateDebut}
              >
                <MenuItem value="Avant-Midi">Avant-Midi</MenuItem>
                <MenuItem value="Après-Midi">Après-Midi</MenuItem>
                <MenuItem value="Journée Entière">Journée Entière</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Date Fin"
              name="dateFin"
              type="date"
              value={formData.dateFin}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateFin}
              helperText={errors.dateFin}
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel>Option Date Fin</InputLabel>
              <Select
                name="optionDateFin"
                value={formData.optionDateFin}
                onChange={handleChange}
                error={!!errors.optionDateFin}
              >
                <MenuItem value="Avant-Midi">Avant-Midi</MenuItem>
                <MenuItem value="Après-Midi">Après-Midi</MenuItem>
                <MenuItem value="Journée Entière">Journée Entière</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Nbr de Jours de Congés"
              name="nbrDeJoursDeConges"
              value={formData.nbrDeJoursDeConges}
              onChange={handleChange}
              fullWidth
              error={!!errors.nbrDeJoursDeConges}
              helperText={errors.nbrDeJoursDeConges}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Commentaire"
              name="commentaire"
              value={formData.commentaire}
              onChange={handleChange}
              fullWidth
              error={!!errors.commentaire}
              helperText={errors.commentaire}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
            >
              Pièce Jointe
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Soumettre
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DaysOffForm;
