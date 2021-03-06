import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { LISTING } from "../../lib/graphql/queries/Listing";
import { RouteComponentProps } from "react-router-dom";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { PageSkeleton } from "../../lib/components";
import { Layout, Row, Col } from "antd";
import { ErrorBanner } from "../../lib/components/ErrorBanner/index";
import {
  ListingDetails,
  ListingBookings,
  ListingCreateBooking,
} from "./components";
import { Moment } from "moment";

interface MatchParams {
  id: string;
}

const PAGE_LIMIT = 3;

const { Content } = Layout;

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listing">
        {error && (
          <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
        )}
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
      listingBookings={listingBookings}
    />
  ) : null;

  const listingCreateBooking = listing ? (
    <ListingCreateBooking
      price={listing.price}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      setCheckInDate={setCheckInDate}
      setCheckOutDate={setCheckOutDate}
    />
  ) : null;

  return (
    <Content className="listing">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={24} lg={10}>
          {listingCreateBooking}
        </Col>
      </Row>
    </Content>
  );
};
