import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { footerLinks, footerSocialLinks } from "../data/data.tsx";
import { companyName } from "../variables.tsx";
import { titleUnderline } from "../mui/customCss.ts";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Stack
      sx={{
        marginTop: "2rem",
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px 40px",
      }}
    >
      <Grid
        container
        spacing={4}
        direction="row"
        sx={{
          justifyContent: "space-evenly",
          alignItems: "stretch",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              src="/path/to/logo.png"
              alt={`${companyName} Logo`}
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Typography variant="body2" textAlign="center">
              Mentions légales
            </Typography>
            <Typography variant="body2" textAlign="center">
              Tous droits réservés {companyName} {currentYear}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography variant="h6" gutterBottom sx={titleUnderline}>
            Liens utiles
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {footerLinks.map(({ linkName, linkPath }) => (
              <Box component="li" key={linkName} sx={{ pb: "0.6rem" }}>
                <Link
                  href={linkPath}
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  {linkName}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={titleUnderline}>
                Contactez-nous
              </Typography>
              <Stack gap={0.6} pt={0.8}>
                <Typography variant="body2">{`equipecommunication@${companyName}.com`}</Typography>
                <Typography variant="body2">+33 1 46 10 67 67</Typography>
                <Typography variant="body2">13 rue Louis Pasteur</Typography>
                <Typography variant="body2">
                  92100 Boulogne-Billancourt
                </Typography>
              </Stack>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom sx={titleUnderline}>
                Nos réseaux sociaux
              </Typography>
              <Box>
                {footerSocialLinks.map(({ logo, linkPath }) => (
                  <IconButton href={linkPath} color="inherit" key={linkPath}>
                    {logo}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Footer;
