/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

type ActionTypes =
  | { type: 'Cart_LoadCartFromCookiesOrStorage', payload: ICartProduct[] }
  | { type: 'Cart_UpdateProductsInCart', payload: ICartProduct[] }
  | { type: 'Cart_ChangeProductQuatity', payload: ICartProduct }
  | { type: 'Cart_RemoveProductInCart', payload: ICartProduct }
  | { type: 'Cart_UpdateOrderSummary', payload: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  } }

export const cartReducer = (state: CartState, action: ActionTypes):CartState => {
  switch (action.type) {
    case 'Cart_LoadCartFromCookiesOrStorage':
      return {
        ...state,
        cart: [...action.payload],
        isLoaded: true
      }
    case 'Cart_UpdateProductsInCart':
      return {
        ...state,
        cart: [...action.payload]
      }
    case 'Cart_ChangeProductQuatity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product
          if (product.size !== action.payload.size) return product
          return action.payload
        })
      }
    case 'Cart_RemoveProductInCart':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          return !(product._id === action.payload._id && product.size === action.payload.size)
        })
      }
    case 'Cart_UpdateOrderSummary':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
