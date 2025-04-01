// import {
//   Box,
//   Button,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   FormLabel,
//   IconButton,
//   Paper,
//   Radio,
//   RadioGroup,
//   Stack,
//   TextField,
//   ToggleButton,
//   ToggleButtonGroup,
//   Tooltip,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import {
//   missionTypes,
//   timeOptions,
//   transportationOptions,
// } from "../../data/data";
// import { DayOff } from "../../data/types";
// import { Close as CloseIcon, Block as BlockIcon } from "@mui/icons-material";
// import moment from "moment";

// const CalendarDialog = ({
//   open,
//   handleClose,
//   newEvent,
//   missionTypeValue,
//   currentDate,
//   handleChange,
//   user,
//   timeColors,
//   handleDelete,
//   handleSubmit,
//   isLastDayOfMonth,
// }) => {
//   const theme = useTheme();

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle
//         sx={{
//           bgcolor: "primary.main",
//           color: "primary.contrastText",
//           position: "relative",
//           mb: 3,
//         }}
//       >
//         <Stack
//           flexDirection="row"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ pb: "1rem" }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: "600" }}>
//             {newEvent.id ? "Edit Event" : "Add Event"}
//           </Typography>
//           <Box>
//             <IconButton aria-label="delete" size="small" onClick={handleClose}>
//               <CloseIcon fontSize="inherit" />
//             </IconButton>
//           </Box>
//         </Stack>
//         <Stack alignItems="center">
//           <Chip
//             label={moment(newEvent.date).format("ddd, MMM D, YYYY")}
//             color="primary"
//             sx={{
//               fontSize: "1.2rem",
//               px: 2,
//               bgcolor: theme.palette.orange.light,
//               color: "#fff",
//             }}
//           />
//         </Stack>
//       </DialogTitle>

//       <DialogContent sx={{ py: 4 }}>
//         <Grid container spacing={2}>
//           <Grid size={12}>
//             <FormControl fullWidth component="fieldset">
//               <FormLabel component="legend" sx={{ mb: 2 }}>
//                 Mission Type
//               </FormLabel>
//               <RadioGroup value={missionTypeValue} sx={{ width: "100%" }}>
//                 <Grid container spacing={2}>
//                   {missionTypes.map((type) => {
//                     const isSelected =
//                       newEvent.missionType.client === type.client &&
//                       newEvent.missionType.project === type.project &&
//                       newEvent.missionType.tache === type.tache;

//                     return (
//                       <Grid size={{ xs: 12, sm: 6, md: 4 }} key={type.tache}>
//                         <Paper
//                           elevation={3}
//                           onClick={() => handleChange("missionType", type)}
//                           sx={{
//                             p: 2,
//                             cursor: "pointer",
//                             border: 2,
//                             borderColor: isSelected ? "#fff" : "transparent",
//                             color: isSelected ? "#fff" : "inherit",
//                             backgroundColor: isSelected
//                               ? theme.palette.orange.main
//                               : "background.paper",
//                             "&:hover": {
//                               borderColor: "white",
//                               color: "white",
//                               backgroundColor: theme.palette.orange.light,
//                               transform: "scale(1.1)",
//                             },
//                             transition: "all 0.2s ease",
//                             height: "100%",
//                             display: "flex",
//                             alignItems: "center",
//                             boxSizing: "border-box",
//                           }}
//                         >
//                           <Stack
//                             direction="row"
//                             alignItems="center"
//                             spacing={1.5}
//                             sx={{ width: "100%" }}
//                           >
//                             <Radio
//                               checked={
//                                 newEvent.missionType.tache === type.tache
//                               }
//                               value={type.tache}
//                               sx={{ display: "none" }}
//                             />
//                             <Stack sx={{ overflow: "hidden" }}>
//                               <Typography
//                                 variant="subtitle2"
//                                 sx={{ fontWeight: "700" }}
//                               >
//                                 {type.client}
//                               </Typography>
//                               <Typography
//                                 variant="caption"
//                                 sx={{ fontSize: "0.75rem" }}
//                               >
//                                 {type.project}
//                               </Typography>
//                               <Typography
//                                 variant="body2"
//                                 sx={{
//                                   fontWeight: 600,
//                                   lineHeight: 1.3,
//                                   mt: 0.5,
//                                 }}
//                               >
//                                 {type.tache}
//                               </Typography>
//                             </Stack>
//                           </Stack>
//                         </Paper>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//               </RadioGroup>
//             </FormControl>
//           </Grid>

