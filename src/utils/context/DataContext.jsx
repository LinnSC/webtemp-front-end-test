import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DataContext = React.createContext([null, () => {}]);

export const DataProvider = (props) => {
  const [data, setData] = useLocalStorage("data", "0");

  const dataValue = [data, setData];

  return (
    <DataContext.Provider value={dataValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
