import React, { FC } from "react";
import { server } from "../lib/api";

const LISTINGS = `
query Listings{
  listings{
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    rating
  }
}
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = (props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  );
};
