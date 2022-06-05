
import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { KeyboardEvent, useContext, useMemo, useState } from 'react'
import { UIContext } from '../../context/ui'
import { CartContext } from '../../context/cart'

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext)
  const { numberOfItems } = useContext(CartContext)

  const { asPath, push } = useRouter()

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = (e?: KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm.trim().length === 0) return undefined
    e?.preventDefault()
    push(`/search/${searchTerm}`)
  }

  const currentCategoryPage = useMemo(() => {
    if (!asPath.includes('/category')) return ''
    const categories = ['/men', '/women', '/kid']
    const category = categories.find(c => asPath.includes(c))
    if (!category) return ''
    return category.slice(1)
  }, [asPath])

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

            <Box
                className = 'fadeIn'
                sx={{
                  display: isSearchVisible
                    ? 'none'
                    : {
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

            {/* Pantallas grandes */}

            {
                isSearchVisible
                  ? (
                    <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => { e.key === 'Enter' && onSearchTerm(e as KeyboardEvent<HTMLInputElement>) }}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                     onClick={() => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                    )
                  : (
                        <IconButton sx={{ display: { xs: 'none', sm: 'flex' } }} className='fadeIn' onClick={() => setIsSearchVisible(true)}>
                            <SearchOutlined/>
                         </IconButton>
                    )
            }

            {/* Pantallas pequeñas */}

            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                onClick={toggleSideMenu}
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref >
                <Link>
                    <IconButton>
                        <Badge color='secondary' badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}>
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={() => toggleSideMenu()}>
                Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}
