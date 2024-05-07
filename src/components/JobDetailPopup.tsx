// JobDetailPopup.tsx , the job will be get from parameter and show the detail of the job in a popup.

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleJobDetailPopup } from '@/actions/appearances'
import { applyToJob } from '@/utils/functions'

interface Props {
    job: any
}

export default function JobDetailPopup({ job }: Props) {

    const showJobDetailPopup = useSelector((state: any) => state.appearances.showJobDetailPopup)
    const dispatch = useDispatch();
    const account = useSelector((state: any) => state.account.account);

    const handleApplyToJob = async () => {
        const response = await applyToJob(job.id, account.accessToken);
        if (response.status === 200) {
            alert('Applied successfully');
            dispatch(toggleJobDetailPopup());
        }
    }

    return (
        showJobDetailPopup &&
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white text-black relative p-8 rounded-lg w-96">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Apply Job</h2>
                </div>
                <div className="mb-4 text-sm">
                    <p><strong>Company name: </strong>{job.companyName}</p>
                    <p><strong>Job name: </strong>{job.name}</p>
                    <p><strong>Created At: </strong>{job.createdAt}</p>
                    <p><strong>Location: </strong>{job.location}</p>
                    {job.keywords.length > 0 &&
                        <div className='mb-4 mt-2'>
                            <p className="mb-1"><strong>Keyword:</strong></p>
                            {job.keywords.map((keyword: string, index: number) => (
                                <span key={index} className="m-1 inline-block bg-gray-200 text-gray-800 py-1 px-2 rounded-md shadow-md text-xs">{keyword}</span>
                            ))}
                        </div>
                    }
                    <p><strong>Salary: </strong>{job.salary}</p>
                    <p className="mb-2"><strong>Job Description</strong></p>
                    <p className="p-5 border border-gray-300">{job.description}</p>
                </div>

                <div className="flex justify-between">
                    <button
                        className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                        onClick={() => dispatch(toggleJobDetailPopup())}
                    >
                        Close
                    </button>
                    <button
                        className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2"
                        onClick={handleApplyToJob}
                    >
                        Apply
                    </button>
                </div>

                <button
                    className="absolute text-black top-1 right-2 text-black px-3 py-1 text-xl rounded-md focus:outline-none"
                    onClick={() => dispatch(toggleJobDetailPopup())}
                >
                    x
                </button>

            </div>
        </div>
    )
}