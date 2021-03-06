import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../../components/layouts'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorOutline } from '@mui/icons-material'
import { validator } from '../../utils'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { registerUser } = useContext(AuthContext)

  const onRegisterForm = async ({ email, password, name }: FormData) => {
    setShowError(false)
    const { hasError, message = '' } = await registerUser(name, email, password)
    if (hasError) {
      setShowError(true)
      setErrorMessage(message)
      setTimeout(() => { setShowError(false); setErrorMessage('') }, 3000)
      return
    }
    const destination = router.query.p?.toString() || '/'
    router.replace(destination)
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
                          label={errorMessage}
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
                                message: 'M??nimo 2 caracteres'
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
                            label='Contrase??a'
                            type='password'
                            variant='filled'
                            fullWidth
                            {...register('password', {
                              required: 'Este campo es requerido',
                              minLength: {
                                value: 6,
                                message: 'M??nimo 6 caracteres'
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
                        <NextLink href={`/auth/login?p=${router.query.p?.toString() || '/'}`} passHref>
                            <Link underline='always'>
                                ??Ya tienes una cuenta?
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
