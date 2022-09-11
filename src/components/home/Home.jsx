import React from "react";
import Heading from "../common/Heading";
import RenderTemp from "./RenderTemp";

export default function Home() {
  return (
    <>
      <Heading size="1" className="text-center mt-6">
        Weather app
      </Heading>

      <RenderTemp />
    </>
  );
}
