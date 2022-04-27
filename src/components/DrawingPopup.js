import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faHandsBubbles } from "@fortawesome/free-solid-svg-icons";

function DrawingPopup(props) {
  const [penColor, setPenColor] = useState("#fff");

  const [clean, setClean] = useState(false);
  const cleanColor = clean ? "#ED4C67" : "#fff";

  const cleaning = async () => {
    setClean(true);
    setTimeout(() => {
      setClean(false);
    }, 200);
  };
  console.log(window.pageXOffset, window.pageYOffset);

  useEffect(() => {
    const canvas = document.getElementById("canvasPopup");
    const canvasCard = document
      .getElementById("canvasCardPopup")
      .getBoundingClientRect();

    const toolbar = document.getElementById("toolbarPopup");
    const ctx = canvas.getContext("2d");

    const canvasOffsetX = canvasCard.left + window.pageXOffset;
    const canvasOffsetY = canvasCard.top + window.pageYOffset;

    canvas.width = canvasCard.width;
    canvas.height = canvasCard.height;

    let isPainting = false;

    let lineWidth = 3;

    toolbar.addEventListener("click", (e) => {
      if (e.target.id === "clearPopup") {
        ctx.clearRect(0, 0, canvasCard.width, canvasCard.height);
        props.onClear();
        cleaning();
      }
    });

    toolbar.addEventListener("change", (e) => {
      if (e.target.id === "strokePopup") {
        ctx.strokeStyle = e.target.value;
      }

      if (e.target.id === "lineWidthPopup") {
        lineWidth = e.target.value;
      }
    });

    const draw = (e) => {
      if (!isPainting) {
        return;
      }
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";

      ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
      ctx.stroke();
    };

    canvas.addEventListener("pointerdown", (e) => {
      isPainting = true;
    });

    canvas.addEventListener("pointerup", (e) => {
      isPainting = false;
      ctx.stroke();
      ctx.beginPath();
      console.log("URL ", canvas.toDataURL());
      props.onDrawing(canvas.toDataURL());
    });

    canvas.addEventListener("pointermove", draw);
  }, [props]);

  // ------
  return (
    <Container>
      <Row>
        <Col>
          <Card
            className="mb-1 mt-2"
            style={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
              height: "600px",
            }}
          >
            <CardHeader
              id="toolbarPopup"
              style={{ color: "#fff", backgroundColor: "#1B1464" }}
              className="d-flex d-row align-items-center justify-content-between"
            >
              <div className="d-flex d-row align-items-center">
                <FontAwesomeIcon
                  style={{
                    height: "20px",
                    marginRight: "5px",
                  }}
                  color={penColor}
                  title="line width"
                  icon={faSquarePen}
                />

                <Input
                  id="lineWidthPopup"
                  name="lineWidth"
                  type="number"
                  min={1}
                  placeholder={3}
                  style={{
                    width: "80px",
                    lineHeight: "5px",
                    fontSize: "15px",
                  }}
                />

                <input
                  id="strokePopup"
                  name="stroke"
                  type="color"
                  style={{ borderRadius: 5, marginLeft: "5px" }}
                  onChange={(e) => {
                    setPenColor(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    color: `${cleanColor}`,
                    marginRight: "5px",
                  }}
                  title="clean the board"
                  icon={faHandsBubbles}
                />
                <Button
                  id="clearPopup"
                  style={{
                    float: "right",
                    color: `${cleanColor}`,
                    cursor: "pointer",
                  }}
                >
                  Clear
                </Button>
              </div>
            </CardHeader>

            <CardBody
              id="canvasCardPopup"
              style={{ padding: 0, cursor: "crosshair" }}
            >
              <canvas id="canvasPopup">
                Sorry the canvas is not supported by your browser
              </canvas>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onDrawing: function (url) {
      console.log("Drawing ", url);
      dispatch({ type: "updateDrawing", url: url });
    },
    onClear: function (url) {
      console.log("ClearedURL ", url);
      dispatch({ type: "clearDrawing" });
    },
  };
}

export default connect(null, mapDispatchToProps)(DrawingPopup);
