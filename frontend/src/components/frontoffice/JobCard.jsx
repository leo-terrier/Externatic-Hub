import React from "react";

export default function JobCard({ job }) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="group-hover:text-blue-700">{job.title}</h2>
        <p>{new Date(job.date).toLocaleString().split(" ")[0]}</p>
      </div>
      <p>
        {job.min_compensation.toLocaleString()} € |{" "}
        {job.max_compensation.toLocaleString()} €
      </p>
      <h2 className="m-0 absolute right-4 bottom-4 text-rose-600">
        {job.entreprise_name}
      </h2>
    </>
  );
}
