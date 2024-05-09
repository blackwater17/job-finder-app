import { AccountInterface } from "../interfaces/interfaces";

export const setAccount = (accountData: AccountInterface) => ({
    type: "SET_ACCOUNT",
    payload: accountData,
});

export const withdrawFromJob = (jobId: string) => ({
    type: "WITHDRAW_FROM_JOB",
    payload: jobId,
});

export const applyJob = (jobId: string) => ({
    type: "APPLY_JOB",
    payload: jobId,
});