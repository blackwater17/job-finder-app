import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { jobId, accessToken } = req.body;
        try {
            const response = await fetch(`https://novel-project-ntj8t.ampt.app/api/jobs/${jobId}/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.status === 401) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                res.status(response.status).json({ error: errorData.message || 'Failed to withdraw' });
                return;
            }

            const data = await response.json();
            res.status(200).json({ data });
        } catch (error) {
            console.error('Error occurred during application:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
