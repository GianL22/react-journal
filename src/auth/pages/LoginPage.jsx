import { useMemo } from "react";
import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import Google from "@mui/icons-material/Google"

import { startGoogleSignIn, startLoginUserWithEmailPassword } from "../../store/auth";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const {status, errorMessage} = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const {email, password, onInputChange, formState} = useForm(formData)

    const isAuthenticating = useMemo(() => status === 'checking', [status]) 

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginUserWithEmailPassword(formState))
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

  return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{mt : 2}}>
                        <TextField 
                            label="Correo" 
                            type="email"
                            placeholder="placeholder@gmail.com"
                            name="email"
                            onChange={onInputChange}
                            value={email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt : 2}}>
                        <TextField 
                            label="Contraseña" 
                            type="password"
                            placeholder="contraseña"
                            name="password"
                            onChange={onInputChange}
                            value={password}
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid container sx = {{ mt : 1}} display = {!errorMessage && 'none'}>
                        <Grid item xs = {12}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        spacing={2}
                        sx={{mb: 1, mt: 1}}
                    >
                        <Grid item xs = {12} sm = {6}>
                            <Button 
                                type="submit"
                                variant="contained"
                                disabled={isAuthenticating}
                                fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs = {12} sm = {6}>
                            <Button 
                                onClick={() => onGoogleSignIn()}
                                variant="contained"
                                disabled={isAuthenticating}
                                fullWidth>
                                <Google/>
                                <Typography sx={{ ml:1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Link  component={RouterLink} color = "inherit" to="/auth/register">
                            Crear cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
  )
}
