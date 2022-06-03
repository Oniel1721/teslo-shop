
import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const Navbar = () => {
  const { asPath } = useRouter()

  const currentCategoryPage = useMemo(() => {
    if (!asPath.includes('/category')) return ''
    const categories = ['/men', '/women', '/kid']
    const category = categories.find(c => asPath.includes(c))
    if (!category) return ''
    return category.slice(1)
  }, [asPath])

  console.log(currentCategoryPage)

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref >
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}>
                <NextLink href='/category/men' passHref >
                    <Link>
                        <Button color={currentCategoryPage === 'men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref >
                    <Link>
                        <Button color={currentCategoryPage === 'women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref >
                    <Link>
                        <Button color={currentCategoryPage === 'kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>
            <Box flex={1}/>
            <IconButton>
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref >
                <Link>
                    <IconButton>
                        <Badge color='secondary' badgeContent={2}>
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>
                Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}
