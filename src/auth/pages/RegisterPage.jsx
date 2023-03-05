import { useState, useMemo } from "react";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import {Link as RouterLink} from 'react-router-dom';
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    name : '',
    email : '',
    password : ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'Es obligatorio una @' ],
    name: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
    password : [(value) => value.length >= 6, 'La contraseña debe ser mayor a 6 letras.']
}

export const RegisterPage = () => {

    const [ formSubmitted, setFormSubmitted ] = useState(false)

    const { name, email, password, onInputChange,
            isFormValid, nameValid, emailValid, passwordValid, formState } = useForm(formData, formValidations)

    const { status, errorMessage } = useSelector((state) => state.auth)
    const isChecking = useMemo(() => status === 'checking', [ status ])
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return;
        dispatch(startRegisterUserWithEmailPassword(formState))
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{mt : 2}}>
                        <TextField 
                            label="Nombre completo" 
                            type="text"
                            placeholder="Tu Nombre"
                            name = "name"
                            onChange={onInputChange}
                            value = {name}               
                            helperText = {!!nameValid && formSubmitted ? nameValid : ''}
                            error = {!!nameValid && formSubmitted}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt : 2}}>
                        <TextField 
                            label="Correo" 
                            type="email"
                            placeholder="placeholder@gmail.com"
                            name = "email"
                            onChange={onInputChange}
                            value = {email}
                            helperText = {!!emailValid && formSubmitted ? emailValid : ''}
                            error = {!!emailValid && formSubmitted}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt : 2}}>
                        <TextField 
                            label="Contraseña" 
                            type="password"
                            placeholder="contraseña"
                            name = "password"
                            onChange={onInputChange}
                            value = {password}
                            helperText = {!!passwordValid && formSubmitted ? passwordValid : ''}
                            error = {!!passwordValid && formSubmitted}
                            fullWidth
                        />
                    </Grid>
                    <Grid 
                        container
                        spacing={2}
                        sx={{mb: 2, mt: 1}}
                    >
                        <Grid item xs = {12} display = {!errorMessage && 'none'}>
                            <Alert severity="error" >
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs = {12}>
                            <Button type = "submit" variant="contained" disabled={isChecking} fullWidth>
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr:1}}>¿Ya tienes una cuenta?</Typography>
                        <Link  component={RouterLink} color = "inherit" to="/auth/login">
                          ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
  )
}
