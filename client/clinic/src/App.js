
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  AddPatientForm from './components/AddPatientForm';
import AddTreatmentForm from './components/AddTreatmentForm';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/patient/:id" element={<AddPatientForm />} />
        <Route path="/add-treatment/:id" element={<AddTreatmentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
