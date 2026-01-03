import { useEffect, useState } from "react";

export default function TypedText({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // reset when text changes
    setDisplayed("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text) return;
    if (index >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, text, speed]);

  return <span>{displayed}</span>;
}

