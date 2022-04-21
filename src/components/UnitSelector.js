import React, { useState } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Input, InputGroup, Label } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

function UnitSelector(props) {
  //const [unit, setUnit] = useState('')
  //const [newUnit, setNewUnit] = useState('')
  //const [selected, setSelected] = useState(false)
  // console.log("UnitSelPROPS ",props)
  // console.log("coeff ", props.units.coeff)

  // const coeff = props.units.coeff
  // const convertValue = () => {

  //   console.log("PROPS-COEFF ", props.units.coeff)
  // const convertedCards =
  // props.cards.map((e,i)=> {
  //   switch (e.type) {
  //     case "area":
  //       return (e.area*coeff);
  //       break;

  //     case "square":
  //       return (e.length*coeff);
  //       break;

  //     case "circle":
  //       return (e.radius*coeff);
  //       break;

  //     case "rectangle":
  //       return ("rectangle");
  //       break;

  //     case "triangle":
  //       return ("triangle");
  //       break;

  //     case "trapezoid":
  //       return ("trapezoid");
  //       break;

  //     default :

  //   }
  // })

  //}

  //console.log("CARDS -- ",convertValue())

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

            {/* <InputGroup check onChange={() =>props.onUnitChange('m')}>
                <Label check style={{ cursor: "pointer"}} title="metre"> */}
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
      //dispatch({ type: "convert", u: data })
    },
    convertValue: function (u, newU) {
      dispatch({ type: "convert", currentUnit: u, newUnit: newU });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitSelector);
