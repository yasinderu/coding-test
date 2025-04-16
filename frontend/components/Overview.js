import styles from "../styles/Styles.module.css";

export default function Overview({ salesReps, dealsSummary, totalSales }) {
  return (
    <section className={styles.cards}>
      <div className={styles.card}>
        <h3>Total Sales Reps</h3>
        <p>{salesReps.length}</p>
      </div>
      <div className={styles.card}>
        <h3>Total Deal Value (Closed Won & In Progress)</h3>
        <p>${totalSales}</p>
      </div>
      <div className={styles.card}>
        <h3>Deals Summary</h3>
        <p>
          Won: {dealsSummary?.closed_won} / In Progress:{" "}
          {dealsSummary?.in_progress} / Lost: {dealsSummary?.closed_lost}
        </p>
      </div>
      <div className={styles.card}>
        <h3>Top Performer</h3>
        <p>{salesReps[0]?.name}</p>
      </div>
    </section>
  );
}
