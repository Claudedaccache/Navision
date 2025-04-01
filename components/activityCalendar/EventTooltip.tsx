// import React from "react";
// import { CalendarEvent } from "../../data/types";
// import { Box, Typography } from "@mui/material";

//testt// // Memoized Components
// export const EventTooltip = React.memo(
//   ({ event }: { event: CalendarEvent }) => (
//     <Box sx={{ p: 1, backgroundColor: "white", borderRadius: 1, boxShadow: 2 }}>
//       <Typography
//         variant="subtitle2"
//         color="textPrimary"
//       >{`Mission: ${event.title}`}</Typography>
//       <Typography variant="caption" display="block" color="textSecondary">
//         {`Temps de travail: ${
//           event.type.charAt(0).toUpperCase() + event.type.slice(1)
//         }`}
//       </Typography>
//       <Typography variant="caption" display="block" color="textSecondary">
//         {`MT*/Télétravail: ${event.transportation}`}
//       </Typography>
//       {event.notes && (
//         <Typography variant="caption" display="block" color="textSecondary">
//           {`Description: ${event.notes}`}
//         </Typography>
//       )}
//     </Box>
//   )
// );
