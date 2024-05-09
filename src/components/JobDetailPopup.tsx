import React, { Dispatch, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withdrawFromJob, applyJob } from '@/actions/account'
import { JobInterface, AccountInterface } from '@/interfaces/interfaces'
import { useTranslations } from 'next-intl';

interface Props {
    job: JobInterface,
    setVisibleJobDetailPopup: Dispatch<SetStateAction<boolean>>,
    withdrawJob: (jobId: string, accessToken: string | undefined) => Promise<{ status: number; data?: any; }>
}

export default function JobDetailPopup({ job, setVisibleJobDetailPopup, withdrawJob }: Props) {

    const tJobs = useTranslations('Jobs');
    const tButtons = useTranslations('ButtonTexts');
    const dispatch = useDispatch();
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);

    const applyToJob = async (jobId: string, accessToken: string | undefined): Promise<{ status: number; data?: any; }> => {

        try {
            const response = await fetch('/api/applyToJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId, accessToken })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to apply');
            }

            const data = await response.json();
            return { status: response.status, data };
        } catch (error) {
            console.error('Error applying to job:', error);
            throw error;
        }
    };

    const handleApplyToJob = async () => {
        const response = await applyToJob(job.id, account.accessToken);
        if (response.status === 200) {
            setVisibleJobDetailPopup(false);
            dispatch(applyJob(job.id));
        } else {
            console.error("Failed to apply to job:", response.status);
            alert("Error applying to job");
        }
    }

    const handleWithdrawJob = async () => {
        const response = await withdrawJob(job.id, account.accessToken);
        if (response.status === 200) {
            setVisibleJobDetailPopup(false);
            dispatch(withdrawFromJob(job.id));
        } else {
            console.error("Failed to withdraw job:", response.status);
            alert("Error withdrawing job");
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white text-black relative p-8 rounded-lg w-96">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-black">
                        {!account.user?.appliedJobs?.includes(job.id) ? 'Apply Job' : 'Withdraw Job'}
                    </h2>
                </div>
                <div className="mb-4 text-sm">
                    <p><strong>{tJobs('companyName')}: </strong>{job.companyName}</p>
                    <p><strong>{tJobs('jobName')}: </strong>{job.name}</p>
                    <p><strong>{tJobs('createdAt')}: </strong>{job.createdAt}</p>
                    <p><strong>{tJobs('location')}: </strong>{job.location}</p>
                    {job.keywords.length > 0 &&
                        <div className='mb-4 mt-2'>
                            <p className="mb-1"><strong>{tJobs('keyword')}:</strong></p>
                            {job.keywords.map((keyword: string, index: number) => (
                                <span key={index} className="m-1 inline-block bg-gray-200 text-gray-800 py-1 px-2 rounded-md shadow-md text-xs">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    }
                    <p><strong>{tJobs('salary')}: </strong>{job.salary}</p>
                    <p className="mb-2"><strong>{tJobs('jobDescription')}</strong></p>
                    <p className="p-5 border border-gray-300">{job.description}</p>
                </div>

                <div className="flex justify-center">
                    <button
                        className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                        onClick={() => {
                            setVisibleJobDetailPopup(false)
                        }}
                    >
                        {tButtons('close')}
                    </button>

                    <button
                        className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:bg-gray-500 ml-2"
                        onClick={() => {
                            if (account.user?.appliedJobs?.includes(job.id)) {
                                handleWithdrawJob();
                            } else {
                                handleApplyToJob();
                            }
                        }}
                    >
                        {!account.user?.appliedJobs?.includes(job.id) ? tButtons('apply') : tButtons('withdraw')}
                    </button>

                </div>

                <button
                    className="absolute text-black top-1 right-2 text-black px-3 py-1 text-xl rounded-md focus:outline-none"
                    onClick={() => {
                        setVisibleJobDetailPopup(false)
                    }}
                >
                    x
                </button>

            </div>
        </div>
    )
}