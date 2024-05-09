import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toggleSignupPopup, toggleLoginPopup } from '@/actions/appearances';
import { setAccount } from '@/actions/account';
import { signup } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/interfaces/interfaces';


export default function SignupPopup() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            dispatch(toggleSignupPopup());
            dispatch(setAccount(data));
        },
        onError: (error) => {
            alert("Error during registering")
        },
    });

    const onSubmit = async (newAccountData: LoginFormData) => {
        try {
            await mutation.mutateAsync(newAccountData);
        } catch (error) {
            // Error handling is done in onError callback
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white relative p-8 rounded-lg w-80">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-black">SIGN UP</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Email is required</span>}
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span className="text-red-500">Password is required</span>}
                    </div>
                    <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-center text-black">
                    Already have an account? <span className="cursor-pointer text-blue-500" onClick={() => {
                        dispatch(toggleSignupPopup());
                        dispatch(toggleLoginPopup());
                    }}>Log In</span>
                </div>
                <button
                    className="absolute text-black top-1 right-2 text-black px-3 py-1 text-xl rounded-md focus:outline-none"
                    onClick={() => dispatch(toggleSignupPopup())}
                >
                    x
                </button>
            </div>
        </div>
    );
}