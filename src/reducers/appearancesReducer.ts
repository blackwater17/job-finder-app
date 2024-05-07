const initialState = {
    showLoginPopup: false,
    showSignupPopup: false,
    showJobDetailPopup: false,
}

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN_POPUP':
            return {
                ...state,
                showLoginPopup: !state.showLoginPopup
            }
        case 'TOGGLE_SIGNUP_POPUP':
            return {
                ...state,
                showSignupPopup: !state.showSignupPopup
            }
        case 'TOGGLE_JOB_DETAIL_POPUP':
            return {
                ...state,
                showJobDetailPopup: !state.showJobDetailPopup
            }
        default:
            return state;
    }
}

export default rootReducer;