import { useState } from "react";

import styles from "../styles/Styles.module.css";

export default function AI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleAskQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };
  return (
    <section className={styles.card}>
      <h2>Ask a Question (AI Endpoint)</h2>
      <div className={styles.formContainer}>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className={styles.formButton} onClick={handleAskQuestion}>
          Ask
        </button>
      </div>
      {answer && (
        <div style={{ marginTop: "1rem" }}>
          <strong>AI Response:</strong> {answer}
        </div>
      )}
    </section>
  );
}
