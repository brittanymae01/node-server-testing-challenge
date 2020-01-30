const router = require("express").Router();
const restricted = require("../auth/restricted-middleware");

const Users = require("../users/users-model");

router.get("/", restricted, onlyDepartment("development"), (req, res) => {
  Users.find()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem retreiving users"
      });
    });
});

function onlyDepartment(department) {
  return function(req, res, next) {
    if (
      req.user &&
      req.user.department &&
      req.user.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ message: "not allowed" });
    }
  };
}

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res.status(404).json({ message: "could not find user by that id" });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem deleting user"
      });
    });
});

module.exports = router;
