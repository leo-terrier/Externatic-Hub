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
  userResume,
  userResumeFile,
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
  retreiveUserSession,
  userModifyInfo,
  userModifySearchPreferences,
  userModifyResume,
  newProposition,
  addPropositionMessage,
  propositionResume,
  newFavoriteOffer,
  deleteUserFavoriteOffer,
  newMessageThread,
  setOfferStatusToUnfilled,
  formDataParse,
  newPropositionResume,
} = require("./controllers/controllers");

const router = express.Router();

/* const itemControllers = require("./controllers/itemControllers");
 */

// OFFERS
router.get("/offers", allOffers);
router.get("/offers/:id", offerById);
router.get("/offers/:id/propositions", offerPropositions);
router.post("/offers", addOffer);
router.put("/offers/:id", setOfferStatusToUnfilled);

// USERS
router.get("/users", allUsers);
router.get("/users/:id", userById);
router.get("/users/:id/preferences", userSearchPreferences);
router.get("/users/:id/propositions", userPropositions);
router.get("/users/:id/favorites", userFavorites);
router.get("/users/:id/resumes", userResume);
router.get("/users/:id/resumes/files", userResumeFile);

router.post("/users/:id/favorites", newFavoriteOffer);
router.post(
  "/users/:id/proposition-resumes",
  formDataParse,
  newPropositionResume
);
router.post("/users/:id/message-threads", newMessageThread);

router.put("/users/:id", userModifyInfo);
router.put("/users/:id/preferences", userModifySearchPreferences);
router.put("/users/:id/resumes", formDataParse, userModifyResume);

router.delete("/users/:id/favorites", deleteUserFavoriteOffer);

router.get("/entreprises", allEntreprises);
router.get("/entreprises/:id", entrepriseById);
router.get("/entreprises/:id/offers", entrepriseOffers);
router.get("/entreprises/:id/contacts", entrepriseContacts);
router.post("/entreprises", addEntreprise);
router.post("/entreprises/:id/contacts", addEntrepriseContact);

router.get("/propositions/:id", propositionById);
router.get("/propositions/:id/messages", propositionMessages);
router.get("/propositions/:id/interviews", propositionInterviews);
router.get("/propositions/:id/resumes", propositionResume);
router.post("/propositions", newProposition);
router.post("/propositions/:id/messages", addPropositionMessage);

router.get("/user-session", retreiveUserSession);

/* router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy); */

module.exports = router;
