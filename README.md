# Matrix Rank Determiner

A web-based interactive tool for calculating the rank of matrices with step-by-step solutions. Built with React and Vite for fast performance and responsive user experience.

## Features

- **Interactive Matrix Input**: Create and edit matrices of various sizes (dynamically configurable)
- **Rank Calculation**: Automatically calculates the rank of the input matrix
- **Step-by-Step Solutions**: View detailed steps showing the matrix transformations and calculations
- **Mathematical Rendering**: Beautiful mathematical notation using KaTeX for clear presentation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Computation**: Instant calculations as you modify your matrix

## Project Structure

```
src/
├── Components/
│   ├── InputMatrix.jsx      # Matrix input component
│   ├── MatrixCard.jsx       # Matrix display card component
│   └── MathBlock.jsx        # Mathematical rendering component
├── Utility/
│   ├── RankSolver.js        # Original rank calculation algorithm
│   └── BetterRankSolver.js  # Optimized rank calculation algorithm
├── App.jsx                  # Main application component
├── App.css                  # Application styles
├── index.css                # Global styles
└── main.jsx                 # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tonoy3951573/Matrix-Rank-Solver-.git
cd MatrixRankDeterminer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

## Usage

1. **Enter Matrix Values**: Input numerical values into the matrix cells
2. **Adjust Matrix Size**: Use the dimension controls to change the matrix size
3. **Calculate Rank**: Click the "Calculate" button to compute the rank
4. **View Steps**: See the detailed step-by-step solution showing all transformations

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **KaTeX** - Mathematical notation rendering
- **React-KaTeX** - React wrapper for KaTeX
- **ESLint** - Code quality tool

## Algorithms

### Matrix Rank Solver

The application includes two solver implementations:

- **RankSolver.js** - Original implementation using Gaussian elimination
- **BetterRankSolver.js** - Optimized version with improved handling of fractions and numerical stability

Both algorithms compute the rank by reducing the matrix to row echelon form and counting the non-zero rows.

## Deployment

This project is deployed on GitHub Pages. To deploy your changes:

```bash
npm run deploy
```

Visit the live application: [Matrix Rank Solver](https://tonoy3951573.github.io/Matrix-Rank-Solver-/)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Tonoy3951573** - [GitHub Profile](https://github.com/Tonoy3951573)
