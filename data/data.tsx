import {
  DirectionsBike,
  DirectionsWalk,
  Facebook,
  Instagram,
  LinkedIn,
  Train,
  Twitter,
  YouTube,
  LightMode as LightModeIcon,
  WbTwilight as WbTwilightIcon,
  WbSunny as WbSunnyIcon,
} from "@mui/icons-material";
import { companyName } from "../variables";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import { DayOff, MissionType, User } from "./types";

export const user: User = {
  id: "12345",
  name: "John",
  familyName: "Doe",
  manager: "Jane Smith",
  companyID: "00123",
  email: "johndoe@example.com",
  password: "password123",
  activity: {
    2025: {
      1: {
        1: {
          category: "Inter Contrat",
          location: "Home",
          beforeNoon: "MT*/Teletravail", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
        2: {
          category: "Formation Interne",
          location: "Office",
          beforeNoon: "Training", // beforeNoon data added
          afternoon: "Meeting", // afternoon data added
        },
        3: {
          dayOff: "Sick", // Sick day added
        },
        4: {
          dayOff: "Sick", // Sick day added
        },
        5: {
          dayOff: "Vacation", // Vacation day added
        },
        6: {
          dayOff: "Vacation", // Vacation day added
        },
        7: {
          category: "Mission",
          location: "Home",
          beforeNoon: "Mission", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
        8: {
          category: "Mission",
          location: "Home",
          beforeNoon: "Mission", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
      },
      2: {
        1: {
          category: "Inter Contrat",
          location: "Home",
          beforeNoon: "MT*/Teletravail", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
        2: {
          category: "Formation Interne",
          location: "Office",
          beforeNoon: "Training", // beforeNoon data added
          afternoon: "Meeting", // afternoon data added
        },
        3: {
          dayOff: "Sick", // Sick day added
        },
        4: {
          dayOff: "Sick", // Sick day added
        },
        5: {
          dayOff: "Vacation", // Vacation day added
        },
        6: {
          dayOff: "Vacation", // Vacation day added
        },
        7: {
          category: "Mission",
          location: "Home",
          beforeNoon: "Mission", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
        8: {
          category: "Mission",
          location: "Home",
          beforeNoon: "Mission", // beforeNoon data added
          afternoon: "Mission", // afternoon data added
        },
      },
    },
  },
  notes: "User has completed initial training.",
  daysOff: [
    { title: "sick", date: "2025-01-03", duration: "full" },
    { title: "sick", date: "2025-01-13", duration: "full" },
    { title: "vacation", date: "2025-01-06", duration: "full" },
    { title: "vacation", date: "2025-01-07", duration: "Avant-Midi" },
    { title: "sick", date: "2025-02-03", duration: "full" },
    { title: "sick", date: "2025-02-13", duration: "full" },
    { title: "vacation", date: "2025-02-06", duration: "full" },
    { title: "vacation", date: "2025-02-07", duration: "Après-Midi" },
  ],
};

export const pages: string[] = [
  "Accueil",
  "Catalogue onboarding",
  "Guide de recrutement",
  "E-learning environnement ESN",
  "E-learning IT",
];

export const footerLinks: { linkName: string; linkPath: string }[] = [
  { linkName: `Accueil site ${companyName}`, linkPath: "https://aubay.com/" },
  { linkName: `${companyName} Life`, linkPath: "https://aubay.com/aubay-x-0/" },
  {
    linkName: "Blog",
    linkPath:
      "https://blog.aubay.com/?_gl=1%2A1w9kciu%2A_ga%2AMjA3MTEzODgxMi4xNzM3MjkzMzA2%2A_ga_1TQTDZ194K%2AMTczNzc5OTg2Ni45LjEuMTczNzc5OTkwMS4yNS4wLjA.",
  },
  { linkName: "Investisseurs", linkPath: "https://aubay.com/investisseurs/" },
  {
    linkName: `Déclaration d’accessibilité ${companyName}`,
    linkPath: "https://aubay.com/declaration-accessibilite/",
  },
  { linkName: "Plan du site", linkPath: "https://aubay.com/plan-du-site/" },
];

export const footerSocialLinks: { logo: JSX.Element; linkPath: string }[] = [
  { logo: <Twitter />, linkPath: "https://twitter.com/groupeaubay" },
  { logo: <LinkedIn />, linkPath: "https://www.linkedin.com/company/aubay" },
  {
    logo: <YouTube />,
    linkPath: "https://www.youtube.com/user/aubaytv",
  },
  { logo: <Instagram />, linkPath: "https://www.instagram.com/aubayfrance/" },
  { logo: <Facebook />, linkPath: "https://www.facebook.com/AubayFrance" },
];

export const HomePageCards: {
  id: number;
  title: string;
  link: string;
  description?: string;
}[] = [
  {
    id: 1,
    title: "Activité",
    link: "/activité",
    description: "",
  },
  {
    id: 2,
    title: "Note de frais",
    link: "/note-de-frais",
    description: "",
  },
  {
    id: 3,
    title: "Demandes des congés",
    link: "/demandes-des-congés",
    description: "",
  },
];

export const missionTypes: MissionType[] = [
  {
    client: "BNP PARIBAS RE...",
    project: "BB1-BNPRE-2024-DIGITAL/CSB-PROD...",
    tache: "Prestation",
  },
  {
    client: "AUBAY Interne",
    project: "Hors Projet Aubay BB1",
    tache: "Inter Contrat",
  },
  {
    client: "AUBAY Interne",
    project: "Hors Projet Aubay BB1",
    tache: "Formation Client",
  },
  {
    client: "AUBAY Interne",
    project: "Hors Projet Aubay BB1",
    tache: "Formation Externe",
  },
  {
    client: "AUBAY Interne",
    project: "Hors Projet Aubay BB1",
    tache: "Formation Interne",
  },
  {
    client: "AUBAY Interne",
    project: "Hors Projet Aubay BB1",
    tache: "Animation et Support Formation",
  },
  {
    client: "AUBAY Interne",
    project: "Projet pour les absences BB1",
    tache: "Presentation Client",
  },
  {
    client: "AUBAY Interne",
    project: "Projet pour les absences BB1",
    tache: "Congés payés restants",
  },
  {
    client: "AUBAY Interne",
    project: "Projet pour les absences BB1",
    tache: "RTT Salarié N",
  },
];
export const timeOptions = [
  { label: "Avant-Midi", icon: <LightModeIcon fontSize="medium" /> },
  { label: "Après-Midi", icon: <WbTwilightIcon fontSize="medium" /> },
  { label: "Journée Entière", icon: <WbSunnyIcon fontSize="medium" /> },
] as const;

export const timeColors: Record<string, string> = {
  "Avant-Midi": "#FFD700",
  "Après-Midi": "#FF4500",
  "Journée Entière": "#008000",
};

export const transportationOptions = [
  { label: "Vélo/Bicyclette", icon: <DirectionsBike fontSize="medium" /> },
  { label: "Transport en Commun", icon: <Train fontSize="medium" /> },
  { label: "À pied", icon: <DirectionsWalk fontSize="medium" /> },
  {
    label: "Télétravail",
    icon: <HomeIcon fontSize="medium" />,
  },
  {
    label: "Véhicule motorisé",
    icon: <DirectionsCarIcon fontSize="medium" />,
  },
];

export const daysOff: DayOff[] = [
  { status: "sick", date: "2025-03-07", period: "Avant-Midi", note: "" },
  { status: "vacation", date: "2025-03-11", period: "Après-Midi", note: "" },
  {
    status: "other",
    date: "2025-03-14",
    period: "Journée Entière",
    note: "Valentine’s Day",
  },
];

export const dayOffColors: Record<string, string> = {
  sick: "rgba(255, 0, 0, 0.3)",
  vacation: "rgba(0, 255, 0, 0.3)",
  other: "rgba(128, 128, 128, 0.3)",
};
