import { useReducer } from 'react'
import { FC, ICartProduct } from '../../interfaces'
import { CartContext, cartReducer, ActionTypes } from './'

export interface CartState {
    cart: ICartProduct[],
}

const CART_INITIAL_STATE: CartState = {
  cart: []
}

export const CartProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: ICartProduct) => {
    dispatch({
      type: ActionTypes.Cart_AddProduct,
      payload: product
    })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart
    }}>
         { children }
    </CartContext.Provider>
  )
}
