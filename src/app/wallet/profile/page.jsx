"use client";

import { useState, useEffect } from "react";
import db from "../../../appwrite/database";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await db.users.list();
        setUsers(response.documents);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Profiles</h1>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.$id}>
              <h2>{user.name}</h2>
              <p>{user.phoneNumber}</p>
              <p>{user.bankAddress}</p>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
