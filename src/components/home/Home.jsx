import React from "react";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";
import RenderWeather from "./RenderWeather";

export default function Home() {
  return (
    <Layout>
      <Heading size="1" className="text-center mt-6">
        Weather app
      </Heading>

      <RenderWeather />
    </Layout>
  );
}
