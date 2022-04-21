import React from "react";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCubesStacked } from "@fortawesome/free-solid-svg-icons";

function ShapeCard(props) {
  const data = props.data;

  //Create a card for each item
  let messageNoShape;
  if (data.length == 0) {
    messageNoShape = (
      <div style={{ color: "#1289A7" }}>Add a SHAPE to start</div>
    );
  }

  const createCards = data.map((e, i) => {
    switch (e.type) {
      case "square":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`Shape ${i + 1}` + ` ${e.idCard}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src="square.png"
                    alt="square - L for length"
                    name="square"
                    width="25%"
                    style={{ marginLeft: "20px" }}
                  />
                </Col>
                <Col sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>L</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            L: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.length}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      case "rectangle":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                title="delete this card"
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`Shape ${i + 1}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src="rectangle.png"
                    alt="rectangle - L for Length, w for width"
                    name="rectangle"
                    width="50%"
                  />
                </Col>
                <Col sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>L</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            L: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.length}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupText>w</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            w: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.width}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      case "trapezoid":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col xs="11" sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`Shape ${i + 1}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col xs="12" sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src="trapezoid.png"
                    alt="trapezoid - B for base, b for its opposite base, h for height"
                    name="trapezoid"
                    width="50%"
                  />
                </Col>
                <Col xs="12" sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>B</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            B: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.base}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupText>b</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            b: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.oppositeBase}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupText>h</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            h: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.height}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      case "triangle":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`Shape ${i + 1}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src="triangle.png"
                    alt="triangle - B for base, h for height"
                    name="triangle"
                    width="40%"
                  />
                </Col>
                <Col sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>B</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            B: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.base}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupText>h</InputGroupText>

                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            h: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.height}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      case "circle":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`Shape ${i + 1}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src="circle.png"
                    alt="circle - r for radius"
                    name="circle"
                    width="25%"
                    style={{ marginLeft: "20px", marginBottom: "5px" }}
                  />
                </Col>
                <Col xs="12" sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>r</InputGroupText>
                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            r: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.radius}
                    />
                    <InputGroupText>{props.unit}</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      case "area":
        return (
          <Card key={i} className="mb-2" style={styles.cards}>
            <CardBody>
              <FontAwesomeIcon
                style={styles.cross}
                icon={faXmark}
                onClick={() => props.onDeleteClick(i)}
              />
              <Row>
                <Col sm="6">
                  <CardTitle>
                    <Input
                      autoFocus
                      placeholder={`${i + 1}: CustomArea ${e.idCard}`}
                      style={styles.title}
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-title=""
                      onChange={(e) => {
                        props.onUpdateTitle({
                          name: e.target.name,
                          title: e.target.value,
                          index: i,
                        });
                      }}
                      value={e.title}
                    />
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <CardSubtitle style={styles.subTtl}>
                    Area: {Number(e.area).toFixed(2)} {props.unit}²
                  </CardSubtitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{
                      marginTop: "10px",
                      marginBottom: "5px",
                      marginLeft: "20px",
                      height: "30px",
                      color: "#1289A7",
                    }}
                    icon={faCubesStacked}
                  />
                </Col>
                <Col sm="6">
                  <InputGroup size="sm">
                    <InputGroupText>A</InputGroupText>
                    <Input
                      key={i}
                      name={e.name}
                      data-type={e.type}
                      data-area={0}
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => {
                        {
                          props.onUpdateData({
                            name: e.target.name,
                            A: e.target.value,
                            type: e.target.dataset.type,
                            index: i,
                          });
                        }
                      }}
                      value={e.area}
                    />
                    <InputGroupText>{props.unit}²</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        break;
      default:
        return (
          <Card className="mb-2" style={styles.cards}>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CardTitle>
                    It seems there is a problem...Maybe you should reload the
                    page
                  </CardTitle>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
    }
  });
  //---end of card creation function

  return (
    <Container>
      <Row>
        <Col>
          {messageNoShape} {createCards}
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  cards: {
    boxShadow: "0 0px 10px rgba(0, 0, 0, 0.25)",
  },
  cross: {
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    height: "20px",
    color: "#ED4C67",
  },
  title: {
    width: "90%",
    borderColor: "#1289A7",
    color: "#1289A7",
  },
  subTtl: {
    color: "#1B1464",
  },
};

function mapDispatchToProps(dispatch) {
  return {
    onDeleteClick: function (i) {
      dispatch({ type: "delete", index: i });
    },
    onUpdateData: function (d) {
      dispatch({
        type: "update",
        value: d,
      });
    },
    onUpdateTitle: function (t) {
      dispatch({
        type: "title",
        value: t,
      });
    },
  };
}

function mapStateToProps(state) {
  return { cards: state.shapes };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShapeCard);