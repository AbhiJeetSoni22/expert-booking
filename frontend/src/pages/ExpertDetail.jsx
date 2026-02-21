import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    fetchExpert();

    // 🔥 Listen real-time slot update
    socket.on("slotBooked", (data) => {
      if (data.expertId === id) {
        setExpert((prev) => {
          const updatedSlots = prev.slots.map((slot) =>
            slot.date === data.date && slot.time === data.time
              ? { ...slot, isBooked: true }
              : slot
          );
          return { ...prev, slots: updatedSlots };
        });
      }
    });

    return () => socket.off("slotBooked");
  }, [id]);

  const fetchExpert = async () => {
    const { data } = await API.get(`/experts/${id}`);
    setExpert(data);
  };

  if (!expert) return <div className="p-6">Loading...</div>;

  // Group slots by date
  const groupedSlots = expert.slots.reduce((acc, slot) => {
    acc[slot.date] = acc[slot.date] || [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-500">← Back</Link>

      <div className="bg-white p-6 rounded shadow mt-4">
        <h2 className="text-2xl font-bold">{expert.name}</h2>
        <p className="text-gray-600">Category: {expert.category}</p>
        <p className="text-gray-600">Experience: {expert.experience} years</p>

        <h3 className="text-xl font-semibold mt-6">Available Slots</h3>

        {Object.keys(groupedSlots).map((date) => (
          <div key={date} className="mt-4">
            <h4 className="font-medium">{date}</h4>
            <div className="flex flex-wrap gap-3 mt-2">
              {groupedSlots[date].map((slot, index) => (
                <Link
                  key={index}
                  to={`/booking/${expert._id}?date=${slot.date}&time=${slot.time}`}
                >
                  <button
                    disabled={slot.isBooked}
                    className={`px-4 py-2 rounded ${
                      slot.isBooked
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {slot.time}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertDetail;