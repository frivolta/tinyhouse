import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Affix, Layout, List, Typography } from "antd";
import { ListingCard } from "../../lib/components/ListingCard";
import { ErrorBanner } from "../../lib/components/ErrorBanner";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { LISTINGS } from "../../lib/graphql/queries/Listings";
import {
  ListingsSkeleton,
  ListingsPagination,
  ListingsFilters,
} from "./components";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../lib/graphql/queries/Listings/__generated__/Listings";

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

interface MatchParams {
  location: string;
}

const PAGE_LIMIT = 8;

export const Listings: FC = () => {
  const { location } = useParams<MatchParams>();

  const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        location,
        filter,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (loading || error) {
    return (
      <Content className="listings">
        {error && (
          <ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
        )}
        <ListingsSkeleton />
      </Content>
    );
  }
  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <>
        <Affix className="listings__affix" offsetTop={64}>
          <>
            <ListingsPagination
              total={listings.total}
              page={page}
              setPage={setPage}
              limit={PAGE_LIMIT}
            />
            <ListingsFilters filter={filter} setFilter={setFilter} />
          </>
        </Affix>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <List.Item>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </>
    ) : (
      <div className="listings--none">
        <Paragraph>
          It appears that no listings have yet been created for{" "}
          <Text mark>{listingsRegion}</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{" "}
          <Link to="/host">listing in this area</Link>!
        </Paragraph>
      </div>
    );

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for &quot;{listingsRegion}&quot;
    </Title>
  ) : null;

  return (
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};
