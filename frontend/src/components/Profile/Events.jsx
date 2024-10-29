import React from "react";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <div className="mt-5 flex px-5 flex-wrap gap-5">
      {[1, 1, 1].map((item, index) => (
        <EventCard key={index} />
      ))}
    </div>
  );
};

export default Events;
