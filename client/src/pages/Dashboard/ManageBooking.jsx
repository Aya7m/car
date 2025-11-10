import React, { useEffect, useState } from "react";

import Title from "../../components/Dashboard/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBooking = () => {
  const { axios, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner");
      console.log("data",data);
      
      if (data.success) {
        setBookings(data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title={"Manage Bookings"}
        subTitle={
          "Track all customer bookings, approve or cancel requests, and manage booking statuses"
        }
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-sm text-left text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={booking.car.image}
                    alt="car"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {booking.car.brand} . {booking.car.model}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">
                  {booking?.pickupDate?.split("T")[0]} to{" "}
                  {booking?.returnDate?.split("T")[0]}
                </td>

                <td className="p-3">
                  {currency}
                  {booking.price}/day
                </td>

                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                    Offline
                  </span>
                </td>

                <td className=" p-3">
                  {booking.status === "pending" ? (
                    <select
                     
                      value={booking.status}
                       onChange={(e) =>
                        changeBookingStatus(booking._id, e.target.value)
                      }
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">cancelled</option>
                      <option value="confirmed">confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
