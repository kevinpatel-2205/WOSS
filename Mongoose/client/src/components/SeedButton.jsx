import { useDispatch, useSelector } from "react-redux";
import { seedUsers } from "../features/users/userSlice";

const SeedButton = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.users
  );

  return (
    <div className="mb-6 text-center">
      <button
        onClick={() => dispatch(seedUsers())}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        {loading ? "Generating..." : "Generate 10,000 Users"}
      </button>

      {message && (
        <p className="text-green-600 mt-3 font-medium">{message}</p>
      )}

      {error && (
        <p className="text-red-600 mt-3 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SeedButton;
