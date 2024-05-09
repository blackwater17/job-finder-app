import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, filters } = req.body;

  let apiUrl = 'https://novel-project-ntj8t.ampt.app/api/jobs?perPage=' + filters.resultsPerPage + "&page=" + filters.queryPage;

  if (filters.searchTerm.trim() !== '') {
    apiUrl += '&search%5Bfield%5D=' + filters.searchField + '&search%5Bquery%5D=' + encodeURIComponent(filters.searchTerm);
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.status === 401) {
      res.status(401).json({ error: 'Unauthorized' });
    } else if (!response.ok) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error occurred during fetching jobs:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}