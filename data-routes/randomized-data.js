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
   * Deterministically randomize
   * (without mutating)
   */
  const shuffledElements = shuffle(elements, {
    rng: randomSeed(seed).random,
    copy: true,
  });

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
const elements = [{
  id: 'random-0',
  text: 'Random content 0'
}, {
  id: 'random-1',
  text: 'Random content 1'
}, {
  id: 'random-2',
  text: 'Random content 2'
}, {
  id: 'random-3',
  text: 'Random content 3'
}, {
  id: 'random-4',
  text: 'Random content 4'
}]
