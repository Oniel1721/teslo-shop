/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

export enum ActionTypes {
    Cart_LoadCartFromCookiesOrStorage = 'Cart_LoadCartFromCookiesOrStorage',
    Cart_UpdateProductsInCart = 'Cart_UpdateProductsInCart',
    Cart_ChangeProductQuatity = 'Cart_ChangeProductQuatity',
    Cart_RemoveProductInCart = 'Cart_RemoveProductInCart',

}

type CartActionType = {
    type: ActionTypes,
    payload: ICartProduct[] | ICartProduct
}

const isArray = (item: any):boolean => {
  return Array.isArray(item)
}

export const cartReducer = (state: CartState, action: CartActionType):CartState => {
  switch (action.type) {
    case ActionTypes.Cart_LoadCartFromCookiesOrStorage:
      if (!Array.isArray(action.payload)) return state
      return {
        ...state,
        cart: [...action.payload]
      }
    case ActionTypes.Cart_UpdateProductsInCart:
      if (!Array.isArray(action.payload)) return state

      return {
        ...state,
        cart: [...action.payload]
      }
    case ActionTypes.Cart_ChangeProductQuatity:
      return {
        ...state,
        cart: state.cart.map((product) => {
          const payload = action.payload as ICartProduct
          if (product._id !== payload._id) return product
          if (product.size !== payload.size) return product
          return payload
        })
      }
    case ActionTypes.Cart_RemoveProductInCart:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          const payload = action.payload as ICartProduct
          return !(product._id === payload._id && product.size === payload.size)
        })
      }
    default:
      return state
  }
}
