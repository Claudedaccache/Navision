import { useState, useEffect } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { StyledTextField } from "../../mui/customCss";
import { CloudUpload } from "@mui/icons-material";
import { noteSchema } from "../../joy/validationSchema";

const NoteDeFraisForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    date: "",
    codeRubrique: "",
    noImmatriculation: "",
    codeProjet: "",
    designationProjet: "",
    noClient: "",
    nomClient: "",
    quantite: "",
    montantFrais: "",
    commentaires: "",
    pieceJointe: null,
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
    const { error } = noteSchema.validate(formData, { abortEarly: false });
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
            <StyledTextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Code Rubrique"
              name="codeRubrique"
              value={formData.codeRubrique}
              onChange={handleChange}
              fullWidth
              error={!!errors.codeRubrique}
              helperText={errors.codeRubrique}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="N° Immatriculation"
              name="noImmatriculation"
              value={formData.noImmatriculation}
              onChange={handleChange}
              fullWidth
              error={!!errors.noImmatriculation}
              helperText={errors.noImmatriculation}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Code Projet"
              name="codeProjet"
              value={formData.codeProjet}
              onChange={handleChange}
              fullWidth
              error={!!errors.codeProjet}
              helperText={errors.codeProjet}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Désignation Projet"
              name="designationProjet"
              value={formData.designationProjet}
              onChange={handleChange}
              fullWidth
              error={!!errors.designationProjet}
              helperText={errors.designationProjet}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="N° Client"
              name="noClient"
              value={formData.noClient}
              onChange={handleChange}
              fullWidth
              error={!!errors.noClient}
              helperText={errors.noClient}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Nom Client"
              name="nomClient"
              value={formData.nomClient}
              onChange={handleChange}
              fullWidth
              error={!!errors.nomClient}
              helperText={errors.nomClient}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Quantité"
              name="quantite"
              value={formData.quantite}
              onChange={handleChange}
              fullWidth
              error={!!errors.quantite}
              helperText={errors.quantite}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Montant du Frais"
              name="montantFrais"
              value={formData.montantFrais}
              onChange={handleChange}
              fullWidth
              error={!!errors.montantFrais}
              helperText={errors.montantFrais}
            />
          </Grid>
          <Grid size={12}>
            <StyledTextField
              label="Commentaires"
              name="commentaires"
              value={formData.commentaires}
              onChange={handleChange}
              fullWidth
              error={!!errors.commentaires}
              helperText={errors.commentaires}
            />
          </Grid>
          <Grid size={12}>
            <Stack flexDirection="row">
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
              >
                Pièce Jointe
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {formData.pieceJointe && (
                <Typography
                  variant="body2"
                  style={{ marginTop: 8, paddingLeft: "1rem" }}
                >
                  Selected File: {formData.pieceJointe.name}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NoteDeFraisForm;
