import React from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Input, InputGroup, Label } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

function UnitSelector(props) {
  return (
    <Container className=" mt-2">
      <InputGroup tag="fieldset" style={{ color: "#1B1464" }}>
        <legend>
          <FontAwesomeIcon
            style={{
              marginRight: "5px",
              height: "20px",
            }}
            icon={faPenRuler}
          />
          Unit
        </legend>
        <Row>
          <Col xs="5">
            <InputGroup
              onChange={() => {
                props.onUnitChange("cm");
                props.convertValue(props.units.name, "cm");
              }}
            >
              <Label style={{ cursor: "pointer" }} title="centimetre">
                <Input type="radio" name="radio1" />
                {"cm"}
              </Label>
            </InputGroup>

            <InputGroup
              onChange={() => {
                props.onUnitChange("m");
                props.convertValue(props.units.name, "m");
              }}
            >
              <Label style={{ cursor: "pointer" }} title="metre">
                <Input type="radio" name="radio1" defaultChecked />
                {"m"}
              </Label>
            </InputGroup>
          </Col>
          <Col xs="5">
            <InputGroup
              onChange={() => {
                props.onUnitChange("in");
                props.convertValue(props.units.name, "in");
              }}
            >
              <Label style={{ cursor: "pointer" }} title="inch">
                <Input type="radio" name="radio1" />
                {"in"}
              </Label>
            </InputGroup>
            <InputGroup
              onChange={() => {
                props.onUnitChange("ft");
                props.convertValue(props.units.name, "ft");
              }}
            >
              <Label style={{ cursor: "pointer" }} title="foot">
                <Input type="radio" name="radio1" />
                {"ft"}
              </Label>
            </InputGroup>
          </Col>
        </Row>
      </InputGroup>
    </Container>
  );
}

function mapStateToProps(state) {
  console.log("mapStateUsel ", state.units);
  return { cards: state.shapes, units: state.units };
}

function mapDispatchToProps(dispatch) {
  return {
    onUnitChange: function (data) {
      console.log("UnitSel ", data);
      dispatch({ type: "selectUnit", u: data });
    },
    convertValue: function (u, newU) {
      dispatch({ type: "convert", currentUnit: u, newUnit: newU });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitSelector);
