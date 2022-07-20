import "./App.css";
import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import FilterBar from "./components/FilterBar";
import BarChart from "./components/BarChart";

function App() {
  const [beers, setBeers] = useState([]);
  const { render, startDate, endDate, abvLevel } = FilterBar();
  const [apiLink, setapiLink] = useState(null);
  const [beersAfterAbv, setBeersAfterAbv] = useState([]);

  useEffect(() => {
    //retrieve all beers from punkapi
    async function getBeers(page = 1, beers = []) {
      return await fetch(apiLink + `&page=${page}`)
        .then((response) => response.json())
        .then((newBeers) => {
          const allBeers = [...beers, ...newBeers];
          if (newBeers.length !== 0) {
            page++;
            return getBeers(page, allBeers);
          }
          return allBeers;
        });
    }

    //count sum of brewed beers for each month-year in api
    const countBeers = (props) => {
      const beersCount = beers.filter((beers) =>
        beers.first_brewed.includes(props)
      );
      return beersCount.length;
    };

    //strip irrelevant values
    const keepOnlyWantedProperties = (beers) => {
      return beers.map((beer) => ({
        first_brewed: beer.first_brewed,
        sum: countBeers(beer.first_brewed),
        abv: beer.abv, // alcohol by volume
      }));
    };

    //change api parameters depending on user input
    if ((startDate != null) & (endDate != null)) {
      setapiLink(
        `https://api.punkapi.com/v2/beers?per_page=80&brewed_before=${endDate}&brewed_after=${startDate}`
      );
    } else if ((startDate != null) & (endDate === null)) {
      setapiLink(
        `https://api.punkapi.com/v2/beers?per_page=80&brewed_after=${startDate}`
      );
    } else if ((startDate === null) & (endDate != null)) {
      setapiLink(
        `https://api.punkapi.com/v2/beers?per_page=80&brewed_before=${endDate}`
      );
    } else {
      setapiLink(`https://api.punkapi.com/v2/beers?per_page=80`);
    }
    //filter api retrieved results even further by abv
    if (abvLevel === null || abvLevel === "") {
      setBeersAfterAbv(beers);
    } else {
      setBeersAfterAbv(
        beers.filter((beers) => beers.abv === parseInt(abvLevel))
      );
    }
    //invoke function to retrieve beers
    getBeers().then((beers) => setBeers(keepOnlyWantedProperties(beers)));
  }, [startDate, endDate, apiLink, beers, abvLevel]);

  return (
    <div className="App">
      {render}
      <BarChart beerData={beersAfterAbv} />
    </div>
  );
}

export default App;
