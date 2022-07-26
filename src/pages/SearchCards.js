import { useState, useEffect } from "react";
import CardOverview from "../components/CardOverview";
import styles from "./SearchCards.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import spinnerOverride from "../utils/SpinnerOverride";
import Select from "react-select";
import setOptions from "../data/sets";

/**
 * The `SearchCards` component represents a page in my app
 * which allows the user to search for cards by their name
 * and filter them by their set.
 */

export default function Search() {
  // Track the `loading` state property of `SearchCards` page/component with the method `setLoading
  // this is true by default.
  const [loading, setLoading] = useState(true);

  // Track the value of the `searchInput` state property with the method `setSearchInput` field
  // An empty string by default
  const [searchInput, setSearchInput] = useState("");

  // Track the value of the selected `set`state property of cards with method `setSet`
  // null by default
  const [set, setSet] = useState(null);

  // Track the `cards` state property that have been returned from the api with the `setCards` method
  // An empty array by default
  const [cards, setCards] = useState([]);

  // The base url for the api which will append extra info
  // to based on the users input/selections.
  const SEARCH_CARDS_BASE_URL = "https://api.pokemontcg.io/v2/cards";

  useEffect(() => {
    async function fetchCards() {
      // update the `loading` state to `true`
      setLoading(true);

      // Transform the text in the search input field to lowercase
      // and remove any leading and trailing whitespace
      const cleanSearchInput = searchInput.toLowerCase().trim();

      // Format the fetch url based on whether the search input
      // and set filter values.
      let url = `${SEARCH_CARDS_BASE_URL}?`;
      if (set && set.value !== "all") {
        // if `set` is not null, and the value is not 'all', then
        // the user must have manually set the `set` using the set
        // filter, so append it to the url
        url += `q=set.id:${set.value}`;

        if (cleanSearchInput === "") {
          // If the user has not entered any input into the search
          // input, display the first 50 cards from the api
          url += `&pageSize=50`;
        } else {
          // If the user has entered something in the search input, then
          // search for all cards with that name
          url += ` name:${cleanSearchInput}`;
        }
      } else {
        // Same ideas for both situations listed above, just with slightly
        // different string formatting due to the strange way the api wants
        // developers to format query params.
        if (cleanSearchInput === "") {
          url += `pageSize=50`;
        } else {
          url += `q=name:${cleanSearchInput}`;
        }
      }

      // Log out the final url which will be passed to the fetch
      // function -- for debugging purposes only.
      console.log(url);

      // Fetch the data from the API
      const resp = await fetch(url);

      // Parse the response into json
      const cards = await resp.json();

      // Update the `cards` state to be an array of card objects
      setCards(cards.data);

      // Wait 4 seconds before setting the `loading` state to false.
      // This gives react time to fully update the `cards` state.
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }

    // Call the `fetchCards` function
    fetchCards();

    // if either the `searchInput` or `set` values change
    // the `fetchCards` function will execute.
  }, [searchInput, set]);

  return (
    <div>
      <h1 className={styles.header}>Search Pokemon</h1>

      <input
        className={styles.searchInput}
        type="text"
        value={searchInput}
        // When the text inside the search input field changes
        // update the value of the `searchInput` state
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={"e.g. Pikachu"}
      />

      <Select
        className={styles.setFilter}
        defaultValue={setOptions[0]}
        // When the filter option in the filter dropdown changes
        // update the the value of the `set` state
        onChange={(newSet) => setSet(newSet)}
        name="set"
        // `setOptions` is an array of objects, where each object
        // represents one set. See src/data/sets.js
        options={setOptions}
        classNamePrefix="select"
      />
      {loading ? (
        // If the `loading` state is true, display the loading spinner
        <ClipLoader
          loading={loading}
          size={150}
          cssOverride={spinnerOverride}
        />
      ) : !loading && cards.length === 0 ? (
        // If the `loading` state is false, and there are no cards
        // in the array, then tell the user that no cards have been
        // found
        <h2>No cards found</h2>
      ) : (
        // If the app is not loading, and there are cards in the
        // `cards` array, then render them out on the screen for the
        // user to see.
        <div className={styles.flexboxContainer}>
          {cards.map((card, idx) => {
            // Pass the data for each card returned from the
            // api into the `CardOverview` component which will
            // render the data (image, name, set, etc) to the screen
            return (
              <div key={idx}>
                <CardOverview cardData={card} />;
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
