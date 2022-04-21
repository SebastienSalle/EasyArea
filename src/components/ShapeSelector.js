import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCalculator } from "@fortawesome/free-solid-svg-icons";

function ShapeSelector(props) {
  const [idCount, setIdCount] = useState(1);

  return (
    <Container className="mt-2" style={{ textAlign: "center" }}>
      <legend style={{ color: "#1B1464" }}>
        <FontAwesomeIcon
          style={{
            marginRight: "5px",
            height: "20px",
          }}
          icon={faCalculator}
        />
        Add a shape
      </legend>
      <Row>
        <Col>
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "rectangle",
                title: "",
                name: `Rectangle_${idCount}`,
                length: "",
                width: "",
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add a rectangle"
            style={styles.buttons}
            className="me-2 mb-2"
          >
            <img
              src="rectangle_icon.png"
              alt="rectangle"
              name="rectangle"
              height="25px"
            />
          </Button>
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "triangle",
                title: "",
                name: `Triangle_${idCount}`,
                height: "",
                base: "",
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add a triangle"
            style={styles.buttons}
            className="me-2 mb-2"
          >
            <img
              src="triangle_icon.png"
              alt="triangle"
              name="triangle"
              height="25px"
            />
          </Button>
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "trapezoid",
                title: "",
                name: `Trapezoid_${idCount}`,
                height: "",
                base: "",
                oppositeBase: "",
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add a trapezoid"
            style={styles.buttons}
            className="me-2 mb-2"
          >
            <img
              src="trapezoid_icon.png"
              alt="trapezoid"
              name="trapezoid"
              height="25px"
            />
          </Button>
          {/* <br /> */}
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "circle",
                title: "",
                name: `Circle_${idCount}`,
                radius: "",
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add a circle"
            style={styles.buttons}
            className="me-2 mb-2"
          >
            <img
              src="circle_icon.png"
              alt="circle"
              name="circle"
              height="25px"
            />
          </Button>
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "square",
                title: "",
                name: `Square_${idCount}`,
                length: "",
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add a square"
            style={styles.buttons}
            className="me-2 mb-2"
          >
            <img
              src="square_icon.png"
              alt="square"
              name="square"
              height="25px"
            />
          </Button>
          <Button
            onClick={() => {
              props.onAddClick({
                idCard: idCount,
                type: "area",
                title: "",
                name: `Area_${idCount}`,
                area: "",
              });
              setIdCount(idCount + 1);
            }}
            title="add an area"
            className="me-2 mb-2"
            style={styles.buttons}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ padding: "1px", height: "20px", color: "#000" }}
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  buttons: {
    size: "sm",
    color: "secondary",
    backgroundColor: "#A3CB38",
    width: "50px",
  },
};

function mapDispatchToProps(dispatch) {
  // let newCount;
  return {
    onAddClick: function (data) {
      console.log("ShapeSel ", data);
      //newCount= idCount+1;
      //setIdCount(newCount);
      // console.log(idCount);
      dispatch({ type: "addShape", data: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(ShapeSelector);
