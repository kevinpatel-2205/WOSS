const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Welcome to Leave Management System
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Easily apply, track, and manage your leave requests in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">
              Apply Leave
            </h3>
            <p className="text-sm text-gray-600">
              Submit leave requests by selecting start and end dates.
            </p>
          </div>

          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">
              Track Status
            </h3>
            <p className="text-sm text-gray-600">
              View approval status and leave breakdown instantly.
            </p>
          </div>

          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">
              Leave Balance
            </h3>
            <p className="text-sm text-gray-600">
              Casual and paid leave are calculated automatically.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Total Casual Leave per Year: <span className="font-medium">12 days</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;