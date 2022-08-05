import { render } from "@testing-library/react";
import React from "react";
// import styles from "./SetOverview.module.css";
import setOptions from "../data/sets";

export default function SetOverview() {
  const sets = setOptions;

  return (
    <div>
      {sets.map((set) => {
        return <h2>{set.label}</h2>;
      })}
    </div>
  );

  console.log(sets);
}
