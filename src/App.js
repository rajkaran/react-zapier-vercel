import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'Form submitted!' : 'Error submitting');
    } catch (err) {
      setStatus('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
}

export default App;
