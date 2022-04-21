import React from "react";

//import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "reactstrap";

import Header from "./components/Header";
import DrawingCanvas from "./components/DrawingCanvas";
import ShapesList from "./components/ShapesList";
import ShapeSelector from "./components/ShapeSelector";
import UnitSelector from "./components/UnitSelector";
import PaintCalculator from "./components/PaintCalculator";

import units from "./reducers/units";
import shapes from "./reducers/shapes";
import total from "./reducers/total";
import drawing from "./reducers/drawing";
import paintData from "./reducers/paint";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({ units, shapes, total, drawing, paintData })
);

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Row style={{ backgroundColor: "#e9e9e9" }}>
          <Col lg="6">
            <DrawingCanvas />
          </Col>

          <Col lg="6">
            <Row>
              <>
                <Col xs="5" md="4" lg="2">
                  <UnitSelector />
                  {/* <UnitSelector onChangeParentUnit={souvenirParentUnit} /> */}
                </Col>
                <Col lg="5" className="d-none d-lg-block">
                  <ShapeSelector />
                  {/* <ShapeSelector handleClickParentShapes={souvenirParentShapes} /> */}
                </Col>
                <Col xs="5" className="d-block d-md-none d-lg-block">
                  <PaintCalculator />
                </Col>
                <Col md="4" lg="6" className="d-block d-lg-none text-center">
                  <ShapeSelector />
                  {/* <ShapeSelector handleClickParentShapes={souvenirParentShapes} /> */}
                </Col>
              </>
              <Col md="4" lg="6" className="d-none d-md-block d-lg-none">
                <PaintCalculator />
              </Col>
            </Row>
            <ShapesList />
            {/* <ShapesList cards={cards} unit={unit} /> */}
          </Col>
          <Col className="text-center mb-3" style={{ fontSize: "10px" }}>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/sebastien-salle-ab15058a/"
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
