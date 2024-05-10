import React from 'react';

const SkeletonJobResult: React.FC = () => {
    return (
        <div className="flex px-10 py-6 min-h-[170px] w-full border border-black flex-col sm:flex-row">
            <div>
                <div className="animate-pulse bg-gray-500 rounded-full h-8 w-8"></div>
            </div>
            <div className="w-full px-8 flex flex-col justify-center">
                <div className="animate-pulse bg-gray-500 h-6 w-3/4 mb-2"></div>
                <div className="animate-pulse bg-gray-500 h-6 w-1/2 mb-2"></div>
                <div className="animate-pulse bg-gray-500 h-6 w-1/4 mb-2"></div>
                <div className="animate-pulse bg-gray-500 h-6 w-1/4"></div>
                <div className="mt-3 flex">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <span key={index} className="m-1 animate-pulse inline-block bg-gray-500 rounded-md h-4"></span>
                    ))}
                </div>
            </div>
            <div className="align-right text-right">
                <button className="animate-pulse m-2 bg-gray-500 text-gray-400 py-1 w-24 rounded-md shadow-md text-sm focus:outline-none"></button>
                <button className="animate-pulse m-2 bg-gray-500 text-gray-400 py-1 w-24 rounded-md shadow-md text-sm focus:outline-none"></button>
            </div>
        </div>
    );
}

export default SkeletonJobResult;
