import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Grid, Typography, Chip } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProduct } from '../../database'
import { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '../../context/cart'

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
  const router = useRouter()

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: product.inStock === 0 ? 0 : 1
  })

  const onSelectedSize = useCallback((size: ISize) => {
    setTempCartProduct((currentValue) => ({
      ...currentValue,
      size
    }))
  }, [])

  const onQuantityChange = useCallback((quantity: number) => {
    setTempCartProduct((currentValue) => ({
      ...currentValue,
      quantity
    }))
  }, [])

  const onAddProductToCart = () => {
    if (!tempCartProduct.size) return undefined
    addProductToCart(tempCartProduct)
    // TODO: llamar la acción del context para agregar al carrito
    router.push('/cart')
  }

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
                  <ItemCounter
                    onQuatityChange={onQuantityChange}
                    maxValue={product.inStock > 10 ? 10 : product.inStock}
                    currentValue={tempCartProduct.quantity}
                  />
                  <SizeSelector
                    onSelectedSize={onSelectedSize}
                    selectedSize={tempCartProduct.size}
                    sizes={product.sizes}
                  />
                </Box>

                  {
                    (product.inStock > 0)
                      ? (
                          <Button onClick={onAddProductToCart} color='secondary' className='circular-btn'>
                            {
                              tempCartProduct.size
                                ? 'Agregar al carrito'
                                : 'Seleccione una talla'
                            }
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
