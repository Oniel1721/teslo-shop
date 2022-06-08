import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../../components/layouts'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { tesloApi } from '../../api'
import { ErrorOutline } from '@mui/icons-material'
import { validator } from '../../utils'

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
  const [showError, setShowError] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onRegisterForm = async ({ email, password, name }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/register', { email, password, name })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      console.log('Error en las credenciales')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }

    // Todo: navegar a la pantalla que el usuario estaba
  }
  return (
    <AuthLayout title="Crear Cuenta">
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear Cuenta</Typography>
                        <Chip
                          label='Ese correo ya esta siendo utilizado'
                          color='error'
                          icon={<ErrorOutline/>}
                          className='fadeIn'
                          sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Nombre completo'
                            variant='filled'
                            fullWidth
                            {...register('name', {
                              required: 'Este campo es requerido',
                              minLength: {
                                value: 2,
                                message: 'Mínimo 2 caracteres'
                              }
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email'
                            label='Correo'
                            variant='filled'
                            fullWidth
                            {...register('email', {
                              required: 'Este campo es requerido',
                              validate: validator.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            variant='filled'
                            fullWidth
                            {...register('password', {
                              required: 'Este campo es requerido',
                              minLength: {
                                value: 6,
                                message: 'Mínimo 6 caracteres'
                              }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                            Crear Cuenta
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link underline='always'>
                                ¿Ya tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage
