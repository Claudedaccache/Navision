import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Container,
  IconButton,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useUserContext } from "../context/userContext";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
  const { user } = useUserContext();
  const theme = useTheme();

  const [showSalary, setShowSalary] = useState(false);

  const availableBalances = {
    cpJoursRestants: 17.0,
    cpJoursEnAcquisition: 14.58,
    rttEmployeurN: 3.0,
    rttEmployeurNMinus: 10.0,
    rttSalarieN: 5.0,
    rttSalarieNMinus: 10.0,
    congésEnfantMalade: 0.0,
  };

  return (
    <Stack component="section">
      <Container>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h1"
            fontWeight="700"
            color={theme.palette.orange.main}
            mb="2rem"
          >
            Mon profile:{" "}
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  color={theme.palette.orange.main}
                >
                  User Information
                </Typography>
                <Typography>
                  <strong>Prenom:</strong> {user.name}
                </Typography>
                <Typography>
                  <strong>Nom:</strong> {user.familyName}
                </Typography>
                <Typography>
                  <strong>Identifiant:</strong> {user.companyID}
                </Typography>
                <Typography>
                  <strong>Ancienneté:</strong> 22/6/2022
                </Typography>
                <Typography>
                  <strong>Manager:</strong> {user.manager}
                </Typography>
              </Paper>
              <Paper sx={{ padding: 2, marginTop: 4 }}>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography
                    variant="h6"
                    gutterBottom
                    color={theme.palette.orange.main}
                  >
                    Salaire
                  </Typography>
                  <IconButton
                    onMouseDown={() => setShowSalary(true)}
                    onMouseUp={() => setShowSalary(false)}
                    onMouseLeave={() => setShowSalary(false)}
                  >
                    {showSalary ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Stack>
                <Stack>
                  <Typography variant="body1">Salaire à venir:</Typography>
                  <Typography>{showSalary ? "1500" : "****"}€</Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1">Salaire Brut:</Typography>
                  <Typography>{showSalary ? "2000" : "****"}€</Typography>
                </Stack>
              </Paper>
            </Grid>

            {/* Right column with available balances */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  color={theme.palette.orange.main}
                  gutterBottom
                >
                  Soldes
                </Typography>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Type</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Disponible</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Available balances */}
                      <TableRow>
                        <TableCell>
                          CP jours restants
                          <br />
                          (Valable jusqu'au 31/05/2025)
                        </TableCell>
                        <TableCell align="right">
                          {availableBalances.cpJoursRestants}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CP jours en acquisition</TableCell>
                        <TableCell align="right">
                          {availableBalances.cpJoursEnAcquisition}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RTT employeur N</TableCell>
                        <TableCell align="right">
                          {availableBalances.rttEmployeurN}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RTT employeur N-1</TableCell>
                        <TableCell align="right">
                          {availableBalances.rttEmployeurNMinus}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RTT salarié N</TableCell>
                        <TableCell align="right">
                          {availableBalances.rttSalarieN}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RTT salarié N-1</TableCell>
                        <TableCell align="right">
                          {availableBalances.rttSalarieNMinus}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Congés Enfant Malade</TableCell>
                        <TableCell align="right">
                          {availableBalances.congésEnfantMalade}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Stack>
  );
};

export default Profile;
