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
  let longitude = -94.578331;
  let latitude = 39.099724;
  let center = [longitude, latitude];
  let radius = req.body.radius;
  let options = { steps: 100, units: 'miles', properties: { foo: 'bar' } };
  circle = turf.circle(center, radius, options);

  let points = turf.points([[longitude, latitude]]);
  let searchWithin = turf.polygon([circle.geometry.coordinates[0]]);

  let ptsWithin = turf.pointsWithinPolygon(points, searchWithin);

  console.log(ptsWithin.features[0].geometry);
  console.log(circle);
  res.send({ circle: circle, points: ptsWithin });
});

module.exports = router;
