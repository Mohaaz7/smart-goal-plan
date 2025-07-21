import React from "react";
import GoalCard from "./GoalCard";
import { Goal } from "../types";

interface Props {
  goals: Goal[];
  onDelete: (id: string) => void;
}

function GoalList({ goals, onDelete }: Props) {
  if (goals.length === 0) return <p>No goals yet. Add one!</p>;

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default GoalList;
