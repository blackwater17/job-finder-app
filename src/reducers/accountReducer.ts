const initialState = {
    account: {
        user: {
            appliedJobs: [],
        }
    },
};

interface AccountAction {
    type: string;
    payload?: unknown;
}

const accountReducer = (state = initialState, action: AccountAction) => {
    switch (action.type) {
        case "SET_ACCOUNT":
            return {
                ...state,
                account: action.payload,
            };
        case "WITHDRAW_FROM_JOB":
            return {
                ...state,
                account: {
                    ...state.account,
                    user: {
                        ...state.account.user,
                        appliedJobs: state.account.user.appliedJobs.filter((jobId: string) => jobId !== action.payload)
                    }
                }
            };

        case "APPLY_JOB":
            return {
                ...state,
                account: {
                    ...state.account,
                    user: {
                        ...state.account.user,
                        appliedJobs: state.account.user.appliedJobs
                            ? [...state.account.user.appliedJobs, action.payload]
                            : [action.payload]
                    }
                }
            };

        default:
            return state;
    }
};

export default accountReducer;