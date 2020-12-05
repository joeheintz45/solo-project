const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT "collab_post".id, "collab_post".likes, "collab_post".content, "collab_post".published, 
    "collab_post".location_id, "profile".id, "profile".display_name, "profile".profile_pic, "musician_types".type, "collab_post".radius
    FROM "collab_post"
    JOIN "user" ON "user".id = "collab_post".user_id
    JOIN "profile" ON "profile".user_id = "user".id
    JOIN "musician_types" ON "musician_types".id = "collab_post".type_id
    WHERE "collab_post".type_id = $1
    ORDER BY "collab_post".published DESC;`;

  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
      console.log('collab_post GET:', dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `SELECT "collab_post".id, "collab_post".likes, "collab_post".content, "collab_post".published, "map".longitude, "map".latitude,
    "collab_post".location_id, "profile".display_name, "profile".profile_pic, "collab_post".user_id, "musician_types".type, "collab_post".radius
    FROM "collab_post"
    JOIN "user" ON "user".id = "collab_post".user_id
    JOIN "profile" ON "profile".user_id = "user".id
    JOIN "map" ON "map".id = "collab_post".location_id
    JOIN "musician_types" ON "musician_types".id = "collab_post".type_id
    ORDER BY "collab_post".published DESC;`;

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
  console.log('POST req.body: ', req.body);
  console.log('req.user:', req.user);
  const queryText = `INSERT INTO "map" ("latitude", "longitude")
        VALUES ($1, $2)
        RETURNING "id";`;

  pool
    .query(queryText, [req.body.location.latitude, req.body.location.longitude])
    .then((dbResponse) => {
      console.log(dbResponse);
      const queryText2 = `INSERT INTO "collab_post" ("content", "user_id", "likes", "type_id", "location_id", "radius")
        VALUES ($1, $2, 0, $3, $4, 5);`;
      const queryArray = [
        req.body.collab.content,
        req.user.id,
        req.body.collab.type_id,
        dbResponse.rows[0].id,
      ];

      pool
        .query(queryText2, queryArray)
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
  const queryText = `DELETE FROM "collab_post" WHERE "id"=$1 AND "user_id"=$2;`;

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
