import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "../styles/Styles.module.css";

const COLORS_TOTAL_CLIENTS = [
  "#6366F1",
  "#22D3EE",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];
const COLORS_TOTAL_DEALS = [
  "#F87171",
  "#34D399",
  "#A78BFA",
  "#60A5FA",
  "#FBBF24",
];

export default function Charts({ clientDeals, regionalDeals }) {
  return (
    <section className={styles.flexSection}>
      <div className={styles.chartBox}>
        <h3>Deals by Client (Closed Won)</h3>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientDeals}
                dataKey="value"
                nameKey="client"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {clientDeals?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS_TOTAL_CLIENTS[index % COLORS_TOTAL_CLIENTS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.chartBox}>
        <h3>Deals by Region (Closed Won)</h3>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionalDeals}
                dataKey="value"
                nameKey="region"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {regionalDeals.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_TOTAL_DEALS[index % COLORS_TOTAL_DEALS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
