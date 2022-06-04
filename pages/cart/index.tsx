import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material'
import { useContext } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context/cart'

const CartPage = () => {
  const { cart } = useContext(CartContext)

  console.log(cart)

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
      <Typography variant='h1' component='h1'>Carrito</Typography>
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <CartList editable/>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{ my: 1 }}/>
              <OrderSummary/>
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage
