
function copyMatrix(matrix) {
  return matrix.map(row => [...row]);
}

function gcd(a, b) {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function scoreRow(matrix, row, pivot) {
  let fractions = 0;
  let denominatorCost = 0;

  for (const value of matrix[row]) {
    const g = gcd(value, pivot);
    const den = Math.abs(pivot / g);

    if (den > 1) {
      fractions++;
    }

    denominatorCost += den;
  }

  return {
    fractions,
    denominatorCost,
  };
}

function scoreColumn(matrix, col, pivot) {
  let fractions = 0;
  let denominatorCost = 0;

  for (let r = 0; r < matrix.length; r++) {
    const value = matrix[r][col];

    const g = gcd(value, pivot);
    const den = Math.abs(pivot / g);

    if (den > 1) {
      fractions++;
    }

    denominatorCost += den;
  }

  return {
    fractions,
    denominatorCost,
  };
}

function chooseBestNormalization(matrix, pivotIndex) {
  const pivot = matrix[pivotIndex][pivotIndex];

  const rowScore = scoreRow(matrix, pivotIndex, pivot);
  const colScore = scoreColumn(matrix, pivotIndex, pivot);

  if (rowScore.fractions < colScore.fractions)
    return "row";

  if (colScore.fractions < rowScore.fractions)
    return "column";

  if (rowScore.denominatorCost <= colScore.denominatorCost)
    return "row";

  return "column";
}

function findRank(mat) {
  let count = 0;
  mat.map((row) => row.map((value) => {
    if (value == 1) count++;
  }))
  return count;
}

function rankSolver(mat) {
  const steps = [];
  mat = mat.map(row =>
    row.map(Number)
  );

  steps.push({
    matrix: copyMatrix(mat),
    operation: "Initial Matrix",
  });

  const N = mat.length;

  for (let i = 0; i < N; i++) {
    // 1. Check if mat[i][i] is 0, if so, swap rows
    if (mat[i][i] === 0) {
      for (let r = i + 1; r < N; r++) {
        if (mat[r][i] !== 0) {
          [mat[i], mat[r]] = [mat[r], mat[i]];
          steps.push({
            matrix: copyMatrix(mat),
            operation: `R${i + 1} \\leftrightarrow R${r + 1}`,
          });
          break;
        }
      }
    }

    // 2. Check if mat[i][i] is still 0, if so, swap columns
    if (mat[i][i] === 0) {
      for (let c = i + 1; c < N; c++) {
        if (mat[i][c] !== 0) {
          for (let r = 0; r < N; r++) {
            let temp = mat[r][i];
            mat[r][i] = mat[r][c];
            mat[r][c] = temp;
          }
          steps.push({
            matrix: copyMatrix(mat),
            operation: `C${i + 1} \\leftrightarrow C${c + 1}`,
          });
          break;
        }
      }
    }

    //2.1 check if there is any value  that is 1 if so swap it with the pivot
    if (mat[i][i] !== 1) {
      for (let r = i + 1; r < N; r++) {
        if (mat[r][i] === 1) {
          [mat[i], mat[r]] = [mat[r], mat[i]];
          steps.push({
            matrix: copyMatrix(mat),
            operation: `R${i + 1} \\leftrightarrow R${r + 1}`,
          });
          break;
        }
      }
    }

    //2.2 check if there is any value  that is 1 if so swap it with the pivot
    if (mat[i][i] !== 1) {
      for (let c = i + 1; c < N; c++) {
        if (mat[i][c] === 1) {
          for (let r = 0; r < N; r++) {
            let temp = mat[r][i];
            mat[r][i] = mat[r][c];
            mat[r][c] = temp;
          }
          steps.push({
            matrix: copyMatrix(mat),
            operation: `C${i + 1} \\leftrightarrow C${c + 1}`,
          });
          break;
        }
      }
    }

    // 3. Normalize pivot to 1
    const pivot = mat[i][i];

    if (pivot !== 1 && pivot !== 0) {

      const choice = chooseBestNormalization(mat, i);

      if (choice === "row") {

        mat[i] = mat[i].map(value => value / pivot);

        steps.push({
          matrix: copyMatrix(mat),
          operation: `R${i + 1} \\to R${i + 1}/${pivot}`,
        });

      } else {

        for (let r = 0; r < N; r++) {
          mat[r][i] /= pivot;
        }

        steps.push({
          matrix: copyMatrix(mat),
          operation: `C${i + 1} \\to C${i + 1}/${pivot}`,
        });

      }
    }

    // 4. Row reductions below the pivot
    for (let r = i + 1; r < N; r++) {
      const k = mat[r][i];
      if (k !== 0) {
        const minus = mat[i].map(value => value * k);
        for (let col = 0; col < N; col++) {
          mat[r][col] -= minus[col];
        }
        steps.push({
          matrix: copyMatrix(mat),
          operation: `R${r + 1} \\to R${r + 1} - ${k}*R${i + 1}`,
        });
      }
    }

    // 5. Column reductions to the right of the pivot
    for (let c = i + 1; c < N; c++) {
      const k = mat[i][c];
      if (k !== 0) {
        mat[i][c] = 0;
        steps.push({
          matrix: copyMatrix(mat),
          operation: `C${c + 1} \\to C${c + 1} - ${k}*C${i + 1}`,
        });
      }
    }
  }

  return {
    rank: findRank(mat),
    steps,
  };
}

export default rankSolver;