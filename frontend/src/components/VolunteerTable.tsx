import React, { useState, useEffect } from 'react';
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

const VolunteersTable: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bog/users')
      .then(response => response.json())
      .then(data => setVolunteers(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

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
        </tr>
      </thead>
      <tbody>
        {volunteers.map((volunteer) => (
          <tr key={volunteer.id}>
            <td>{volunteer.name}</td>
            <td><img src={volunteer.avatar} alt={volunteer.name} className="avatar" /></td>
            <td>{volunteer.phone}</td>
            <td>{volunteer.email}</td>
            <td>{volunteer.rating}</td>
            <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
            <td>{volunteer.hero_project}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteersTable;