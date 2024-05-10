import React from 'react';
import { AccountInterface, JobInterface } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import SkeletonAppliedJob from './SkeletonAppliedJob';

interface Props {
    appliedJobs?: JobInterface[];
    isFetching: boolean;
}

const AppliedJobsSidebar: React.FC<Props> = ({ appliedJobs, isFetching }) => {

    const tJobs = useTranslations('Jobs');
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);

    return (
        <div className="w-full sm:w-1/4">
            <div className="p-10 flex flex-col justify-center items-center text-2xl border border-black">
                <img alt="profile pic" src={account.user?.profileImage} width="30" />
                <h3 className="text-xs m-2">{account.user?.email}</h3>
                <h2 className="text-sm m-2">
                    {tJobs('appliedJobs')}
                </h2>

                {appliedJobs?.length === 0 &&
                    <p className="text-sm text-center text-gray-400">
                        {tJobs('noApplicationsMessage')}
                    </p>
                }

                {isFetching &&
                    Array.from({ length: Math.min(5, (account.user?.appliedJobs?.length || 0)) }).map((_, index) => (
                        <SkeletonAppliedJob key={index} />
                    ))
                }

                {!isFetching && appliedJobs?.map((job: JobInterface, index: number) => (
                    <div key={index} className="p-4 my-2 bg-gray-700 w-full flex flex-col text-sm border border-black">
                        <div className="text-center">
                            <h3 className="pb-2"><strong>{job.name}</strong></h3>
                        </div>
                        <p><strong>{tJobs('companyName')}: </strong>{job.companyName}</p>
                        <p><strong>{tJobs('location')}: </strong>{job.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedJobsSidebar;