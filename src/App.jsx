import { useState } from "react";
import "./App.css";
import MatrixCard from "./Components/MatrixCard";
import InputMatrix from "./Components/InputMatrix";
// import rankSolver from "./Utility/RankSolver";
import rankSolver from "./Utility/BetterRankSolver";

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

  const handleDimensionChange = (size) => {
    setShow(false);
    const newMatrix = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => {
        if (matrix[r] && matrix[r][c] !== undefined) {
          return matrix[r][c];
        }
        return "";
      })
    );
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

        <div className="dimension-selector">
          <label htmlFor="dimension-select">Matrix Size: </label>
          <select
            id="dimension-select"
            value={matrix.length}
            onChange={(e) => handleDimensionChange(Number(e.target.value))}
          >
            {[2, 3, 4, 5, 6].map((size) => (
              <option key={size} value={size}>
                {size} × {size}
              </option>
            ))}
          </select>
        </div>

        <p className="title">Enter Your {matrix.length} × {matrix.length} Matrix</p>

        <InputMatrix matrix={matrix} handleChange={handleChange} />

        <div className="calculate-box">
          <button className="calculate-btn" onClick={handleClick}>
            Calculate
          </button>
        </div>
        <div className="rank-card">
            {!isShow && (<p className="place-holder">Rank will apear here</p>)}
             {isShow && (<>
                  <p> Matrix </p>
                  <MatrixCard matrix={matrix} sideNote=""/>
                  <div className="Rank">
                          <p>
                            Rank = {result.rank}
                          </p>
                  </div>
             </>)}


        </div>
      </div>
      <div className="wrapper">
        <div className="header">
          <h1>Step by step solution</h1>
        </div>
        <div className={`result `}>
          {!isShow && <div className="msg" >Nothing to calculate yet!</div>}
          {isShow &&
            (isMatrixEmpty ? (
              <div className="msg">Enter Matrix First</div>
            ) : (
              <>
                <h2>Solution : </h2>
                <div className="answer">
                  {steps.map((step, index) => (
                    <MatrixCard
                      key={index}
                      matrix={step.matrix}
                      sideNote={step.operation}
                    />
                  ))}
                </div>
                <p className="rank-show">so, rank of this matrix is : {result.rank}</p>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
