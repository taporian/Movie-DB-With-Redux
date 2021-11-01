import { Strategy, ExtractJwt } from 'passport-jwt';
import key from '../db/config.js';
import  User  from '../model/userModel.js';
 const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = key.JWT_SECRET;
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            _id: user._id
          });
        }
        return done(null, false);
      });
    })
  );
};

export default applyPassportStrategy;
