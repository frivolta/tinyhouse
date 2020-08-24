import React, { FC } from "react";
import { List, Typography } from "antd";
import { Listings } from "../../../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingCard } from "../../../../lib/components/ListingCard/index";

const { Title } = Typography;

interface Props {
  title: string;
  listings: Listings["listings"]["result"];
}

export const HomeListings: FC<Props> = ({ listings, title }) => (
  <div className="home-listings">
    <Title level={4} className="home-listings__title">
      {title}
    </Title>
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item>
          <ListingCard listing={listing} />
        </List.Item>
      )}
    />
  </div>
);
