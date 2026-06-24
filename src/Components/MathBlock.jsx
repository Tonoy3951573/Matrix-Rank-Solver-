import katex from "katex";
import "katex/dist/katex.min.css";

export default function MathBlock({ latex }) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}