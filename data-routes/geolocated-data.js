/**
 * Dependencies
 */
const shuffle = require('shuffle-array');
const randomSeed = require('random-seed');
const util = require('util');

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
   * Get the data for the specified geolocation
   */
  const geoData = data.reduce((result, item) => {
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
  }, data[0]);

  /**
   * Deterministically randomize
   * (without mutating)
   */
  const shuffledElements = shuffle(geoData.elements, {
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
 * Collection of geolocated data
 */
const data = [{
  name: 'Oslo',
  latitude: 59.00000,
  longitude: 10.00000,
  elements: [{
    name: 'Element 1 - Oslo'
  }, {
    name: 'Element 2 - Oslo'
  }, {
    name: 'Element 3 - Oslo'
  }, {
    name: 'Element 4 - Oslo'
  }, {
    name: 'Element 5 - Oslo'
  }],
}, {
  name: 'Trondheim',
  latitude: 63.00000,
  longitude: 10.00000,
  elements: [{
    name: 'Element 1 - Trondheim'
  }, {
    name: 'Element 2 - Trondheim'
  }, {
    name: 'Element 3 - Trondheim'
  }, {
    name: 'Element 4 - Trondheim'
  }, {
    name: 'Element 5 - Trondheim'
  }],
}, {
  name: 'Bergen',
  latitude: 60.00000,
  longitude: 5.00000,
  elements: [{
    name: 'Element 1 - Bergen'
  }, {
    name: 'Element 2 - Bergen'
  }, {
    name: 'Element 3 - Bergen'
  }, {
    name: 'Element 4 - Bergen'
  }, {
    name: 'Element 5 - Bergen'
  }],
}];
