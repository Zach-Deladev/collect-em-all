import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import spinnerOverride from "../utils/SpinnerOverride";

/**
 * `CardDetail` fetches and displays detailed information for
 * a card.
 */

export default function CardDetail() {
  // Access the query params in the url
  const [searchParams, _] = useSearchParams();
  // Track the loading state
  // Default is true
  const [loading, setLoading] = useState(true);
  // Track the card data
  // Default is null
  const [cardData, setCardData] = useState(null);

  // Base url for fetching a card from the api
  const GET_CARD_BASE_URL = "https://api.pokemontcg.io/v2/cards/";

  useEffect(() => {
    async function fetchCard() {
      // Update the `loading` state to true
      setLoading(true);
      // Fetch the value of the 'id' query parameter from the
      // the url
      const cardId = searchParams.get("id");
      // Transform the id to lowercase and remove all leading
      // and trailing whitespace
      const cleanCardId = cardId.toLowerCase().trim();
      // Append the card id to the end of the base url
      // for fetching a single card
      const url = `${GET_CARD_BASE_URL}${cleanCardId}`;
      // Fetch the data for the card from the pokemon api
      const resp = await fetch(url);
      // Parse the respones to json
      const card = await resp.json();
      // Update the `cardData` state to the be the fetched
      // card's data
      setCardData(card.data);
      // Update the `loading` state to false
      setLoading(false);
    }
    // Execute the fetch card function
    fetchCard();

    // An empty dependency array means that useEffect will be
    // executed once when the component is first rendered to
    // the screen.
  }, []);

  return (
    <div>
      {loading ? (
        // If the `loading` state is true, show the loading
        // spinner
        <ClipLoader
          loading={loading}
          size={150}
          cssOverride={spinnerOverride}
        />
      ) : !loading && !cardData ? (
        // if the `loading state is false and the
        // cardData is null, inform the user that data for the
        // card with the id supplied in the query parameter
        // can not be found.
        <div>
          <h2>Card not found</h2>
          <Link to="/">Back to search page</Link>
        </div>
      ) : (
        // If `loading` is false and the `cardData` is not null
        // then parse and diplay the card data
        <div>
          {/* {JSON.stringify(cardData)} */}
          <img src={cardData.images.small} alt="" />
          <h1>{cardData.name}</h1>
          <p>Name: {cardData.name}</p>
          <p>Description: {cardData.flavorText}</p>
          <p>Artist: {cardData.artist}</p>
          <a href={cardData.cardmarket.url}>
            <span>Bu y (~£{cardData.cardmarket.prices.averageSellPrice})</span>
          </a>
          <span> (Last upated:{cardData.cardmarket.updatedAt})</span>
          <p>ID: {cardData.id}</p>
        </div>
      )}
    </div>
  );
}
