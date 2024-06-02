import React from 'react';


type Problem = {
    id: number;
    title: string;
    description: string;
    platform: string;
  };
  
  type ProblemListProps = {
    problems: Problem[];
    onSelect: (problem: Problem) => void;
  };

const ProblemList: React.FC<ProblemListProps> = ({ problems, onSelect }) => {
  return (
    <div className="problem-list">
      <h2>Problems</h2>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
            <p><strong>Platform:</strong> {problem.platform}</p>
            <button onClick={() => onSelect(problem)}>Attempt</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
