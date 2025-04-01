import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EventProvider } from "../components/activityCalendar/ActivityCalendar";
import EventPlanner from "../components/activityCalendar/ActivityCalendar";

const Activity = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack component="section" marginTop="2rem">
      <EventProvider>
        <Container {...(isMobile && { disableGutters: true })}>
          <Typography
            variant="h1"
            pl="1rem"
            fontWeight="700"
            color={theme.palette.orange.main}
          >
            Activité:{" "}
          </Typography>
          <EventPlanner />
        </Container>
      </EventProvider>
    </Stack>
  );
};

export default Activity;
