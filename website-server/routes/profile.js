const express = require("express");
const router = express.Router({mergeParams: true});

const {
  addFavorite,
  addArtist,
  showArtist,
  showArtists
} = require("../handlers/profile");

router.route("/addfav/:post_id").put(addFavorite);

router.route("/addartist/:artist_id").put(addArtist);

router.route("/show/:artist_id").get(showArtist);

router.route("/artists").get(showArtists);

module.exports = router;