import { useDispatch, useSelector } from "react-redux"
import  AddOutlined from "@mui/icons-material/AddOutlined"
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { startNewNote } from "../../store/journal/thunks"



export const JournalPage = () => {

  const {isSaving, active} = useSelector((state) => state.journal)
  const dispatch = useDispatch()

  const onNewNote = () => {
      dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      {
        (active) ? <NoteView/> : <NothingSelectedView/>
      }
        <IconButton
          size = 'large'
          onClick = { onNewNote }
          disabled = { isSaving }
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover' : {
              backgroundColor: 'error.main', 
              opacity: 0.9
            },
            position : "fixed",
            bottom : 50,
            right : 50,
          }}
        >
          <AddOutlined sx={{ fontSize : 30 }}/>
        </IconButton>
    </JournalLayout> 
    
  )
}
