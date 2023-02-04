import { serializeStrAndArr } from "./utils";

export const backendUrl = "http://localhost:5001";

const fetchFunction = async (url, method = "GET", body = null) => {
  const options = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET" && body) options.body = JSON.stringify(body);
  const response = await fetch(url, options);
  return await response.json();
};

const sendData = async (url, method, data) => {
  const formData = new FormData();

  Object.keys(data)
    .filter((property) => property !== "cv")
    .forEach((property) => {
      formData.append(property, data[property]);
    });
  if (data.cv?.type) {
    formData.append("cv", data.cv, data.cv.name);
  } else {
    formData.append("cv", data.cv);
  }

  const response = await fetch(url, {
    method,
    credentials: "include",
    body: formData,
  });
  return await response.json();
};

// ALL
export const fetchAPIData = async (queryObj, limit, offset, dataPath) => {
  let url = `${backendUrl}/${dataPath}?`;
  const queryObjProperties = Object.keys(queryObj);
  if (queryObjProperties.length) {
    url = url.concat(serializeStrAndArr(queryObj), "&");
  }
  url += `limit=${limit}&offset=${offset}`;
  return await fetchFunction(url);
};

// BACKOFFICE
export const fetchDataFromTable = async (
  tableState,
  dataPath,
  onlyActiveOffers = false
) => {
  const { search, pageSize, page, orderBy, orderDirection } = tableState;
  const queryObj = {};
  console.log(tableState);
  if (tableState.search) queryObj.queryStr = search;
  if (onlyActiveOffers)
    queryObj.queryStr
      ? (queryObj.queryStr += " Active")
      : (queryObj.queryStr = "Active");
  if (tableState.orderBy) {
    queryObj.orderBy = orderBy.mySqlCol;
    queryObj.orderDirection = orderDirection;
  }
  const offset = pageSize * page;
  const [data, count] = await fetchAPIData(
    queryObj,
    pageSize,
    offset,
    dataPath
  );
  const totalCount = count.length ? count[0].totalCount : 0;
  return {
    data,
    page,
    totalCount,
  };
};

//  USERS

// // GET

export const retreiveSessionInfo = async () => {
  return await fetchFunction(backendUrl + "/user-session");
};

export const getUsers = async () => {
  return fetchFunction(backendUrl + "/users");
};

export const getUserById = async (id) => {
  return await fetchFunction(backendUrl + "/users/" + id);
};

export const getUserSearchPreferences = async (id) => {
  return await fetchFunction(backendUrl + "/users/" + id + "/preferences");
};

export const getUserPropositions = async (id) => {
  return await fetchFunction(backendUrl + "/users/" + id + "/propositions");
};

export const getUserFavorites = async (id) => {
  try {
    return await fetchFunction(backendUrl + "/users/" + id + "/favorites");
  } catch (e) {
    console.log("no favorites found");
  }
};

export const getUserResume = async (id) => {
  return await fetchFunction(backendUrl + "/users/" + id + "/resumes");
};

// // POST
export const logout = async () => {
  return await fetchFunction(backendUrl + "/logout", "POST");
};

export const loginUser = async (email, password) => {
  return await fetchFunction(backendUrl + "/login", "POST", {
    username: email,
    password,
  });
};

export const registerUser = async (email, password) => {
  return await fetchFunction(backendUrl + "/register", "POST", {
    email,
    password,
  });
};

export const createFavoriteOffer = async (userId, offerId) => {
  return await fetchFunction(
    backendUrl + "/users/" + userId + "/favorites",
    "POST",
    { offerId }
  );
};

export const addPropositionResume = async (obj, userId) => {
  return await sendData(
    backendUrl + "/users/" + userId + "/proposition-resumes",
    "POST",
    obj
  );
};

export const createMessageThread = async (obj, userId) => {
  return await fetchFunction(
    backendUrl + "/users/" + userId + "/message-threads",
    "POST",
    obj
  );
};

// // PUT
export const modifyUserInfo = async (obj, userId) => {
  return await fetchFunction(backendUrl + "/users/" + userId, "PUT", obj);
};

