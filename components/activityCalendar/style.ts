// import { LinearProgress, styled } from "@mui/material";
// import { Calendar, CalendarProps } from "react-big-calendar";
// import { SxProps } from "@mui/system";

// // Styled Components
// export const StyledCalendar = styled(Calendar)<CalendarProps>(({ theme }) => {
//   return {
//     width: "100%",
//     height: "94vh",
//     "@media (min-width: 768px)": {
//       height: "74vh",
//     },
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[3],
//     "& .rbc-header": {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.primary.contrastText,
//       padding: theme.spacing(1),
//       border: "none",
//       fontSize: "0.9rem",
//     },
//     "& .rbc-day-bg + .rbc-day-bg": {
//       borderLeft: `1px solid ${theme.palette.divider}`,
//     },
//     "& .rbc-month-view": {
//       border: "none",
//       backgroundColor: theme.palette.background.paper,
//       borderRadius: theme.shape.borderRadius,
//     },

//     "& .rbc-time-view, & .rbc-time-gutter, &.rbc-day-bg, & .rbc-row-bg": {
//       height: "80px",
//     },

//     "& .rbc-time-view": {
//       border: "none",
//       backgroundColor: theme.palette.background.paper,
//       borderRadius: theme.shape.borderRadius,
//     },
//     "& .rbc-time-header": {
//       backgroundColor: theme.palette.background.default,
//     },

//     "& .rbc-time-content": {
//       backgroundColor: theme.palette.background.paper,
//     },
//     "& .rbc-event": {
//       backgroundColor: "transparent",
//     },
//     "& .rbc-toolbar": {
//       display: "none",
//     },
//     "& .rbc-day-slot .rbc-event": {
//       zIndex: 4,
//     },
//     "& .rbc-current > .rbc-button-link": {
//       fontWeight: "bold",
//       color: "white",
//       padding: "4px",
//       marginTop: "4px",
//       backgroundColor: "lightBlue",
//       borderRadius: "50%",
//     },
//   };
// });

// export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
//   flexGrow: 1,
//   height: 10,
//   borderRadius: 5,
//   backgroundColor: theme.palette.grey[200],
//   "& .MuiLinearProgress-bar": {
//     borderRadius: 5,
//     backgroundColor: theme.palette.success.main,
//   },
// }));

// export const StyledDataCell = (
//   isCurrentMonth: boolean,
//   isFullDayOff: boolean,
//   isWeekend: boolean
// ): SxProps => {
//   return {
//     position: "relative",
//     width: "100%",
//     // height: { xs: "100px", md: "100%" },
//     height: "100%",
//     borderLeft: "1px solid",
//     borderBottom: "1px solid",
//     borderColor: "divider",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     bgcolor: isWeekend ? "action.disabledBackground" : "background.paper",
//     overflow: "hidden",
//     cursor:
//       isCurrentMonth && !isFullDayOff && !isWeekend ? "pointer" : "not-allowed",
//   };
// };
