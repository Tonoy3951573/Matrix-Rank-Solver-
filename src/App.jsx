import { useState } from "react";
import "./App.css";
import MatrixCard from "./Components/MatrixCard";
import InputMatrix from "./Components/InputMatrix";
import rankSolver from "./Utility/RankSolver";

function App() {
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [isShow, setShow] = useState(false);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const handleChange = (row, col, value) => {
    setShow(false);
    const newMatrix = matrix.map((r) => [...r]);
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
  };

  const handleClick = () => {
    setShow(true);
    const solverResult = rankSolver(matrix);

    setResult(solverResult);
    setSteps(solverResult.steps);
  };

  const isMatrixEmpty = matrix.every((row) => row.every((cell) => cell === ""));

  return (
    <div className="app-shell">
      <div className="card">
        <div className="title-continer">
          <h1>Matrix Rank Calculator</h1>
          <p>With steps!</p>
        </div>

        <p className="title">Enter Your 3 × 3 Matrix</p>

        <InputMatrix matrix={matrix} handleChange={handleChange} />

        <div className="calculate-box">
          <button className="calculate-btn" onClick={handleClick}>
            Calculate
          </button>
        </div>
      </div>

      <div className={`result ${!isShow ? "hide" : ""}`}>
        {isShow &&
          (isMatrixEmpty ? (
            <p>Enter Matrix First</p>
          ) : (
            <>
              <h1>Solution : </h1>
              {steps.map((step, index) => (
                <MatrixCard
                  key={index}
                  matrix={step.matrix}
                  sideNote={step.operation}
                />
              ))}

              <p className="rank-show">Rank : {result.rank}</p>
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
