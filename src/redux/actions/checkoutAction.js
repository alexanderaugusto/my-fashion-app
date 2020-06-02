export const changeCheckoutStep = (checkoutStep,navigation) => async dispatch => {
  dispatch({
    type: "CHANGE_STEP",
    checkoutStep
  })
}

export const activeCheckout = (isCheckout) => dispatch => dispatch({ type: "ACTIVE_CHECKOUT", isCheckout })