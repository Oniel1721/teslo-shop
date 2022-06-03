import { Typography } from '@mui/material'
import { ShopLayout } from '../layouts'
import { ProductList } from '../products'
import { FullScreenLoading } from './'
import { useProducts } from '../../hooks'
import { FC } from '../../interfaces'

interface Props {
    layoutTitle: string;
    layoutDescription: string;
    title: string;
    subtitle: string;
    gender?: 'kid' | 'women' | 'men';
}

export const ProductPage:FC<Props> = ({
  subtitle,
  title,
  layoutTitle,
  layoutDescription,
  gender = ''
}) => {
  const { products, isLoading } = useProducts(`/products${gender ? `?gender=${gender}` : ''}`)

  return (
    <ShopLayout title={layoutTitle} pageDescription={layoutDescription} >
      <Typography variant='h1' component='h1'>{title}</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>{subtitle}</Typography>

      {
        isLoading
          ? <FullScreenLoading/>
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
