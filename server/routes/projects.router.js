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
  const queryText = `SELECT * FROM "projects" WHERE "profile_id"=$1 ORDER BY "id" DESC;`;

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
  const queryText = `SELECT * FROM "projects" WHERE "profile_id"=$1 ORDER BY "id" DESC;`;

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
router.post('/', (req, res) => {
  // POST route code here
  const queryText = `INSERT INTO "projects" ("project_desc", "project_link", "header", "profile_id")
    VALUES ($1, $2, $3, $4);`;

  pool
    .query(queryText, [
      req.body.project_desc,
      req.body.project_link,
      req.body.header,
      req.user.id,
    ])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "projects" WHERE "id"=$1 AND "profile_id"=$2;`;

  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((dbResponse) => {
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "projects" SET "project_desc"=$1, "project_link"=$2 WHERE "id"=$3 AND "profile_id"=$4;`;

  pool
    .query(queryText, [
      req.body.project_desc,
      req.body.project_link,
      req.params.id,
      req.user.id,
    ])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
