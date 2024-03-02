import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Table } from "react-bootstrap";

function MyCatchesPage() {
  const [myCatches, setMyCatches] = useState([]);
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    const fetchMyCatches = async () => {
      try {
        const response = await axiosReq.get(`/catches/?owner__profile=${currentUser.profile_id}`);
        setMyCatches(response.data.results);
      } catch (error) {
        console.error("Error fetching catches:", error);
      }
    };
    fetchMyCatches();
  }, [currentUser.profile_id]);
  
  return (
    <div>
      <h1>My Catches</h1>
      <Table striped bordered hover>
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
              <td>{index + 1}</td>
              <td>{catchItem.created_at}</td>
              <td>{catchItem.location}</td>
              <td>{catchItem.species}</td>
              <td>{catchItem.method}</td>
              <td>{catchItem.weight}</td>
              <td>{catchItem.length}</td>
              <td>{catchItem.time}</td>
              <td>{catchItem.weather}</td>
              <td>{catchItem.lure}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyCatchesPage;
