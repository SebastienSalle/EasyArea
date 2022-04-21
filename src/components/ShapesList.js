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
        return Number(Math.pow(e.length, 2)).toFixed(2);
        break;
      case "rectangle":
        return Number(e.length * e.width).toFixed(2);
        break;
      case "trapezoid":
        return Number(
          ((Number(e.base) + Number(e.oppositeBase)) * e.height) / 2
        ).toFixed(2);
        break;
      case "triangle":
        return Number((e.base * e.height) / 2).toFixed(2);
        break;
      case "circle":
        return Number(Math.PI * Math.pow(e.radius, 2)).toFixed(2);
        break;
      case "area":
        return Number(e.area).toFixed(2);
        break;
      default:
        return "Choose a shape";
    }
  });

  let total = 0;
  //const[total, setTotal]=useState(0);

  const combineArea = () => {
    //let newTotal = total
    areas.map((area, i) => {
      {
        //let newTotal = total;
        // Number((newTotal += Number(area)));
        // return newTotal;
        return Number((total += Number(area)));
      }
    });
    props.onUpdateTotal(total);
    //setTotal(newTotal);
    // console.log("AvantDispatch ",total)
    //props.onUpdateTotal(newTotal)
    return total;
    // return newTotal;
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
            <CardHeader style={{ color: "#fff", backgroundColor: "#1B1464" }}>
              {/* <TotalArea data={props.cards} unit={.name} /> */}
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
              {/* <Col xs='10'> */}
              <div style={{ marginTop: "5px" }}>
                {/* Total Area: <span onChange={()=>{props.onUpdateTotal(total)}}>{total.toFixed(2)}</span> {props.unit.name}² */}
                Total Surface Area:{" "}
                {/* <span
                  onChange={() => {
                    props.onUpdateTotal();
                  }}
                > */}
                {/* ERROR too many re-render - comment faire pour màj le total dans le store ?  */}
                {/* {Number(combineArea(total)).toFixed(2)} */}
                {Number(combineArea()).toFixed(2)}
                {/* </span> */} {props.unit.name}²
                {/* Total Area: {total.toFixed(2)} {props.unit.name}² */}
              </div>
              {/* </Col> */}
              <span
                style={{
                  cursor: "pointer",
                  // position: "absolute",
                  // top: "10px",
                  // right: "20px",
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
  // console.log("Units ", state.units);
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
