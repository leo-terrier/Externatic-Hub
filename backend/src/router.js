const express = require("express");
const {
  allCandidates,
  allOffers,
  allEntreprises,
  offerById,
} = require("./controllers/controllers");

const router = express.Router();

/* const itemControllers = require("./controllers/itemControllers");
 */
router.get("/offers", allOffers);
router.get("/offers/:id", offerById);
router.get("/entreprises", allEntreprises);
router.get("/candidates", allCandidates);

/* router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy); */

module.exports = router;
