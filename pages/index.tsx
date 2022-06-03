import type { NextPage } from 'next'
import { ProductPage } from '../components/ui'

const HomePage: NextPage = () => {
  return (
    <ProductPage
      title='Teslo shop'
      subtitle='Todos los productos'
      layoutTitle='Teslo-Shop - Home'
      layoutDescription='Encuentra los mejores productos de Teslo aquí'
    />
  )
}

export default HomePage
