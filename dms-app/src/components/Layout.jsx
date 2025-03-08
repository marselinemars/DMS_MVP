import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Container, Row, Col } from "react-bootstrap";

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={10} className="p-0">
          <Navbar />
          <div className="p-3">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
