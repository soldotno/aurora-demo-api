/**
 * Dependencies
 */
const { slice, merge } = require('aurora-deep-slice-merge');
const clone = require('stringify-clone');
const deepEqual = require('deep-equal');

/**
 * Export a route handler that
 * delivers paginatable configs
 */
module.exports = function(req, res) {
  /**
   * Pull out what we need from the request query
   */
  const {
    options = {},
    skip = 0,
    limit = Infinity,
    page = 0,
    version = '',
    settings: {
      seed = Date.now(),
      user = 'not-logged-in',
      latitude = 59,
      longitude = 10,
      ip = '127.0.0.1',
    } = {}
  } = req.query;

  /**
   * Paginate/slice the config
   */
  const config = slice(fullConfig, skip, limit);

  /**
   * Evaluate if it has any more data to paginate
   */
  const hasMore = !deepEqual(
    slice(fullConfig, skip, limit),
    slice(fullConfig, skip, limit + 1)
  );

  /**
   * Format the results
   */
  const result = {
    meta: {
      operation: 'merge',
      pagination: { hasMore },
      version: version || '123'
    },
    data: { config }
  };

  /**
   * Send the results to the client
   */
  res.send(result);
};

/**
 * Mock configuration object
 */
const fullConfig = {
  pageInfo: {
    title: 'Demo Aurora config with Redux modules',
  },
  app: {
    type: 'demo-app',
    options: {
      modules: [{
        type: 'demo-hom',
        options: {
          modules: [{
            type: 'demo-module-with-redux',
            visibility: ['small'],
            options: {
              _dataOptions: {
                name: 'AA-redux',
                age: 11
              }
            }
          }, {
            type: 'demo-module-with-redux',
            visibility: ['medium'],
            options: {
              _dataOptions: {
                name: 'BB-redux',
                age: 22
              }
            }
          }, {
            type: 'demo-module-with-redux',
            visibility: ['large'],
            options: {
              _dataOptions: {
                name: 'CC-redux',
                age: 33
              }
            }
          }, {
            type: 'demo-module-with-redux',
            options: {
              _dataOptions: {
                name: 'DD-redux',
                age: 44
              }
            }
          }]
        }
      }]
    }
  }
};
