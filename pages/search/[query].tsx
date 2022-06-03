import { Box, Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProduct } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo aquí' >
      <Typography variant='h1' component='h1'>Teslo shop</Typography>

      {
      foundProducts
        ? <Typography variant='h2' sx={{ mb: 1 }}>Término: { query }</Typography>
        : <Box display='flex'>
        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningun producto</Typography>
        <Typography color='secondary' variant='h2' sx={{ ml: 1 }}>{ query }</Typography>
      </Box>

    }

      <ProductList products={products} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as {query: string}
  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProduct.getProductsByTerm(query)
  const foundProducts = products.length > 0

  if (!foundProducts) {
    products = await dbProduct.getProductsByTerm('shirt')
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage
