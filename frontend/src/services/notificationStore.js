import { Store } from "react-notifications-component";

export const requiredLoginNotification = () => {
  Store.addNotification({
    title: "Fonctionnalité indisponible",
    message: "Merci de vous identifier",
    type: "danger",
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated animate__fadeInRight"],
    animationOut: ["animate__animated animate__fadeOutRight"],
    dismiss: {
      duration: 3000,
      delay: 400,
    },
  });
};

export const propositionSentNotification = (origin) => {
  Store.addNotification({
    title: "Envoyé",
    message: `Votre ${
      origin === "user" ? "candidature" : "proposition"
    } a bien été envoyée`,
    type: "success",
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated animate__fadeInRight"],
    animationOut: ["animate__animated animate__fadeOutRight"],
    dismiss: {
      duration: 3000,
      delay: 400,
    },
  });
};
export const fillInfoNotification = () => {
  Store.addNotification({
    title: "Informations à remplir",
    message: "Merci de remplir vos informations",
    type: "info",
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated animate__fadeInRight"],
    animationOut: ["animate__animated animate__fadeOutRight"],
    dismiss: {
      duration: 3000,
      delay: 400,
    },
  });
};
export const makeFiltersSearchPreferencesNotification = () => {
  Store.addNotification({
    title: "Critères de recherche",
    message: "Vos critères de recherche ont été mis à jour",
    type: "info",
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated animate__fadeInRight"],
    animationOut: ["animate__animated animate__fadeOutRight"],
    dismiss: {
      duration: 3000,
      delay: 400,
    },
  });
};
export const applySearchPreferencesToCurrentFiltersNotification = () => {
  Store.addNotification({
    title: "Filtre de recherche",
    message: "Vos critères de recherche ont été appliqué",
    type: "info",
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated animate__fadeInRight"],
    animationOut: ["animate__animated animate__fadeOutRight"],
    dismiss: {
      duration: 3000,
      delay: 400,
    },
  });
};
