const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "messages"
    JOIN "user_messages" ON "user_messages".message_id = "messages".id
    WHERE "user_messages".primary_user = $1 OR "user_messages".secondary_user = $2
    LIMIT 1;`;

  pool
    .query(queryText, [req.user.id, req.user.id])
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
  const queryText = `SELECT * FROM "messages"
    JOIN "user_messages" ON "user_messages".message_id = "messages".id
    WHERE ("user_messages".primary_user = $1 OR "user_messages".primary_user = $2)
    AND ("user_messages".secondary_user = $1 OR "user_messages".secondary_user = $2);`;

  pool
    .query(queryText, [req.user.id, req.params.id])
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
router.post('/:id', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const queryText = `INSERT INTO "messages" ("message")
    VALUES ($1)
    RETURNING "id";`;

  pool
    .query(queryText, [req.body.message])
    .then((dbResponse) => {
      const queryText2 = `INSERT INTO "user_messages" ("primary_user", "secondary_user", "message_id")
        VALUES ($1, $2, $3);`;

      pool
        .query(queryText2, [req.user.id, req.params.id, dbResponse.rows[0].id])
        .then((dbResponse) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "user_messages" WHERE "id"=$1 AND "primary_user"=$2;`;

  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
