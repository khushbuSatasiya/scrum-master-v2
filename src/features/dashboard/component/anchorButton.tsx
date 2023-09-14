import React from "react";

import { Anchor } from "@mantine/core";

const AnchorButton = ({ href, text }) => {
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        color: "#78829D",
      }}
    >
      {text}
    </Anchor>
  );
};

export default AnchorButton;
