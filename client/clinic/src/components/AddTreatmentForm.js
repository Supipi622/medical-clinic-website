import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddTreatmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    medication: '',
    dosage: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/patients/${id}/prescriptions`, formData);
      // Redirect back to the patient details page or any other desired page
      navigate(`/patient/${id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Add Treatment</h2>
      <form onSubmit={handleSubmit}>
        
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Medication:
          <input type="text" name="medication" value={formData.medication} onChange={handleChange} required />
        </label>
        <label>
          Dosage:
          <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} required />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>
        <button type="submit">Add Treatment</button>
      </form>
    </div>
  );
};

export default AddTreatmentForm;
