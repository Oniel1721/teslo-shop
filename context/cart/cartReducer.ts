/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

export enum ActionTypes {
    Cart_LoadCartFromCookiesOrStorage = 'Cart_LoadCartFromCookiesOrStorage',
    Cart_AddProduct = 'Cart_AddProduct',

}

type CartActionType = {
    type: ActionTypes,
    payload: ICartProduct[] | ICartProduct
}

export const cartReducer = (state: CartState, action: CartActionType):CartState => {
  switch (action.type) {
    case ActionTypes.Cart_LoadCartFromCookiesOrStorage:
      return {
        ...state
      }
    case ActionTypes.Cart_AddProduct:
      if (Array.isArray(action.payload)) return state
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    default:
      return state
  }
}
