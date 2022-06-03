/* eslint-disable camelcase */
import { useReducer } from 'react'
import { FC } from '../../interfaces'
import { UIContext, uiReducer, ActionTypes } from '.'

export interface UIState {
    isMenuOpen: boolean,
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false
}

export const UIProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: ActionTypes.UI_ToggleMenu })
  }

  return (
    <UIContext.Provider value={{
      ...state,
      toggleSideMenu
    }}>
         { children }
    </UIContext.Provider>
  )
}
