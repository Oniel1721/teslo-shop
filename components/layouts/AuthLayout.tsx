
import NextLink from 'next/link'
import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { FC } from '../../interfaces'

interface Props {
    title: string;
}

export const AuthLayout:FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <nav>
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref >
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                    </Link>
                </NextLink>
            </Toolbar>
        </AppBar>
        </nav>
        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                {children}
            </Box>
        </main>
    </>
  )
}
