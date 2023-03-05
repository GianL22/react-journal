import StarOutline from "@mui/icons-material/StarOutline"
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (
    <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"   
          alignItems="center"
          className="animate__animated animate__fadeIn"
          sx={{
              minHeight:'100vh',
              backgroundColor: 'primary.main',
              borderRadius: 3,
              padding: 4
          }}
      >
        <Grid item xs={12}>
          <StarOutline sx={{fontSize: 100, color: 'white'}}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color='white'>Selecciona una entrada</Typography>
        </Grid>
    </Grid>
  )
}
