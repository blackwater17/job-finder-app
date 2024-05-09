import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchField, setSearchTerm, setResultsPerPage } from '@/actions/filters'
import { FiltersInterface } from "../interfaces/interfaces";
import { useTranslations } from 'next-intl';

export default function Filters() {

    const tJobs = useTranslations('Jobs');
    const dispatch = useDispatch()
    const filters = useSelector((state: { filters: FiltersInterface }) => state.filters);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    }

    const handleResultsPerPageChange = () => (e: ChangeEvent<HTMLSelectElement>) => {
        const resultsPerPage = e.target.value;
        dispatch(setResultsPerPage(resultsPerPage));
    }

    const handleQueryFieldChange = () => (e: ChangeEvent<HTMLSelectElement>) => {
        const searchField = e.target.value;
        dispatch(setSearchField(searchField));
    }

    return (
        <div className="flex mt-8 p-6 items-center w-full bg-gray-700">
            <div className="mr-4">
                <label>
                    {tJobs('basicFilter')}
                </label>
                <select onChange={handleQueryFieldChange()} value={filters.searchField} className="ml-2 p-2 bg-gray-500 text-white">
                    <option value="name">{tJobs('name')}</option>
                    <option value="companyName">{tJobs('companyName')}</option>
                    <option value="location">{tJobs('location')}</option>
                </select>
            </div>
            <input value={filters.searchTerm} type="text" onChange={handleInputChange} className="w-1/4 p-2 outline-none border-none text-black" placeholder={tJobs('searchForJobs')} />
            <div className="ml-4">
                <label>{tJobs('resultsPerPage')}</label>
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
