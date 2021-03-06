// should put a "popup overlay" but
// rather than show don't show, maybe hide don't hide in order to not loose the drawing...
import React from "react";

import { 
  Row,
  Col, 
 } from "reactstrap";

import Header from "./components/Header";
import DrawingCanvas from "./components/DrawingCanvas";
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

  return (
    <Provider store={store}>
      <div style={{ overflowY: "scroll" }}>
        <Header/>
        <Row style={{ backgroundColor: "#e9e9e9" }} height="100%">
          <Col lg="6">
            <div style={{top: "10px", position:'sticky', zIndex:3}}>
              <Row >
                <Col>
                  <ShapeSelector />
                </Col>
              </Row>
            <ShapesList/>
            </div>

            <Row>
              <Col xs="5">
                <UnitSelector />
              </Col>
              <Col xs="12" md="6">
                <PaintCalculator />
              </Col>
            </Row>
            
          </Col>
          
          <Col lg="6" className="d-none d-lg-block">
            <div  style={{ top: "70px", right: "20px", position:'fixed', width:"50%" }}>
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
