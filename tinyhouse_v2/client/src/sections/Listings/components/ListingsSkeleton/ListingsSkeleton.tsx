import React from "react";
import { Skeleton, Divider, Alert } from "antd";
import "./styles/ListingsSkeleton.css";

interface Props {
  title: string;
  error?: boolean;
}

export const ListingsSkeleton: React.FC<Props> = (props) => {
  const errorAlert = props.error ? (
    <Alert
      type="error"
      message="Oops something went wrong!"
      className="listings-skeleton__alert"
    />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{props.title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
