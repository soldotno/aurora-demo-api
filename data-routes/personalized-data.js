/**
 * Dependencies
 */
const shuffle = require('shuffle-array');
const randomSeed = require('random-seed');

/**
 * Export route handler for
 * deterministically randomized data
 */
module.exports = function(req, res) {
  /**
   * Pull out what we need from the request query
   */
  const {
    skip = 0,
    limit = Infinity,
    __settings: {
      seed = Date.now(),
      user = 'not-logged-in',
      latitude = 50.0000,
      longitude = 10.000,
      ip = '127.0.0.1',
    } = {}
  } = req.query;

  /**
   * Get the data for the specified user
   */
  const userData = data[user] || data['not-logged-in'];

  /**
   * Deterministically randomize
   * (without mutating)
   */
  const shuffledElements = shuffle(userData.elements, {
    rng: randomSeed(seed).random,
    copy: true,
  })

  /**
   * Paginate
   */
  const selection = shuffledElements.slice(+skip, +skip + +limit);

  /**
   * Return results
   */
  res.send(selection);
};

/**
 * Elements to display randomly
 */
const data = {
  'not-logged-in': {
    elements: [{
      id: 'not-logged-in-item-0',
      content: 'Personalized content Not Logged In - Item 0'
    }, {
      id: 'not-logged-in-item-1',
      content: 'Personalized content Not Logged In - Item 1'
    }, {
      id: 'not-logged-in-item-2',
      content: 'Personalized content Not Logged In - Item 2'
    }, {
      id: 'not-logged-in-item-3',
      content: 'Personalized content Not Logged In - Item 3'
    }, {
      id: 'not-logged-in-item-4',
      content: 'Personalized content Not Logged In - Item 4'
    }]
  },
  'user-1': {
    elements: [{
      id: 'user-1-item-0',
      content: 'Personalized content User 1 - Item 0'
    }, {
      id: 'user-1-item-1',
      content: 'Personalized content User 1 - Item 1'
    }, {
      id: 'user-1-item-2',
      content: 'Personalized content User 1 - Item 2'
    }, {
      id: 'user-1-item-3',
      content: 'Personalized content User 1 - Item 3'
    }, {
      id: 'user-1-item-4',
      content: 'Personalized content User 1 - Item 4'
    }]
  },
  'user-2': {
    elements: [{
      id: 'user-2-item-0',
      content: 'Personalized content User 2 - Item 0'
    }, {
      id: 'user-2-item-1',
      content: 'Personalized content User 2 - Item 1'
    }, {
      id: 'user-2-item-2',
      content: 'Personalized content User 2 - Item 2'
    }, {
      id: 'user-2-item-3',
      content: 'Personalized content User 2 - Item 3'
    }, {
      id: 'user-2-item-4',
      content: 'Personalized content User 2 - Item 4'
    }]
  },
  'user-3': {
    elements: [{
      id: 'user-3-item-0',
      content: 'Personalized content User 3 - Item 0'
    }, {
      id: 'user-3-item-1',
      content: 'Personalized content User 3 - Item 1'
    }, {
      id: 'user-3-item-2',
      content: 'Personalized content User 3 - Item 2'
    }, {
      id: 'user-3-item-3',
      content: 'Personalized content User 3 - Item 3'
    }, {
      id: 'user-3-item-4',
      content: 'Personalized content User 3 - Item 4'
    }]
  },
  'user-4': {
    elements: [{
      id: 'user-4-item-0',
      content: 'Personalized content User 4 - Item 0'
    }, {
      id: 'user-4-item-1',
      content: 'Personalized content User 4 - Item 1'
    }, {
      id: 'user-4-item-2',
      content: 'Personalized content User 4 - Item 2'
    }, {
      id: 'user-4-item-3',
      content: 'Personalized content User 4 - Item 3'
    }, {
      id: 'user-4-item-4',
      content: 'Personalized content User 4 - Item 4'
    }]
  },
  'user-5': {
    elements: [{
      id: 'user-5-item-0',
      content: 'Personalized content User 5 - Item 0'
    }, {
      id: 'user-5-item-1',
      content: 'Personalized content User 5 - Item 1'
    }, {
      id: 'user-5-item-2',
      content: 'Personalized content User 5 - Item 2'
    }, {
      id: 'user-5-item-3',
      content: 'Personalized content User 5 - Item 3'
    }, {
      id: 'user-5-item-4',
      content: 'Personalized content User 5 - Item 4'
    }]
  }
}
