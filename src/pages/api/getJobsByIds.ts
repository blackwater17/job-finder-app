import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { jobIds, accessToken } = req.body;
        try {
            const response = await Promise.all(jobIds.map(async (jobId: string) => {
                return fetch(`https://novel-project-ntj8t.ampt.app/api/jobs/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            }));

            const data = await Promise.all(response.map(async (res) => {
                return res.json();
            }));

            res.status(200).json(data);
        } catch (error) {
            console.error('Error occurred during fetching jobs:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
