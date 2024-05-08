import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import JobDetailPopup from "@/components/JobDetailPopup";
import { toggleJobDetailPopup } from "@/actions/appearances";
import { getJobs, getJobsByIds, withdrawJob } from '@/utils/functions';
import Filters from "@/components/Filters";
import { queryNextPage, queryPreviousPage } from "@/actions/filters";
import {
    useQuery,
} from '@tanstack/react-query'


export default function Jobs() {

    const dispatch = useDispatch();
    const [selectedJob, setSelectedJob] = useState({} as any);
    const account = useSelector((state: any) => state.account.account);
    const filters = useSelector((state: any) => state.filters);

    const fetchJobs = async () => {
        if (!account.accessToken) {
            throw new Error('Access token is not available');
        }
        const jobsResponse = await getJobs(account.accessToken, filters);
        return jobsResponse;
    }

    const fetchAppliedJobs = async () => {
        if (!account.accessToken || account.user.appliedJobs.length === 0) return [];
        const appliedJobsResponse = await getJobsByIds(account.user.appliedJobs, account.accessToken);
        return appliedJobsResponse;
    };

    // jobs
    const { isLoading, error, data: jobs } = useQuery({
        queryKey: ['jobs', filters],
        queryFn: () => fetchJobs(),
    })

    // applied jobs
    const { isLoading: appliedJobsLoading, error: appliedJobsError, data: appliedJobs } = useQuery({
        queryKey: ['appliedJobs'],
        queryFn: () => fetchAppliedJobs(),
    })

    const handleApplyToJob = async (jobId: string) => {
        withdrawJob(jobId, account.accessToken).then((response) => {
            if (response.status === 200) {
                alert('Withdrawn successfully');
            }
        });
    }

    const getTotalPagesCount = (totalResultsCount: number) => {
        return Math.ceil(totalResultsCount / filters.resultsPerPage);
    }

    return (
        <div className="jobs-page">

            {!account.accessToken &&
                <div className="flex justify-center items-center mt-24">
                    <h1 className="text-5xl font-bold">Login/Sign Up to view job board</h1>
                </div>
            }

            <div className="pb-20">
                <Filters />
                <div className="flex box-border">
                    <div className="jobs-column w-3/4">
                        {jobs &&
                            <div>
                                {jobs.data.map((job: any, index: number) => (

                                    <div key={index} className="flex px-10 py-6 min-h-[170px] w-full border border-black">

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                                <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M22 12H2" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7 12V14" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M17 12V14" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>

                                        <div className="w-full px-8 flex flex-col justify-center">
                                            <h1 className="text-2xl font-bold mb-2">{job.companyName} - {job.name}</h1>
                                            <p className="mb-2">{job.description}</p>
                                            <p><strong>Location: </strong>{job.location}</p>
                                            <p><strong>Salary: </strong>{job.salary}</p>
                                            <div className='mt-3'>
                                                {job.keywords.map((keyword: string, index: number) => (
                                                    <span key={index} className="m-1 inline-block w-20 text-center bg-gray-200 text-gray-800 py-1 px-2 rounded-md shadow-md text-xs">{keyword}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="align-right text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedJob(job)
                                                    dispatch(toggleJobDetailPopup());
                                                }}
                                                className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                                Detail
                                            </button>
                                            {account.user.appliedJobs.includes(job.id) &&
                                                <button
                                                    onClick={() => {
                                                        handleApplyToJob(job.id)
                                                    }}
                                                    className="m-2 border border-white text-white-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
                                                    Withdraw
                                                </button>
                                            }
                                        </div>
                                    </div>

                                ))}

                                {getTotalPagesCount(jobs.meta.total) > 1 &&
                                    <div className="flex justify-center items-center mt-4">

                                        <button
                                            className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                                            onClick={() => {
                                                dispatch(queryPreviousPage())
                                            }}
                                        >
                                            Previous
                                        </button>

                                        <div className="mx-4">{filters.queryPage}/{getTotalPagesCount(jobs.meta.total)}</div>

                                        {filters.queryPage !== jobs.totalPagesCount &&
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
                        }
                        {isLoading && <div>Loading...</div>}
                        {jobs && jobs.data.length === 0 && <div>No jobs found</div>}
                    </div>
                    {appliedJobs &&
                        <div className="applied-column w-1/4">
                            <div className="p-10 flex flex-col justify-center items-center text-2xl border border-black">
                                <img alt="profile pic" src={account.user.profileImage} width="30" />
                                <h3 className="text-xs m-2">{account.user.email}</h3>
                                <h2 className="text-sm m-2">Applied Jobs</h2>

                                {appliedJobs.map((job: any, index: number) => (
                                    <div key={index} className="p-4 my-2 bg-gray-700 w-full flex flex-col text-sm border border-black">
                                        <div className="text-center">
                                            <h3 className="pb-2"><strong>{job.name}</strong></h3>
                                        </div>
                                        <p><strong>Company name: </strong>{job.companyName}</p>
                                        <p><strong>Location: </strong>{job.location}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    }
                </div>
            </div>


            {selectedJob &&
                <JobDetailPopup job={selectedJob} />
            }

        </div>
    );
}