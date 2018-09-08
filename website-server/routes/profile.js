const express = require("express");
const router = express.Router({mergeParams: true});

const {
  addFavorite,
  addArtist,
  showArtists
} = require("../handlers/profile");

router.route("/addfav/:post_id").put(addFavorite);

router.route("/addartist/:artist_id").put(addArtist);

router.route("/artists").get(showArtists);

module.exports = router;