import React from 'react';
import { JobInterface } from '@/interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { AccountInterface, FiltersInterface } from '@/interfaces/interfaces';
import { withdrawFromJob } from "@/actions/account";
import { queryNextPage, queryPreviousPage } from "@/actions/filters";

interface Props {
    jobs: { data: JobInterface[], meta: { total: number, page: number, perPage: number } };
    setSelectedJob: (job: JobInterface) => void;
    setVisibleJobDetailPopup: (visible: boolean) => void;
    withdrawJob: (jobId: string, accessToken: string | undefined) => Promise<any>;
}

const JobsBoard: React.FC<Props> = ({ jobs, setVisibleJobDetailPopup, withdrawJob, setSelectedJob }) => {

    const account = useSelector((state: { account: AccountInterface }) => state.account.account);
    const filters = useSelector((state: { filters: FiltersInterface }) => state.filters);
    const dispatch = useDispatch();


    const handleWithdrawJob = async (jobId: string) => {
        withdrawJob(jobId, account.accessToken).then((response) => {
            if (response.status === 200) {
                dispatch(withdrawFromJob(jobId));
            } else {
                console.error("Failed to withdraw job:", response.status);
                alert("Error withdrawing job");
            }
        });
    }

    const getTotalPagesCount = (total: number, resultsPerPage: string) => {
        return Math.ceil(total / parseInt(resultsPerPage));
    };

    return (
        <div className="w-full sm:w-3/4">

            <div>
                {jobs.data.map((job: JobInterface, index: number) => (
                    <div key={index} className="flex px-10 py-6 min-h-[170px] w-full border border-black flex-col sm:flex-row">
                        <div>
                            <img alt="work bag icon" src="/work-bag.svg" width="30" />
                        </div>
                        <div className="w-full px-8 flex flex-col justify-center">
                            <h1 className="text-2xl font-bold mb-2">{job.companyName} - {job.name}</h1>
                            <p className="mb-2">{job.description}</p>
                            <p><strong>Location: </strong>{job.location}</p>
                            <p><strong>Salary: </strong>{job.salary}</p>
                            <div className='mt-3'>
                                {job.keywords.map((keyword: string, index: number) => (
                                    <span key={index} className="m-1 inline-block w-20 text-center bg-gray-200 text-gray-800 py-1 px-2 rounded-md shadow-md text-xs">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="align-right text-right">
                            <button
                                onClick={() => {
                                    setSelectedJob(job)
                                    setVisibleJobDetailPopup(true)
                                }}
                                className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                Detail
                            </button>
                            {account.user?.appliedJobs?.includes(job.id) &&
                                <button
                                    onClick={() => {
                                        handleWithdrawJob(job.id)
                                    }}
                                    className="m-2 border border-white text-white-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
                                    Withdraw
                                </button>
                            }
                        </div>
                    </div>
                ))}
                {getTotalPagesCount(jobs.meta.total, filters.resultsPerPage) > 1 &&
                    <div className="flex justify-center items-center mt-4">

                        <button
                            className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                            onClick={() => {
                                dispatch(queryPreviousPage())
                            }}
                        >
                            Previous
                        </button>

                        <div className="mx-4">
                            {filters.queryPage}
                            /
                            {getTotalPagesCount(jobs.meta.total, filters.resultsPerPage)}
                        </div>

                        {filters.queryPage !== 999 &&
                            <button
                                className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                                onClick={() => {
                                    dispatch(queryNextPage())
                                }}
                            >
                                Next
                            </button>
                        }
                    </div>
                }
            </div>

            {/* {isLoading && <div>Loading...</div>} */}

            {jobs.data.length === 0 && <div>No jobs found</div>}

        </div>
    );
};

export default JobsBoard;