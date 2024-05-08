const initialState = {
    jobResults: [],
    appliedJobs: [],
};

const jobResultsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_JOB_RESULTS":
            return {
                ...state,
                jobResults: action.payload
            };

        case "SET_APPLIED_JOBS":
            return {
                ...state,
                appliedJobs: action.payload
            };
        default:
            return state;
    }
};

export default jobResultsReducer;