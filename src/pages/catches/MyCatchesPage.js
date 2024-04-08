import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Table } from "react-bootstrap";
import styles from "../../styles/MyCatchesPage.module.css";
import MyCatchesChart from "../../components/MyCatchesChart";
import Button from "../../components/Button";

function MyCatchesPage() {
  const [myCatches, setMyCatches] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchMyCatches = async () => {
      if (currentUser && currentUser.profile_id) {
        let allCatches = [];
        let hasNextPage = true;
        let currentPage = 1;

        try {
          while (hasNextPage) {
            const response = await axiosReq.get(`/catches/?owner__profile=${currentUser.profile_id}&page=${currentPage}`);
            allCatches = [...allCatches, ...response.data.results];
            hasNextPage = response.data.next !== null;
            currentPage++;
          }

          setMyCatches(allCatches);

          // Process to extract unique years from the fetched catches
          const uniqueYears = Array.from(new Set(allCatches.map(item => new Date(item.created_at).getFullYear()))).sort((a, b) => b - a);
          setYears(uniqueYears);
          if (uniqueYears.length > 0) {
            setSelectedYear(uniqueYears[0]); // Default to the most recent year
          }
        } catch (error) {
          console.error("Error fetching catches:", error);
        }
      }
    };

    fetchMyCatches();
  }, [currentUser]);

  // Filter catches by selected year
  const catchesForSelectedYear = myCatches.filter(catchItem => new Date(catchItem.created_at).getFullYear() === selectedYear);

  return (
    <div>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Your Catches Over Time</div>
        <div className={styles.chartDescription}>
          This chart displays the number of catches recorded per month, allowing you to visualize trends over time.
        </div>
        <div className={styles.buttonGroup}>
          {years.map(year => (
            <Button
              key={year}
              label={year}
              additionalClasses={selectedYear === year ? styles.activeButton : ""}
              handleClick={() => setSelectedYear(year)}
            />
          ))}
        </div>
        <MyCatchesChart myCatches={catchesForSelectedYear} />
      </div>
      <div>
        <div className={styles.tableTitle}>Catches Details</div>
        <div className={styles.tableDescription}>
          Below is a detailed table of your catches, including date, location, species, and more.
        </div>
        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Location</th>
              <th>Species</th>
              <th>Method</th>
              <th>Weight</th>
              <th>Length</th>
              <th>Time</th>
              <th>Weather</th>
              <th>Lure</th>
            </tr>
          </thead>
          <tbody>
            {myCatches.map((catchItem, index) => (
            <tr key={catchItem.id}>
              <td data-label="#">{index + 1}</td>
              <td data-label="Date">{catchItem.created_at}</td>
              <td data-label="Location">{catchItem.location}</td>
              <td data-label="Species">{catchItem.species}</td>
              <td data-label="Method">{catchItem.method}</td>
              <td data-label="Weight">{catchItem.weight}</td>
              <td data-label="Length">{catchItem.length}</td>
              <td data-label="Time">{catchItem.time}</td>
              <td data-label="Weather">{catchItem.weather}</td>
              <td data-label="Lure">{catchItem.lure}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MyCatchesPage;
