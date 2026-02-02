import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../app/userSlice/userSlice.js";

function User() {
  const dispatch = useDispatch();
  const { loading, status, message, users, error } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-blue-600 animate-pulse">
          Loading user data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">User Details</h1>

      <p className="text-sm text-center text-gray-500 mb-6">
        Status: <span className="font-medium">{status}</span>
      </p>

      {message && (
        <p className="text-center text-sm text-blue-600 mb-6">{message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">User ID</span>
                <span>{user.id}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Name</span>
                <span>{user.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Age</span>
                <span>{user.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
