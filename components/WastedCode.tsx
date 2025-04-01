// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Switch,
//   Checkbox,
//   useTheme,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Grid,
//   Stack,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";
// import WorkIcon from "@mui/icons-material/Work";
// import WorkOffIcon from "@mui/icons-material/WorkOff";
// import HomeIcon from "@mui/icons-material/Home";
// import CommuteIcon from "@mui/icons-material/Commute";
// import SicknessIcon from "@mui/icons-material/MedicalServices";
// import VacationIcon from "@mui/icons-material/BeachAccess";
// import CloseIcon from "@mui/icons-material/Close";
// import { CustomCheckbox, StyledSwitch } from "../mui/customCss";
// import { activityTableCategories } from "../data/data";
// import { useUserContext } from "../context/userContext";
// import { Brightness5, NightsStay, WbSunny } from "@mui/icons-material";

// const generateDaysInMonth = (month, year) => {
//   const days = new Date(year, month + 1, 0).getDate();
//   return Array.from({ length: days }, (_, i) => i + 1);
// };

// const ActivityTable = () => {
//   const { user } = useUserContext();

//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   const [workData, setWorkData] = useState(user.activity);
//   const [expandedMonth, setExpandedMonth] = useState(currentMonth);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [modifiedDays, setModifiedDays] = useState(new Set());
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [structureBeforeSubmit, setStructureBeforeSubmit] = useState(null);
//   const theme = useTheme();

//   const handleToggleSwitch = (year, month, day, part, category, isChecked) => {
//     const existingData = workData[year]?.[month + 1]?.[day] || {};
//     const modified = !isChecked;

//     if (!isChecked) {
//       const newDayData = { ...existingData };
//       if (category === "MT*/Teletravail") {
//         newDayData.location = null;
//       } else {
//         newDayData[part] = null;
//       }
//       setModifiedDays((prev) =>
//         prev.add(`${year}-${month + 1}-${day}-${part}`)
//       );
//       setWorkData((prev) => ({
//         ...prev,
//         [year]: {
//           ...prev[year],
//           [month + 1]: {
//             ...prev[year][month + 1],
//             [day]: newDayData,
//           },
//         },
//       }));
//     } else if (category !== "MT*/Teletravail") {
//       const newDayData = { ...existingData, [part]: category, location: null };
//       setModifiedDays((prev) =>
//         prev.add(`${year}-${month + 1}-${day}-${part}`)
//       );
//       setWorkData((prev) => ({
//         ...prev,
//         [year]: {
//           ...prev[year],
//           [month + 1]: {
//             ...prev[year][month + 1],
//             [day]: newDayData,
//           },
//         },
//       }));
//     } else {
//       const newDayData = { ...existingData, location: "Home" };
//       setModifiedDays((prev) =>
//         prev.add(`${year}-${month + 1}-${day}-${part}`)
//       );
//       setWorkData((prev) => ({
//         ...prev,
//         [year]: {
//           ...prev[year],
//           [month + 1]: {
//             ...prev[year][month + 1],
//             [day]: newDayData,
//           },
//         },
//       }));
//     }
//   };

//   const handleMonthSelection = (month, isChecked) => {
//     setSelectedMonths((prev) =>
//       isChecked ? [...prev, month] : prev.filter((m) => m !== month)
//     );
//   };

//   const isWeekend = (year, month, day) => {
//     const date = new Date(year, month, day);
//     const dayOfWeek = date.getDay();
//     return dayOfWeek === 0 || dayOfWeek === 6;
//   };

//   const getValidMonths = () => {
//     const months = [];
//     if (currentMonth >= 0) months.push(currentMonth);
//     if (currentMonth - 1 >= 0) months.push(currentMonth - 1);
//     return months;
//   };

//   const countWorkedDays = (month) => {
//     const daysInMonth = generateDaysInMonth(month, currentYear);
//     return daysInMonth.filter((day) => {
//       return workData[currentYear]?.[month + 1]?.[day]?.worked;
//     }).length;
//   };

//   const handleSubmit = () => {
//     const unchangedDays = [];
//     const allDays = generateDaysInMonth(currentMonth, currentYear);

//     allDays.forEach((day) => {
//       const dayKey = `${currentYear}-${currentMonth + 1}-${day}`;
//       if (!modifiedDays.has(dayKey)) {
//         unchangedDays.push(dayKey);
//       }
//     });

//     if (unchangedDays.length > 0) {
//       setStructureBeforeSubmit(workData);
//       setDialogOpen(true);
//     } else {
//       submitData();
//     }
//   };

