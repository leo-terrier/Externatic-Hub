const express = require("express");
const {
  getOffers,
  getEntreprises,
  getCandidates,
} = require("./controllers/controllers");

const router = express.Router();

/* const itemControllers = require("./controllers/itemControllers");
 */
router.get("/offers", getOffers);
router.get("/entreprises", getEntreprises);
router.get("/candidates", getCandidates);

/* router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy); */

module.exports = router;
