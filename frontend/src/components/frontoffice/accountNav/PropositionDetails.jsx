import { useState } from "react";
import PropositionDetailNavButton from "./PropositionDetailNavButton";
import PropositionDetailsInterviews from "./PropositionDetailsInterviews";
import PropositionDetailsMessages from "./PropositionDetailsMessages";
import PropositionDetailsResume from "./PropositionDetailsResume";

export default function PropositionDetails({ isOpen, propositionId, userId }) {
  const [selectedTab, setSelectedTab] = useState("Mes échanges");

  const propositionDetailNav = {
    "Mes entretiens": (
      <PropositionDetailsInterviews propositionId={propositionId} />
    ),
    "Mon CV": (
      <PropositionDetailsResume propositionId={propositionId} userId={userId} />
    ),
    "Mes échanges": (
      <PropositionDetailsMessages propositionId={propositionId} />
    ),
  };

  const PropositionDetailNavKeys = Object.keys(propositionDetailNav);

  return (
    <div
      style={
        isOpen
          ? {
              maxHeight: "50rem",
              transition: "max-height 0.3s ease-in",
            }
          : {
              maxHeight: "0rem",
              transition: "max-height 0.3s ease-out",
            }
      }
      className="overflow-hidden w-full"
    >
      <ul className="bg-white  flex w-full ">
        {PropositionDetailNavKeys.map((property, i) => {
          return (
            <li key={property} className="w-full">
              <PropositionDetailNavButton
                propertyName={property}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                idx={i}
              />
            </li>
          );
        })}
      </ul>
      <div className="min-h-[400px] border-[1px] border-gray-400 border-t-0 rounded-sm">
        {propositionDetailNav[selectedTab]}
      </div>
    </div>
  );
}
