import React, { FC } from "react";
import { server } from "../lib/api";
import { useQuery } from "../lib/api/useQuery";
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
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListings(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Oops something went wrong!</h2>;
  }

  return (
    <div>
      <h2>{props.title}</h2>
      {listingsList}
    </div>
  );
};
