export const FormRenianReducer = (state, action) => {
  switch (action.type) {
    case "[FormReducer] - SET FORM":
      return {
        ...state,
        form: action.payload,
      };

    default:
      return state;
  }
};
