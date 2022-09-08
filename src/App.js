import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import { DataProvider } from "./utils/context/DataContext";
import "./styles/styles.scss";

function App() {
  return (
    <DataProvider>
      <Layout>
        <Home />
      </Layout>
    </DataProvider>
  );
}

export default App;
