import React from "react";
import setOptions from "../data/sets";
import styles from "./SetOverview.module.css"

export default function SetOverview() {
  const sets = setOptions;

  return (
    <div>
      {sets.map((set) => {
        return (
          <div className={styles.cardD} key={set.value}>
            <div className={styles.card}>
              <img src={set?.images?.logo} alt="" />
              <h2>{set.label}</h2>;<p>Number of cards: {set.printedTotal}</p>
              <p>Release date: {set.releaseDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
