import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Grid, TextField, Typography, IconButton } from "@mui/material"
import SaveOutlined from "@mui/icons-material/SaveOutlined"
import UploadOutlined from "@mui/icons-material/UploadOutlined"
import DeleteOutline from "@mui/icons-material/DeleteOutline"

import { ImageGallery } from "../components/ImageGallery"

import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"

export const NoteView = () => {

    const dispatch = useDispatch()
    const {active : note, messageSaved, isSaving} = useSelector((state) => state.journal)

    const {body, title, date, onInputChange, formState} = useForm(note)

    const dateString = useMemo(()=> {
        const newDate = new Date (date) 
        return newDate.toUTCString()
    }, [date])

    const inputFileRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    },[formState])

    useEffect(() => {
        if (messageSaved.length > 0){
            Swal.fire(
                'Exito!',
                messageSaved,
                'success'
            )
        }
    }, [messageSaved])

    const onSave = () => {
        dispatch(startSavingNote())
    }

    const onFileChange = ({target:{files}}) => {
        if (files.length === 0) return
        dispatch(startUploadingFiles(files))

    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

  return (
    <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx = {{mb : 1}}
        className="animate__animated animate__fadeIn"
    >
        <Grid item>
            <Typography fontSize={39} fontWeight = 'light' > {dateString} </Typography>
        </Grid>
        <Grid item>
            <input type="file"
                onChange={onFileChange}
                multiple
                ref={inputFileRef}
                style = {{display: 'none'}}
            />
            <IconButton color="primary" disabled={isSaving} onClick={() => inputFileRef.current.click()}>
                <UploadOutlined/>
            </IconButton>
            <Button onClick={onSave} color="primary" sx = {{padding: 2}} disabled={isSaving}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type = 'text'
                label = "Titulo"
                variant="filled"
                fullWidth
                placeholder="Ingresa un titulo"
                name = "title"
                disabled={isSaving}
                value = {title}
                onChange= {onInputChange}
                sx={{border : 'none', mb : 1}}
            />
            <TextField
                type="text"
                variant = "filled"
                fullWidth
                multiline
                name = 'body'
                disabled={isSaving}
                value = {body}
                onChange= {onInputChange}
                placeholder = "¿Qué ocurrió hoy?"
                minRows={5}
            />
        </Grid>
        <Grid container justifyContent="end">
            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color="error"
                disabled={isSaving}
            >
                <DeleteOutline/>
                Delete
            </Button>
        </Grid>
        <ImageGallery images={note.imagesURL}/>
    </Grid>
  )
}
