function InputMatrix({matrix, handleChange}){

return(
    <div className="matrix">
            <div className="input-shell">
              {matrix.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                  <input
                    key={`${rowIndex}-${colIndex}`}
                    value={value}
                    onChange={(e) =>
                      handleChange(rowIndex, colIndex, e.target.value)
                    }
                    className="mat-input"
                  />
                )),
              )}
            </div>
          </div>
)


}

export default InputMatrix;