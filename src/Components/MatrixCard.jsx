import MathBlock from "./MathBlock";

function MatrixCard({ matrix, sideNote = "" }) {
  if (!matrix?.length) return null;

  const latex = `
    \\begin{bmatrix}
    ${matrix
      .map((row) =>
        row.map((v) => (v === "" ? "0" : v)).join(" & ")
      )
      .join(" \\\\ ")}
    \\end{bmatrix}
  `;

  return (
    <div className="result-mat">
      <MathBlock latex={latex}/>

      {sideNote && (
        <div className="side-note">
            <div className="side-note">
                [ <MathBlock latex={sideNote}/> ]
            </div>
        </div>
      )}
    </div>
  );
}

export default MatrixCard;