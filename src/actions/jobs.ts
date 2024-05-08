export const setJobResults = (jobResults: any) => {
    return {
        type: 'SET_JOB_RESULTS',
        payload: jobResults
    };
}

export const setTotalPagesCount = (totalPagesCount: number) => {
    return {
        type: 'SET_TOTAL_PAGES_COUNT',
        payload: totalPagesCount
    };
}

export const setAppliedJobs = (appliedJobs: any) => ({
    type: "SET_APPLIED_JOBS",
    payload: appliedJobs,
});