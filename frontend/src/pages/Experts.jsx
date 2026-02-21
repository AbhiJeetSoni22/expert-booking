import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Experts() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const { data } = await API.get("/experts");
      setExperts(data.experts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Expert Booking System
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div
            key={expert._id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{expert.name}</h3>
            <p className="text-gray-600">Category: {expert.category}</p>
            <p className="text-gray-600">
              Experience: {expert.experience} years
            </p>
            <p className="text-yellow-500 font-medium">
              ⭐ {expert.rating}
            </p>

            <Link to={`/expert/${expert._id}`}>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experts;