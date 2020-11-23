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
  const queryText = `SELECT * FROM "profile" 
    JOIN "profile_types" ON "profile_types".profile_id = "profile".id
    JOIN "musician_types" ON "musician_types".id = "profile_types".type_id
    WHERE "user_id" = $1`;

  pool
    .query(queryText, [req.user.id])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "profile" 
    JOIN "profile_types" ON "profile_types".profile_id = "profile".id
    JOIN "musician_types" ON "musician_types".id = "profile_types".type_id
    WHERE "user_id" = $1`;

  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
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
  const queryText = `INSERT INTO "profile" ("bio", "display_name", "user_id", "profile_pic")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`;

  pool
    .query(queryText, [
      req.body.bio,
      req.body.display_name,
      req.user.id,
      req.body.profile_pic,
    ])
    .then((dbResponse) => {
      const queryText2 = `INSERT INTO "profile_types" ("profile_id", "type_id")
        VALUES ($1, $2);`;

      pool
        .query(queryText2, [dbResponse.rows[0].id, req.body.type_id])
        .then((dbResponse) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('/profile error: ', err);
      res.sendStatus(500);
    });
});

router.put('/edit', (req, res) => {
  const queryText = `UPDATE "profile" SET "bio"=$1, "display_name"=$2, "profile_pic"=$3
    WHERE "user_id"=$4
    RETURNING "id";`;

  pool
    .query(queryText, [
      req.body.bio,
      req.body.display_name,
      req.body.profile_pic,
      req.user.id,
    ])
    .then((dbResponse) => {
      const queryText2 = `UPDATE "profile_types" SET "type_id"=$1 WHERE "profile_id"=$2;`;

      pool
        .query(queryText2, [req.body.type_id, dbResponse.rows[0].id])
        .then((dbResponse) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    });
});

module.exports = router;
