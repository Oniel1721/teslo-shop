import { FC } from '../../interfaces'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

interface Props {
    images: string[]
}

export const ProductSlideshow:FC<Props> = ({ images }) => {
  return (
   <Carousel
    animationHandler={'slide'}
    axis='horizontal'
    showThumbs={false}

   >
     {
       images.map(image => {
         const url = `/products/${image}`
         return (
           <div key={image}>
             <img
              src={url}
              alt='Product image'
             />
           </div>
         )
       })
     }
   </Carousel>
  )
}
