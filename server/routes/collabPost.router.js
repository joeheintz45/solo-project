const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT "collab_post".id, "collab_post".likes, "collab_post".content, "collab_post".published, 
    "collab_post".location_id, "profile".id, "profile".display_name, "profile".profile_pic
    FROM "collab_post"
    JOIN "user" ON "user".id = "collab_post".user_id
    JOIN "profile" ON "profile".user_id = "user".id
    ORDER BY "collab_post".published ASC;`;

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

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "collab_post" WHERE "id"=$1;`;

  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "collab_post" SET "content"=$1 WHERE "id"=$2 AND "user_id"=$3`;

  pool
    .query(queryText, [req.body.content, req.params.id, req.user.id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/like/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "collab_post" SET "likes"="likes"+1 WHERE "id"=$1;`;

  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
