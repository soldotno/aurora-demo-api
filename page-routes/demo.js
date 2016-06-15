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
    title: 'Demo Aurora config',
  },
  app: {
    type: 'demo-app',
    visibility: {},
    options: {
      modules: [{
        type: 'demo-hom',
        options: {
          modules: [{
            type: 'demo-module-with-data',
            visibility: {
              include: ['small']
            },
            options: {
              _dataOptions: {
                name: 'A',
                age: 1
              }
            }
          }, {
            type: 'demo-module-with-data',
            visibility: {
              include: ['medium']
            },
            options: {
              _dataOptions: {
                name: 'B',
                age: 2
              }
            }
          }, {
            type: 'demo-module-with-data',
            visibility: {
              include: ['large']
            },
            options: {
              _dataOptions: {
                name: 'C',
                age: 3
              }
            }
          }, {
            type: 'demo-module-with-data',
            options: {
              _dataOptions: {
                name: 'D',
                age: 4
              }
            }
          }, {
            type: 'demo-hom',
            options: {
              modules: [{
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'E',
                    age: 5
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'F',
                    age: 6
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['large']
                },
                options: {
                  _dataOptions: {
                    name: 'G',
                    age: 7
                  }
                }
              }, {
                type: 'demo-module-with-data',
                options: {
                  _dataOptions: {
                    name: 'H',
                    age: 8
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'I',
                    age: 9
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'J',
                    age: 10
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['large']
                },
                options: {
                  _dataOptions: {
                    name: 'K',
                    age: 11
                  }
                }
              }, {
                type: 'demo-module-with-data',
                options: {
                  _dataOptions: {
                    name: 'L',
                    age: 12
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'M',
                    age: 13
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'N',
                    age: 14
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['large']
                },
                options: {
                  _dataOptions: {
                    name: 'O',
                    age: 15
                  }
                }
              }, {
                type: 'demo-module-with-data',
                options: {
                  _dataOptions: {
                    name: 'P',
                    age: 16
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'Q',
                    age: 17
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'R',
                    age: 18
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['large']
                },
                options: {
                  _dataOptions: {
                    name: 'S',
                    age: 19
                  }
                }
              }, {
                type: 'demo-module-with-data',
                options: {
                  _dataOptions: {
                    name: 'T',
                    age: 20
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'U',
                    age: 21
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'V',
                    age: 22
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['large']
                },
                options: {
                  _dataOptions: {
                    name: 'W',
                    age: 23
                  }
                }
              }, {
                type: 'demo-module-with-data',
                options: {
                  _dataOptions: {
                    name: 'X',
                    age: 24
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['small']
                },
                options: {
                  _dataOptions: {
                    name: 'Y',
                    age: 25
                  }
                }
              }, {
                type: 'demo-module-with-data',
                visibility: {
                  include: ['medium']
                },
                options: {
                  _dataOptions: {
                    name: 'Z',
                    age: 26
                  }
                }
              }]
            }
          }]
        }
      }]
    }
  }
};
