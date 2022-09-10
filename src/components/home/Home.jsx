import React from "react";
import RenderTemperature from "./RenderTemperature";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";
import FetchTemp from "./FetchTemp";
import RenderData from "./getTemp";

export default function Home() {
  return (
    <Layout>
      <Heading size="1" className="text-center">
        Weather app
      </Heading>

      <FetchTemp />
    </Layout>
  );
}
