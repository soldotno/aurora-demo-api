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
   * Create initial config if applicable
   */
  const config = isInitial && initialConfig;

  /**
   * Get the appendages (modules) for the specified geolocation
   */
  const appendages = !isInitial && (data.reduce((result, item) => {
    return getDistanceFromLatLonInKm({
      lat1: +latitude,
      lon1: +longitude,
      lat2: +item.latitude,
      lon2: +item.longitude,
    }) < getDistanceFromLatLonInKm({
      lat1: +latitude,
      lon1: +longitude,
      lat2: +result.latitude,
      lon2: +result.longitude,
    }) ? item : result;
  }, data[0]).modules || []);

  /**
   * Create module appendage if applicable
   */
  const modules = (
    !isInitial &&
    appendages.slice((+page)*(+limit), (+page)*(+limit) + (+limit))
  );

  /**
   * Evaluate if it has any more data to paginate
   */
  const hasMore = appendages.length > ((+page)*(+limit) + (+limit));

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
 * Calculated distance between two
 * pairs of longitude/latitude
 * (Haversine formula)
 */
function getDistanceFromLatLonInKm({
  lat1,
  lon1,
  lat2,
  lon2
}) {
  /**
   * Radius of the Earth in Km
   */
  const R = 6371;
  const dLat = deg2rad(lat1 - lat2);
  const dLon = deg2rad(lon1 - lon2);

  const a = (
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(lat1)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  );

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  /**
   * Distance in Km
   */
  const d = R * c;

  return d;
}

/**
 * Go from degrees to radians
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

/**
 * Mock configuration object
 */
const initialConfig = {
  pageInfo: {
    title: 'Demo dynamic geolocated Aurora config',
  },
  app: {
    type: 'demo-app',
    options: {
      modules: []
    }
  }
};

/**
 * Collection of geolocated data
 */
const data = [{
  name: 'Oslo',
  latitude: 59.00000,
  longitude: 10.00000,
  modules: [{
    type: 'demo-module-with-data',
    visibility: ['small'],
    options: {
      _dataOptions: {
        name: 'A - Located in Oslo',
        age: 1
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['medium'],
    options: {
      _dataOptions: {
        name: 'B - Located in Oslo',
        age: 2
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['large'],
    options: {
      _dataOptions: {
        name: 'C - Located in Oslo',
        age: 3
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'D - Located in Oslo',
        age: 4
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'E - Located in Oslo',
        age: 5
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'F - Located in Oslo',
        age: 6
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'G - Located in Oslo',
        age: 7
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'H - Located in Oslo',
        age: 8
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'I - Located in Oslo',
        age: 9
      }
    }
  }],
}, {
  name: 'Trondheim',
  latitude: 63.00000,
  longitude: 10.00000,
  modules: [{
    type: 'demo-module-with-data',
    visibility: ['small'],
    options: {
      _dataOptions: {
        name: 'A - Located in Trondheim',
        age: 1
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['medium'],
    options: {
      _dataOptions: {
        name: 'B - Located in Trondheim',
        age: 2
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['large'],
    options: {
      _dataOptions: {
        name: 'C - Located in Trondheim',
        age: 3
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'D - Located in Trondheim',
        age: 4
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'E - Located in Trondheim',
        age: 5
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'F - Located in Trondheim',
        age: 6
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'G - Located in Trondheim',
        age: 7
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'H - Located in Trondheim',
        age: 8
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'I - Located in Trondheim',
        age: 9
      }
    }
  }],
}, {
  name: 'Bergen',
  latitude: 60.00000,
  longitude: 5.00000,
  modules: [{
    type: 'demo-module-with-data',
    visibility: ['small'],
    options: {
      _dataOptions: {
        name: 'A - Located in Bergen',
        age: 1
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['medium'],
    options: {
      _dataOptions: {
        name: 'B - Located in Bergen',
        age: 2
      }
    }
  }, {
    type: 'demo-module-with-data',
    visibility: ['large'],
    options: {
      _dataOptions: {
        name: 'C - Located in Bergen',
        age: 3
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'D - Located in Bergen',
        age: 4
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'E - Located in Bergen',
        age: 5
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'F - Located in Bergen',
        age: 6
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'G - Located in Bergen',
        age: 7
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'H - Located in Bergen',
        age: 8
      }
    }
  }, {
    type: 'demo-module-with-data',
    options: {
      _dataOptions: {
        name: 'I - Located in Bergen',
        age: 9
      }
    }
  }],
}];