export const toggleHasAlerts = async (userId) => {
  return await fetchFunction(backendUrl + "/users/" + userId, "PUT");
};

export const modifyUserSearchPreferences = async (obj, userId) => {
  const payload = {
    query: obj.queryStr,
    city: obj.city,
    jobFields: obj.jobFields.join(),
    entrepriseSizes: obj.entrepriseSizes.join(),
    industries: obj.industries.join(),
    compensation: obj.compensation || null,
    maxRemoteDays: obj.minMaxRemoteDays[0],
    minRemoteDays: obj.minMaxRemoteDays[1],
    distance: obj.distance,
    geopoints: obj.geopoints,
  };
  return await fetchFunction(
    `${backendUrl}/users/${userId}/preferences`,
    "PUT",
    payload
  );
};

export const modifyUserResume = (obj, userId) => {
  sendData(`${backendUrl}/users/${userId}/resumes`, "PUT", obj);
};

// // DELETE

export const deleteFavoriteOffer = async (userId, offerId) => {
  return await fetchFunction(
    backendUrl + "/users/" + userId + "/favorites",
    "DELETE",
    { offerId }
  );
};

// OFFERS

// // GET
export const getOffers = async (queryObj, limit, offset) => {
  let url = `${backendUrl}/offers?`;
  const queryObjProperties = Object.keys(queryObj);
  if (queryObjProperties.length) {
    url = url.concat(serializeStrAndArr(queryObj), "&");
  }
  url += `limit=${limit}&offset=${offset}`;
  return await fetchFunction(url);
};

export const getOfferById = async (id) => {
  return await fetchFunction(backendUrl + "/offers/" + id);
};

export const getOfferPropositions = async (id) => {
  return await fetchFunction(backendUrl + "/offers/" + id + "/propositions");
};

// // POST

export const createOffer = async (obj) => {
  //deleting empty values from obj
  const bodyData = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v != "")
  );

  fetchFunction(backendUrl + "/offers", "POST", bodyData);
};

export const changeOfferStatusToUnfilled = async (offerId) => {
  const offer = await fetchFunction(backendUrl + "/offers/" + offerId, "PUT");
  return offer;
};

// // ENTREPRISES

// GET
export const getEntreprises = async (queryObj, limit, offset) => {
  let url = `${backendUrl}/entreprises?`;
  url += `limit=${limit}&offset=${offset}`;

  return await fetchFunction(url);
};

export const getEntrepriseById = async (id) => {
  return await fetchFunction(backendUrl + "/entreprises/" + id);
};

export const getEntrepriseOffers = async (id) => {
  return await fetchFunction(backendUrl + "/entreprises/" + id + "/offers");
};

export const getEntrepriseContacts = async (id) => {
  return await fetchFunction(backendUrl + "/entreprises/" + id + "/contacts");
};

// POST
export const createEntreprise = async (obj) => {
  await fetchFunction(backendUrl + "/entreprises", "POST", obj);
  return;
};

export const createEntrepriseContact = async (obj) => {
  const { entrepriseId } = obj;
  return await fetchFunction(
    backendUrl + `/entreprises/${entrepriseId}/contacts`,
    "POST",
    obj
  );
};

//Proposition

// // GET

export const getPropositionById = async (id) => {
  return await fetchFunction(backendUrl + "/propositions/" + id);
};

export const getPropositionMessages = async (id) => {
  return await fetchFunction(backendUrl + "/propositions/" + id + "/messages");
};

export const getPropositionInterviews = async (id) => {
  return await fetchFunction(
    backendUrl + "/propositions/" + id + "/interviews"
  );
};

export const getPropositionResume = async (propositionId) => {
  return await fetchFunction(
    backendUrl + "/propositions/" + propositionId + "/resumes"
  );
};

// // POST

export const createProposition = async (obj) => {
  return await fetchFunction(backendUrl + "/propositions", "POST", obj);
};

export const createPropositionMessage = async (obj, propositionId) => {
  return await fetchFunction(
    `${backendUrl}/propositions/${propositionId}/messages`,
    "POST",
    obj
  );
};
