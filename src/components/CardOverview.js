import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardOverview.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * The `CardOverview` component displays some basic data
 * for a card returned from the api. Displayed on the
 * `SearchCards` component/page.
 */

export default function CardOverview({ cardData }) {
  return (
    <Link
      // Take the user to the `CardDetail` component when they
      // click here. Pass the card id as a query parameter
      // to the `CardDetail` component, so card's details can be
      // fetched and displayed.
      to={`/card-detail?id=${cardData.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.cardOverview}>
        <div className={styles.cardImage}>
          <FontAwesomeIcon className={styles.icon} icon={faCircleCheck} />

          <img alt="Card" src={cardData.images.small} />
        </div>
        <div className={styles.cardT}>
          <h4>{cardData.name}</h4>

          <p>Set: {cardData.set.name}</p>
          <h5>Add to:</h5>
          <button className={styles.owned}>Owned</button>
          <button className={styles.needed}>Needed</button>
        </div>
      </div>
    </Link>
  );
}
