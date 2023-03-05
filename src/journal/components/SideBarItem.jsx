import { memo, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import TurnedInNot from "@mui/icons-material/TurnedInNot"
import { setActiveNote } from "../../store/journal/journalSlice"
export const SideBarItem = memo(({id, title = '', body, date, imagesURL = []}) => {

    const dispatch = useDispatch()
    const newTitle = useMemo(() => {
        return title.length > 16
        ? title.substring(0,16) + '...'
        : title
    }, [title])
    const onSelect = () => {
        dispatch(setActiveNote({id, title, body, date, imagesURL})) 
    }
  return (
    <ListItem key = {id} disablePadding>
        <ListItemButton onClick={onSelect}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
})
