import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import JobDetailPopup from "@/components/JobDetailPopup";
import { toggleJobDetailPopup } from "@/actions/appearances";
import { getJobs, getJobsByIds } from '@/utils/functions';
import { setAppliedJobs } from "@/actions/account";

export default function Jobs() {

    const [jobs, setJobs] = useState([] as any[]);
    const [selectedJob, setSelectedJob] = useState({} as any);
    const account = useSelector((state: any) => state.account.account);

    const dispatch = useDispatch()

    useEffect(() => {
        if (!account.accessToken) return
        console.log('Fetching jobs...');
        getJobs(account.accessToken).then((jobs) => {
            setJobs(jobs.data);
        });
    }, [account.accessToken])

    useEffect(() => {
        if (!account.user || account.user.appliedJobs.length === 0) return
        getJobsByIds(account.user.appliedJobs, account.accessToken).then((jobs) => {
            console.log('Applied jobs:', jobs);
            dispatch(setAppliedJobs(jobs));
        });
    }, [account.user?.appliedJobs])

    return (
        <div className="jobs-page">
            {!account.accessToken &&
                <div className="flex justify-center items-center mt-24">
                    <h1 className="text-5xl font-bold">Login/Sign Up to view job board</h1>
                </div>
            }

            {account.accessToken &&
                <div className="flex box-border">
                    <div className="jobs-column w-3/4">
                        {jobs.map((job, index) => (

                            <div key={index} className="big-column-container flex px-10 py-8 w-full border border-black">

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                        <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M22 12H2" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 12V14" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17 12V14" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>

                                <div className="w-full px-8 flex flex-col justify-center text-xl">
                                    <h3>{job.companyName}</h3>
                                    <p>{job.location}</p>
                                </div>

                                <div className="align-right text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedJob(job)
                                            dispatch(toggleJobDetailPopup());
                                        }}
                                        className="m-2 bg-white text-gray-800 py-1 px-2 rounded-md shadow-md text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                        Detail
                                    </button>
                                </div>

                            </div>

                        ))}
                    </div>
                    <div className="applied-column w-1/4">
                        <div className="p-10 flex flex-col justify-center items-center text-2xl border border-black">
                            <img alt="profile pic" src={account.user.profileImage} width="30" />
                            <h3 className="text-xs m-2">{account.user.email}</h3>
                            <h2 className="text-sm m-2">Applied Jobs</h2>

                            {account.appliedJobs?.map((job: any, index: number) => (
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
                </div>
            }

            {selectedJob &&
                <JobDetailPopup job={selectedJob} />
            }

        </div>
    );
}