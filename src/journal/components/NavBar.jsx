import { useDispatch } from "react-redux"
import MenuOutlined from "@mui/icons-material/MenuOutlined"
import LogoutOutlined from "@mui/icons-material/LogoutOutlined"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from "../../store/auth/thunks"
import { clearNotesLogOut } from "../../store/journal/journalSlice"

export const NavBar = ({drawerWidth = 240}) => {

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(startLogout())
        dispatch(clearNotesLogOut())
    }

  return (
    <AppBar
        position="fixed"
        sx = {{ 
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml : {sm : `${drawerWidth}px)`}
        }}  
    >
        <Toolbar>
            <IconButton 
                color='inherit'
                edge ='start'
                sx = {{mr: 2, display : {sm: 'none'}}}
            >
                <MenuOutlined />
            </IconButton>
            <Grid 
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h6" component="div" noWrap> JournalApp </Typography>
                <IconButton color="error" onClick={onLogout}>
                    <LogoutOutlined />
                </IconButton>

            </Grid>
        </Toolbar>
    </AppBar>
  )
}
