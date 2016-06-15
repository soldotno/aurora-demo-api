/**
 * Dependencies
 */
const { append, merge, slice } = require('aurora-deep-slice-merge');
const clone = require('stringify-clone');
const deepEqual = require('deep-equal');
const shuffle = require('shuffle-array');
const randomSeed = require('random-seed');

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
   * Deterministically randomize
   * (without mutating) the available
   * list of modules
   */
  const shuffledModules = shuffle(availableModules, {
    rng: randomSeed(seed).random,
    copy: true,
  });

  /**
   * Create initial config if applicable
   */
  const config = (
    isInitial &&
    append(initialConfig, shuffledModules.slice(0, +limit))
  );

  /**
   * Create module appendage if applicable
   */
  const modules = (
    !isInitial &&
    shuffledModules.slice(+skip, +skip + +limit)
  );

  /**
   * Evaluate if it has any more data to paginate
   */
  const hasMore = shuffledModules.length > (+skip + +limit);

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
    title: 'Demo dynamic randomized Aurora config',
  },
  app: {
    type: 'demo-app',
    options: {
      modules: []
    }
  }
};

/**
 * Available list of modules to choose randomly from
 */
const availableModules = [{
  type: 'demo-module-with-data',
  visibility: ['small'],
  options: {
    _dataOptions: {
      name: 'A - Randomized',
      age: 1
    }
  }
}, {
  type: 'demo-module-with-data',
  visibility: ['medium'],
  options: {
    _dataOptions: {
      name: 'B - Randomized',
      age: 2
    }
  }
}, {
  type: 'demo-module-with-data',
  visibility: ['large'],
  options: {
    _dataOptions: {
      name: 'C - Randomized',
      age: 3
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'D - Randomized',
      age: 4
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'E - Randomized',
      age: 5
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'F - Randomized',
      age: 6
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'G - Randomized',
      age: 7
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'H - Randomized',
      age: 8
    }
  }
}, {
  type: 'demo-module-with-data',
  options: {
    _dataOptions: {
      name: 'I - Randomized',
      age: 9
    }
  }
}];
