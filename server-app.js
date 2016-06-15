/**
 * Dependencies
 */
const debug = require('debug')('aurora-demo-api:server');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

/**
 * Environment
 */
const PORT = process.env.PORT || 3001;

/**
 * Create express app
 */
const app = express();

/**
 * Use gzip compression
 */
app.use(compression());

/**
 * Enable CORS
 */
app.use(cors());

/**
 * Create a routes for data
 */
const dataRouter = express();

/**
 * Add routes to the data router
 */
dataRouter.get('/randomized-data', require('./data-routes/randomized-data'));
dataRouter.get('/personalized-data', require('./data-routes/personalized-data'));
dataRouter.get('/geolocated-data', require('./data-routes/geolocated-data'));

/**
 * Create a router for pages
 */
const pageRouter = express();

/**
 * Add routes to page router
 */
pageRouter.get('/demo', require('./page-routes/demo'));
pageRouter.get('/randomized', require('./page-routes/randomized'));
pageRouter.get('/personalized', require('./page-routes/personalized'));
pageRouter.get('/geolocated', require('./page-routes/geolocated'));
pageRouter.get('/dynamic', require('./page-routes/dynamic'));
pageRouter.get('/dynamic-geolocated', require('./page-routes/dynamic-geolocated'));
pageRouter.get('/dynamic-personalized', require('./page-routes/dynamic-personalized'));
pageRouter.get('/dynamic-randomized', require('./page-routes/dynamic-randomized'));
pageRouter.get('/redux', require('./page-routes/redux'));

/**
 * Attach routers to express instance
 */
app.use('/data', dataRouter);
app.use('/routes', pageRouter);

/**
 * Start server
 */
app.listen(PORT, () => debug(`Listening on port ${PORT}`));
