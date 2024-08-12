import {useContext} from "react";
import DependenciesContext from "../context/Dependencies";

function useDependencies() {
  return useContext(DependenciesContext);
}

export default useDependencies;
