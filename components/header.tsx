import React from "react";
import Container from "./container";
import Navigation from "./navigation";

export default function Header() {
  return (
    <div className="relative bg-blue h-52 text-white">
      <Container>
        <Navigation />
      </Container>
    </div>
  );
}
