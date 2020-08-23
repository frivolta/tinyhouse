import React, { FC } from "react";
import { Button, Card, DatePicker, Divider, Tooltip, Typography } from "antd";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../../../lib/utils";
import { displayErrorMessage } from "../../../../lib/utils/index";

const { Paragraph, Text, Title } = Typography;

interface Props {
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  price: number;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking: FC<Props> = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}) => {
  const disabledDate = (currentDate?: Moment) => {
    if (currentDate) {
      const dateIsBeforeEOD = currentDate.isBefore(moment().endOf("day"));
      return dateIsBeforeEOD;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(
          "You can't book date of check out to be prior to check in!"
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-create-booking">
      <Card className="listing-create-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-create-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-create-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              format={"YYYY/MM/DD"}
              disabledDate={disabledDate}
              showToday={false}
              onChange={(dateValue) => setCheckInDate(dateValue)}
            />
          </div>
          <div className="listing-create-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              format={"YYYY/MM/DD"}
              disabledDate={disabledDate}
              showToday={false}
              disabled={checkOutInputDisabled}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-create-booking__card-cta"
          disabled={buttonDisabled}
        >
          Request to book!
        </Button>
        <Text type="secondary" mark></Text>
      </Card>
    </div>
  );
};
