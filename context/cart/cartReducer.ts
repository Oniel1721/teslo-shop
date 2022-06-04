/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

export enum ActionTypes {
    Cart_LoadCartFromCookiesOrStorage = 'Cart_LoadCartFromCookiesOrStorage',
    Cart_UpdateProductsInCart = 'Cart_UpdateProductsInCart',

}

type CartActionType = {
    type: ActionTypes,
    payload: ICartProduct[]
}

export const cartReducer = (state: CartState, action: CartActionType):CartState => {
  switch (action.type) {
    case ActionTypes.Cart_LoadCartFromCookiesOrStorage:
      return {
        ...state,
        cart: [...action.payload]
      }
    case ActionTypes.Cart_UpdateProductsInCart:
      return {
        ...state,
        cart: [...action.payload]
      }
    default:
      return state
  }
}
