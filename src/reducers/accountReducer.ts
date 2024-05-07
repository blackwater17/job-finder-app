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
        case "SET_APPLIED_JOBS":
            return {
                ...state,
                account: {
                    ...state.account,
                    appliedJobs: action.payload, // full job datas here, not only job ids
                }
            };

        default:
            return state;
    }
};

export default accountReducer;