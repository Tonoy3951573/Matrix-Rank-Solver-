function InputMatrix({ matrix, handleChange }) {
  const N = matrix.length;
  return (
    <div className="matrix">
      <div
        className="input-shell"
        style={{
          gridTemplateColumns: `repeat(${N}, minmax(30px, 50px))`,
          justifyContent: "center",
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              value={value}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
              className="mat-input"
              placeholder="0"
              style={{ width: "100%" }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default InputMatrix;