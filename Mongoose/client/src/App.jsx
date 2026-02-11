import SeedButton from "./components/SeedButton";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Faker User Generator
      </h1>

      <SeedButton />
      <UserList />
    </div>
  );
}

export default App;
