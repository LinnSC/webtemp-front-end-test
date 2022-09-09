import React from "react";
import RenderTemperature from "./RenderTemperature";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";
import FetchTemp from "./FetchTemp";

export default function Home() {
  return (
    <Layout>
      <Heading size="1">Weather app</Heading>
      {/* <TemperatureForm /> */}
      {/* <RenderTemperature /> */}

      <FetchTemp />
    </Layout>
  );
}
