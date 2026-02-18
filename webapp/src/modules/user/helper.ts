import passport from 'passport';
import crypto from 'crypto';

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

export const Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      const csrfToken = generateCSRFToken();
      const secretToken = generateHmacSha256(
        process.env.SECRET_KEY_CSRF,
        csrfToken,
      );
      res.cookie('csrfToken', csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000,
      });
      res.cookie('secretCsrfToken', secretToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};
