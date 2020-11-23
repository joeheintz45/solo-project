const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "collab_post"
    JOIN "user" ON "user".id = "collab_post".user_id
    ORDER BY "published" DESC;`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log('collab_post GET:', dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('req.user:', req.user);
  const queryText = `INSERT INTO "collab_post" ("content", "user_id", "likes")
  VALUES ($1, $2, 0);`;
  const queryArray = [req.body.content, req.user.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