//   const submitData = () => {
//     console.log("Submitting data:", workData);
//     // Add backend submission logic here
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleSaveAndSubmit = () => {
//     submitData();
//     setDialogOpen(false);
//   };

//   const handleSaveForNextTime = () => {
//     setDialogOpen(false);
//     console.log("Saved changes for next time");
//   };

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom>
//         Activity Tracker
//       </Typography>

//       <Typography variant="h6" gutterBottom>
//         User: {user.name}
//       </Typography>

//       <Box>
//         {getValidMonths().map((month) => {
//           const daysInMonth = generateDaysInMonth(month, currentYear);

//           return (
//             <Accordion
//               key={month}
//               expanded={expandedMonth === month}
//               onChange={() => setExpandedMonth(month)}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls={`month-${month}-content`}
//                 id={`month-${month}-header`}
//               >
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <CustomCheckbox
//                     checked={selectedMonths.includes(month)}
//                     onChange={(e) =>
//                       handleMonthSelection(month, e.target.checked)
//                     }
//                   />
//                   <Typography>
//                     {format(new Date(currentYear, month), "MMMM yyyy", {
//                       locale: fr,
//                     })}
//                     <Typography variant="caption" pl={1}>
//                       ({countWorkedDays(month)} days worked)
//                     </Typography>
//                   </Typography>
//                 </Box>
//               </AccordionSummary>

//               <AccordionDetails>
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell
//                           style={{
//                             position: "sticky",
//                             left: 0,
//                             backgroundColor: "#f9f9f9",
//                             zIndex: 2,
//                           }}
//                         >
//                           Additional Column 1
//                         </TableCell>
//                         <TableCell
//                           style={{
//                             position: "sticky",
//                             left: 0,
//                             backgroundColor: "#f9f9f9",
//                             zIndex: 2,
//                           }}
//                         >
//                           Additional Column 2
//                         </TableCell>
//                         <TableCell
//                           style={{
//                             position: "sticky",
//                             left: 0,
//                             backgroundColor: "#f9f9f9",
//                             zIndex: 2,
//                           }}
//                         >
//                           Category
//                         </TableCell>
//                         {daysInMonth.map((day) => {
//                           const isWeekendDay = isWeekend(
//                             currentYear,
//                             month,
//                             day
//                           );
//                           const dayOff = user.daysOff.includes(
//                             `${currentYear}-${month + 1}-${day}`
//                           );
//                           return (
//                             <TableCell
//                               key={day}
//                               align="center"
//                               colSpan={2}
//                               style={{
//                                 backgroundColor: isWeekendDay
//                                   ? "#f0f0f0"
//                                   : "inherit",
//                               }}
//                             >
//                               <Stack>
//                                 {format(
//                                   new Date(currentYear, month, day),
//                                   "d EEE",
//                                   {
//                                     locale: fr,
//                                   }
//                                 )}
//                                 {!isWeekendDay && !dayOff && (
//                                   <Stack
//                                     flexDirection="row"
//                                     justifyContent="space-around"
//                                     pt="0.5rem"
//                                   >
//                                     <Box fontSize="15px">
//                                       <WbSunny fontSize="inherit" />
//                                     </Box>
//                                     <Box fontSize="15px">
//                                       <Brightness5 fontSize="inherit" />
//                                     </Box>
//                                     <Box fontSize="15px">
//                                       <NightsStay fontSize="inherit" />
//                                     </Box>
//                                   </Stack>
//                                 )}
//                               </Stack>
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {activityTableCategories
//                         .filter((category) => category !== "MT*/Teletravail")
//                         .map((category) => (
//                           <TableRow key={category}>
//                             <TableCell
//                               style={{
//                                 position: "sticky",
//                                 left: 0,
//                                 backgroundColor: "#f9f9f9",
//                                 zIndex: 2,
//                                 fontWeight: "700",
//                               }}
//                             >
//                               Additional Data 1
//                             </TableCell>
//                             <TableCell
//                               style={{
//                                 position: "sticky",
//                                 left: 0,
//                                 backgroundColor: "#f9f9f9",
//                                 zIndex: 2,
//                                 fontWeight: "700",
//                               }}
//                             >
//                               Additional Data 2
//                             </TableCell>
//                             <TableCell
//                               style={{
//                                 position: "sticky",
//                                 left: 0,
//                                 backgroundColor: "#f9f9f9",
//                                 zIndex: 2,
//                                 fontWeight: "700",
//                               }}
//                             >
//                               {category}
//                             </TableCell>
//                             {daysInMonth.map((day) => {
//                               const isWeekendDay = isWeekend(
//                                 currentYear,
//                                 month,
//                                 day
//                               );
//                               const status =
//                                 workData[currentYear]?.[month + 1]?.[day];
//                               const dayOff = user.daysOff.includes(
//                                 `${currentYear}-${month + 1}-${day}`
//                               );

//                               if (isWeekendDay) {
//                                 return (
//                                   <TableCell
//                                     key={`${day}-weekend`}
//                                     align="center"
//                                     colSpan={2}
//                                     style={{
//                                       backgroundColor: "#f0f0f0",
//                                     }}
//                                   >
//                                     {/* Optional: Add a placeholder or icon */}
//                                     <Typography
//                                       variant="caption"
//                                       color="textSecondary"
//                                     >
//                                       Weekend
//                                     </Typography>
//                                   </TableCell>
//                                 );
//                               }

//                               if (dayOff) {
//                                 return (
//                                   <TableCell
//                                     key={`${day}-dayOff`}
//                                     align="center"
//                                     colSpan={2}
//                                   >
//                                     <Box
//                                       display="flex"
//                                       flexDirection="column"
//                                       alignItems="center"
//                                     >
//                                       {status?.dayOff === "Sick" ? (
//                                         <SicknessIcon color="error" />
//                                       ) : (
//                                         <VacationIcon color="success" />
//                                       )}
//                                     </Box>
//                                   </TableCell>
//                                 );
//                               }

//                               return (
//                                 <React.Fragment key={day}>
//                                   <TableCell
//                                     key={`${day}-morning`}
//                                     align="center"
//                                   >
//                                     <Box
//                                       display="flex"
//                                       flexDirection="column"
//                                       alignItems="center"
//                                     >
//                                       <StyledSwitch
//                                         checked={status?.morning === category}
//                                         onChange={(e) =>
//                                           handleToggleSwitch(
//                                             currentYear,
//                                             month,
//                                             day,
//                                             "morning",
//                                             category,
//                                             e.target.checked
//                                           )
//                                         }
//                                         icon={
//                                           <WorkOffIcon
//                                             sx={{
//                                               color:
//                                                 status?.morning === category
//                                                   ? theme.palette.orange.main
//                                                   : theme.palette.grey[500],
//                                             }}
//                                           />
//                                         }
//                                         checkedIcon={
//                                           <WorkIcon
//                                             sx={{
//                                               color:
//                                                 status?.morning === category
//                                                   ? theme.palette.orange.main
//                                                   : theme.palette.grey[500],
//                                             }}
//                                           />
//                                         }
//                                       />
//                                     </Box>
//                                   </TableCell>
//                                   <TableCell
//                                     key={`${day}-afternoon`}
//                                     align="center"
//                                   >
//                                     <Box
//                                       display="flex"
//                                       flexDirection="column"
//                                       alignItems="center"
//                                     >
//                                       <StyledSwitch
//                                         checked={status?.afternoon === category}
//                                         onChange={(e) =>
//                                           handleToggleSwitch(
//                                             currentYear,
//                                             month,
//                                             day,
//                                             "afternoon",
//                                             category,
//                                             e.target.checked
//                                           )
//                                         }
//                                         icon={
//                                           <WorkOffIcon
//                                             sx={{
//                                               color:
//                                                 status?.afternoon === category
//                                                   ? theme.palette.orange.main
//                                                   : theme.palette.grey[500],
//                                             }}
//                                           />
//                                         }
//                                         checkedIcon={
//                                           <WorkIcon
//                                             sx={{
//                                               color:
//                                                 status?.afternoon === category
//                                                   ? theme.palette.orange.main
//                                                   : theme.palette.grey[500],
//                                             }}
//                                           />
//                                         }
//                                       />
//                                     </Box>
//                                   </TableCell>
//                                 </React.Fragment>
//                               );
//                             })}
//                           </TableRow>
//                         ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </AccordionDetails>
//             </Accordion>
//           );
//         })}
//       </Box>

//       <Box mt={2} display="flex" gap={2}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>
//           <Box display="flex" justifyContent="flex-end">
//             <IconButton onClick={handleDialogClose} size="small">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Typography>
//             Would you like to save only the modifications for next time, or save
//             & submit everything now?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleSaveForNextTime}>
//             Save Modifications
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleSaveAndSubmit}
//           >
//             I'm confident, Submit it
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ActivityTable;

///////////////////////////////////////////////

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import {
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   isWeekend,
//   addDays,
//   isSameDay,
//   differenceInDays,
// } from "date-fns";
// import { fr } from "date-fns/locale/fr";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Grid from "@mui/material/Grid2";
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Tooltip,
//   IconButton,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Divider,
//   Stack,
//   Slider,
//   TextField,
// } from "@mui/material";
// import {
//   Delete,
//   ExpandMore,
//   Sick as SickIcon,
//   BeachAccess as VacationIcon,
//   Save,
// } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import {
//   missionTypes,
//   timeOptions,
//   timeColors,
//   transportationOptions,
// } from "../../data/data";
// import ClampedText from "../../helpers/ClampedText";

// const locales = { fr: fr };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// const ActivityCalendar = ({ utilisateur }) => {
//   const [open, setOpen] = useState(false);
//   const [dateDebut, setDateDebut] = useState<Date | null>(null);
//   const [dateFin, setDateFin] = useState<Date | null>(null);
//   const [etapeActive, setEtapeActive] = useState(0);
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
//     "Type de mission": true,
//     Transport: false,
//     "Créneaux horaires": false,
//     Durée: false,
//   });

//   const [editionEvenement, setEditionEvenement] = useState<any | null>(null);

//   const convertirActivitesInitiales = () => {
//     const events: any[] = [];
//     Object.entries(utilisateur.activity).forEach(([annee, mois]) => {
//       Object.entries(mois as object).forEach(([moisStr, jours]) => {
//         Object.entries(jours as object).forEach(([jour, donnees]) => {
//           const date = new Date(
//             Number(annee),
//             Number(moisStr) - 1,
//             Number(jour)
//           );
//           if (donnees.dayOff) {
//             events.push({
//               title: donnees.dayOff === "Sick" ? "Maladie" : "Vacances",
//               start: date,
//               end: date,
//               type: donnees.dayOff.toLowerCase(),
//               duree: donnees.duree || "full",
//               id: `${date.getTime()}-${donnees.dayOff}`,
//             });
//           } else {
//             // Existing mission conversion logic
//           }
//         });
//       });
//     });
//     return events;
//   };

//   const [evenements, setEvenements] = useState<any[]>(
//     convertirActivitesInitiales
//   );
//   const [formState, setFormState] = useState({
//     mission: null,
//     transport: null,
//     creneaux: [],
//     duree: "full",
//   });
//   useEffect(() => {
//     const adjustWidths = () => {
//       const dateCells = document.querySelectorAll(".rbc-date-cell");
//       const rowSegments = document.querySelectorAll(".rbc-row-segment");

//       if (!dateCells.length || !rowSegments.length) return;

//       setTimeout(() => {
//         rowSegments.forEach((segment, index) => {
//           const correspondingDateCell = dateCells[index];

//           if (correspondingDateCell) {
//             segment.style.flexBasis = `${correspondingDateCell.offsetWidth}px`;
//             segment.style.maxWidth = `${correspondingDateCell.offsetWidth}px`;
//           }
//         });
//       }, 0);
//     };

//     adjustWidths(); // Run on mount
//     window.addEventListener("resize", adjustWidths); // Adjust on resize

//     return () => {
//       window.removeEventListener("resize", adjustWidths);
//     };
//   }, [evenements, editionEvenement]);

//   const handleChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       setExpanded({ ...expanded, [panel]: isExpanded });
//     };

//   const handleSubmit = () => {
//     console.log("Submitting all events:", evenements);
//     // Add your submission logic here
//   };

//   const handleSelectionCreneau = (slotInfo: { start: Date; end: Date }) => {
//     const dates = getDatesValides(slotInfo.start, slotInfo.end);
//     const hasConflict = dates.some((date) =>
//       evenements.some(
//         (ev) =>
//           isSameDay(ev.start, date) &&
//           (ev.duree === "full" || ev.type !== "mission")
//       )
//     );
//     if (hasConflict) {
//       alert("Un événement existe déjà sur ces dates");
//       return;
//     }
//     setDateDebut(slotInfo.start);
//     setDateFin(slotInfo.end);
//     setOpen(true);
//     setEditionEvenement(null);
//   };

//   const handleEventResize = (event: any, start: Date, end: Date) => {
//     const newEvents = evenements.map((ev) =>
//       ev.id === event.id ? { ...ev, end, start } : ev
//     );
//     setEvenements(newEvents);
//   };

//   const handleEventDrop = ({ event, start, end }: any) => {
//     const diffDays = differenceInDays(end, event.end);
//     const newEvents = evenements.map((ev) =>
//       ev.id === event.id ? { ...ev, start, end } : ev
//     );
//     setEvenements(newEvents);
//   };

//   const gererSoumission = () => {
//     const dates = getDatesValides(dateDebut!, dateFin!);
//     const newEvents = dates.flatMap((date) => {
//       return formState.creneaux.map((creneau) => ({
//         id: `${date.getTime()}-${creneau}`,
//         title: formState.mission?.tache,
//         transport: formState.transport,
//         start: creneau === "Avant-Midi" ? date : addDays(date, 0.5),
//         end: creneau === "Avant-Midi" ? addDays(date, 0.5) : addDays(date, 1),
//         type: "mission",
//         creneau,
//         color: timeColors[creneau],
//       }));
//     });

//     setEvenements((prev) => [
//       ...prev.filter((ev) => !dates.some((d) => isSameDay(d, ev.start))),
//       ...newEvents,
//     ]);
//     closeDialog();
//   };

//   const getDatesValides = (start: Date, end: Date) => {
//     const dates = [];
//     let current = new Date(start);
//     while (current <= end) {
//       if (!isWeekend(current)) dates.push(new Date(current));
//       current = addDays(current, 1);
//     }
//     return dates;
//   };

//   const EventComponent = ({ event }: any) => {
//     const isHalfDay = event.duree === "half";
//     return (
//       <Tooltip
//         title={
//           <Box p={1}>
//             <Typography variant="subtitle2">{event.title}</Typography>
//             {event.type === "mission" ? (
//               <>
//                 <Divider />
//                 <Typography variant="caption">
//                   Transport: {event.transport?.label}
//                 </Typography>
//                 <br />
//                 <Typography variant="caption">
//                   Créneau: {event.creneau}
//                 </Typography>
//               </>
//             ) : (
//               <Typography variant="caption">
//                 {isHalfDay ? "Demi-journée" : "Journée entière"}
//               </Typography>
//             )}
//           </Box>
//         }
//       >
//         <Box
//           sx={{
//             backgroundColor: event.color,
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             opacity: isHalfDay ? 0.8 : 1,
//           }}
//         >
//           {event.type === "sick" && <SickIcon sx={{ color: "red" }} />}
//           {event.type === "vacation" && (
//             <VacationIcon sx={{ color: "green" }} />
//           )}
//           {isHalfDay && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%",
//                 background:
//                   "linear-gradient(45deg, transparent 48%, white 52%)",
//               }}
//             />
//           )}
//         </Box>
//       </Tooltip>
//     );
//   };

//   const closeDialog = () => {
//     setOpen(false);
//     setEtapeActive(0);
//     setEditionEvenement(null);
//     setFormState({
//       mission: null,
//       transport: null,
//       creneaux: [],
//       duree: "full",
//     });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
//       <Grid container sx={{ height: "100vh", p: 2 }} spacing={2}>
//         <Grid size={12}>
//           <Button
//             variant="contained"
//             startIcon={<Save />}
//             onClick={handleSubmit}
//             sx={{ mb: 2 }}
//           >
//             Soumettre les activités
//           </Button>
//         </Grid>
//         <Grid size={12}>
//           <Calendar
//             localizer={localizer}
//             culture="fr"
//             events={evenements}
//             startAccessor="start"
//             endAccessor="end"
//             views={["month", "week", "agenda"]}
//             selectable
//             resizable
//             onSelectSlot={handleSelectionCreneau}
//             onEventResize={handleEventResize}
//             onEventDrop={handleEventDrop}
//             components={{ event: EventComponent }}
//             dayPropGetter={(date) => {
//               if (isWeekend(date)) {
//                 return {
//                   style: {
//                     backgroundColor: "#fafafa",
//                     flex: "0 0 60px",
//                   },
//                 };
//               }
//               return {};
//             }}
//             headerPropGetter={(date) => {
//               if (isWeekend(date)) {
//                 return {
//                   style: {
//                     flex: "0 0 60px",
//                   },
//                 };
//               }
//               return {};
//             }}
//             messages={{
//               today: "Aujourd'hui",
//               previous: "Précédent",
//               next: "Suivant",
//               month: "Mois",
//               week: "Semaine",
//             }}
//             style={{ height: "80vh" }}
//           />
//         </Grid>

//         <Dialog open={open} onClose={closeDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             {editionEvenement ? "Modifier l'événement" : "Nouvel événement"}
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Accordion
//                 defaultExpanded
//                 sx={{ width: "100%" }}
//                 expanded={expanded["Type de mission"]}
//                 onChange={handleChange("Type de mission")}
//               >
//                 <AccordionSummary expandIcon={<ExpandMore />}>
//                   <Typography>Type de mission</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Grid container spacing={2}>
//                     {missionTypes.map((mission) => (
//                       <Grid key={mission.tache} size={{ xs: 12, sm: 6, md: 4 }}>
//                         <Card
//                           sx={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "left",
//                             height: "100%",
//                             border:
//                               formState.mission?.tache === mission.tache
//                                 ? 2
//                                 : 1,
//                             borderColor:
//                               formState.mission?.tache === mission.tache
//                                 ? "primary.main"
//                                 : "divider",
//                           }}
//                           onClick={() => {
//                             setFormState({ ...formState, mission });
//                             setEtapeActive(1);
//                           }}
//                         >
//                           <CardContent>
//                             <ClampedText text={mission.project} lines={1} />
//                             <ClampedText text={mission.client} lines={1} />
//                             <ClampedText text={mission.tache} lines={1} />
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion
//                 expanded={expanded["Transport"]}
//                 onChange={handleChange("Transport")}
//                 sx={{ width: "100%" }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMore />}>
//                   <Typography>Transport</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Grid container spacing={2}>
//                     {transportationOptions.map((transport) => (
//                       <Grid
//                         key={transport.value}
//                         size={{ xs: 12, sm: 4, md: 3 }}
//                       >
//                         <Card
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: "100%",
//                             cursor: "pointer",
//                             border:
//                               formState.transport?.value === transport.value
//                                 ? 2
//                                 : 1,
//                             borderColor:
//                               formState.transport?.value === transport.value
//                                 ? "primary.main"
//                                 : "divider",
//                           }}
//                           onClick={() => {
//                             setFormState({ ...formState, transport });
//                             setEtapeActive(2);
//                           }}
//                         >
//                           <CardContent sx={{ textAlign: "center" }}>
//                             {transport.icon}
//                             <Typography variant="body2">
//                               {transport.label}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion
//                 expanded={expanded["Créneaux horaires"]}
//                 onChange={handleChange("Créneaux horaires")}
//                 sx={{ width: "100%" }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMore />}>
//                   <Typography>Créneaux horaires</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Grid container spacing={2}>
//                     {timeOptions.map((time) => (
//                       <Grid key={time} size={{ xs: 12, sm: 4 }}>
//                         <Card
//                           sx={{
//                             cursor: "pointer",
//                             border: formState.creneaux.includes(time) ? 2 : 1,
//                             borderColor: timeColors[time],
//                             backgroundColor: `${timeColors[time]}30`,
//                           }}
//                           onClick={() => {
//                             const creneaux =
//                               time === "Journée Entière"
//                                 ? [time]
//                                 : formState.creneaux.includes(time)
//                                 ? formState.creneaux.filter((t) => t !== time)
//                                 : [...formState.creneaux, time];
//                             setFormState({ ...formState, creneaux });
//                           }}
//                         >
//                           <CardContent sx={{ textAlign: "center" }}>
//                             <Typography variant="body2">{time}</Typography>
//                             <Typography variant="caption">
//                               {time === "Avant-Midi"
//                                 ? "9h-12h"
//                                 : time === "Après-Midi"
//                                 ? "13h-18h"
//                                 : "9h-18h"}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion
//                 expanded={expanded["Durée"]}
//                 onChange={handleChange("Durée")}
//                 sx={{ width: "100%" }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMore />}>
//                   <Typography>Durée d'extension</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>info</AccordionDetails>
//               </Accordion>

//               <Grid size={12}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={gererSoumission}
//                   disabled={
//                     !formState.mission ||
//                     !formState.transport ||
//                     formState.creneaux.length === 0
//                   }
//                 >
//                   {editionEvenement ? "Enregistrer" : "Créer"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Grid>
//     </LocalizationProvider>
//   );
// };

// export default ActivityCalendar;

///////////////////////////////

// import React, { useCallback, useMemo, useState } from "react";
// import { momentLocalizer, ToolbarProps } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//   Box,
//   Typography,
//   ToggleButton,
//   Tooltip,
//   Chip,
//   Stack,
//   ToggleButtonGroup,
//   useTheme,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import { useUserContext } from "../../context/userContext";
// import { timeColors } from "../../data/data";
// import {
//   CalendarEvent,
//   DayOff,
//   MissionType,
//   NewEventState,
// } from "../../data/types";
// import {
//   ArrowBackIosNew as ArrowBackIosNewIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
//   Today as TodayIcon,
//   MedicalServices as MedicalServicesIcon,
//   BeachAccess as BeachAccessIcon,
// } from "@mui/icons-material";
// import CalendarDialog from "./CalendarDialog";
// import { StyledCalendar, StyledDataCell } from "./style";
// import { EventTooltip } from "./EventTooltip";
// import StatisticSection from "./StatisticSection";
// import { throttle } from "lodash";

// // Helper functions
// const getWorkingDaysCount = (date: Date, daysOff: Array<DayOff>) => {
//   const start = moment(date).startOf("month");
//   const end = moment(date).endOf("month");
//   let count = 0;

//   while (start.isSameOrBefore(end)) {
//     if (start.isoWeekday() <= 5) {
//       const dayOff = daysOff.find((d) => d.date === start.format("YYYY-MM-DD"));
//       if (!dayOff) {
//         count += 1;
//       } else if (dayOff.duration !== "full") {
//         count += 0.5;
//       }
//     }
//     start.add(1, "day");
//   }
//   return count;
// };

// const CustomEventComponent = React.memo(
//   ({ event }: { event: CalendarEvent }) => {
//     const isBeforeNoon = event.type === "Avant-Midi";
//     const isAfterNoon = event.type === "Après-Midi";

//     const getTitle = useCallback(() => {
//       if (typeof event.title === "string") {
//         return event.title.split(" - ")[2];
//       }
//       return "No Title";
//     }, [event.title]);

//     return (
//       <Tooltip title={<EventTooltip event={event} />} arrow placement="top">
//         <Stack
//           sx={{
//             position: "relative",
//             height: "100%",
//             ...(isBeforeNoon && { height: "50%" }),
//             ...(isAfterNoon && { height: "50%", top: "50%" }),
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",
//               bgcolor: event.color,
//               p: "4px",
//               borderRadius: 1,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "white",
//                 fontSize: "0.8rem",
//                 fontWeight: 500,
//               }}
//             >
//               {getTitle()}
//             </Typography>
//           </Box>
//         </Stack>
//       </Tooltip>
//     );
//   }
// );

// // Main Component
// const ActivityCalendar = () => {
//   const { user } = useUserContext();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const localizer = momentLocalizer(moment);
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
//   const [currentViewDate, setCurrentViewDate] = useState(new Date());
//   const [newEvent, setNewEvent] = useState<NewEventState>({
//     id: "",
//     title: "",
//     date: "",
//     timeOption: "Journée Entière",
//     missionType: { client: "", project: "", tache: "" },
//     transportation: "",
//     notes: "",
//   });

//   const missionTypeValue = useMemo(
//     () =>
//       `${newEvent.missionType.client}|${newEvent.missionType.project}|${newEvent.missionType.tache}`,
//     [newEvent.missionType]
//   );

//   // Memoized helpers
//   const isDayOff = useCallback(
//     (date: Date) => {
//       const formattedDate = moment(date).format("YYYY-MM-DD");
//       return user.daysOff.some(
//         (day: { date: string }) => day.date === formattedDate
//       );
//     },
//     [user.daysOff]
//   );

//   const isLastDayOfMonth = useCallback(
//     (date: Date) => moment(date).endOf("month").isSame(date, "day"),
//     []
//   );

//   const handleChange = useCallback(
//     <K extends keyof NewEventState>(
//       field: K,
//       value: NewEventState[K] | Partial<MissionType>
//     ) => {
//       setNewEvent((prev) => ({
//         ...prev,
//         [field]:
//           field === "missionType" && typeof value === "object" && value !== null
//             ? { ...prev.missionType, ...value }
//             : value,
//       }));
//     },
//     []
//   );

//   // Event handlers
//   const handleOpen = useCallback(
//     (dateOrEvent: Date | CalendarEvent) => {
//       const isEvent = "title" in dateOrEvent;
//       const targetDate = new Date(isEvent ? dateOrEvent.start : dateOrEvent);
//       const formattedDate = moment(targetDate).format("YYYY-MM-DD");

//       const dayOff = user.daysOff.find((d) => d.date === formattedDate);
//       const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;
//       const isCurrentMonth = moment(targetDate).isSame(
//         currentViewDate,
//         "month"
//       );

//       if (!isCurrentMonth) return;
//       if (dayOff?.duration === "full" || isWeekend) return;

//       setNewEvent((prev) => ({
//         ...prev,
//         id: "",
//         title: "",
//         date: formattedDate,
//         timeOption: dayOff?.duration
//           ? dayOff.duration === "Avant-Midi"
//             ? "Après-Midi"
//             : "Avant-Midi"
//           : "",
//         transportation: "",
//         notes: "",
//       }));

//       if (!isEvent) {
//         const isCurrentMonthDay = targetDate.getMonth() === moment().month();
//         if (isCurrentMonthDay && !isWeekend) {
//           if (dayOff?.duration) {
//             setNewEvent((prev) => ({
//               ...prev,
//               timeOption:
//                 dayOff.duration === "Avant-Midi" ? "Après-Midi" : "Avant-Midi",
//             }));
//           }
//           setCurrentDate(targetDate);
//           setOpen(true);
//         }
//       } else {
//         const titleParts = dateOrEvent.title.split(" - ");
//         setNewEvent({
//           ...dateOrEvent,
//           title: String(dateOrEvent.title),
//           date: moment(dateOrEvent.start).format("YYYY-MM-DD"),
//           missionType: {
//             client: titleParts[0],
//             project: titleParts[1],
//             tache: titleParts[2],
//           },
//           timeOption: dateOrEvent.type,
//           notes: dateOrEvent.notes || "",
//           transportation: dateOrEvent.transportation,
//         });
//         setOpen(true);
//       }
//     },
//     [currentViewDate, user.daysOff]
//   );

//   const handleClose = () => {
//     setOpen(false);
//     setNewEvent({
//       id: "",
//       title: "",
//       date: "",
//       timeOption: "Journée Entière",
//       missionType: { client: "", project: "", tache: "" },
//       transportation: "",
//       notes: "",
//     });
//   };

//   const handleDelete = () => {
//     if (newEvent.id) {
//       setEvents((prev) => prev.filter((event) => event.id !== newEvent.id));
//       handleClose();
//     }
//   };

//   const handleSubmit = (isNext: boolean) => {
//     // Basic validation
//     if (
//       !newEvent.missionType.client ||
//       !newEvent.missionType.project ||
//       !newEvent.missionType.tache ||
//       !newEvent.timeOption ||
//       !newEvent.transportation
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }

//     // Get day off information
//     const dayOff = user.daysOff.find((d) => d.date === newEvent.date);
//     const isWeekend = moment(newEvent.date).isoWeekday() > 5;

//     // Validate against time offs
//     if (dayOff) {
//       if (dayOff.duration === "full") {
//         alert("Cannot add event on a full day off");
//         return;
//       }

//       if (newEvent.timeOption === dayOff.duration) {
//         alert(`Cannot add event during ${dayOff.duration} time off`);
//         return;
//       }

//       if (newEvent.timeOption === "Journée Entière") {
//         alert("Cannot add full-day event on a day with time off");
//         return;
//       }
//     }

//     // Weekend validation
//     if (isWeekend && newEvent.timeOption === "Journée Entière") {
//       alert("Cannot add full-day events on weekends");
//       return;
//     }

//     // Existing events validation
//     const eventsOnDate = events.filter(
//       (event) => moment(event.start).format("YYYY-MM-DD") === newEvent.date
//     );

//     // Remove duplicate validation block
//     if (newEvent.timeOption === "Journée Entière") {
//       if (eventsOnDate.length > 0 && !newEvent.id) {
//         alert("Cannot add full-day event with existing events");
//         return;
//       }
//     } else {
//       const hasFullDay = eventsOnDate.some(
//         (event) => event.type === "Journée Entière"
//       );
//       const sameTypeCount = eventsOnDate.filter(
//         (event) => event.type === newEvent.timeOption
//       ).length;

//       if (hasFullDay && !newEvent.id) {
//         alert("Cannot add half-day event with existing full-day event");
//         return;
//       }

//       if (sameTypeCount >= 1 && !newEvent.id) {
//         alert(`Cannot add multiple ${newEvent.timeOption} events on same day`);
//         return;
//       }
//     }

//     // Remove duplicate eventsOnDate declaration
//     const start = moment(newEvent.date)
//       .set({
//         hour:
//           newEvent.timeOption === "Avant-Midi"
//             ? 9
//             : newEvent.timeOption === "Après-Midi"
//             ? 12
//             : 9,
//         minute: 0,
//       })
//       .toDate();

//     const end = moment(newEvent.date)
//       .set({
//         hour:
//           newEvent.timeOption === "Avant-Midi"
//             ? 12
//             : newEvent.timeOption === "Après-Midi"
//             ? 18
//             : 18,
//         minute: 0,
//       })
//       .toDate();

//     const updatedEvent: CalendarEvent = {
//       id: newEvent.id || Date.now(),
//       title: `${newEvent.missionType.client} - ${newEvent.missionType.project} - ${newEvent.missionType.tache}`,
//       start,
//       end,
//       type: newEvent.timeOption,
//       transportation: newEvent.transportation,
//       notes: newEvent.notes,
//       color: timeColors[newEvent.timeOption],
//     };

//     setEvents((prev) =>
//       newEvent.id
//         ? prev.map((event) => (event.id === newEvent.id ? updatedEvent : event))
//         : [...prev, updatedEvent]
//     );

//     if (newEvent.id) {
//       handleClose();
//     } else if (isNext && !isLastDayOfMonth(currentDate!)) {
//       let nextDate = moment(currentDate).add(1, "day");
//       while (
//         nextDate.month() === moment().month() &&
//         (isDayOff(nextDate.toDate()) ||
//           nextDate.day() === 0 ||
//           nextDate.day() === 6)
//       ) {
//         nextDate.add(1, "day");
//       }

//       if (nextDate.month() === moment().month()) {
//         setCurrentDate(nextDate.toDate());
//         setNewEvent((prev) => ({
//           ...prev,
//           id: "",
//           title: "",
//           date: nextDate.format("YYYY-MM-DD"),
//           timeOption: "",
//           transportation: "",
//           notes: "",
//         }));
//       } else {
//         handleClose();
//       }
//     } else {
//       handleClose();
//     }
//   };

//   // Optimized date cell wrapper
//   const DateCellWrapper = useCallback(
//     ({ children, value }: { children: React.ReactNode; value: Date }) => {
//       const formattedDate = moment(value).format("YYYY-MM-DD");
//       const dayOff = user.daysOff.find((d: DayOff) => d.date === formattedDate);
//       const isWeekend = value.getDay() === 0 || value.getDay() === 6;
//       const isFullDayOff = dayOff?.duration === "full";
//       const isCurrentMonth = moment(value).isSame(currentViewDate, "month");

//       // In DateCellWrapper component
//       const handleCellClick = throttle(
//         (e: React.MouseEvent<HTMLDivElement>) => {
//           if (!isCurrentMonth || isFullDayOff || isWeekend) return;

//           const rect = e.currentTarget.getBoundingClientRect();
//           const clickY = e.clientY - rect.top;
//           const clickedHalf =
//             clickY < rect.height / 2 ? "Avant-Midi" : "Après-Midi";

//           if (dayOff?.duration === clickedHalf) {
//             alert(`Cannot add event during ${dayOff.duration} time off`);
//             return;
//           }

//           handleOpen({
//             start: value,
//             end: value,
//             type: clickedHalf,
//           } as CalendarEvent);
//         },
//         1000
//       );

//       return (
//         <Box
//           sx={StyledDataCell(isCurrentMonth, isFullDayOff, isWeekend)}
//           onClick={handleCellClick}
//         >
//           {/* Half-day background overlay */}
//           {dayOff?.duration !== "full" && dayOff?.duration && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 left: 0,
//                 right: 0,
//                 height: "50%",
//                 backgroundColor:
//                   dayOff.title === "sick"
//                     ? theme.palette.error.light + "33"
//                     : theme.palette.success.light + "33",
//                 zIndex: 0,
//                 top: dayOff.duration === "Après-Midi" ? "50%" : 0,
//                 pointerEvents: "none",
//               }}
//             />
//           )}

//           {/* Full-day background */}
//           {dayOff?.duration === "full" && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor:
//                   dayOff.title === "sick"
//                     ? theme.palette.error.light + "33"
//                     : theme.palette.success.light + "33",
//                 zIndex: 0,
//                 pointerEvents: "none",
//               }}
//             />
//           )}

//           {/* Icons with click protection */}
//           {dayOff?.title === "sick" && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 top:
//                   dayOff.duration === "full"
//                     ? "50%"
//                     : dayOff.duration === "Avant-Midi"
//                     ? "25%"
//                     : "75%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: 1,
//                 pointerEvents: "none", // Capture events
//               }}
//               onClick={(e) => e.stopPropagation()} // Prevent cell click
//             >
//               <MedicalServicesIcon
//                 fontSize={
//                   isMobile || dayOff?.duration !== "full" ? "small" : "medium"
//                 }
//                 sx={{
//                   color: "error.main",
//                 }}
//               />
//             </Box>
//           )}

//           {dayOff?.title === "vacation" && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 top:
//                   dayOff.duration === "full"
//                     ? "50%"
//                     : dayOff.duration === "Avant-Midi"
//                     ? "25%"
//                     : "75%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: 1,
//                 pointerEvents: "none",
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <BeachAccessIcon
//                 fontSize={
//                   isMobile || dayOff?.duration !== "full" ? "small" : "medium"
//                 }
//                 sx={{
//                   color: "success.main",
//                 }}
//               />
//             </Box>
//           )}

//           {children}
//         </Box>
//       );
//     },
//     [user.daysOff, currentViewDate, handleOpen, isMobile, theme]
//   );

//   // Statistics calculations
//   const currentMonthEvents = useMemo(() => {
//     const monthStart = moment(currentViewDate).startOf("month");
//     const monthEnd = moment(currentViewDate).endOf("month");
//     return events.filter((event) =>
//       moment(event.start).isBetween(monthStart, monthEnd, undefined, "[]")
//     );
//   }, [events, currentViewDate]);

//   const stats = useMemo(() => {
//     // Calculate worked time considering half-days
//     const workedTime = currentMonthEvents.reduce((acc, event) => {
//       return acc + (event.type === "Journée Entière" ? 1 : 0.5);
//     }, 0);

//     // Calculate days off with half-day support (assuming daysOff now have duration)
//     const { sickDays, vacationDays } = user.daysOff.reduce(
//       (acc, day) => {
//         if (moment(day.date).isSame(currentViewDate, "month")) {
//           const duration = day.duration === "full" ? 1 : 0.5;
//           if (day.title === "sick") acc.sickDays += duration;
//           if (day.title === "vacation") acc.vacationDays += duration;
//         }
//         return acc;
//       },
//       { sickDays: 0, vacationDays: 0 }
//     );

//     const totalWorkingDays = getWorkingDaysCount(currentViewDate, user.daysOff);
//     const remainingDays = totalWorkingDays - workedTime;

//     return {
//       workedTime,
//       sickDays,
//       vacationDays,
//       totalWorkingDays,
//       remainingDays,
//       progress: Math.round((workedTime / totalWorkingDays) * 100) || 0,
//     };
//   }, [currentMonthEvents, user.daysOff, currentViewDate]);

//   // Calendar configuration
//   const calendarComponents = useMemo(
//     () => ({
//       event: CustomEventComponent,
//       dateCellWrapper: DateCellWrapper,
//       toolbar: CustomToolbar,
//     }),
//     [DateCellWrapper]
//   );

//   return (
//     <Box sx={{ p: { sm: 4 }, width: "100%" }}>
//       {/* Statistics Section */}
//       <StatisticSection stats={stats} currentViewDate={currentViewDate} />

//       {/* Calendar Section */}
//       <StyledCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         views={["month", "week"]}
//         defaultView="month"
//         components={calendarComponents}
//         onSelectEvent={handleOpen}
//         onSelectSlot={({ start }) => handleOpen(start)}
//         selectable
//         date={currentViewDate}
//         onNavigate={(newDate: Date) => setCurrentViewDate(newDate)}
//       />

//       {/* Calendar Dialog */}
//       <CalendarDialog
//         open={open}
//         handleClose={handleClose}
//         newEvent={newEvent}
//         missionTypeValue={missionTypeValue}
//         currentDate={currentDate}
//         handleChange={handleChange}
//         user={user}
//         timeColors={timeColors}
//         handleDelete={handleDelete}
//         handleSubmit={handleSubmit}
//         isLastDayOfMonth={isLastDayOfMonth}
//       />
//     </Box>
//   );
// };
// export default ActivityCalendar;

///////////////////////////////////////////////////////

// motion:

// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { Box } from "@mui/material";

// const ScrollAppearSection = ({ children }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => {
//       if (ref.current) observer.unobserve(ref.current);
//     };
//   }, []);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       style={{ margin: "100px 0", textAlign: "center", height: "60vh" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const Notes = () => {
//   return (
//     <Box style={{ padding: "20px" }}>
//       <ScrollAppearSection>
//         <h1>✨ Welcome to My Page</h1>
//       </ScrollAppearSection>

//       <ScrollAppearSection>
//         <h2>📌 Section 1</h2>
//         <p>This content appears when scrolled into view.</p>
//       </ScrollAppearSection>

//       <ScrollAppearSection>
//         <h2>🚀 Section 2</h2>
//         <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//           {[1, 2, 3].map((num) => (
//             <motion.div
//               key={num}
//               style={{
//                 background: "lightblue",
//                 padding: "20px",
//                 borderRadius: "10px",
//                 width: "150px",
//               }}
//             >
//               Card {num}
//             </motion.div>
//           ))}
//         </div>
//       </ScrollAppearSection>

//       <ScrollAppearSection>
//         <h2>🎉 Section 3</h2>
//         <p>More content appearing as you scroll!</p>
//       </ScrollAppearSection>
//     </Box>
//   );
// };
// export default Notes;
