/**
 * Dependencies
 */
const { append, merge, slice } = require('aurora-deep-slice-merge');
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
   * Flag if initial dynamic config fetch
   */
  const isInitial = +skip === 0;

  /**
   * Get the data for the specified user
   */
  const userData = data[user] || data['not-logged-in'];

  /**
   * Create initial config if applicable
   */
  const config = (
    isInitial &&
    append(initialConfig, userData.modules.slice(0, +limit))
  );

  /**
   * Create module appendage if applicable
   */
  const modules = (
    !isInitial &&
    userData.modules.slice(+skip, +skip + +limit)
  );

  /**
   * Evaluate if it has any more data to paginate
   */
  const hasMore = userData.modules.length > (+skip + +limit);

  /**
   * Format the results
   */
  const result = {
    meta: {
      operation: isInitial ? 'merge' : 'append',
      pagination: { hasMore },
      version: version || '123'
    },
    data: isInitial ? { config } : { modules }
  };

  /**
   * Send the results to the client
   */
  res.send(result);
};

/**
 * Mock configuration object
 */
const initialConfig = {
  pageInfo: {
    title: 'Demo dynamic personalized Aurora config',
  },
  app: {
    type: 'demo-app',
    options: {
      modules: []
    }
  }
};

const data = {
  'not-logged-in': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for Not Logged In',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for Not Logged In',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for Not Logged In',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for Not Logged In',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for Not Logged In',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for Not Logged In',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for Not Logged In',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for Not Logged In',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for Not Logged In',
          age: 9
        }
      }
    }]
  },
  'user-1': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for User 1',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for User 1',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for User 1',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for User 1',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for User 1',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for User 1',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for User 1',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for User 1',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for User 1',
          age: 9
        }
      }
    }]
  },
  'user-2': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for User 2',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for User 2',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for User 2',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for User 2',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for User 2',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for User 2',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for User 2',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for User 2',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for User 2',
          age: 9
        }
      }
    }]
  },
  'user-3': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for User 3',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for User 3',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for User 3',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for User 3',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for User 3',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for User 3',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for User 3',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for User 3',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for User 3',
          age: 9
        }
      }
    }]
  },
  'user-4': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for User 4',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for User 4',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for User 4',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for User 4',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for User 4',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for User 4',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for User 4',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for User 4',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for User 4',
          age: 9
        }
      }
    }]
  },
  'user-5': {
    modules: [{
      type: 'demo-module-with-data',
      visibility: ['small'],
      options: {
        _dataOptions: {
          name: 'A - Personalized for User 5',
          age: 1
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['medium'],
      options: {
        _dataOptions: {
          name: 'B - Personalized for User 5',
          age: 2
        }
      }
    }, {
      type: 'demo-module-with-data',
      visibility: ['large'],
      options: {
        _dataOptions: {
          name: 'C - Personalized for User 5',
          age: 3
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'D - Personalized for User 5',
          age: 4
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'E - Personalized for User 5',
          age: 5
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'F - Personalized for User 5',
          age: 6
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'G - Personalized for User 5',
          age: 7
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'H - Personalized for User 5',
          age: 8
        }
      }
    }, {
      type: 'demo-module-with-data',
      options: {
        _dataOptions: {
          name: 'I - Personalized for User 5',
          age: 9
        }
      }
    }]
  }
};
