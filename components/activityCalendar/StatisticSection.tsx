// import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
// import moment from "moment";
// import Grid from "@mui/material/Grid2";
// import { ProgressBar } from "./style";
// import {
//   WorkOutline as WorkOutlineIcon,
//   MedicalServices as MedicalServicesIcon,
//   BeachAccess as BeachAccessIcon,
//   EventAvailable as EventAvailableIcon,
// } from "@mui/icons-material";

// const StatisticSection = ({ stats, currentViewDate }) => {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         mb: 4,
//         p: 3,
//         backgroundColor: theme.palette.background.paper,
//         borderRadius: theme.shape.borderRadius,
//         boxShadow: theme.shadows[1],
//       }}
//     >
//       <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//         {moment(currentViewDate).format("MMMM YYYY")} Progress
//       </Typography>

//       <Box sx={{ display: "flex", alignsize={{: :en,er":m,: 2:ga}p: 2 }}>
//         <ProgressBar variant="determinate" value={stats.progress} />
//         <Typography variant="h4" color="success.main" sx={{ mt: 1 }}>
//           {stats.workedTime}
//         </Typography>
//       </Box>

//       <Grid container spacing={2}>
//         <Grid size={{ xs: 6, md: 3 }}>
//           <Card variant="outlined">
//             <CardContent sx={{ textAlign: "center" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   justifyContent: "center",
//                 }}
//               >
//                 <WorkOutlineIcon color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   Worked Days
//                 </Typography>
//               </Box>
//               <Typography variant="h4" color="success.main" sx={{ mt: 1 }}>
//                 {stats.workedTime}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 6, md: 3 }}>
//           <Card variant="outlined">
//             <CardContent sx={{ textAlign: "center" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   justifyContent: "center",
//                 }}
//               >
//                 <MedicalServicesIcon color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   Sick Days
//                 </Typography>
//               </Box>
//               <Typography variant="h4" color="error.main" sx={{ mt: 1 }}>
//                 {stats.sickDays}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 6, md: 3 }}>
//           <Card variant="outlined">
//             <CardContent sx={{ textAlign: "center" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   justifyContent: "center",
//                 }}
//               >
//                 <BeachAccessIcon color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   Vacation Days
//                 </Typography>
//               </Box>
//               <Typography variant="h4" color="success.main" sx={{ mt: 1 }}>
//                 {stats.vacationDays}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 6, md: 3 }}>
//           <Card variant="outlined">
//             <CardContent sx={{ textAlign: "center" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   justifyContent: "center",
//                 }}
//               >
//                 <EventAvailableIcon color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   Remaining Days
//                 </Typography>
//               </Box>
//               <Typography variant="h4" sx={{ mt: 1 }}>
//                 {stats.remainingDays}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatisticSection;

import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  LinearProgress,
  useTheme,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { isEmpty } from "lodash";

const EventProgress = ({ events, daysOff }) => {
  const theme = useTheme();

  const calculateWorkingDays = (year, month) => {
    const date = new Date(year, month, 1);
    let workingDays = 0;
    while (date.getMonth() === month) {
      const day = date.getDay();
      if (day !== 0 && day !== 6) workingDays++;
      date.setDate(date.getDate() + 1);
    }
    return workingDays;
  };

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const totalAvailableDays = calculateWorkingDays(year, month);

  // Calculate sick and vacation days from daysOff
  const sickDaysTotal = daysOff.reduce(
    (sum, day) =>
      day.status === "sick"
        ? sum + (day.period === "Journée Entière" ? 1 : 0.5)
        : sum,
    0
  );

  const vacationDaysTotal = daysOff.reduce(
    (sum, day) =>
      day.status === "vacation"
        ? sum + (day.period === "Journée Entière" ? 1 : 0.5)
        : sum,
    0
  );
  const otherDaysOffTotal = daysOff.reduce(
    (sum, day) =>
      day.status === "other"
        ? sum + (day.period === "Journée Entière" ? 1 : 0.5)
        : sum,
    0
  );

  const totalDeductions = sickDaysTotal + vacationDaysTotal + otherDaysOffTotal;
  const netWorkingDays = totalAvailableDays - totalDeductions;

  const eventDays = events.reduce(
    (sum, event) => sum + (event.time === "Journée Entière" ? 1 : 0.5),
    0
  );

  const progress = netWorkingDays > 0 ? (eventDays / netWorkingDays) * 100 : 0;

  const calculateStats = (key) => {
    const stats = {};
    events.forEach((event) => {
      const value =
        key === "event" ? event[key].project : event[key] || "Unknown";
      const dayValue = event.time === "Journée Entière" ? 1 : 0.5;
      stats[value] = (stats[value] || 0) + (key === "time" ? dayValue : 1);
    });
    return stats;
  };

  const missionStats = calculateStats("event");
  const transportStats = calculateStats("transport");
  const timeStats = calculateStats("time");

  const ChartWrapper = ({ title, stats, isCount = false }) => {
    return (
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="subtitle2" gutterBottom>
          {title} ({" "}
          {title === "Time Distribution"
            ? Object.values(stats).reduce((a, b) => a + b, 0) + " jours"
            : Object.entries(stats).length +
              `${Object.entries(stats).length > 1 ? " options" : " option"}`}
          )
        </Typography>
        <List dense>
          {Object.entries(stats).map(([key, value]) => (
            <ListItem
              key={key}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2">{key}:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {key === "Mission Types" ? value.project : value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  // Prepare deduction breakdown
  const deductionParts = [];
  if (sickDaysTotal > 0) deductionParts.push(`${sickDaysTotal} sick`);
  if (vacationDaysTotal > 0)
    deductionParts.push(`${vacationDaysTotal} vacation`);
  if (otherDaysOffTotal > 0) deductionParts.push(`${otherDaysOffTotal} others`);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Work Progress</Typography>
          <Typography variant="body2" color="text.secondary">
            {eventDays}/{netWorkingDays} days
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "lightGray",
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              backgroundColor: theme.palette.success.main,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            pt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Available Days: {totalAvailableDays}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deductions: {totalDeductions} days
            {deductionParts.length > 0 && ` (${deductionParts.join(", ")})`}
          </Typography>
        </Box>
      </Box>

      {!isEmpty(events) && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ChartWrapper title="Mission Types" stats={missionStats} isCount />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ChartWrapper
              title="Transport Types"
              stats={transportStats}
              isCount
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ChartWrapper title="Time Distribution" stats={timeStats} />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default EventProgress;
