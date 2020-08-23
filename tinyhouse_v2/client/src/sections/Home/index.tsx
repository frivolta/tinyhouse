import React from "react";
import { Button, Col, Layout, Row, Typography } from "antd";
import { HomeHero } from "./components/HomeHero";
import { RouteComponentProps, Link } from "react-router-dom";
import { displayErrorMessage } from "../../lib/utils/index";
import mapBackground from "./assets/map-background.jpg";
import sanFranciscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = ({ history }: RouteComponentProps) => {
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      history.push(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search...");
    }
  };

  return (
    <Content className="home">
      <HomeHero onSearch={onSearch} />

      <div
        className="home__cta-section"
        style={{ backgroundImage: `url(${mapBackground})` }}
      >
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
        <Link to="/listings/united%20states">
          <Button
            type="primary"
            size="large"
            className="home__cta-section-button"
          >
            Popular listings in the United States
          </Button>
        </Link>
      </div>

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20francisco">
              <div className="home__listings-img-cover">
                <img
                  src={sanFranciscoImage}
                  alt="San Francisco"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="cancun">
              <div className="home__listings-img-cover">
                <img
                  src={cancunImage}
                  alt="Cancún"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
