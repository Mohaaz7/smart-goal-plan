import React, { useState } from "react";

interface Goal {
  id: string;
  name: string;
}

interface DepositFormProps {
  goals: Goal[];
  onDeposit: (goalId: string, amount: number) => void;
}

function DepositForm({ goals, onDeposit }: DepositFormProps) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoalId && amount > 0) {
      onDeposit(selectedGoalId, amount);
      setSelectedGoalId("");
      setAmount(0);
    }
  };

  return (
    <div>
      <h2>Make a Deposit</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add one!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Select a goal:
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              required
            >
              <option value="">-- Select a goal --</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Amount:
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </label>
          <br />
          <button type="submit">Deposit</button>
        </form>
      )}
    </div>
  );
}

export default DepositForm;
