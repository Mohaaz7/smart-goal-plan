import React, { useState } from "react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  category: string;
  deadline: string;
  createdAt: string;
}

interface GoalFormProps {
  onAddGoal: (goal: Goal) => void;
}

function GoalForm({ onAddGoal }: GoalFormProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || targetAmount <= 0 || !category || !deadline) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newGoal: Goal = {
      id: crypto.randomUUID(), // Unique ID
      name,
      targetAmount,
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString(),
    };

    onAddGoal(newGoal);

    // Reset form
    setName("");
    setTargetAmount(0);
    setCategory("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>

      <div>
        <label>Goal Name</label>
        <input
          type="text"
          value={name}
          placeholder="e.g. Vacation"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Target Amount</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          placeholder="e.g. Travel"
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
