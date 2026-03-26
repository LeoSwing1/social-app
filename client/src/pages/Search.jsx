import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(
      `http://localhost:5000/api/users/search?q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: 10 }}>
      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {results.map(user => (
        <p key={user._id}>{user.name}</p>
      ))}
    </div>
  );
}