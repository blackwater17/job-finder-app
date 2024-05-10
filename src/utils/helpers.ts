import { LoginFormData } from "@/interfaces/interfaces";
import { toast } from 'react-toastify';

export const login = async (loginInfo: LoginFormData): Promise<any> => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, data: errorData };
            // throw new Error(errorData.message || 'Failed to log in');
        }

        const responseData = await response.json();
        return { status: response.status, data: responseData };

    } catch (error) {
        toast.error('Error occurred during login.');
        console.error('Error occurred during login:', error);
    }
};

export const signup = async (accountInfo: LoginFormData): Promise<any> => {
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountInfo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, data: errorData, message: errorData.error };
            // throw new Error(errorData.error || 'Failed to sign up');
        }

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        toast.error('Error occurred during signup.');
        console.error('Error occurred during signup:', error);
        // throw error;
    }
};