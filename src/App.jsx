import { useEffect, useState } from 'react';
import GoalList from './GoalList';
import GoalForm from './GoalForm';
import DepositForm from './DepositForm';

const API_URL = 'http://localhost:3000/goals'; // Update if needed for deployment

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  function addGoal(newGoal) {
    setGoals([...goals, newGoal]);
  }

  function deleteGoal(id) {
    setGoals(goals.filter((goal) => goal.id !== id));
  }

  function updateGoal(updatedGoal) {
    setGoals(
      goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  }

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <GoalForm onAddGoal={addGoal} />
      <DepositForm goals={goals} onDeposit={updateGoal} />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </div>
  );
}

export default App;
