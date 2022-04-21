import React, { useState } from "react";
import { connect } from "react-redux";

// import addingAreas from "../addingAreas";

import {
  Input,
  InputGroup,
  InputGroupText,
  Badge,
  Container,
  Row,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintRoller,
  faLayerGroup,
  faFillDrip,
} from "@fortawesome/free-solid-svg-icons";

function PaintCalcutor(props) {
  const [volume, setVolume] = useState("");

  //10m²/L/couche
  const [display, setDisplay] = useState(false);

  const [paintYield, setPaintYield] = useState("");

  const [coat, setCoat] = useState("");

  const calculateVolume = (t, y, c) => {
    let newVolume;
    y > 0 ? (newVolume = (t / y) * c) : (newVolume = 0);
    setVolume(newVolume);
    props.handleVolumePaint(newVolume, y, c);
    return newVolume;
  };

  const settings = () => {
    if (display) {
      return (
        <Row>
          <div>
            <FontAwesomeIcon
              style={{
                marginRight: "5px",
              }}
              icon={faFillDrip}
            />
            Coverage rate:
            <InputGroup>
              <Input
                type="number"
                placeholder="10"
                min="1"
                onChange={(e) => {
                  setPaintYield(e.target.value);
                  calculateVolume(props.surface, e.target.value, coat);
                }}
              />
              <InputGroupText>{props.unit.name}²/L</InputGroupText>
            </InputGroup>
          </div>
          <div>
            <FontAwesomeIcon
              style={{
                marginRight: "5px",
              }}
              icon={faLayerGroup}
            />
            Coat{coat > 1 ? `s:` : `:`}
            <Input
              type="number"
              placeholder="1"
              min="1"
              onChange={(e) => {
                setCoat(e.target.value);
                calculateVolume(props.surface, paintYield, e.target.value);
              }}
            />
            <Badge
              color="warning"
              style={{
                color: "#1B1464",
                marginTop: "5px",
                marginBottom: "5px",
                width: "100%",
              }}
            >
              {volume > 0
                ? `Requires: ${Number(
                    (Number(props.surface) / paintYield) * coat
                  ).toFixed(2)}L`
                : "Enter data or Refresh "}
            </Badge>
          </div>
        </Row>
      );
    } else {
      return;
    }
  };

  return (
    <Container className="mt-2" style={{ color: "#1B1464" }}>
      <legend>
        <FontAwesomeIcon
          style={{
            marginRight: "5px",
            height: "20px",
          }}
          icon={faPaintRoller}
        />
        Paint project
        <Input
          onClick={() => {
            setDisplay(!display);
            setCoat(0);
            setPaintYield(0);
            setVolume(0);
            props.handleVolumePaint(0, 0, 0);
          }}
          id="switchPaint"
          type="checkbox"
          style={styles.switchButton}
        />
      </legend>
      {settings()}
    </Container>
  );
}

const styles = {
  switchButton: {
    marginLeft: "5px",
  },
};

function mapStateToProps(state) {
  return { cards: state.shapes, unit: state.units, surface: state.total };
}

function mapDispatchToProps(dispatch) {
  return {
    handleVolumePaint: function (newVolume, paintYield, coat) {
      dispatch({
        type: "updateVolume",
        value: newVolume,
        paintYield: paintYield,
        coat: coat,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintCalcutor);
