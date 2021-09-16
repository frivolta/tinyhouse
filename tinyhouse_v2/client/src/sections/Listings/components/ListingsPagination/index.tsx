import React, { FC } from "react";
import { Pagination } from "antd";

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  total: number;
}

export const ListingsPagination: FC<Props> = ({
  page,
  setPage,
  limit,
  total,
}) => (
  <Pagination
    className="listings-pagination"
    current={page}
    total={total}
    defaultPageSize={limit}
    hideOnSinglePage
    showLessItems
    onChange={(page) => setPage(page)}
  />
);

ListingsPagination.displayName = "ListingsPagination";
