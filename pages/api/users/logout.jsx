import nookies from 'nookies';

const logout = async (req, res) => {
  try {
    nookies.set({ req, res }, 'userName', '', { path: '/', maxAge: 0 });
    nookies.set({ req, res }, 'token', '', { path: '/', maxAge: 0 });
    res.status(200).json({ status: 'success', logout: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default async (req, res) => {
  switch (req.method) {
  case 'GET':
    return logout(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
