// import React, { useContext } from "react";
// import { Context } from "../main";
// import Loader from "../components/Loader";
// import { Navigate } from "react-router-dom";

// const Profile = () => {
//   const { isAuthenticated, loading, user } = useContext(Context);

//   if (!isAuthenticated) return <Navigate to={"/login"} />;
  
//   // console.log({user});

//   return loading ? (
//     <Loader />
//   ) : (
//     <div>
//       <h1>{user?.name}</h1>
//       <p>{user?.email}</p>


//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useState, useEffect } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  const [quote, setQuote] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuote(response.data.content);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  
  return (
    <div style={{ padding: "20px" }}>
      {loading || loadingQuote ? (
        <Loader />
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ marginBottom: "10px" }}>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
          <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
            <h2>Quote of the Day:</h2>
            <p>{quote}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
