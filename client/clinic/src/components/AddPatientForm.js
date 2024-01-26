import React, { useState } from 'react';
import './AddPatientForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    contact: '',
    photo: null,
    nic: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post('http://localhost:3001/api/patients', formDataToSend, {
        withCredentials: true,
      });
      // Reset form after submission
      setFormData({
        name: '',
        birthday: '',
        contact: '',
        photo: null,
        nic: '',
        notes: '',
      });
      // Display an alert box
      alert('Patient information submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="patient-form-container">
      <form>
        <h className="head">Add patient Form</h>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Birthday:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>

        <label>
          Contact No:
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </label>

        <label>
          Photo:
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </label>

        <label>
          NIC:
          <input type="text" name="nic" value={formData.nic} onChange={handleChange} required />
        </label>

        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>

        {/* Add Treatment button */}
        <Link to="/add-treatment">
          <button>Add Treatment</button>
        </Link>
      </form>
    </div>
  );
};

export default AddPatientForm;
