import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchField, setSearchTerm, setResultsPerPage } from '@/actions/filters'


export default function Filters() {

    const dispatch = useDispatch()
    const filters = useSelector((state: any) => state.filters);

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    }

    const handleResultsPerPageChange = () => (e: any) => {
        const resultsPerPage = e.target.value;
        dispatch(setResultsPerPage(resultsPerPage));
    }

    const handleQueryFieldChange = () => (e: any) => {
        const searchField = e.target.value;
        dispatch(setSearchField(searchField));
    }

    return (
        <div className="flex mt-8 p-6 items-center w-full bg-gray-700">
            <div className="mr-4">
                <label>Basic filter</label>
                <select onChange={handleQueryFieldChange()} value={filters.searchField} className="ml-2 p-2 bg-gray-500 text-white">
                    <option value="name">Name</option>
                    <option value="companyName">Company name</option>
                    <option value="location">Location</option>
                </select>
            </div>
            <input value={filters.searchTerm} type="text" onChange={handleInputChange} className="w-1/4 p-2 outline-none border-none text-black" placeholder="Search for jobs" />
            <div className="ml-4">
                <label>Results per page</label>
                <select onChange={handleResultsPerPageChange()} value={filters.resultsPerPage} className="ml-2 p-2 bg-gray-500 text-white">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    )
}
