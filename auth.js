const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const person = require("./models/person");


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        // console.log('Received credentials:', USERNAME, password);
        const user = await person.findOne({ username:USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;