import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Input } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faFilePdf,
  // faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Header(props) {
  const unit = props.unit.name;

  const time = new Date();
  const timeMarker = `${time.getFullYear()}${
    time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
  }${
    time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
  }${time.getHours()}${
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
  }${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()} `;

  const timeToPrint = `${
    time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
  }/${
    time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
  }/${time.getFullYear()} ${time.getHours()}:${
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
  }:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()} `;

  let totalArea = 0;
  let i = 0;
  while (i < props.cards.length) {
    totalArea += Number(props.cards[i].area) * Number(props.cards[i].deduct);
    i++;
  }

  const [projectName, setProjectName] = useState("");
  const onProjectName = (pName) => {
    props.handleProjectName(pName);
  };

  const tableRows = () => {
    let result = [
      [
        "#",
        "",
        "Measure(s)",
        "",
        { text: `Total:`, style: "subheader", alignment: "right" },
        { text: `${Number(totalArea).toFixed(2)}${unit}²`, style: "subheader" },
      ],
    ];
    props.cards.map((e, i) => {
      const rowName = e.title === "" ? e.name : e.title;

      switch (e.type) {
        case "area":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `area: ${e.area}${unit}²`,
              "",
              "",
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        case "circle":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `radius: ${e.radius}${unit}`,
              "",
              "",
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        case "square":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `length: ${e.length}${unit}`,
              "",
              "",
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        case "rectangle":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `width: ${e.width}${unit}`,
              `length: ${e.length}${unit}`,
              "",
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        case "triangle":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `base: ${e.base}${unit}`,
              `height: ${e.height}${unit}`,
              "",
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        case "trapezoid":
          return (result = [
            ...result,
            [
              `${i + 1}`,
              `${rowName}`,
              `base: ${e.base}${unit}`,
              `op.base: ${e.oppositeBase}${unit}`,
              `height: ${e.height}${unit}`,
              `total: ${Number(e.area) * e.deduct.toFixed(2)}${unit}²`,
            ],
          ]);
        default:
          return [...result];
      }
    });

    return result;
  };
  const dd = {
    info: {
      title:
        props.name === ""
          ? `EasyArea-${timeMarker}`
          : `EasyArea-${props.name}-${timeMarker}`,
    },
    content: [
      {
        style: "tableArea",
        table: {
          widths: ["*", "*"],
          headerRows: 1,
          body: [
            [
              {
                text:
                  props.name === "" ? `EasyArea` : `EasyArea - ${props.name}`,
                style: "header",
              },
              { text: `${timeToPrint}`, alignment: "right" },
            ],
          ],
        },
        layout: "noBorders",
      },
      {
        text:
          "Project's Surface Area: " +
          `${Number(totalArea).toFixed(2)}${unit}²`,
        style: "subheader",
      },

      { text: "Sketch", style: "subheader", margin: [0, 20, 0, 8] },
      { image: props.drawing, fit: [400, 300], alignment: "center" },

      { text: "Details", style: "subheader" },
      {
        style: "tableArea",
        table: {
          widths: ["auto", "auto", "auto", "auto", "*", "auto"],
          headerRows: 1,
          body: tableRows(),
        },
        layout: "lightHorizontalLines",
      },
      {
        text:
          props.paint.label === "" ? "Paint" : `Paint: ${props.paint.label}`,
        style: "subheader",
      },
      {
        style: "tableArea",
        table: {
          widths: ["*", "auto", "*"],
          headerRows: 1,
          body: [
            [
              "Coverage rate",
              "Number of coats",
              { text: "Quantity required", style: "subheader" },
            ],
            [
              `${props.paint.coverage}${unit}²/L`,
              `${props.paint.coat}`,
              {
                text: `${
                  props.paint.coverage > 0
                    ? Number(
                        (Number(totalArea) / props.paint.coverage) *
                          props.paint.coat
                      ).toFixed(2)
                    : 0
                }L`,
                style: "subheader",
              },
            ],
          ],
        },
      },
      { text: "Thank you for using EasyArea!", alignment: "right" },
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 15, bold: true },
      tableArea: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  const [exportPDF, setExportPDF] = useState(false);
  const pdfColor = exportPDF ? "#A3CB38" : "#fff";

  const pdfExported = () => {
    setExportPDF(true);
    const win = window.open("", "_blank");
    pdfMake
      .createPdf(dd)
      .download(
        props.name === ""
          ? `EasyArea-${timeMarker}`
          : `EasyArea-${props.name}-${timeMarker}`
      );
    win.close();
    setTimeout(() => {
      setExportPDF(false);
    }, 200);
  };

  // const [exportCSV, setExportCSV] = useState(false);
  // const csvColor = exportCSV ? "#A3CB38" : "#fff";
  // const csvExported = () => {

  //   setExportCSV(true);
  //   setTimeout(() => {
  //     setExportCSV(false);
  //   }, 200);
  // };

  return (
    <Navbar
      style={{ backgroundColor: "#1B1464", color: "#fff" }}
      className="ps-2 pe-1"
    >
      <NavbarBrand style={{ color: "#fff" }} href="/">
        <img src="./logo76.png" width="30px" className="me-2" alt="logo" />
        EasyArea
      </NavbarBrand>
      <Nav>
        <NavItem>
          <Input
            type="text"
            placeholder="enter project name"
            style={{ color: "#1289A7" }}
            onChange={(e) => {
              setProjectName(e.target.value);
              onProjectName(e.target.value);
            }}
            value={projectName}
          />
        </NavItem>
      </Nav>
      <Nav>
        <div
          style={{ marginTop: "5px", cursor: "pointer" }}
          onClick={pdfExported}
        >
          Export as
        </div>
        <NavItem className="ms-2 me-5" title="Create a PDF">
          <span
            onClick={pdfExported}
            style={{ float: "left", color: `${pdfColor}`, cursor: "pointer" }}
          >
            <div style={{ fontSize: "7px" }}>PDF</div>
            <FontAwesomeIcon
              style={{
                marginRight: "2px",
                height: "20px",
              }}
              icon={faFilePdf}
            />
          </span>
        </NavItem>
        {/* <NavItem
          className="ms-2 me-5"
          style={{ cursor: "pointer" }}
          title="Create a CSV file"
        >
          <span
            onClick={csvExported}
            style={{ float: "left", color: `${csvColor}`, cursor: "pointer" }}
          >
            <div style={{ fontSize: "7px" }}>CSV</div>
            <FontAwesomeIcon
              style={{
                marginRight: "2px",
                height: "20px",
              }}
              icon={faFileArrowDown}
            />
          </span>
        </NavItem> */}

        <NavItem className="ms-5 me-5" title="Clear all">
          <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
            <span
              style={{
                position: "absolute",
                right: "40px",
                float: "left",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "7px" }}>Clear</div>
              <FontAwesomeIcon
                style={{
                  color: "#ED4C67",
                  marginRight: "2px",
                  height: "20px",
                }}
                icon={faTrashCan}
              />
            </span>
          </a>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return {
    cards: state.shapes,
    unit: state.units,
    drawing: state.drawing,
    paint: state.paintData,
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleProjectName: function (pName) {
      dispatch({
        type: "project",
        value: pName,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
