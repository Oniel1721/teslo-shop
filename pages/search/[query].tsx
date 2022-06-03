import { Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProduct } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
  products: IProduct[]
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo aquí' >
      <Typography variant='h1' component='h1'>Teslo shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

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

  const products = await dbProduct.getProductsByTerm(query)

  // si no hay productos retornar otros productos

  return {
    props: {
      products
    }
  }
}

export default SearchPage
