import { useState } from 'react';

const API_URL = 'http://localhost:3000/goals';

function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const selectedGoal = goals.find((goal) => goal.id === parseInt(goalId));
    if (!selectedGoal) return;

    const updatedGoal = {
      ...selectedGoal,
      amountSaved: selectedGoal.amountSaved + parseFloat(amount),
    };

    fetch(`${API_URL}/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSaved: updatedGoal.amountSaved }),
    })
      .then((res) => res.json())
      .then(onDeposit);

    setGoalId('');
    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)}>
        <option value="">-- Select Goal --</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
