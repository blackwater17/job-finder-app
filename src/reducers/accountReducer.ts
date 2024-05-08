const initialState = {
    account: {},
};

const accountReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_ACCOUNT":
            return {
                ...state,
                account: action.payload,
            };
        default:
            return state;
    }
};

export default accountReducer;