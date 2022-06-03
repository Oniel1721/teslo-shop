import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { IProduct } from '../interfaces'

import useSWR from 'swr'

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

const HomePage: NextPage = () => {
  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log(data)

  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Encuentra los mejores productos de Teslo aquí' >
      <Typography variant='h1' component='h1'>Teslo shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos </Typography>

      <ProductList products={data as IProduct[]} />
    </ShopLayout>
  )
}

export default HomePage
