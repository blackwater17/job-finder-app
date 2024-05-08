export const setSearchField = (searchField: string) => {
    return {
        type: 'SET_SEARCH_FIELD',
        payload: searchField
    };
}

export const setSearchTerm = (searchTerm: string) => {
    return {
        type: 'SET_SEARCH_TERM',
        payload: searchTerm
    };
}

export const setResultsPerPage = (resultsPerPage: number) => {
    return {
        type: 'SET_RESULTS_PER_PAGE',
        payload: resultsPerPage
    };
}

export const queryNextPage = () => {
    return {
        type: 'QUERY_NEXT_PAGE'
    };
}

export const queryPreviousPage = () => {
    return {
        type: 'QUERY_PREVIOUS_PAGE'
    };
}

export const setQueryPage = (queryPage: number) => {
    return {
        type: 'SET_QUERY_PAGE',
        payload: queryPage
    };
}