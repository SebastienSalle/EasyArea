import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import addingAreas from "../addingAreas";

import {
  CustomInput,
  Input,
  InputGroup,
  InputGroupText,
  Badge,
  Container,
  Row,
  Col,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintRoller,
  faArrowRotateRight,
  faLayerGroup,
  faFillDrip,
} from "@fortawesome/free-solid-svg-icons";

function PaintCalcutor(props) {
  const [volume, setVolume] = useState("");

  //10m²/L/couche
  const [display, setDisplay] = useState(false);

  const [paintYield, setPaintYield] = useState("");

  const [coat, setCoat] = useState("");
  const [totalSurface, setTotalSurface] = useState(0);

  console.log("PROPS PAINT ", props);

  // let totalArea = 0;
  // let i =0;
  // while(i<props.cards.length){
  //   totalArea += Number(props.cards[i].area);
  //   i++
  // }
  // console.log("TOTAL-AREA_to_PAINT ", totalArea, "OU ", props.total);

  const calculateVolume = (t, y, c) => {
    let newVolume;
    y > 0 ? (newVolume = (t / y) * c) : (newVolume = 0);
    // y > 0 ? (newVolume = (t / y) * c) : (newVolume = 0);
    //newVolume = ((t*1/y))*c
    setVolume(newVolume);
    props.handleVolumePaint(newVolume, y, c);
    return newVolume;
  };
  console.log("VOLUME ", volume);
  //let resultVolume = "";
  // useEffect(() => {
  //   if(totalSurface != props.surface){console.log("HOHO!")}else{console.log("YEAH!")}
  //   //calculateVolume(props.surface, paintYield, coat);
  //   //volume > 0 ? resultVolume = `Requires: ${Number(volume).toFixed(2)} L` : resultVolume = "Enter data or Refresh "
  // }, []);

  //---

  const settings = () => {
    if (totalSurface != props.surface) {
      console.log("HOHO!");
    } else {
      console.log("YEAH!");
    }
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
                  {
                    setPaintYield(e.target.value);
                    calculateVolume(
                      //totalArea,
                      props.surface,
                      e.target.value,
                      coat
                    );
                  }
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
                {
                  setCoat(e.target.value);
                  calculateVolume(
                    //combineArea(cards),
                    // totalArea,
                    props.surface,
                    paintYield,
                    e.target.value
                  );
                }
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
              {/* <FontAwesomeIcon
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                  float: "left",
                }}
                icon={faArrowRotateRight}
                onClick={() => {
                  calculateVolume(
                    //combineArea(cards)
                    //totalArea,
                    props.surface,
                    paintYield,
                    coat
                  );
                }}
              /> */}
              {/* {resultVolume} */}
              
              {volume > 0
                ? `Requires: ${Number((Number(props.surface)/paintYield)*coat).toFixed(2)}L`
                : "Enter data or Refresh "}
              {/* {console.log((combineArea(cards) / paintYield) * coat)} */}
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
        {/* <div className='custom-control custom-switch'> */}
        <Input
          onClick={() => {
            setDisplay(!display);
            setCoat(0);
            setPaintYield(0);
            setVolume(0);
            props.handleVolumePaint(0, 0, 0)
          }}
          id="switchPaint"
          type="checkbox" //checked
          // style={{
          // marginLeft:"5px",
          // }}
          style={styles.switchButton}
          //className='custom-control-input'
          //id='customSwitches'
          //readOnly
        />
      </legend>
      {settings()}
    </Container>
  );
}

const styles = {
  switchButton: {
    marginLeft: "5px",
    //size: "sm",
    //color: "danger",
    // backgroundColor: "#A3CB38",
    // width: "50px",
    // maxWidth: `30%`,
    // minWidth: "15%",
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
