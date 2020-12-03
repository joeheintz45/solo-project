const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let circle = require('@turf/circle');
const turf = require('@turf/turf');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  let longitude = Number(req.body.longitude);
  let latitude = req.body.latitude;
  let center = [longitude, latitude];
  let radius = 5;
  let options = { steps: 100, units: 'miles', properties: { foo: 'bar' } };
  circle = turf.circle(center, radius, options);

  console.log(circle.geometry.coordinates[0]);
  res.send(circle);
});

module.exports = router;
