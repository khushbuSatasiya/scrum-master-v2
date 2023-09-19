import React from "react";

import moment from "moment";

const CustomToolbar = (props) => {
  const { onNavigate, label, date } = props;

  const formattedDate = moment(date).format("MMMM YYYY");

  return (
    <div className="custom-toolbar">
      <div className="toolbar-label">{formattedDate}</div>
      <div className="toolbar-label">{label}</div>

      <div className="toolbar-navigation">
        <button onClick={() => onNavigate("PREV")} className="toolbar-btn">
          Prev
        </button>
        <button onClick={() => onNavigate("TODAY")} className="toolbar-btn">
          Today
        </button>
        <button onClick={() => onNavigate("NEXT")} className="toolbar-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
