export const setJobResults = (jobResults: any) => {
    return {
        type: 'SET_JOB_RESULTS',
        payload: jobResults
    };
}

export const setAppliedJobs = (appliedJobs: any) => ({
    type: "SET_APPLIED_JOBS",
    payload: appliedJobs,
});