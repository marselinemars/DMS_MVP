import React from "react";
import { Card, Row, Col, Table, Button, ProgressBar } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { FaUsers, FaFileAlt, FaDatabase, FaClock } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  // Mock data
  const stats = {
    totalDocuments: 1200,
    newDocumentsToday: 15,
    pendingApprovals: 5,
    storageUsed: 5.3,
    storageLimit: 10,
    activeUsers: 24,
  };

  const recentActivity = [
    {
      user: "John Doe",
      action: "Uploaded",
      document: "Project Proposal.pdf",
      time: "2 mins ago",
    },
    {
      user: "Jane Smith",
      action: "Edited",
      document: "Financial Report.xlsx",
      time: "10 mins ago",
    },
    {
      user: "Michael Lee",
      action: "Deleted",
      document: "Old Invoice.docx",
      time: "30 mins ago",
    },
  ];

  const recentDocuments = [
    { name: "Project Proposal.pdf", type: "PDF", date: "2025-03-08" },
    { name: "Financial Report.xlsx", type: "Excel", date: "2025-03-07" },
    { name: "Meeting Notes.docx", type: "Word", date: "2025-03-06" },
  ];

  // Chart data
  const documentUploadChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Documents Uploaded",
        data: [30, 45, 60, 80, 100, 120],
        backgroundColor: "rgba(0, 123, 255, 0.7)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container p-4">
      {/* Stats Overview */}
      <Row className="g-4">
        <Col md={3}>
          <Card className="shadow-sm h-100 hover-effect">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaDatabase size={30} className="text-primary mb-3" />
              <Card.Title className="text-secondary">
                Total Documents
              </Card.Title>
              <h2 className="fw-bold">{stats.totalDocuments}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 hover-effect">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaFileAlt size={30} className="text-success mb-3" />
              <Card.Title className="text-secondary">
                New Documents Today
              </Card.Title>
              <h2 className="fw-bold">{stats.newDocumentsToday}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 hover-effect">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaClock size={30} className="text-warning mb-3" />
              <Card.Title className="text-secondary">
                Pending Approvals
              </Card.Title>
              <h2 className="fw-bold">{stats.pendingApprovals}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100 hover-effect">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaUsers size={30} className="text-info mb-3" />
              <Card.Title className="text-secondary">Active Users</Card.Title>
              <h2 className="fw-bold">{stats.activeUsers}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col>
          <div className="d-flex gap-2">
            <Button variant="primary" className="flex-grow-1">
              📤 Upload Document
            </Button>
            <Button variant="outline-secondary" className="flex-grow-1">
              🔍 Search Documents
            </Button>
            <Button variant="outline-secondary" className="flex-grow-1">
              📊 Generate Report
            </Button>
          </div>
        </Col>
      </Row>

      {/* Storage Usage and Chart */}
      <Row className="mt-4 g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-secondary">Storage Usage</Card.Title>
              <h5 className="fw-bold">
                {stats.storageUsed} GB / {stats.storageLimit} GB
              </h5>
              <ProgressBar
                now={(stats.storageUsed / stats.storageLimit) * 100}
                label={`${(
                  (stats.storageUsed / stats.storageLimit) *
                  100
                ).toFixed(2)}%`}
                className="mt-3"
                style={{ height: "20px" }}
                variant="gradient" // Custom CSS class for gradient
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-secondary">
                Document Uploads (Last 6 Months)
              </Card.Title>
              <Bar
                data={documentUploadChart}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity and Documents */}
      <Row className="mt-4 g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-secondary">
                Recent Activity
              </Card.Title>
              <ul className="list-unstyled">
                {recentActivity.map((item, index) => (
                  <li key={index} className="mb-3">
                    <strong>{item.user}</strong> {item.action}{" "}
                    <em>{item.document}</em>{" "}
                    <span className="text-muted">({item.time})</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-secondary">
                Recent Documents
              </Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDocuments.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.name}</td>
                      <td>{doc.type}</td>
                      <td>{doc.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

// Custom CSS for hover effect and gradient progress bar
const customStyles = `
  .hover-effect:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
  .progress-bar-gradient {
    background: linear-gradient(90deg, #007bff, #00bfff);
  }
`;

// Add custom styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);
