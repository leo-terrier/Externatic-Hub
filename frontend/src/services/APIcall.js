import { serializeStrAndArr } from "./utils";

export const backendUrl = "http://localhost:5001";

// ALL
export const fetchAPIData = async (queryObj, limit, offset, dataPath) => {
  let url = `${backendUrl}/${dataPath}?`;
  const queryObjProperties = Object.keys(queryObj);
  if (queryObjProperties.length) {
    url = url.concat(serializeStrAndArr(queryObj), "&");
  }
  url += `limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

// BACKOFFICE
export const fetchDataFromTable = async (tableState, dataPath) => {
  const { search, pageSize, page, orderBy, orderDirection } = tableState;
  const queryObj = {};
  console.log(tableState);
  if (tableState.search) queryObj.queryStr = search;
  if (tableState.orderBy) {
    queryObj.orderBy = orderBy.mySqlCol;
    queryObj.orderDirection = orderDirection;
  }
  const offset = pageSize * page;
  const [data, [{ totalCount }]] = await fetchAPIData(
    queryObj,
    pageSize,
    offset,
    dataPath
  );
  return {
    data,
    page,
    totalCount,
  };
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
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getOfferById = async (id) => {
  const response = await fetch(backendUrl + "/offers/" + id);
  const responseJson = await response.json();
  return responseJson;
};
export const getOfferPropositions = async (id) => {
  const response = await fetch(backendUrl + "/offers/" + id + "/propositions");
  const responseJson = await response.json();
  return responseJson;
};

// // POST

export const createOffer = async (obj) => {
  //deleting empty values from obj
  const bodyData = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v != "")
  );

  await fetch(backendUrl + "/offers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return;
};

//USERS
export const getUsers = async () => {
  const response = await fetch(backendUrl + "/users");
  const responseJson = await response.json();
  return responseJson;
};

export const getUserById = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id);
  const responseJson = await response.json();
  return responseJson;
};
export const getUserSearchPreferences = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id + "/preferences");
  const responseJson = await response.json();
  return responseJson;
};

export const getUserPropositions = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id + "/propositions");
  const responseJson = await response.json();
  return responseJson;
};

export const getUserFavorites = async (id) => {
  try {
    const response = await fetch(backendUrl + "/users/" + id + "/favorites");
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.log("no favorites found");
  }
};

// // ENTREPRISES

// GET
export const getEntreprises = async (queryObj, limit, offset) => {
  let url = `${backendUrl}/entreprises?`;

  const responseJson = await response.json();
  return responseJson;
};

export const getEntrepriseById = async (id) => {
  const response = await fetch(backendUrl + "/entreprises/" + id);
  const responseJson = await response.json();
  return responseJson;
};

export const getEntrepriseOffers = async (id) => {
  const response = await fetch(backendUrl + "/entreprises/" + id + "/offers");
  const responseJson = await response.json();
  return responseJson;
};

export const getEntrepriseContacts = async (id) => {
  const response = await fetch(backendUrl + "/entreprises/" + id + "/contacts");
  const responseJson = await response.json();
  return responseJson;
};

// POST
export const createEntreprise = async (obj) => {
  await fetch(backendUrl + "/entreprises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return;
};

export const createEntrepriseContact = async (obj) => {
  const { entrepriseId } = obj;
  const response = await fetch(
    backendUrl + `/entreprises/${entrepriseId}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  );
  const responseJson = await response.json();
  const id = responseJson;
  return id;
};

//Proposition

export const getPropositionById = async (id) => {
  const response = await fetch(backendUrl + "/propositions/" + id);
  const responseJson = await response.json();
  return responseJson;
};

export const getPropositionMessages = async (id) => {
  const response = await fetch(
    backendUrl + "/propositions/" + id + "/messages"
  );
  const responseJson = await response.json();
  return responseJson;
};

export const getPropositionInterviews = async (id) => {
  const response = await fetch(
    backendUrl + "/propositions/" + id + "/interviews"
  );
  const responseJson = await response.json();
  return responseJson;
};
