/* eslint-disable no-unused-vars */
import { UIState } from './'

export enum ActionTypes {
    UI_ToggleMenu = 'UI_ToggleMenu',
}

type UiActionType = {
    type: ActionTypes
}

export const uiReducer = (state: UIState, action: UiActionType):UIState => {
  switch (action.type) {
    case ActionTypes.UI_ToggleMenu:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }
    default:
      return state
  }
}
