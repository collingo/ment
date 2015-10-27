import browserify from 'browserify';
import express from 'express';
import React from 'react';
// import Helmet from 'react-helmet';
// import omit from 'lodash/object/omit';

// const isomorphic = true;
// console.log('Isomorphic:', isomorphic);
let router = express.Router();

function renderApp(req, res) {
  // if (isomorphic) {
  //   const Store = require('../app/store');
  //   Store.init(req.protocol + '://' + req.hostname + req.originalUrl, req.get('Host-API'), `https://${process.env.DOCKER_PROXY_HOST}:${process.env.PROXY_HTTPS_PORT}`)
  //     .then((state) => {
  //       const App = React.createFactory(require('../app/components/app'));
  //       const AppString = React.renderToString(App({
  //         state: omit(state, 'takeover')
  //       }));
  //       const head = Helmet.rewind();
  //       res
  //         .status(state.statusCode)
  //         .render('app', {
  //           title: head.title,
  //           meta: head.meta,
  //           link: head.link,
  //           state: JSON.stringify(state),
  //           app: AppString
  //         });
  //     })
  //     .catch(error => console.log('server route error', error, error.stack));
  // } else {
    res
      .render('app', {
        title: '',
        meta: '',
        link: '',
        state: '""',
        app: ''
      });
  // }
}

router.get('/*', renderApp);

export default router;
