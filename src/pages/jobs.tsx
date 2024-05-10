import React, { useState } from "react";
import { useSelector } from 'react-redux';
import JobDetailPopup from "@/components/JobDetailPopup";
import Filters from "@/components/Filters";
import { AccountInterface, FiltersInterface, JobInterface } from "@/interfaces/interfaces";
import { useQuery } from '@tanstack/react-query'
import JobsBoard from "@/components/JobsBoard";
import SkeletonJobResult from "@/components/SkeletonJobResult";
import AppliedJobsSidebar from "@/components/AppliedJobsSidebar";
import { useTranslations } from 'next-intl';
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "react-toastify";


export default function Jobs() {

    const tJobs = useTranslations('Jobs');
    const [selectedJob, setSelectedJob] = useState<JobInterface | null>(null);
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);
    const filters = useSelector((state: { filters: FiltersInterface }) => state.filters);
    const debouncedTextQuery = useDebounce(filters.searchTerm, 400);
    const [visibleJobDetailPopup, setVisibleJobDetailPopup] = useState(false);


    const fetchJobs = async (accessToken: string, filters: FiltersInterface) => {
        try {
            const apiUrl = '/api/jobs';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, filters }),
            };

            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                toast.error('Error fetching jobs.');
                // throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            return { status: response.status, data };
        } catch (error) {
            toast.error('Error fetching jobs.');
            console.error('Error occurred during fetching jobs:', error);
            throw error;
        }
    };

    const fetchJobsByIds = async (jobIds: string[], accessToken: string): Promise<any> => {
        try {
            const response = await fetch('/api/getJobsByIds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // fetch & display only the last 5 applications
                body: JSON.stringify({ jobIds: jobIds.slice(-5), accessToken })
            });

            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            toast.error('Error fetching applied jobs.');
            console.error('Error fetching jobs by IDs:', error);
            // throw error;
        }
    };

    const getJobs = async () => {

        if (account.accessToken) {
            const jobsResponse = await fetchJobs(account.accessToken, filters);
            if (jobsResponse.status !== 200) {
                toast.error('Failed to fetch jobs');
                throw new Error('Failed to fetch jobs');
            } else {
                return jobsResponse.data;
            }
        } else {
            return { data: [], meta: { total: 0 } };
        }
    }

    const getAppliedJobs = async () => {

        if (!account.accessToken || !account.user?.appliedJobs || account.user?.appliedJobs?.length === 0) return [];
        const appliedJobsResponse = await fetchJobsByIds(account.user.appliedJobs, account.accessToken);
        if (appliedJobsResponse.status !== 200) {
            toast.error('Error fetching applied jobs');
            // throw new Error('Failed to fetch applied jobs');
        }
        return appliedJobsResponse.data;
    };

    const withdrawJob = async (jobId: string, accessToken: string): Promise<{ status: number; data?: any; }> => {

        try {
            const response = await fetch('/api/withdrawJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId, accessToken })
            });

            if (!response.ok) {
                toast.error('Failed to withdraw job');
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to withdraw');
            }

            const data = await response.json();
            return { status: response.status, data };
        } catch (error) {
            toast.error('Error during withdraw');
            console.error('Error during withdraw:', error);
            throw error;
        }
    };

    // jobs with debounced text query 
    const { isFetching, error, data: jobs } = useQuery({
        queryKey: ['jobs', filters.searchTerm !== "" ? debouncedTextQuery : '', filters.resultsPerPage, filters.queryPage, filters.searchField, account.accessToken],
        queryFn: () => getJobs(),
        placeholderData: previousData => previousData ?? { data: [], meta: { total: 0 } },
        staleTime: 180000,
    });

    // applied jobs
    const { isFetching: appliedJobsFetching, error: appliedJobsError, data: appliedJobs } = useQuery({
        queryKey: ['appliedJobs', account.user?.appliedJobs, account.accessToken],
        queryFn: () => getAppliedJobs(),
        placeholderData: previousData => previousData ?? [],
        staleTime: Infinity,
    })

    if (error) {
        toast.error('Error fetching jobs');
        console.error('Error fetching jobs:', error);
    }

    if (appliedJobsError) {
        toast.error('Error fetching applied jobs');
        console.error('Error fetching applied jobs:', appliedJobsError);
    }

    return (
        <div>

            {!account.accessToken &&
                <h1 className="text-3xl mt-24 w-2/3 font-bold mx-auto text-center sm:text-5xl">
                    {tJobs('loginMessage')}
                </h1>
            }

            {account.accessToken &&
                <div className="pb-20">
                    <Filters />
                    <div className="flex box-border flex-col sm:flex-row">
                        <div className="w-full sm:w-3/4">
                            {isFetching &&
                                <div>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <SkeletonJobResult key={index} />
                                    ))}
                                </div>
                            }
                            {jobs &&
                                <JobsBoard
                                    jobs={jobs}
                                    setSelectedJob={setSelectedJob}
                                    withdrawJob={withdrawJob}
                                    setVisibleJobDetailPopup={setVisibleJobDetailPopup}
                                />
                            }
                        </div>
                        <AppliedJobsSidebar isFetching={appliedJobsFetching} appliedJobs={appliedJobs} />
                    </div>
                </div>
            }

            {selectedJob && visibleJobDetailPopup &&
                <JobDetailPopup
                    job={selectedJob}
                    withdrawJob={withdrawJob}
                    setVisibleJobDetailPopup={setVisibleJobDetailPopup} />
            }

        </div>
    );
}

export async function getStaticProps(context: any) {
    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default
        }
    };
}