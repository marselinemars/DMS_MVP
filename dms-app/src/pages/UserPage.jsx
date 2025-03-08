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

const initialUsers = [
  {
    id: 1,
    name: "Mohamed Amine Belkacem",
    email: "mohamed.belkacem@example.com",
    hideDate: "2021-05-16",
    position: "Data Analyst",
    department: "IT Department",
    status: "On Leave",
  },
  {
    id: 2,
    name: "Fatima Zohra Boukherroub",
    email: "fatima.boukherroub@example.com",
    hideDate: "2023-05-23",
    position: "Software Engineer",
    department: "Development",
    status: "Active",
  },
  {
    id: 3,
    name: "Yacine Benali",
    email: "yacine.benali@example.com",
    hideDate: "2020-07-23",
    position: "Project Manager",
    department: "Management",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Nadia Cherif",
    email: "nadia.cherif@example.com",
    hideDate: "2022-01-10",
    position: "UX Designer",
    department: "Design",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Karim Boudiaf",
    email: "karim.boudiaf@example.com",
    hideDate: "2021-03-22",
    position: "Network Administrator",
    department: "IT Department",
    status: "Active",
  },
  {
    id: 6,
    name: "Samira Hadjadj",
    email: "samira.hadjadj@example.com",
    hideDate: "2023-11-12",
    position: "HR Manager",
    department: "Human Resources",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Ali Touati",
    email: "ali.touati@example.com",
    hideDate: "2022-01-29",
    position: "Financial Analyst",
    department: "Finance",
    status: "Active",
  },
];

const statuses = {
  Active: "success",
  Inactive: "secondary",
  "On Leave": "warning",
};

const UserPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newFilter, setNewFilter] = useState({ field: "name", value: "" });

  // Modal states for CRUD
  const [showUserModal, setShowUserModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filterableFields = [
    "name",
    "email",
    "position",
    "department",
    "status",
  ];

  const handleSearch = (e) => setSearch(e.target.value);

  const handleRemoveFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleAddFilter = () => {
    if (newFilter.value.trim() !== "") {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: "name", value: "" });
      setShowFilterModal(false);
    }
  };

  const handleSort = (field) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    filters.forEach((filter) => {
      filtered = filtered.filter((user) =>
        user[filter.field].toLowerCase().includes(filter.value.toLowerCase())
      );
    });

    if (sortField) {
      filtered.sort((a, b) => {
        const valA = a[sortField].toLowerCase();
        const valB = b[sortField].toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return filtered;
  }, [search, filters, sortField, sortOrder, users]);

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  // CRUD Operations
  const handleSaveUser = () => {
    if (editMode) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...selectedUser, id: prevUsers.length + 1 },
      ]);
    }

    setShowUserModal(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-primary">User Management</h4>

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
              setEditMode(false);
              setSelectedUser({
                name: "",
                email: "",
                position: "",
                department: "",
                status: "Active",
              });
              setShowUserModal(true);
            }}
          >
            <FaPlus /> Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover className="shadow-sm">
        <thead className="bg-primary text-white">
          <tr>
            {[
              "id",
              "name",
              "email",
              "hideDate",
              "position",
              "department",
              "status",
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
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.hideDate}</td>
              <td>{user.position}</td>
              <td>{user.department}</td>
              <td>
                <Badge bg={statuses[user.status] || "secondary"}>
                  {user.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setEditMode(true);
                    setShowUserModal(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
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

      {/* User Modal (Add/Edit) */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser?.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.position || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, position: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.department || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    department: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={selectedUser?.status || "Active"}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, status: e.target.value })
                }
              >
                {Object.keys(statuses).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserPage;
