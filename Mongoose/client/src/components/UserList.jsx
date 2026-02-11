import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";

const UserList = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading,
    currentPage,
    totalPages,
    error,
  } = useSelector((state) => state.users);

  const limit = 10;

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit }));
  }, [dispatch]);


  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchUsers({ page: currentPage - 1, limit }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchUsers({ page: currentPage + 1, limit }));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Users List
      </h1>

      {loading && (
        <p className="text-center text-blue-600 font-medium">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium">
          {error}
        </p>
      )}

      {!loading && users.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Age</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-2">
                      {user.role}
                    </td>
                    <td className="px-4 py-2">
                      {user.age}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
