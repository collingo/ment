'use strict';

import cons from 'consolidate';
import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import rethinkdb from 'rethinkdb';
import http from 'http';
import path from 'path';
import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';

import manifest from '../../package.json';

let app = express();

app.set('port', 8888);
app.set('host', process.env.VIRTUAL_HOST || ('http://localhost:' + app.get('port') + '/'));
app.set('x-powered-by', false);
app.engine('html', cons.lodash);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './templates'));

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    return done(null, {
      id: 1,
      username: username
    });
  }
));

// rethinkdb connection
app.use((req, res, next) => {
  rethinkdb.connect({
    host: process.env.DB_PORT_28015_TCP_ADDR,
    port: process.env.DB_PORT_28015_TCP_PORT,
    authKey: "",
    db: "ment"
  }, function(error, conn) {
    if (error) {
      console.log(error);
    }
    else {


      // passport.use(new GoogleStrategy({
      //   clientID: google.web.client_id,
      //   clientSecret: google.web.client_secret,
      //   callbackURL: google.web.redirect_uris[0]
      // },
      // function (accessToken, refreshToken, profile, done) {
      //   lookup(profile)
      //     .then((user) => {
      //       done(null, user);
      //     })
      //     .catch((err) => {
      //       console.log('auth error', err);
      //       done(err);
      //     });
      // }));
      //
      // function lookup(profile) {
      //   const email = profile.emails[0].value;
      //   if(!email.match(/ustwo\.com$/)) {
      //     return Q(profile);
      //   }
      //   return r
      //     .table('users')
      //     .filter({email: email})
      //     .nth(0)
      //     .run(dbConnection)
      //     .then((user) => {
      //       if (user) {
      //         return user;
      //       } else {
      //         console.log('No matching user - ', email);
      //         return false;
      //       }
      //     });
      // }

      req.dbConnection = conn;
      next();
    }
  });
});

app.use(express.static(path.join(__dirname, './public')));
app.use('/', require('./routes.js'));

http.createServer(app).listen(app.get('port'));
console.log(`${capitalize(camelCase(manifest.name))} up and running on ${app.get('host')}`);

// Middleware to close a connection to the database
app.use((req, res, next) => {
  req.dbConnection.close();
});
