import Joi from "joi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
  }),
});

export const noteSchema = Joi.object({
  date: Joi.date().required().label("Date"),
  codeRubrique: Joi.string().required().label("Code Rubrique"),
  noImmatriculation: Joi.string().required().label("N° Immatriculation"),
  codeProjet: Joi.string().required().label("Code Projet"),
  designationProjet: Joi.string().required().label("Désignation Projet"),
  noClient: Joi.string().required().label("N° Client"),
  nomClient: Joi.string().required().label("Nom Client"),
  quantite: Joi.number().integer().positive().required().label("Quantité"),
  montantFrais: Joi.number().positive().required().label("Montant du Frais"),
  commentaires: Joi.string().allow("").label("Commentaires"),
  pieceJointe: Joi.any().label("Pièce Jointe"),
});

export const daysOffSchema = Joi.object({
  codeUtilisateur: Joi.string().required().label("Code Utilisateur"),
  nePlusAfficherPopup: Joi.boolean().label("Ne Plus Afficher Popup"),
  codeRessource: Joi.string().required().label("Code Ressource"),
  prenom: Joi.string().required().label("Prénom"),
  nom: Joi.string().required().label("Nom"),
  type: Joi.string().required().label("Type"),
  absence: Joi.string().required().label("Absence"),
  codeTache: Joi.string().required().label("Code Tâche"),
  designation: Joi.string().required().label("Désignation"),
  compteursPossibles: Joi.string().required().label("Compteurs Possibles"),
  pieceJointe: Joi.any().label("Pièce Jointe"),
  detailsDuConge: Joi.string().required().label("Détails du Congé"),
  dateDebut: Joi.date().required().label("Date Début"),
  optionDateDebut: Joi.string().required().label("Option Date Début"),
  dateFin: Joi.date().required().label("Date Fin"),
  optionDateFin: Joi.string().required().label("Option Date Fin"),
  statut: Joi.string().required().label("Statut"),
  nbrDeJoursDeConges: Joi.number()
    .positive()
    .required()
    .label("Nbr de Jours de Congés"),
  commentaire: Joi.string().allow("").label("Commentaire"),
});
