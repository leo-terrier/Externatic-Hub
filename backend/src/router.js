const express = require("express");
const {
  allOffers,
  offerById,
  offerPropositions,
  allUsers,
  userById,
  userSearchPreferences,
  userPropositions,
  userFavorites,
  allEntreprises,
  entrepriseById,
  entrepriseOffers,
  propositionById,
  propositionMessages,
  propositionInterviews,
  addEntreprise,
  addEntrepriseContact,
  addOffer,
  entrepriseContacts,
} = require("./controllers/controllers");

const router = express.Router();

/* const itemControllers = require("./controllers/itemControllers");
 */
router.get("/offers", allOffers);
router.get("/offers/:id", offerById);
router.get("/offers/:id/propositions", offerPropositions);
router.post("/offers", addOffer);

router.get("/users", allUsers);
router.get("/users/:id", userById);
router.get("/users/:id/preferences", userSearchPreferences);
router.get("/users/:id/propositions", userPropositions);
router.get("/users/:id/favorites", userFavorites);

router.get("/entreprises", allEntreprises);
router.get("/entreprises/:id", entrepriseById);
router.get("/entreprises/:id/offers", entrepriseOffers);
router.get("/entreprises/:id/contacts", entrepriseContacts);
router.post("/entreprises", addEntreprise);
router.post("/entreprises/:id/contacts", addEntrepriseContact);

router.get("/propositions/:id", propositionById);
router.get("/propositions/:id/messages", propositionMessages);
router.get("/propositions/:id/interviews", propositionInterviews);

/* router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy); */

module.exports = router;
