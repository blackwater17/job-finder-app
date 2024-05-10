import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AccountInterface, JobInterface } from '@/interfaces/interfaces';
import { withdrawFromJob } from "@/actions/account";
import { useTranslations } from 'next-intl';

interface Props {
    job: JobInterface;
    setSelectedJob: (job: JobInterface) => void;
    setVisibleJobDetailPopup: (visible: boolean) => void;
    withdrawJob: (jobId: string, accessToken: string | undefined) => Promise<any>;
}

const JobResult: React.FC<Props> = ({ job, setSelectedJob, setVisibleJobDetailPopup, withdrawJob }) => {

    const tJobs = useTranslations('Jobs');
    const tButtons = useTranslations('ButtonTexts');
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);
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

    return (
        <div className="flex px-10 py-6 min-h-[170px] w-full border border-black flex-col sm:flex-row">
            <div>
                <img alt="work bag icon" src="/work-bag.svg" width="30" />
            </div>
            <div className="w-full px-8 flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-2">{job.companyName} - {job.name}</h1>
                <p className="mb-2">{job.description}</p>
                <p><strong>{tJobs('location')}: </strong>{job.location}</p>
                <p><strong>{tJobs('salary')}: </strong>{job.salary}</p>
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
                    {tButtons('details')}
                </button>
                {account.user?.appliedJobs?.includes(job.id) &&
                    <button
                        onClick={() => {
                            handleWithdrawJob(job.id)
                        }}
                        className="m-2 border border-white text-white-800 py-1 w-24 rounded-md shadow-md text-sm hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
                        {tButtons('withdraw')}
                    </button>
                }
            </div>
        </div>
    );
}

export default JobResult;