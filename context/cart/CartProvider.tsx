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
    const existProductInCartWithSameSize = state.cart.some((p) => p._id === product._id && p.size === product.size)
    if (!existProductInCartWithSameSize) {
      return dispatch({
        type: ActionTypes.Cart_UpdateProductsInCart,
        payload: [...state.cart, product]
      })
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p
      p.quantity += product.quantity
      return p
    })

    dispatch({
      type: ActionTypes.Cart_UpdateProductsInCart,
      payload: updatedProducts
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
