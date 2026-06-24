
function copyMatrix(matrix) {
  return matrix.map(row => [...row]);
}

function findRank(mat){
    let count = 0;
    mat.map((row)=> row.map((value)=>{
        if(value == 1) count++;
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

    // 3. Normalize pivot to 1
    const pivot = mat[i][i];
    if (pivot !== 1 && pivot !== 0) {
      mat[i] = mat[i].map(value => value / pivot);
      steps.push({
        matrix: copyMatrix(mat),
        operation: `R${i + 1} \\to R${i + 1} / ${pivot}`,
      });
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