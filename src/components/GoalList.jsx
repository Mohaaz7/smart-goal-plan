import GoalCard from './GoalCard';

function GoalList({ goals, onDelete }) {
  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default GoalList;
