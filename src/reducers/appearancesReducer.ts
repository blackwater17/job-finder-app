const initialState = {
    showLoginPopup: false,
    showSignupPopup: false,
}

interface AppearancesAction {
    type: string;
    payload: boolean;
}

const appearancesReducer = (state = initialState, action: AppearancesAction) => {
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
        default:
            return state;
    }
}

export default appearancesReducer;