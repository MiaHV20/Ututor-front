import { useState, useEffect } from "react";
import Header2 from "../UtutorDash/Contexts/Header2";
import Services from "../UtutorDash/Contexts/Services";
import { getUser } from "../api";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      getUser(userId)
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error al cargar usuario", err));
    }
  }, []);

  return (
    <>
      <Header2 username={userData ? userData.nombre : ""} />
      <Services />
    </>
  );
}