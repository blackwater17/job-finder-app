import React from 'react';
import { JobInterface } from '@/interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { FiltersInterface } from '@/interfaces/interfaces';
import { queryNextPage, queryPreviousPage } from "@/actions/filters";
import { useTranslations } from 'next-intl';
import JobResult from './JobResult';

interface Props {
    jobs: { data: JobInterface[], meta: { total: number, page: number, perPage: number } };
    setSelectedJob: (job: JobInterface) => void;
    setVisibleJobDetailPopup: (visible: boolean) => void;
    withdrawJob: (jobId: string, accessToken: string) => Promise<any>;
}

const JobsBoard: React.FC<Props> = ({ jobs, setVisibleJobDetailPopup, withdrawJob, setSelectedJob }) => {

    const tJobs = useTranslations('Jobs');
    const tButtons = useTranslations('ButtonTexts');
    const filters = useSelector((state: { filters: FiltersInterface }) => state.filters);
    const dispatch = useDispatch();

    const getTotalPagesCount = (total: number, resultsPerPage: number) => {
        return Math.ceil(total / resultsPerPage);
    };

    return (
        <div>
            <div>
                {jobs.data.map((job: JobInterface, index: number) => (
                    <JobResult
                        job={job}
                        setSelectedJob={setSelectedJob}
                        setVisibleJobDetailPopup={setVisibleJobDetailPopup}
                        withdrawJob={withdrawJob}
                        key={index}
                    />
                ))}
                {getTotalPagesCount(jobs.meta.total, filters.resultsPerPage) > 1 &&
                    <div className="flex justify-center items-center mt-4">

                        <button
                            className="m-2 bg-white text-gray-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                            onClick={() => {
                                dispatch(queryPreviousPage())
                            }}
                        >
                            {tButtons('previous')}
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
                                {tButtons('next')}
                            </button>
                        }
                    </div>
                }
            </div>
            {jobs.data.length === 0 && (
                <div className="my-12 mx-8 text-gray-400 text-center text-3xl">
                    {tJobs('noJobsFound')}
                </div>
            )}
        </div>
    );
};

export default JobsBoard;