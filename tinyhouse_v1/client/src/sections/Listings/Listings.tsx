import React, { FC } from "react";
import { server } from "../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

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
    numOfBaths
    rating
  }
}
`;

const DELETE_LISTING = `
mutation DeleteListing($id: ID!){
  deleteListing(id:$id){
    id
  }
}`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = (props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListings = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "5f253154a1265fe1876390d0",
      },
    });
    console.log(data);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListings}>Delete Listings</button>
    </div>
  );
};
