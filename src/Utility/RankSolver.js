
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

  if (mat[0][0] === 0) {
        for (let r = 1; r < 3; r++) {
        if (mat[r][0] !== 0) {
            [mat[0], mat[r]] =
            [mat[r], mat[0]];

            steps.push({
            matrix: copyMatrix(mat),
            operation: `R1 \\leftrightarrow R${r + 1}`,
            });

            break;
        }
        }
    }

    if(mat[0][0] === 0){
        for (let c = 1; c < 3; c++) {
            if (mat[0][c] !== 0) {

                // [mat[0][0], mat[0][c]] =
                // [mat[0][c],mat[0][0]];

                // [mat[1][0], mat[1][c]] =
                // [mat[1][c],mat[1][0]];
                

                // [mat[1][0], mat[1][c]] =
                // [mat[1][c],mat[1][0]];

                 let temp = mat[0][0];
                mat[0][0] = mat[0][c];
                mat[0][c] = temp;

                temp = mat[1][0];
                mat[1][0] = mat[1][c];
                mat[1][c] = temp;

                temp = mat[2][0];
                mat[2][0] = mat[2][c];
                mat[2][c] = temp;

                steps.push({
                matrix: copyMatrix(mat),
                operation: `C1 \\leftrightarrow C${c + 1}`,
                });

                break;
            }
        }
    }

    const pivot = mat[0][0];

    if (pivot !== 1 && pivot !== 0) {
        mat[0] = mat[0].map(
            value => value / pivot
        );

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R1 \\to R1 / ${pivot}`,
        });
    }

    let k = mat[1][0], m = mat[2][0];
    if(k != 0){
        let minus = mat[0].map((value) => value*k);
        for(let i = 0; i < 3; i++){
            mat[1][i] -= minus[i];
        }

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R2 \\to R2 - ${k}*R1)`,
        });

    }

    if(m != 0){
        let minus = mat[0].map((value) => value*m);
        for(let i = 0; i < 3; i++){
            mat[2][i] -= minus[i];
        }

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R3 \\to R3 - ${m}*R1`,
        });

    }

    k = mat[0][1] ;

    if(k !== 0){
        mat[0][1] = 0;
        steps.push({
            matrix: copyMatrix(mat),
            operation: `C2 \\to C2 - ${k}*C1`,
        });
    }
    

    m = mat[0][2] ;
    if(m !== 0){
        mat[0][2] = 0;
        steps.push({
            matrix: copyMatrix(mat),
            operation: `C3 \\to C3 - ${m}*C1`,
        });
    }

    if (mat[1][1] === 0) {
        for (let r = 1; r < 3; r++) {
        if (mat[r][1] !== 0) {
            [mat[1], mat[r]] =
            [mat[r], mat[1]];

            steps.push({
            matrix: copyMatrix(mat),
            operation: `R1 \\leftrightarrow R${r + 1}`,
            });

            break;
        }
        }
   }

    if(mat[1][1] === 0){
        for (let c = 1; c < 3; c++) {
            if (mat[1][c] !== 0) {

                // [mat[0][1], mat[0][c]] =
                // [mat[0][c], mat[0][1]];

                // [mat[1][1], mat[1][c]] =
                // [mat[1][c],mat[1][1]];
                

                // [mat[1][1], mat[1][c]] =
                // [mat[1][c],mat[1][1]];

                let temp = mat[0][1];
                mat[0][1] = mat[0][c];
                mat[0][c] = temp;

                temp = mat[1][1];
                mat[1][1] = mat[1][c];
                mat[1][c] = temp;

                temp = mat[2][1];
                mat[2][1] = mat[2][c];
                mat[2][c] = temp;

                steps.push({
                matrix: copyMatrix(mat),
                operation: `C2 \\leftrightarrow C${c + 1}`,
                });

                break;
            }
        }
    }

    if (mat[1][1] !== 1 && mat[1][1] !== 0) {
        const pivot = mat[1][1];

        mat[1] = mat[1].map(
            value => value / pivot
        );

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R2 \\to R2 / ${pivot}`,
        });
    }

    k = mat[2][1];
    if(k != 0){
        let minus = mat[1].map((value) => value*k);
        for(let i = 0; i < 3; i++){
            mat[2][i] -= minus[i];
        }

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R3 \\to R3 - ${k}*R2`,
        });

    }

    k = mat[1][2] ;
    if(k !== 0){
        mat[1][2] = 0;
        steps.push({
            matrix: copyMatrix(mat),
            operation: `C3 \\to C3 - ${k}*C2`,
        });
    }
    

    if (mat[2][2] !== 1 && mat[2][2] !== 0) {
        const pivot = mat[2][2];

        mat[2] = mat[2].map(
            value => value / pivot
        );

        steps.push({
            matrix: copyMatrix(mat),
            operation: `R3 \\to R3 / ${pivot}`,
        });
    }
  

  return {
    rank: findRank(mat),
    steps,
  };
}

export default rankSolver;