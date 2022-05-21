import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import ShapeCard from "./ShapeCard";

function ShapesList(props) {
  const areas = props.cards.map((e, i) => {
    switch (e.type) {
      case "square":
        return Number(Math.pow(e.length, 2)).toFixed(2) * e.deduct;
      case "rectangle":
        return Number(e.length * e.width).toFixed(2) * e.deduct;
      case "trapezoid":
        return (
          Number(
            ((Number(e.base) + Number(e.oppositeBase)) * e.height) / 2
          ).toFixed(2) * e.deduct
        );
      case "triangle":
        return Number((e.base * e.height) / 2).toFixed(2) * e.deduct;
      case "circle":
        return Number(Math.PI * Math.pow(e.radius, 2)).toFixed(2) * e.deduct;
      case "area":
        return Number(e.area).toFixed(2) * e.deduct;
      default:
        return "Choose a shape";
    }
  });

  let total = 0;

  const combineArea = () => {
    areas.map((area, i) => {
      return Number((total += Number(area)));
    });
    props.onUpdateTotal(total);
    return total;
  };

  const [copied, setCopied] = useState(false);
  const iconColor = copied ? "#A3CB38" : "#fff";

  const copy = async () => {
    await navigator.clipboard.writeText(total.toFixed(2));
    //alert('Total copied');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 200);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card
            className="mb-3"
            style={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
              height: "500px",
              scroll: true,
            }}
          >
            <CardHeader style={{ color: "#fff", backgroundColor: "#1B1464"}}>
              <span
                onClick={copy}
                style={{
                  float: "left",
                  color: `${iconColor}`,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "7px" }}>Copy</div>
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    height: "20px",
                  }}
                  title="copy the total to the clipboard"
                  icon={faCopy}
                />
              </span>
              <div style={{ marginTop: "5px" }}>
                Total Surface Area: {Number(combineArea()).toFixed(2)}
                {props.unit.name}²
              </div>
              <span
                style={{
                  cursor: "pointer",
                }}
              ></span>
            </CardHeader>
            <CardBody style={{ overflowY: "scroll" }}>
              <ShapeCard
                data={props.cards}
                unit={props.unit.name}
                coeff={props.unit.coeff}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  return { cards: state.shapes, unit: state.units };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateTotal: function (ttl) {
      dispatch({
        type: "updateTotal",
        value: ttl,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShapesList);
