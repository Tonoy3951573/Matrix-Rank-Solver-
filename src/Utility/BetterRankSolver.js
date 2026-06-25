function findRank(mat) {
  let count = 0;

  for (const row of mat) {
    for (const value of row) {
      if (Math.abs(value - 1) < 1e-9)
        count++;
    }
  }

  return count;
}

function gcd(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}

function scorePivot(matrix, pivotRow, pivotCol, pivotIndex) {
  const pivot = Math.abs(matrix[pivotRow][pivotCol]);

  if (pivot === 0) {
    return null;
  }

  let fractions = 0;
  let denominatorCost = 0;
  const N = matrix.length;

  // Score only the remaining row
  for (let c = pivotIndex; c < N; c++) {
    const value = Math.abs(matrix[pivotRow][c]);
    const g = gcd(value, pivot);
    const denominator = pivot / g;

    if (denominator > 1) {
      fractions++;
    }
    denominatorCost += denominator;
  }

  // Score only the remaining column
  for (let r = pivotIndex; r < N; r++) {
    if (r === pivotRow) {
      continue;
    }
    const value = Math.abs(matrix[r][pivotCol]);
    const g = gcd(value, pivot);
    const denominator = pivot / g;

    if (denominator > 1) {
      fractions++;
    }
    denominatorCost += denominator;
  }

  return {
    fractions,
    denominatorCost,
    pivot,
  };
}

function betterScore(a, b) {
  if (b === null) {
    return true;
  }

  if (a.fractions !== b.fractions) {
    return a.fractions < b.fractions;
  }

  if (a.denominatorCost !== b.denominatorCost) {
    return a.denominatorCost < b.denominatorCost;
  }

  return a.pivot < b.pivot;
}

function findBestPivot(matrix, pivotIndex) {
  const N = matrix.length;
  let best = null;

  for (let r = pivotIndex; r < N; r++) {
    for (let c = pivotIndex; c < N; c++) {
      if (matrix[r][c] === 0) {
        continue;
      }

      const score = scorePivot(matrix, r, c, pivotIndex);
      if (score === null) {
        continue;
      }

      if (best === null || betterScore(score, best.score)) {
        best = {
          row: r,
          col: c,
          score,
        };
      }
    }
  }

  return best;
}

function copyMatrix(matrix) {
  return matrix.map(row => [...row]);
}

function swapRows(mat, r1, r2, steps) {
  if (r1 === r2) return;

  [mat[r1], mat[r2]] = [mat[r2], mat[r1]];

  steps.push({
    matrix: copyMatrix(mat),
    operation: `R${r1 + 1} \\leftrightarrow R${r2 + 1}`,
  });
}

function swapColumns(mat, c1, c2, steps) {
  if (c1 === c2) return;

  for (let r = 0; r < mat.length; r++) {
    [mat[r][c1], mat[r][c2]] = [mat[r][c2], mat[r][c1]];
  }

  steps.push({
    matrix: copyMatrix(mat),
    operation: `C${c1 + 1} \\leftrightarrow C${c2 + 1}`,
  });
}

function normalizeRow(mat, i, steps) {
  const pivot = mat[i][i];

  if (pivot === 0 || pivot === 1) return;

  mat[i] = mat[i].map(v => v / pivot);

  steps.push({
    matrix: copyMatrix(mat),
    operation: `R${i + 1} \\to R${i + 1}/${pivot}`,
  });
}

function eliminateRows(mat, i, steps) {
  const N = mat.length;

  for (let r = i + 1; r < N; r++) {
    const k = mat[r][i];

    if (k === 0) continue;

    const minus = mat[i].map(v => v * k);

    for (let c = 0; c < N; c++) {
      mat[r][c] -= minus[c];
    }

    steps.push({
      matrix: copyMatrix(mat),
      operation: `R${r + 1} \\to R${r + 1} - ${k}R${i + 1}`,
    });
  }
}

function eliminateColumns(mat, i, steps) {
  const N = mat.length;

  for (let c = i + 1; c < N; c++) {
    const k = mat[i][c];

    if (Math.abs(k) < 1e-9)
      continue;

    for (let r = 0; r < N; r++) {
      mat[r][c] -= k * mat[r][i];
    }

    steps.push({
      matrix: copyMatrix(mat),
      operation: `C${c + 1} \\to C${c + 1}-${k}C${i + 1}`,
    });
  }
}

function rankSolver(mat) {
  const steps = [];

  mat = mat.map(row => row.map(Number));

  steps.push({
    matrix: copyMatrix(mat),
    operation: "Initial Matrix",
  });

  const N = mat.length;

  for (let i = 0; i < N; i++) {
    const best = findBestPivot(mat, i);

    if (best) {
      swapRows(mat, i, best.row, steps);
      swapColumns(mat, i, best.col, steps);
    }

    normalizeRow(mat, i, steps);
    eliminateColumns(mat, i, steps);
    eliminateRows(mat, i, steps);
  }

  return {
    rank: findRank(mat),
    steps,
  };
}

export default rankSolver;