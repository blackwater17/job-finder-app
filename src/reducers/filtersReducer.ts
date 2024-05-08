const initialState = {
    searchTerm: "",
    resultsPerPage: 10,
};

const filtersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return {
                ...state,
                searchTerm: action.payload
            };
        case "SET_RESULTS_PER_PAGE":
            return {
                ...state,
                resultsPerPage: action.payload
            };
        default:
            return state;
    }
};

export default filtersReducer;