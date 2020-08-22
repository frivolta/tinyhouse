import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../../lib/components/ListingCard";
import { User } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  bookingsPage: number;
  userBookings: User["user"]["bookings"];
  limit: number;
  setBookingsPage: (page: number) => void;
}

const { Paragraph, Text, Title } = Typography;

export const UserBookings = ({
  bookingsPage,
  userBookings,
  limit,
  setBookingsPage,
}: Props) => {
  const total = userBookings ? userBookings.total : null;
  const result = userBookings ? userBookings.result : null;

  const userBookingsList =
    total && result ? (
      <List
        grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
        dataSource={result}
        locale={{ emptyText: "User doesn't have any listings yet!" }}
        pagination={{
          position: "top",
          current: bookingsPage,
          total,
          defaultPageSize: limit,
          hideOnSinglePage: true,
          showLessItems: true,
          onChange: (page: number) => setBookingsPage(page),
        }}
        renderItem={(userBooking) => {
          const bookingsHistory = (
            <div className="user-bookings__booking-history">
              <div>
                Check in: <Text strong>{userBooking.checkIn}</Text>
              </div>
              <div>
                Check out: <Text strong>{userBooking.checkOut}</Text>
              </div>
            </div>
          );
          return (
            <List.Item>
              {bookingsHistory}
              <ListingCard listing={userBooking.listing} />
            </List.Item>
          );
        }}
      ></List>
    ) : null;

  const userBookingsElement = userBookingsList ? (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Bookings
      </Title>
      <Paragraph>
        This section highlits the bookings you've made, and the
        check-in/check-out dates associated with said bookings
      </Paragraph>
      {userBookingsList}
    </div>
  ) : null;

  return userBookingsElement;
};
