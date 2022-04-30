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
  faTag,
} from "@fortawesome/free-solid-svg-icons";

function PaintCalcutor(props) {
  const [volume, setVolume] = useState("");

  //e.g. formule 10m²/L/couche
  const [display, setDisplay] = useState(false);
  const [paintName, setPaintName] = useState("");
  const [paintYield, setPaintYield] = useState("");
  const [coat, setCoat] = useState("");

  const onPaintLabel = (labelName) => {
    props.handlePaintName(labelName);
  };

  const calculateVolume = (t, y, c) => {
    let newVolume;
    y > 0 ? (newVolume = (t / y) * c) : (newVolume = 0);
    setVolume(newVolume);
    props.handleVolumePaint(newVolume, y, c);
    return newVolume;
  };

  let volumeMessage = "";
  if (coat * paintYield !== 0 && Number(props.surface) === 0) {
    volumeMessage = "What would you paint on?";
  } else if (coat * paintYield === 0 && Number(props.surface) !== 0) {
    volumeMessage = "Paint data unavailable";
  } else if (volume === 0 && Number(props.surface) === 0) {
    volumeMessage = "Enter Paint data please";
  } else if (Number(props.surface) > 0) {
    volumeMessage = `Requires: ${Number(
      (Number(props.surface) / paintYield) * coat
    ).toFixed(2)}L`;
  } else if (Number(props.surface) < 0) {
    volumeMessage = "You'll try to paint a negative surface";
  } else {
    volumeMessage = "Nothing to paint on";
  }

  const settings = () => {
    if (display) {
      return (
        <Row>
          <div>
            <InputGroup>
              <InputGroupText>
                <FontAwesomeIcon icon={faTag} color="#1B1464" />
              </InputGroupText>
              <Input
                type="text"
                placeholder="enter label name"
                style={{ color: "#1289A7" }}
                onChange={(e) => {
                  setPaintName(e.target.value);
                  onPaintLabel(e.target.value);
                }}
                value={paintName}
              />
            </InputGroup>
          </div>
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
                placeholder="e.g. 10"
                min="1"
                style={{ color: "#1289A7" }}
                onChange={(e) => {
                  setPaintYield(e.target.value);
                  calculateVolume(props.surface, e.target.value, coat);
                }}
              />
              <InputGroupText style={{ color: "#1B1464" }}>
                {props.unit.name}²/L
              </InputGroupText>
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroupText style={{ color: "#1B1464" }}>
                <FontAwesomeIcon
                  style={{
                    marginRight: "5px",
                  }}
                  icon={faLayerGroup}
                  color="#1B1464"
                />
                Coat{coat > 1 ? `s:` : `:`}
              </InputGroupText>
              <Input
                type="number"
                placeholder="e.g. 1"
                min="1"
                style={{ color: "#1289A7" }}
                onChange={(e) => {
                  setCoat(e.target.value);
                  calculateVolume(props.surface, paintYield, e.target.value);
                }}
              />
            </InputGroup>
            <Badge
              color="warning"
              style={{
                color: "#1B1464",
                marginTop: "5px",
                marginBottom: "5px",
                width: "100%",
              }}
            >
              {volumeMessage}
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
    handlePaintName: function (labelName) {
      dispatch({
        type: "label",
        value: labelName,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintCalcutor);
