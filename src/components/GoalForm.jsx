import { useState } from 'react';

const API_URL = 'http://localhost:3000/goals';

function GoalForm({ onAddGoal }) {
  const [form, setForm] = useState({
    name: '',
    target: '',
    amountSaved: '',
    deadline: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...form,
      target: parseFloat(form.target),
      amountSaved: parseFloat(form.amountSaved),
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then(onAddGoal);

    setForm({ name: '', target: '', amountSaved: '', deadline: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} />
      <input name="target" type="number" placeholder="Target Amount" value={form.target} onChange={handleChange} />
      <input name="amountSaved" type="number" placeholder="Amount Saved" value={form.amountSaved} onChange={handleChange} />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
