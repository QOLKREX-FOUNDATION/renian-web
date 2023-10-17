import { FC, useReducer } from 'react'
import { FormRenianContext, FormRenianReducer } from '.'

export const FormRenian_INITIAL_STATE = {
  form: {
    step: 1
  }
}

export const FormRenianProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FormRenianReducer, FormRenian_INITIAL_STATE)

  const setFormState = (property) => {
    console.log('property', property)
    dispatch({
      type: '[FormReducer] - SET FORM',
      payload: property
    })
  }

  return (
    <FormRenianContext.Provider
      value={{
        ...state,
        setFormState
      }}
    >
      {children}
    </FormRenianContext.Provider>
  );
};
