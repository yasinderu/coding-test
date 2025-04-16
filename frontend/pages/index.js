import { useState, useEffect } from "react";

import SalesPerformance from "../components/SalesPerformance";
import Overview from "../components/Overview";
import Charts from "../components/Charts";
import AI from "../components/AI";

import styles from "../styles/Styles.module.css";

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientDealsLoading, setClientDealsLoading] = useState(true);
  const [clientDeals, setClientDeals] = useState([]);
  const [deals, setDeals] = useState({});
  const [dealsLoading, setDealsLoading] = useState(true);
  const [regionalDeals, setRegionalDeals] = useState([]);
  const [regionalDealsLoading, setRegionalDealsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/sales-reps?sort=desc")
      .then((res) => res.json())
      .then((data) => {
        setSalesReps(data.data || []);
        setTotalSales(data.total_sales);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/top-clients?sort=desc")
      .then((res) => res.json())
      .then((data) => {
        setClientDeals(data || []);
        setClientDealsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setClientDealsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/deals")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data || {});
        setDealsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setDealsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/regional-deals")
      .then((res) => res.json())
      .then((data) => {
        setRegionalDeals(data || {});
        setRegionalDealsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setRegionalDealsLoading(false);
      });
  }, []);

  return (
    <div className={styles.dashboard}>
      {loading || dealsLoading || clientDealsLoading || regionalDealsLoading ? (
        <p>Loading...</p>
      ) : (
        <main className={styles.mainContent}>
          <Overview
            salesReps={salesReps}
            dealsSummary={deals.summary}
            totalSales={totalSales}
          />
          <SalesPerformance salesReps={salesReps} />
          <Charts regionalDeals={regionalDeals} clientDeals={clientDeals} />
          <AI />
        </main>
      )}
    </div>
  );
}
