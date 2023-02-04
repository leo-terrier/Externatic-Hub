import React from "react";

export default function Interview({ interview }) {
  const date = new Date(interview.date);
  return (
    <p>
      {date.toLocaleDateString("locale", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}{" "}
      - {date.getHours()}H{date.getMinutes()} :{" "}
      {interview.is_visio ? "En visio" : interview.location}
    </p>
  );
}
