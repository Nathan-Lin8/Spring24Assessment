import React, { useState } from "react";
import { useNavigate, useNavigation } from 'react-router-dom';
import "./VolunteerTable.css";

type Volunteer = {
  name: string;
  avatar: string;
  phone: string;
  email: string;
  rating: string;
  status: boolean;
  hero_project: string;
  id: string;
};

interface VolunteersTableProps {
  volunteers: Volunteer[];
  updateVolunteer: (id: string, updatedInfo: Partial<Volunteer>) => void;
  deleteVolunteer: (id: string) => void;
  page: number;
  pageSize: number;
}
const VolunteersTable: React.FC<VolunteersTableProps> = ({
  volunteers,
  updateVolunteer,
  deleteVolunteer,
  page,
  pageSize,
}) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const volunteersForPage = volunteers.slice(startIndex, endIndex);

  const [editing, setEditing] = useState<string | null>(null);
  const [editedVolunteer, setEditedVolunteer] = useState<Partial<Volunteer>>(
    {}
  );

  const startEditing = (volunteer: Volunteer) => {
    setEditing(volunteer.id);
    setEditedVolunteer(volunteer);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Volunteer
  ) => {
    const value = field === "status" ? e.target.checked : e.target.value;
    setEditedVolunteer({ ...editedVolunteer, [field]: value });
  };

  const saveEdit = (id: string) => {
    updateVolunteer(id, editedVolunteer);
    setEditing(null);
  };
  const navigate = useNavigate();
  // ... existing code

  const navigateToNotes = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <table className="volunteers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Profile Picture</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Hero Project</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {volunteersForPage.map((volunteer) => (
          <tr key={volunteer.id}>
            <td>{volunteer.name}</td>
            <td>
              <img
                src={volunteer.avatar}
                alt={volunteer.name}
                className="avatar"
              />
            </td>
            <td>{volunteer.phone}</td>
            <td>{volunteer.email}</td>
            <td>{volunteer.rating}</td>
            <td>{volunteer.status ? "Active" : "Inactive"}</td>
            <td>{volunteer.hero_project}</td>
            <td>
              {editing === volunteer.id ? (
                <>
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.name}
                    onChange={(e) => handleEditChange(e, "name")}
                  />
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.avatar}
                    onChange={(e) => handleEditChange(e, "avatar")}
                  />
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.phone}
                    onChange={(e) => handleEditChange(e, "phone")}
                  />
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.email}
                    onChange={(e) => handleEditChange(e, "email")}
                  />
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.rating}
                    onChange={(e) => handleEditChange(e, "rating")}
                  />
                  <label>
                    <input
                      type="checkbox"
                      className="edit-textfield-margin"
                      checked={editedVolunteer.status}
                      onChange={(e) => handleEditChange(e, "status")}
                    />
                    {editedVolunteer.status ? "Active" : "Inactive"}
                  </label>
                  <input
                    type="text"
                    className="edit-textfield-margin"
                    value={editedVolunteer.hero_project}
                    onChange={(e) => handleEditChange(e, "hero_project")}
                  />
                  <button
                    className="button-margin"
                    onClick={() => saveEdit(volunteer.id)}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button
                    className="button-margin"
                    onClick={() => startEditing(volunteer)}
                  >
                    Edit
                  </button>
                  <button onClick={() => navigateToNotes(volunteer.id)}>Notes</button>

                  <button onClick={() => deleteVolunteer(volunteer.id)}>
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteersTable;
