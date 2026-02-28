import crypto from 'crypto';
import UserModel from '../user/user.model.js';

export function generateHmacSha256(secretKey: string, message: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('hex');
}

export const generateCSRFToken = () => crypto.randomBytes(64).toString('hex');

export const validateCSRFToken = (req, res, next) => {
  const csrfToken = req.headers['x-csrf-token'];
  if (!csrfToken) return res.status(401).send('Unauthorized');
  const secretToken = generateHmacSha256(
    process.env.SECRET_KEY_CSRF,
    csrfToken,
  );
  if (secretToken !== req.cookies.secretCsrfToken) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

export const isAuthenticated = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const { id } = req.headers;
    const user = await UserModel.findById(id);
    req.user = user;
    return next();
  }
  validateCSRFToken(req, res, next);
};
