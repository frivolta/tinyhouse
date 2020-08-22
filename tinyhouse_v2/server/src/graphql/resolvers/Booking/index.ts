import { IResolvers } from "apollo-server-express";
import { Booking, Database, Listing } from "../../../lib/types";

export const bookingResolvers: IResolvers = {
  Booking: {
    id: (listing: Booking): string => {
      return listing._id.toString();
    },
    listing: (
      booking: Booking,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing | null> => {
      return db.listings.findOne({ _id: booking.listing });
    },
  },
};
