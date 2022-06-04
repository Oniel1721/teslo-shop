import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Grid, Typography, Chip } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { IProduct } from '../../interfaces'
import { dbProduct } from '../../database'

// Do not use this, server side rendering

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug = '' } = ctx.query
//   const product = await dbProduct.getProductBySlug(slug as string)
//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
            <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
            <Box display='flex' flexDirection='column'>
                <Typography variant='h1' component='h1'>{product.title}</Typography>
                <Typography variant='subtitle1' component='h2'>${product.price}</Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant='subtitle2'>Cantidad</Typography>
                  <ItemCounter/>
                  <SizeSelector
                    selectedSize={product.sizes[0]}
                    sizes={product.sizes}
                  />
                </Box>

                  {
                    (product.inStock > 0)
                      ? (
                          <Button color='secondary' className='circular-btn'>
                              Agregar al carrito
                          </Button>
                        )
                      : (
                          <Chip label="No hay disponibles" color='error' variant='outlined' />
                        )
                  }

                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle2'>Descripción</Typography>
                  <Typography variant='body2'>{product.description}</Typography>
                </Box>
            </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProduct.getAllProductsSlugs()

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as {slug: string}
  const product = await dbProduct.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage
