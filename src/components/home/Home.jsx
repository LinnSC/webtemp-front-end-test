import React from "react";
import TemperatureForm from "../Forms/TemperatureForm";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";

import Temperature from "./Temperature";

export default function Home() {
  return (
    <Layout>
      <Heading size="1">Weather app</Heading>
      {/* <TemperatureForm /> */}
      <Temperature />
    </Layout>
  );
}
