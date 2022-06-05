import { useEffect, useReducer, useState } from 'react'
import { FC, ICartProduct } from '../../interfaces'
import { CartContext, cartReducer, ActionTypes } from './'
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[],
}

const CART_INITIAL_STATE: CartState = {
  cart: []
}

export const CartProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
  const [cookieLoaded, setCookieLoaded] = useState(false)

  useEffect(() => {
    try {
      const productsFromCookie: ICartProduct[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({
        type: ActionTypes.Cart_LoadCartFromCookiesOrStorage,
        payload: productsFromCookie
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.Cart_LoadCartFromCookiesOrStorage,
        payload: []
      })
    }
    setCookieLoaded(true)
  }, [])

  useEffect(() => {
    if (cookieLoaded) {
      Cookie.set('cart', JSON.stringify(state.cart))
    }
  }, [state.cart, cookieLoaded])

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
