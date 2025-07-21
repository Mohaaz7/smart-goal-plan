interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  category: string;
  deadline: string;
  createdAt: string;
}

interface Props {
  goals: Goal[];
}

function Overview({ goals }: Props) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {completedGoals}</p>
    </div>
  );
}

export default Overview;
