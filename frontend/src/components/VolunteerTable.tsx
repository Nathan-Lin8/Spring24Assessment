import React, { useState } from 'react';
import './VolunteerTable.css';

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
}

const VolunteersTable: React.FC<VolunteersTableProps> = ({ volunteers, updateVolunteer, deleteVolunteer }) => {
  const [editing, setEditing] = useState<string | null>(null);
  const [editedVolunteer, setEditedVolunteer] = useState<Partial<Volunteer>>({});

  const startEditing = (volunteer: Volunteer) => {
    setEditing(volunteer.id);
    setEditedVolunteer(volunteer);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Volunteer) => {
    setEditedVolunteer({ ...editedVolunteer, [field]: e.target.value });
  };

  const saveEdit = (id: string) => {
    updateVolunteer(id, editedVolunteer);
    setEditing(null);
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
        {volunteers.map((volunteer) => (
          <tr key={volunteer.id}>
            {editing === volunteer.id ? (
              <>
                <td><input type="text" value={editedVolunteer.name} onChange={(e) => handleEditChange(e, 'name')} /></td>
                <td><input type="text" value={editedVolunteer.avatar} onChange={(e) => handleEditChange(e, 'avatar')} /></td>
                <td><input type="text" value={editedVolunteer.phone} onChange={(e) => handleEditChange(e, 'phone')} /></td>
                <td><input type="text" value={editedVolunteer.email} onChange={(e) => handleEditChange(e, 'email')} /></td>
                <td><input type="text" value={editedVolunteer.rating} onChange={(e) => handleEditChange(e, 'rating')} /></td>
                <td><input type="checkbox" checked={editedVolunteer.status} onChange={(e) => handleEditChange(e, 'status')} /></td>
                <td>
                  <input 
                    type="text" 
                    value={editedVolunteer.hero_project || ''} 
                    onChange={(e) => handleEditChange(e, 'hero_project')} 
                  />
                </td>
                <td>
                  <button onClick={() => saveEdit(volunteer.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{volunteer.name}</td>
                <td><img src={volunteer.avatar} alt={volunteer.name} className="avatar" /></td>
                <td>{volunteer.phone}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.rating}</td>
                <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
                <td>{volunteer.hero_project}</td>
                <td>
                  <button onClick={() => startEditing(volunteer)}>Edit</button>
                  <button onClick={() => deleteVolunteer(volunteer.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteersTable;
