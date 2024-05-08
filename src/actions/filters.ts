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