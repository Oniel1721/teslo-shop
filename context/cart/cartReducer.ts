/* eslint-disable no-unused-vars */
import { ICartProduct } from '../../interfaces'
import { CartState } from './'

enum ActionTypes {
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
    default:
      return state
  }
}
