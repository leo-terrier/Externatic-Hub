const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const { passwordHash } = require("../bcrypt");

const uploadFolder =
  "/Users/leoterrier/Dev/wild/externatic/Externatic-Hub/backend/uploads";
const {
  getOffers,
  getOfferPropositions,
  getOfferById,
  getUsers,
  getUserById,
  getUserSearchPreferences,
  getUserPropositions,
  getUserFavorites,
  registerUser,
  modifyUserInfoById,
  changeUserPropositionsToStatusRejected,
  getEntreprises,
  getEntrepriseById,
  getEntrepriseOffers,
  getEntrepriseContacts,
  createEntreprise,
  createEntrepriseContact,
  getPropositionById,
  getPropositionMessagesByPropositionId,
  getPropositionInterviews,
  createOffer,
  modifyUserSearchPreferencesById,
  getUserResume,
  modifyUserResume,
  createPropositionMessage,
  getPropositionResume,
  deleteFavoriteOffer,
  addFavoriteOffer,
  createMessageThread,
  createMessage,
  createProposition,
  addPropositionResume,
  createBlankResume,
  createBlankSearchPreferences,
  changeOfferStatusToUnfilled,
  toggleHasAlerts,
} = require("../models/models");

// Users

// // GET

const retreiveUserSession = (req, res) => {
  console.log("req.user retreive");
  console.log(req.user);
  if (req.user) {
    res.send(req.user[0]);
  } else {
    res.status(404).send("user not found");
  }
};

const allUsers = async (req, res) => {
  const users = await getUsers(req.query);
  // if (!users.length) return res.sendStatus(404);
  return res.send(users);
};

const userById = async (req, res) => {
  const { id } = req.params;
  const [user] = await getUserById(id);
  if (!user) return res.sendStatus(404);
  return res.send(user);
};

const userSearchPreferences = async (req, res) => {
  const { id } = req.params;
  const [preferences] = await getUserSearchPreferences(id);
  if (!preferences) return res.sendStatus(404);
  return res.send(preferences);
};

const userPropositions = async (req, res) => {
  const { id } = req.params;
  const propositions = await getUserPropositions(id);
  if (!propositions.length) return res.sendStatus(404);
  return res.send(propositions);
};
const userFavorites = async (req, res) => {
  const { id } = req.params;
  const favorites = await getUserFavorites(id);
  if (!favorites.length) return res.send([]);
  return res.send(favorites);
};

const userResume = async (req, res) => {
  const { id } = req.params;
  const resume = await getUserResume(id);
  return res.send(resume);
};
const userResumeFile = async (req, res) => {
  console.log("reached");
  const { fileName } = req.query;
  console.log(fileName);
  res.sendFile(
    path.join(
      "/Users/leoterrier/Dev/wild/externatic/Externatic-Hub/backend/uploads",
      encodeURI(fileName.replace(/\s/g, "-"))
    )
  );
  // http://localhost:5001/users/1/resumes/files?fileName=Capture-d%E2%80%99e%CC%81cran-2023-02-02-a%CC%80-14.10.29.pdf
};
// // POST
const userRegistration = async (req, res) => {
  const { email, password } = req.body;
  const hash = await passwordHash(password);
  const user = await registerUser(email, hash);
  await createBlankResume(user[0].insertId);
  await createBlankSearchPreferences(user[0].insertId);
  return res.send(user);
};

const newFavoriteOffer = async (req, res) => {
  if (req.user[0].id) {
    const favoriteOffer = await addFavoriteOffer(
      req.user[0].id,
      req.body.offerId
    );
    return res.send(favoriteOffer);
  }
  return res.status(404).send("user not authenticated");
};

const newPropositionResume = async (req, res) => {
  console.log("proposition resume reached");
  console.log(req.user);
  if (req.user) {
    // console.log(req.formData.files.cv.newFilename)
    // console.log(req.formData.files.cv.filepath)
    console.log();
    const dataObj = {
      ...req.formData.fields,
      cv: req.formData.files
        ? req.formData.files.cv.originalFilename
        : req.formData.fields.cv,
      id: req.user[0].id,
    };
    const [propositionResume] = await addPropositionResume(dataObj);
    return res.send(propositionResume);
  }
  return res.status(404).send("user not authenticated");
};

const newMessageThread = async (req, res) => {
  // protéger
  if (req.user && req.body.origin === "user") {
    const { object, consultantId, content, origin } = req.body;
    const [newThread] = await createMessageThread({
      userId: req.user[0].id,
      object,
      consultantId,
    });
    await createMessage({
      messageThreadId: newThread.insertId,
      content,
      origin,
    });
    return res.send({ insertId: newThread.insertId });
  }
  const { object, consultantId, content, origin, userId } = req.body;
  const [newThread] = await createMessageThread({
    userId,
    object,
    consultantId,
  });
  await createMessage({
    messageThreadId: newThread.insertId,
    content,
    origin,
  });
  return res.send({ insertId: newThread.insertId });
};

// // PUT
const userModifyInfo = async (req, res) => {
  console.log("modifyInfo req.user");
  console.log(req.user);
  console.log(req.body);
  if (req.user) {
    if (Object.keys(req.body).length) {
      const user = await modifyUserInfoById({
        ...req.body,
        id: req.user[0].id,
      });
      return res.send(user);
    }
    const user = await toggleHasAlerts(req.user[0].id);
    return res.send(user);
  }
  return res.status("401").send("user not authenticated");
};

const userModifySearchPreferences = async (req, res) => {
  console.log("hey");
  if (req.user) {
    const preferences = await modifyUserSearchPreferencesById(
      req.body,
      req.user[0].id
    );
    return res.send(preferences);
  }
  return res.status("401").send("user not authenticated");
};

