export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'This is a GET request' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  }