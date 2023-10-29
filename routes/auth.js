const express = require("express");
const passport = require("passport");
const router = express.Router();
// @desc Login/Landing page
// @route GET /oauth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
module.exports = router;
