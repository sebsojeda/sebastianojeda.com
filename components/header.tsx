import React from "react";
import Container from "./container";
import Navigation from "./navigation";

export default function Header() {
  return (
    <div className="h-52 bg-homepage">
      <Container>
        <Navigation />
      </Container>
    </div>
  );
}
