const apiUrl = "https://novel-project-ntj8t.ampt.app/api/";

export const login = (accountInfo: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://novel-project-ntj8t.ampt.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountInfo)
            });

            const data = await response.json();
            resolve(data);
        } catch (error) {
            console.error('Error occurred during login:', error);
            reject(error);
        }
    });
};

export const signup = (accountInfo: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://novel-project-ntj8t.ampt.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountInfo)
            });

            const data = await response.json();
            resolve(data);
        } catch (error) {
            console.error('Error occurred during signup:', error);
            reject(error);
        }
    });
};

export const applyToJob = (jobId: string, accessToken: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://novel-project-ntj8t.ampt.app/api/jobs/' + jobId + '/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: "",
            });

            const data = await response.json();
            console.log('Applied to job?', data);
            resolve({
                data, status: 200
            });
        } catch (error) {
            console.error('Error occurred during application:', error);
            reject(error);
        }
    });
}

export const getJobs = (accessToken: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://novel-project-ntj8t.ampt.app/api/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const data = await response.json();
            resolve(data);
        } catch (error) {
            console.error('Error occurred during fetching jobs:', error);
            reject(error);
        }
    });
}

export const getJobsByIds = (jobIds: string[], accessToken: string): Promise<any> => {

    // use GET method on /jobs/:id with Promise.all 
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Promise.all(jobIds.map(async (jobId) => {
                return fetch('https://novel-project-ntj8t.ampt.app/api/jobs/' + jobId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
            }));

            const data = await Promise.all(response.map(async (res) => {
                return res.json();
            }));

            resolve(data);
        } catch (error) {
            console.error('Error occurred during fetching jobs:', error);
            reject(error);
        }
    });
}