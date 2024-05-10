import React from 'react';

const SkeletonAppliedJob: React.FC = () => {
  return (
    <div className="p-4 my-2 bg-gray-700 w-full flex flex-col text-sm border border-black">
      <div className="text-center">
        <div className="animate-pulse bg-gray-500 h-6 w-3/4 mb-2 mx-auto"></div>
      </div>
      <div>
        <div className="animate-pulse bg-gray-500 h-4 w-1/2 mb-2"></div>
        <div className="animate-pulse bg-gray-500 h-4 w-1/4 mb-2"></div>
        <div className="animate-pulse bg-gray-500 h-4 w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonAppliedJob;