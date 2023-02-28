import React, { useState } from 'react';
import './PerformanceScorecard.css';

const values = [
  'Exceed Client expectations',
  'Pursue Excellance',
  'Build for Long Term',
  'Embrace change and innovation',
  'Work as one global team',
  'Be a caring Meritocracy',
  'Drive a commercial rigor',
  'Always act with integrity'
];

const PerformanceScorecard = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});

  const handleScoreChange = (value, index) => {
    const newScores = { ...scores };
    newScores[index] = value;
    setScores(newScores);
  };

  const handleCommentChange = (value, index) => {
    const newComments = { ...comments };
    newComments[index] = value;
    setComments(newComments);
  };

  const calculateAverageScore = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => parseInt(sum) + parseInt(score), 0);
    console.log(totalScore)
    console.log(scores)
    return Object.values(scores).length > 0 ? (totalScore / Object.values(scores).length).toFixed(2) : 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Employee Name:', employeeName);
    console.log('Scores:', scores);
    console.log('Comments:', comments);
    const performanceScorecard = {
      employeeName,
      ...values,
    };
    try {
      // Submit the performance scorecard data to the backend API
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceScorecard),
      });
 
      // Handle the response from the backend API
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }


  };

  return (
    <div className="performance-scorecard">
      <h1>Performance Scorecard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee-name">Employee Name:</label>
          <input type="text" id="employee-name" value={employeeName} onChange={event => setEmployeeName(event.target.value)} required />
        </div>

        {values.map((value, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`score-${index}`}>{value}:</label>
            <select id={`score-${index}`} value={scores[index]} onChange={event => handleScoreChange(event.target.value, index)} required>
              <option value="">Select One</option>
              <option value="4">Exceeding</option>
              <option value="3">Meeting</option>
              <option value="2">Partially Meeting</option>
              <option value="1">Not Meeting</option>
            </select>

            {(scores[index] === '4' || scores[index] === '1') && (
              <div className="form-group">
                <label htmlFor={`comment-${index}`}>Comment:</label>
                <textarea id={`comment-${index}`} value={comments[index]} onChange={event => handleCommentChange(event.target.value, index)} />
              </div>
            )}
          </div>
        ))}

        <div className="form-group">
          <p>Average Score: {calculateAverageScore()}</p>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PerformanceScorecard;