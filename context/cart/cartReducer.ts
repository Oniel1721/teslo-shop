/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

export enum ActionTypes {
    Cart_LoadCartFromCookiesOrStorage = 'Cart_LoadCartFromCookiesOrStorage',
    Cart_UpdateProductsInCart = 'Cart_UpdateProductsInCart',
    Cart_ChangeProductQuatity = 'Cart_ChangeProductQuatity',

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
      if (Array.isArray(action.payload)) return state
      const payload = action.payload
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== payload._id) return product
          if (product.size !== payload.size) return product
          return payload
        })
      }
    default:
      return state
  }
}
