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

export const renameFieldToSqlCol = (str) => {
  const obj = {
    id: "t1.id",
    date: "t1.date",
    city: "t1.city",
    title: "t1.title",
    job_field: "t1.job_field",
    min_compensation: "t1.min_compensation",
    max_compensation: "t1.max_compensation",
    content: "t1.content",
    stack: "t1.stack",
    entreprise_name: "t4.name",
    consultant: "t3.lastname",
    status: "t1.status",
  };
  return obj[str];
};
