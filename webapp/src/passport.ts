import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from './modules/user/user.model.js';
import bcrypt from 'bcryptjs';
const passportInit = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userName',
        passwordField: 'password',
      },
      function (userName, password, done) {
        UserModel.findOne({ userName }).then(async (User) => {
          if (!User) {
            return done(null, false, { message: 'User does not exist' });
          }
          const isPasswordValid = await bcrypt.compare(password, User.password);
          if (!isPasswordValid) {
            return done(null, false, { message: 'Password is not valid.' });
          }
          return done(null, User);
        });
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};

export default passportInit;
