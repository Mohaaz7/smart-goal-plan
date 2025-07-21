import React from "react";
import { Goal } from "../types";

interface Props {
  goal: Goal;
  onDelete: (id: string) => void;
}

function GoalCard({ goal, onDelete }: Props) {
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p><strong>Target:</strong> ${goal.targetAmount.toLocaleString()}</p>
      <p><strong>Saved:</strong> ${goal.savedAmount.toLocaleString()}</p>
      <p><strong>Category:</strong> {goal.category}</p>
      <p><strong>Deadline:</strong> {goal.deadline}</p>
      <progress value={goal.savedAmount} max={goal.targetAmount}></progress>

      {isCompleted ? (
        <p style={{ color: "green" }}>✅ Goal Completed</p>
      ) : daysLeft < 0 ? (
        <p style={{ color: "red" }}>⛔ Overdue!</p>
      ) : (
        <p>⚠️ {daysLeft} days left</p>
      )}

      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