const formDataParse = (req, res, next) => {
  console.log("formDataParse reached");
  if (req.user) {
    const form = formidable({ uploadDir: uploadFolder });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      if (Object.keys(files).length) {
        const { cv } = files;
        fs.rename(
          cv.filepath,
          `${uploadFolder}/${encodeURI(
            cv.originalFilename.replace(/\s/g, "-")
          )}`,
          () => {}
        );

        req.formData = { fields, files };
      } else {
        req.formData = { fields };
      }
      console.log(req.formData);
      next();
    });
  }
};

const userModifyResume = async (req, res) => {
  console.log("userModifyResume reached");
  if (req.user) {
    // console.log(req.formData.files.cv.newFilename)
    // console.log(req.formData.files.cv.filepath)
    const dataObj = {
      ...req.formData.fields,
      cv: req.formData.files
        ? req.formData.files.cv.originalFilename
        : req.formData.fields.cv,
      id: req.user[0].id,
    };

    await modifyUserResume(dataObj);
    return res.send("ok");
  }
  return res.status("401").send("user not authenticated to upload new resume");
};

// // DELETE

const deleteUserFavoriteOffer = async (req, res) => {
  if (req.user[0].id) {
    const favoriteOffer = await deleteFavoriteOffer(
      req.user[0].id,
      req.body.offerId
    );
    return res.send(favoriteOffer);
  }
  return res.status(404).send("user not authenticated");
};
// Offers

// // GET
const allOffers = async (req, res) => {
  const offers = await getOffers(req.query);
  // if (!offers.length) return res.sendStatus(404);
  return res.send(offers);
};

const offerById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user[0].id : 0;
  const [offer] = await getOfferById(id, userId);
  if (!offer) return res.sendStatus(404);
  return res.send(offer);
};

const offerPropositions = async (req, res) => {
  const { id } = req.params;
  const propositions = await getOfferPropositions(id);
  if (!propositions.length) return res.sendStatus(404);
  return res.send(propositions);
};

// // POST
const addOffer = async (req, res) => {
  const id = await createOffer(req.body);
  if (!id) return res.sendStatus(400);
  return res.status(201).json(id);
};

// // PUT
const setOfferStatusToUnfilled = async (req, res) => {
  const { id: offerId } = req.params;
  const offer = await changeOfferStatusToUnfilled(offerId);
  await changeUserPropositionsToStatusRejected(offerId);
  return res.send(offer);
};

// // Entreprises

// GET
const allEntreprises = async (req, res) => {
  const entreprises = await getEntreprises(req.query);
  // if (!entreprises.length) return res.sendStatus(404);
  return res.send(entreprises);
};

const entrepriseById = async (req, res) => {
  const { id } = req.params;
  const [entreprise] = await getEntrepriseById(id);
  if (!entreprise) return res.sendStatus(404);
  return res.send(entreprise);
};

const entrepriseOffers = async (req, res) => {
  const { id } = req.params;
  const offers = await getEntrepriseOffers(id);
  // if (!offers.length) return res.sendStatus(404);
  return res.send(offers);
};

const entrepriseContacts = async (req, res) => {
  const { id } = req.params;
  const contacts = await getEntrepriseContacts(id);
  // if (!contacts.length) return res.sendStatus(404);
  return res.send(contacts);
};

// POST
const addEntreprise = async (req, res) => {
  const id = await createEntreprise(req.body);
  if (!id) return res.sendStatus(400);
  return res.status(201).json(id);
};

const addEntrepriseContact = async (req, res) => {
  const id = await createEntrepriseContact(req.body);
  if (!id) return res.sendStatus(400);
  return res.json(id);
};

// Propositions

// // GET

const propositionById = async (req, res) => {
  const { id } = req.params;
  const [proposition] = await getPropositionById(id);
  if (!proposition) return res.sendStatus(404);
  return res.send(proposition);
};

const propositionMessages = async (req, res) => {
  const { id } = req.params;
  const messages = await getPropositionMessagesByPropositionId(id);
  if (!messages.length) return res.sendStatus(404);
  return res.send(messages);
};

const propositionInterviews = async (req, res) => {
  const { id } = req.params;
  const interviews = await getPropositionInterviews(id);
  if (!interviews.length) return res.sendStatus(404);
  return res.send(interviews);
};

const propositionResume = async (req, res) => {
  const { id: propositionId } = req.params;
  const resume = await getPropositionResume(propositionId);
  // if (!interviews.length) return res.sendStatus(404);
  return res.send(resume);
};

// //  POST

const newProposition = async (req, res) => {
  if (req.user && req.body.propositionIntiative === "user") {
    const proposition = await createProposition({
      userId: req.user[0].id,
      ...req.body,
    });
    return res.send(proposition);
  }
  const proposition = await createProposition(req.body);
  return res.send(proposition);
};

const addPropositionMessage = async (req, res) => {
  const message = await createPropositionMessage(req.body);
  return res.send(message);
};

module.exports = {
  allOffers,
  offerPropositions,
  offerById,
  addOffer,
  setOfferStatusToUnfilled,

  retreiveUserSession,
  allUsers,
  userById,
  userSearchPreferences,
  userPropositions,
  userFavorites,
  userResume,
  userResumeFile,
  userRegistration,
  userModifyInfo,
  userModifySearchPreferences,
  formDataParse,
  userModifyResume,
  newFavoriteOffer,
  deleteUserFavoriteOffer,
  newPropositionResume,
  newMessageThread,

  allEntreprises,
  entrepriseById,
  entrepriseOffers,
  entrepriseContacts,
  addEntreprise,
  addEntrepriseContact,

  propositionById,
  propositionMessages,
  propositionInterviews,
  propositionResume,
  newProposition,
  addPropositionMessage,
};
