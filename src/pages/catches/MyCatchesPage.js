import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Table } from "react-bootstrap";
import styles from "../../styles/MyCatchesPage.module.css";

function MyCatchesPage() {
  const [myCatches, setMyCatches] = useState([]);
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    const fetchMyCatches = async () => {
      try {
        if(currentUser && currentUser.profile_id) { // Checking if currentUser and profile_id are not null or undefined
          const response = await axiosReq.get(`/catches/?owner__profile=${currentUser.profile_id}`);
          setMyCatches(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching catches:", error);
      }
    };
    fetchMyCatches();
  }, [currentUser]);
  
  return (
    <div>
      <h1>My Catches</h1>
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
  );
}

export default MyCatchesPage;
