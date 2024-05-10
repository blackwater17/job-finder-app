import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toggleSignupPopup, toggleLoginPopup } from '@/actions/appearances';
import { setAccount } from '@/actions/account';
import { signup } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/interfaces/interfaces';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

export default function SignupPopup() {

    const tHome = useTranslations('Home');
    const tButtons = useTranslations('ButtonTexts');
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: (info: any) => {
            if (info.status === 200) {
                dispatch(toggleSignupPopup());
                dispatch(setAccount(info.data));
            } else {
                toast.error(info.message || 'Failed to signup.');
            }
        },
        onError: (error) => {
            toast.error('Error occurred during signup.');
        },
    });

    const onSubmit = async (newAccountData: LoginFormData) => {
        try {
            await mutation.mutateAsync(newAccountData);
        } catch (error) {
            toast.error('Error occurred during signup.');
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white relative p-8 rounded-lg w-80">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-black">{tButtons('signup')}</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder={tHome('email')}
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-red-500">
                            {tHome('requiredEmail')}
                        </span>}
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            type="password"
                            placeholder={tHome('password')}
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span className="text-red-500">
                            {tHome('requiredPassword')}
                        </span>}
                    </div>
                    <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
                        type="submit"
                    >
                        {tButtons('signup')}
                    </button>
                </form>
                <div className="text-center text-black">
                    {tHome('alreadyRegisteredQuestion')} <span className="cursor-pointer text-blue-500" onClick={() => {
                        dispatch(toggleSignupPopup());
                        dispatch(toggleLoginPopup());
                    }}>{tButtons('login')}</span>
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