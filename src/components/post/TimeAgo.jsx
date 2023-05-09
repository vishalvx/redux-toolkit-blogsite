import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeago = "";
  if (timestamp) {
    const dateISO = parseISO(timestamp);
    const timeperiod = formatDistanceToNow(dateISO);
    timeago = `${timeperiod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeago}</i>
    </span>
  );
};

export default TimeAgo;
