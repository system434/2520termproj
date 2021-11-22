const express = require("express");
const { isAdmin } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", isAdmin, (req, res) => {
    req.sessionStore.all((err, sessions) => {
        if (err) {
            res.render("./admin/admin", {
                user: req.user,
            });
        } else {
            res.render("./admin/admin", {
                user: req.user,
                sessions: sessions,
            });
    }});
});

router.post("/", (req, res) => {
    req.sessionStore.destroy(req.body.Revoke, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin")
        }
    })
})

module.exports = router