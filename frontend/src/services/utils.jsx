export function Boldify({ children }) {
  return <span className="font-bold text-black">{children}</span>;
}
export function Underline({ children }) {
  return <span className="underline">{children}</span>;
}

export const serializeStrAndArr = (obj) => {
  const str = [];
  Object.keys(obj).forEach((property) => {
    if (typeof obj[property] === "string") {
      str.push(
        `${encodeURIComponent(property)}=${encodeURIComponent(obj[property])}`
      );
    } /* typeof obj[property] === array */ else {
      const subString = [];
      obj[property].forEach((elt) => {
        subString.push(
          `${encodeURIComponent(property)}=${encodeURIComponent(elt)}`
        );
      });
      str.push(subString.join("&"));
    }
  });
  return str.join("&");
};

export const addThousandSeparator = (str) => {
  return str && str !== 0 ? str.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
};

/* export const renameFieldToSqlCol = (str) => {
  const obj = {
    mySqlCol: "t1.id",
    mySqlCol: "t1.date",
    mySqlCol: "t1.city",
    mySqlCol: "t1.title",
    mySqlCol: "t1.job_field",
    mySqlCol: "t1.min_compensation",
    mySqlCol: "t1.max_compensation",
    mySqlCol: "t1.content",
    mySqlCol: "t1.stack",
    mySqlCol: "t4.name",
  };
  return obj[str];
}; */
