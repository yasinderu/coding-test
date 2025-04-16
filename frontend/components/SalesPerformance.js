import styles from "../styles/Styles.module.css";

export default function SalesPerformance({ salesReps }) {
  return (
    <section className={styles.tableContainer}>
      <h3>Sales Rep Performance</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Region</th>
            <th>Total Deals</th>
            <th>Closed Won & In Progress</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {salesReps.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.region}</td>
              <td>{item.deals.length}</td>
              <td>${item.total_deals}</td>
              <td>
                <div className={styles.skillTags}>
                  {item.skills.map((skill, skillIndex) => (
                    <span key={skillIndex}>{skill}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {/* Add more rows */}
        </tbody>
      </table>
    </section>
  );
}