//           <Grid size={12}>
//             <FormControl fullWidth>
//               <FormLabel>Transportation</FormLabel>
//               <ToggleButtonGroup
//                 value={newEvent.transportation}
//                 exclusive
//                 onChange={(e, value) => handleChange("transportation", value)}
//                 fullWidth
//                 sx={{ gap: 1, mt: 1 }}
//               >
//                 <Grid container spacing={1}>
//                   {transportationOptions.map((option) => (
//                     <Grid size={6} key={option.value}>
//                       <ToggleButton
//                         value={option.value}
//                         sx={{
//                           width: "100%",
//                           height: 80,
//                           flexDirection: "column",
//                           border: "1px solid",
//                           borderColor: "divider",
//                           borderRadius: "8px",
//                           "&.Mui-selected": {
//                             borderColor: theme.palette.orange.main,
//                             backgroundColor: theme.palette.orange.light,
//                           },
//                         }}
//                       >
//                         {option.icon}
//                         <Typography variant="caption" sx={{ mt: 0.5 }}>
//                           {option.label}
//                         </Typography>
//                       </ToggleButton>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </ToggleButtonGroup>
//             </FormControl>
//           </Grid>

//           <Grid size={12}>
//             <FormControl fullWidth>
//               <FormLabel>Time Option</FormLabel>
//               <RadioGroup
//                 row
//                 value={newEvent.timeOption}
//                 onChange={(e) => handleChange("timeOption", e.target.value)}
//                 sx={{ gap: 2, mt: 1 }}
//               >
//                 {timeOptions.map((option) => {
//                   const dayOff = user.daysOff.find(
//                     (d: DayOff) => d.date === newEvent.date
//                   );

//                   const isDisabled =
//                     option === "Journée Entière"
//                       ? !!dayOff
//                       : dayOff?.duration === option;
//                   return (
//                     <Paper
//                       key={option}
//                       elevation={3}
//                       sx={{
//                         flex: 1,
//                         border: `2px solid ${
//                           newEvent.timeOption === option
//                             ? timeColors[option]
//                             : "transparent"
//                         }`,
//                         borderRadius: "8px",
//                         opacity: isDisabled ? 0.5 : 1,
//                         pointerEvents: isDisabled ? "none" : "auto",
//                       }}
//                     >
//                       <ToggleButton
//                         value={option}
//                         selected={newEvent.timeOption === option}
//                         disabled={isDisabled}
//                         onChange={() => handleChange("timeOption", option)}
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           p: 2,
//                           bgcolor: timeColors[option] + "1a",
//                           "&:hover": { bgcolor: timeColors[option] + "33" },
//                         }}
//                       >
//                         {isDisabled && (
//                           <Tooltip title="This time slot is marked as time off">
//                             <BlockIcon
//                               color="error"
//                               sx={{ position: "absolute", top: 4, right: 4 }}
//                             />
//                           </Tooltip>
//                         )}
//                         <Box sx={{ textAlign: "center" }}>
//                           <Typography variant="body2" fontWeight="medium">
//                             {option.charAt(0).toUpperCase() + option.slice(1)}
//                           </Typography>
//                         </Box>
//                       </ToggleButton>
//                     </Paper>
//                   );
//                 })}
//               </RadioGroup>
//             </FormControl>
//           </Grid>

//           <Grid size={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="notes"
//               value={newEvent.notes}
//               onChange={(e) => handleChange("notes", e.target.value)}
//               variant="outlined"
//               slotProps={{
//                 input: {
//                   inputProps: { maxLength: 15 },
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, py: 2 }}>
//         <Stack
//           flexDirection="row"
//           justifyContent={newEvent.id ? "space-between" : "center"}
//           width="100%"
//         >
//           {newEvent.id && (
//             <Button
//               variant="contained"
//               onClick={handleDelete}
//               color="error"
//               sx={{ mr: 2 }}
//             >
//               Delete Event
//             </Button>
//           )}

//           <Button
//             onClick={() =>
//               handleSubmit(!newEvent.id && !isLastDayOfMonth(currentDate))
//             }
//             variant="contained"
//             color="success"
//             sx={{ borderRadius: "8px", px: 4 }}
//           >
//             {newEvent.id
//               ? "Save Changes"
//               : isLastDayOfMonth(currentDate)
//               ? "Submit All"
//               : "Save & Go to next day"}
//           </Button>
//         </Stack>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CalendarDialog;
