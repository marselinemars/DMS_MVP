import React, { useState, useMemo } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  InputGroup,
  Badge,
  Modal,
} from "react-bootstrap";
import {
  FaFilter,
  FaSort,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";

const dummyDocuments = [
  {
    id: 1,
    title: "Project Proposal",
    author: "John Doe",
    type: "PDF",
    status: "Approved",
    date: "2024-02-10",
    file: "https://example.com/files/project-proposal.pdf",
  },
  {
    id: 2,
    title: "Meeting Notes",
    author: "Jane Smith",
    type: "DOCX",
    status: "Pending",
    date: "2024-03-01",
    file: "https://example.com/files/meeting-notes.docx",
  },
  {
    id: 3,
    title: "Budget Report",
    author: "Emily Brown",
    type: "XLSX",
    status: "Rejected",
    date: "2024-01-15",
    file: "https://example.com/files/budget-report.xlsx",
  },
  {
    id: 4,
    title: "Annual Financial Report",
    author: "Michael Johnson",
    type: "PDF",
    status: "Approved",
    date: "2024-04-05",
    file: "https://example.com/files/annual-financial-report.pdf",
  },
  {
    id: 5,
    title: "Marketing Strategy",
    author: "Sarah Lee",
    type: "PPTX",
    status: "Pending",
    date: "2024-03-20",
    file: "https://example.com/files/marketing-strategy.pptx",
  },
  {
    id: 6,
    title: "Employee Handbook",
    author: "David Wilson",
    type: "PDF",
    status: "Approved",
    date: "2024-01-30",
    file: "https://example.com/files/employee-handbook.pdf",
  },
  {
    id: 7,
    title: "Product Roadmap",
    author: "Laura Martinez",
    type: "DOCX",
    status: "Pending",
    date: "2024-02-25",
    file: "https://example.com/files/product-roadmap.docx",
  },
  {
    id: 8,
    title: "Sales Forecast",
    author: "Chris Evans",
    type: "XLSX",
    status: "Rejected",
    date: "2024-03-15",
    file: "https://example.com/files/sales-forecast.xlsx",
  },
  {
    id: 9,
    title: "Research Paper",
    author: "Anna Taylor",
    type: "PDF",
    status: "Approved",
    date: "2024-04-10",
    file: "https://example.com/files/research-paper.pdf",
  },
  {
    id: 10,
    title: "Client Contract",
    author: "James Brown",
    type: "DOCX",
    status: "Pending",
    date: "2024-03-28",
    file: "https://example.com/files/client-contract.docx",
  },
];
const statuses = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
};

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const documentsPerPage = 5;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newFilter, setNewFilter] = useState({ field: "title", value: "" });
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [documents, setDocuments] = useState(dummyDocuments);
  const [selectedFile, setSelectedFile] = useState(null);

  const filterableFields = ["title", "author", "type", "status"];

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddFilter = () => {
    if (newFilter.value.trim()) {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: "title", value: "" });
      setShowFilterModal(false);
    }
  };

  const handleRemoveFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSort = (field) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const handleAddEditDocument = (doc) => {
    if (editingDoc) {
      setDocuments(documents.map((d) => (d.id === editingDoc.id ? doc : d)));
    } else {
      setDocuments([...documents, { ...doc, id: documents.length + 1 }]);
    }
    setShowFormModal(false);
    setEditingDoc(null);
    setSelectedFile(null);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setEditingDoc((prev) => ({ ...prev, file: fileUrl }));
    }
  };

  const filteredDocuments = useMemo(() => {
    let docs = documents.filter((doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase())
    );

    filters.forEach((filter) => {
      docs = docs.filter((doc) =>
        doc[filter.field].toLowerCase().includes(filter.value.toLowerCase())
      );
    });

    if (sortField) {
      docs.sort((a, b) => {
        const valA = a[sortField].toLowerCase();
        const valB = b[sortField].toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return docs;
  }, [search, filters, sortField, sortOrder, documents]);

  const pageCount = Math.ceil(filteredDocuments.length / documentsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    currentPage * documentsPerPage,
    (currentPage + 1) * documentsPerPage
  );

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-primary">Document Management</h4>

      {/* Search and Filters Row */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <div className="d-flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Badge
              key={index}
              pill
              bg="light"
              text="dark"
              className="p-2 d-flex align-items-center"
            >
              {filter.field}: <strong className="ms-1">{filter.value}</strong>
              <FaTimes
                className="ms-2"
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleRemoveFilter(index)}
              />
            </Badge>
          ))}
        </div>

        <InputGroup className="w-100 w-md-25">
          <Form.Control
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter />
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setEditingDoc({
                title: "",
                author: "",
                type: "",
                status: "Pending",
                date: "",
                file: "",
              });
              setShowFormModal(true);
            }}
          >
            <FaPlus /> Add Document
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover className="shadow-sm">
        <thead className="bg-primary text-white">
          <tr>
            {[
              "id",
              "title",
              "author",
              "type",
              "status",
              "date",
              "file",
              "actions",
            ].map((col) => (
              <th
                key={col}
                onClick={() => col !== "actions" && handleSort(col)}
                style={{ cursor: col !== "actions" ? "pointer" : "default" }}
              >
                {col.toUpperCase()} {col !== "actions" && <FaSort />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedDocuments.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td>{doc.author}</td>
              <td>{doc.type}</td>
              <td>
                <Badge bg={statuses[doc.status] || "secondary"}>
                  {doc.status}
                </Badge>
              </td>
              <td>{doc.date}</td>
              <td>
                {doc.file ? (
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    View File
                  </a>
                ) : (
                  "No file"
                )}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-warning"
                  className="me-2"
                  onClick={() => {
                    setEditingDoc(doc);
                    setSelectedFile(null);
                    setShowFormModal(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(doc.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={newFilter.field}
            onChange={(e) =>
              setNewFilter({ ...newFilter, field: e.target.value })
            }
          >
            {filterableFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            className="mt-2"
            type="text"
            placeholder="Enter filter value"
            value={newFilter.value}
            onChange={(e) =>
              setNewFilter({ ...newFilter, value: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddFilter}>
            Add Filter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Document Form Modal */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDoc ? "Edit Document" : "Add Document"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingDoc?.title || ""}
                onChange={(e) =>
                  setEditingDoc({ ...editingDoc, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={editingDoc?.author || ""}
                onChange={(e) =>
                  setEditingDoc({ ...editingDoc, author: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={editingDoc?.type || ""}
                onChange={(e) =>
                  setEditingDoc({ ...editingDoc, type: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editingDoc?.status || "Pending"}
                onChange={(e) =>
                  setEditingDoc({ ...editingDoc, status: e.target.value })
                }
              >
                {Object.keys(statuses).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editingDoc?.date || ""}
                onChange={(e) =>
                  setEditingDoc({ ...editingDoc, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFormModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAddEditDocument(editingDoc)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DocumentsPage;
