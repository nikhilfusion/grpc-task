import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [ageResult, setAge] = useState({})
  const handleAgeForm = () => {
    axios
      .post("http://127.0.0.1:4001/api", { year, month })
      .then(res => setAge(res.data))
      .catch(err => console.log(err));
  }

  const handleResetForm = () => {
    setYear('');
    setMonth('');
    setAge({});
  }

  return (
    <div style={{ padding: '25px' }}>
      <h1>Age Form</h1>
      <p>Enter Year:</p>
      <input
        type='text'
        onChange={(e) => setYear(e.target.value)}
        value={year}
      />
      <br />
      <p>Enter Month:</p>
      <input
        type='text'
        onChange={(e) => setMonth(e.target.value)}
        value={month}
      />
      <div style={{ padding: '10px 0px' }}>
        <button type="primary" onClick={handleAgeForm}>Submit</button>
        <button type="primary" onClick={handleResetForm}>Reset</button>
      </div>
      {
        ageResult && (ageResult.ageYear || ageResult.ageYear === 0) ?
          <>
            <h3>Age Result</h3>
            <p>Year: <span>{ageResult.ageYear}</span></p>
            <p>Month: <span>{ageResult.ageMonth}</span></p>
          </>
          : ''
      }
    </div>

  );
}

export default App;
