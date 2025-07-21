import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import GoalList from "./components/GoalList";

function App() {
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    // Fetch goals from json-server
    axios.get("http://localhost:3000/goals")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Error fetching goals:", err));

    // Fetch deposits
    axios.get("http://localhost:3000/deposits")
      .then((res) => setDeposits(res.data))
      .catch((err) => console.error("Error fetching deposits:", err));
  }, []);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const handleAddDeposit = (newDeposit) => {
    setDeposits([...deposits, newDeposit]);

    // Update goal progress
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === newDeposit.goalId
          ? {
              ...goal,
              progress: (goal.progress || 0) + newDeposit.amount,
            }
          : goal
      )
    );
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`http://localhost:3000/goals/${goalId}`);
      setGoals(goals.filter((goal) => goal.id !== goalId));
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalForm onAddGoal={handleAddGoal} />
      <DepositForm goals={goals} onAddDeposit={handleAddDeposit} />
      <GoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </div>
  );
}

export default App;
