import jwt from 'jsonwebtoken';
import nookies from 'nookies';

const verifyToken = (ctx) => {
  const jwtToken = nookies.get(ctx).token;

  if (!jwtToken) {
    return { user: null, authenticated: false };
  }

  try {
    const { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    return { user: userId, authenticated: true };
  } catch {
    return { user: null, authenticated: false };
  }
};

const getUserData = async (userId) => {
  try {
    const res = await fetch(`${process.env.BASE_URI || ''}/api/settings/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const logout = () => {

};

export { verifyToken, getUserData, logout };
