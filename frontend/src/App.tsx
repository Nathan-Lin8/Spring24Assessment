import React, { useState, useEffect } from 'react';
import './App.css';
import VolunteersTable from './components/VolunteerTable';

interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  rating: string;
  status: boolean;
  hero_project: string;
}

const App: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [newVolunteer, setNewVolunteer] = useState<Partial<Volunteer>>({});

  useEffect(() => {
    fetch('http://localhost:5000/api/bog/users')
      .then(response => response.json())
      .then(data => setVolunteers(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const addVolunteer = () => {
    if (newVolunteer.name) {
      setVolunteers([...volunteers, { ...newVolunteer, id: Date.now().toString() } as Volunteer]);
      setNewVolunteer({});
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewVolunteer({ ...newVolunteer, [event.target.name]: event.target.value });
  };

  const updateVolunteer = (id: string, updatedInfo: Partial<Volunteer>) => {
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === id ? { ...volunteer, ...updatedInfo } : volunteer
    ));
  };

  const deleteVolunteer = (id: string) => {
    setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
  };

  return (
    <div className="App">
      <div>
        <input name="name" placeholder="Name" value={newVolunteer.name || ''} onChange={handleInputChange} />
        <input name="avatar" placeholder="Avatar URL" value={newVolunteer.avatar || ''} onChange={handleInputChange} />
        <input name="phone" placeholder="Phone" value={newVolunteer.phone || ''} onChange={handleInputChange} />
        <input name="email" placeholder="Email" value={newVolunteer.email || ''} onChange={handleInputChange} />
        <input name="rating" placeholder="Rating" value={newVolunteer.rating || ''} onChange={handleInputChange} />
        <input name="status" placeholder="Status (true/false)" value={newVolunteer.status ? 'true' : 'false'} onChange={handleInputChange} />
        <input name="hero_project" placeholder="Hero Project" value={newVolunteer.hero_project || ''} onChange={handleInputChange} />
        <button onClick={addVolunteer}>Add Volunteer</button>
      </div>
      <VolunteersTable 
        volunteers={volunteers}
        updateVolunteer={updateVolunteer}
        deleteVolunteer={deleteVolunteer}
      />
    </div>
  );
};

export default App;
