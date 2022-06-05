import { useEffect, useReducer, useState } from 'react'
import { FC, ICartProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[],
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
}

export const CartProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
  const [cookieLoaded, setCookieLoaded] = useState(false)

  useEffect(() => {
    try {
      const productsFromCookie: ICartProduct[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({
        type: 'Cart_LoadCartFromCookiesOrStorage',
        payload: productsFromCookie
      })
    } catch (error) {
      dispatch({
        type: 'Cart_LoadCartFromCookiesOrStorage',
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({ type: 'Cart_UpdateOrderSummary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const existProductInCartWithSameSize = state.cart.some((p) => p._id === product._id && p.size === product.size)
    if (!existProductInCartWithSameSize) {
      return dispatch({
        type: 'Cart_UpdateProductsInCart',
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
      type: 'Cart_UpdateProductsInCart',
      payload: updatedProducts
    })
  }

  const updatedCartQuatity = (product: ICartProduct) => {
    dispatch({
      type: 'Cart_ChangeProductQuatity',
      payload: product
    })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: 'Cart_RemoveProductInCart',
      payload: product
    })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updatedCartQuatity,
      removeCartProduct
    }}>
         { children }
    </CartContext.Provider>
  )
}
