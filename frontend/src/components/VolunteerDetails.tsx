import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Define the type for your volunteer data
interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  rating: string;
  status: boolean;
  hero_project: string;
  notes: string; // Assuming you have a notes field
}

const VolunteerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extracting the id parameter
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Example fetch function
    const fetchVolunteerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/bog/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: Volunteer = await response.json();
        setVolunteer(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!volunteer) {
    return <div>No volunteer found.</div>;
  }

  return (
    <div>
      <h2>Volunteer Details</h2>
      <p><strong>Name:</strong> {volunteer.name}</p>
      <p><strong>Email:</strong> {volunteer.email}</p>
      <p><strong>Phone:</strong> {volunteer.phone}</p>
      <p><strong>Rating:</strong> {volunteer.rating}</p>
      <p><strong>Status:</strong> {volunteer.status ? 'Active' : 'Inactive'}</p>
      <p><strong>Hero Project:</strong> {volunteer.hero_project}</p>
      <p><strong>Notes:</strong> {volunteer.notes}</p>
    </div>
  );
};

export default VolunteerDetails;
