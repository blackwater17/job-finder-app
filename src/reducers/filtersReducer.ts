const initialState = {
    searchTerm: "",
    searchField: "name",
    resultsPerPage: 10,
    queryPage: 1,
};

interface FiltersAction {
    type: string;
    payload?: unknown;
}

const filtersReducer = (state = initialState, action: FiltersAction) => {
    switch (action.type) {
        case "SET_SEARCH_FIELD":
            return {
                ...state,
                searchField: action.payload,
                searchTerm: "",
            };
        case "SET_SEARCH_TERM":
            return {
                ...state,
                searchTerm: action.payload,
                queryPage: 1
            };
        case "SET_RESULTS_PER_PAGE":
            return {
                ...state,
                resultsPerPage: action.payload,
                queryPage: 1
            };
        case "QUERY_NEXT_PAGE":
            return {
                ...state,
                queryPage: state.queryPage + 1
            };
        case "QUERY_PREVIOUS_PAGE":
            if (state.queryPage > 1) {
                return {
                    ...state,
                    queryPage: state.queryPage - 1
                };
            } else {
                return state;
            }

        default:
            return state;
    }
};

export default filtersReducer;