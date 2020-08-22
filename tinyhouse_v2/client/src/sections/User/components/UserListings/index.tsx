import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../../lib/components/ListingCard";
import { User } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  listingsPage: number;
  userListings: User["user"]["listings"];
  limit: number;
  setListingsPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserListings = ({
  listingsPage,
  userListings,
  limit,
  setListingsPage,
}: Props) => {
  const { total, result } = userListings;

  const userListingsList = (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={result}
      locale={{ emptyText: "User doesn't have any listings yet!" }}
      pagination={{
        position: "top",
        current: listingsPage,
        total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingsPage(page),
      }}
      renderItem={(userListing) => (
        <List.Item>
          <ListingCard listing={userListing} />
        </List.Item>
      )}
    ></List>
  );

  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Listings
      </Title>
      <Paragraph>
        This section highlits the listings this user currenctly hosts and has
        made available for bookings
      </Paragraph>
      {userListingsList}
    </div>
  );
};
