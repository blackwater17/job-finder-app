export interface LoginFormData {
    email: string;
    password: string;
}

export interface AccountInterface {
    account: {
        accessToken?: string;
        tokenType?: string;
        refreshToken?: string;
        user?: {
            id: string,
            email: string,
            profileImage: string,
            appliedJobs: string[],
        }
    }
}

export interface FiltersInterface {
    searchTerm: string;
    searchField: string;
    resultsPerPage: string;
    queryPage: number;
}

export interface JobInterface {
    id: string;
    name: string;
    companyName: string;
    location: string;
    salary: string;
    createdAt: string;
    description: string;
    keywords: string[];
}

export interface PopupVisibilityInterface {
    showLoginPopup: boolean;
    showSignupPopup: boolean;
}