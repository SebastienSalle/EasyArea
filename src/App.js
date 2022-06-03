// should put a "popup overlay" but
// rather than show don't show, maybe hide don't hide in order to not loose the drawing...
import React, { useState } from "react";
// import "./App.css";
import { Row, Col, Button } from "reactstrap";

import Header from "./components/Header";
import DrawingCanvas from "./components/DrawingCanvas";
//import DrawingPopup from "./components/DrawingPopup";
import ShapesList from "./components/ShapesList";
import ShapeSelector from "./components/ShapeSelector";
import UnitSelector from "./components/UnitSelector";
import PaintCalculator from "./components/PaintCalculator";

import name from "./reducers/name";
import units from "./reducers/units";
import shapes from "./reducers/shapes";
import total from "./reducers/total";
import drawing from "./reducers/drawing";
import paintData from "./reducers/paint";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({ name, units, shapes, total, drawing, paintData })
);

function App() {
  const [zCanvas, setZCanvas] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [stopScroll, setStopScroll] = useState("visible");

  const hideCanvas = () => {
    // setShowCanvas(!showCanvas);
    console.log("Hello")
    zCanvas === 0 ? setZCanvas(3) : setZCanvas(0);
    stopScroll === "visible" ? setStopScroll("hidden") : setStopScroll("visible");
    console.log("zCanvas" + {zCanvas})
  };
  console.log("zCanvas", {zCanvas})
  // const toggleCanvas = () => {
  //   setShowCanvas(!showCanvas);
  //   if (stopScroll === "visible") {
  //     setStopScroll("hidden");
  //   } else {
  //     setStopScroll("visible");
  //   }
  // };

  return (
    <Provider store={store}>
      <div style={{ overflowY: "hidden" }}>
        <Header/>
        <Row style={{ backgroundColor: "#e9e9e9" }} height="100%">
          <Col lg="6">
            <div className="sticky-top">
              <Row>
                <Col>
                  <ShapeSelector />
                </Col>
              </Row>
            </div>
            <ShapesList />

            <Row>
              <Col xs="5">
                <UnitSelector />
              </Col>
              <Col xs="12" md="6">
                <PaintCalculator />
              </Col>
            </Row>
            {/* <Button
              className="d-block d-lg-none"
              style={{ width: "100vw" }}
              onClick={() => hideCanvas()}
              // onClick={() => toggleCanvas()}
            >
              Draw a memo
            </Button> */}
          </Col>
          {/*}
          {showCanvas && (
            <div
              className="fixed-top"
              style={{
                fixed: "top",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb(233,233,233)",
                xIndex: {zCanvas}
              }}
            >
              <Col className="d-block d-lg-none">
                {// <div className="stick-top" style={{ top: "70px", right: "20px" }}> }
                {// <div className="overlay"> }
                <div
                  className="fixed-top"
                  style={{ width: "100vw", height: "100vh" }}
                >
                  <Button
                    className="fixed-bottom"
                    style={{ bottom: "10px", left: "10vw", width: "80vw" }}
                    onClick={() => hideCanvas()}
                    // onClick={() => toggleCanvas()}
                  >
                    Close Canvas
                  </Button>
                  <DrawingPopup
                    className="d-block d-lg-none"
                    id="popupCanvas"
                  />
                </div>
                {// </div> }
              </Col>
            </div>
           )} */}

          <Col lg="6" className="d-none d-lg-block">
            {/* <div className="fixed top:50 right:0"> */}
            <div className="sticky-top" style={{ top: "70px", right: "20px" }}>
              <DrawingCanvas />
            </div>
          </Col>

          <Col className="text-center mb-3 mt-5" style={{ fontSize: "10px" }}>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/sébastien-sallé-ab15058a/"
              target="_blank"
              rel="noreferrer"
            >
              Sébastien Sallé
            </a>{" "}
            , inspired by{" "}
            <a
              href="https://youtu.be/9fquspMTSbs"
              target="_blank"
              rel="noreferrer"
            >
              EasyExpertise Project
            </a>
            .
            <br />
            EasyArea is an{" "}
            <a
              href="https://github.com/SebastienSalle/EasyArea.git"
              target="_blank"
              rel="noreferrer"
            >
              open source project
            </a>
          </Col>
        </Row>
      </div>
    </Provider>
  );
}

export default App;
