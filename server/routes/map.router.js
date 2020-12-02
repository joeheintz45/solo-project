const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let circle = require('@turf/circle');
const turf = require('@turf/turf');

let center = [-94.578331, 39.099724];
let radius = 5;
let options = { steps: 100, units: 'miles', properties: { foo: 'bar' } };
circle = turf.circle(center, radius, options);

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  res.send(circle);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  res.sendStatus(200);
});

module.exports = router;
