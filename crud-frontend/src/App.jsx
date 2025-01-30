import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CrudApp() {
  const [users, setUsers] = useState([]);
  const [startups, setStartups] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [startupName, setStartupName] = useState("");
  const [startupIndustry, setStartupIndustry] = useState("");
  const [startupFounder, setStartupFounder] = useState("");
  const [startupDate, setStartupDate] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchStartups();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUsers(response.data);
  };

  const fetchStartups = async () => {
    const response = await axios.get("http://localhost:3000/startups");
    setStartups(response.data);
  };

  const addUser = async () => {
    await axios.post("http://localhost:3000/users", {
      name: userName,
      email: userEmail,
      password: userPassword,
    });
    fetchUsers();
    setUserName("");
    setUserEmail("");
    setUserPassword("");
  };

  const addStartup = async () => {
    await axios.post("http://localhost:3000/startups", {
      name: startupName,
      industry: startupIndustry,
      founder: startupFounder,
      foundedDate: startupDate,
    });
    fetchStartups();
    setStartupName("");
    setStartupIndustry("");
    setStartupFounder("");
    setStartupDate("");
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-primary mb-4">Statup One - SparkHub</h1>
      
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "800px" }}>
        <h2 className="mb-3 text-success">Add User</h2>
        <input className="form-control mb-2" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <input className="form-control mb-2" placeholder="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
        <button className="btn btn-success" onClick={addUser}>Add User</button>
      </div>

      <div className="card p-4 shadow-lg w-100 mt-4" style={{ maxWidth: "800px" }}>
        <h2 className="text-info">Users List</h2>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id} className="list-group-item bg-light border-primary">{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>

      <div className="card p-4 shadow-lg w-100 mt-5" style={{ maxWidth: "800px" }}>
        <h2 className="mb-3 text-danger">Add Startup</h2>
        <input className="form-control mb-2" placeholder="Name" value={startupName} onChange={(e) => setStartupName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Industry" value={startupIndustry} onChange={(e) => setStartupIndustry(e.target.value)} />
        <input className="form-control mb-2" placeholder="Founder" value={startupFounder} onChange={(e) => setStartupFounder(e.target.value)} />
        <input className="form-control mb-2" placeholder="Founded Date" type="date" value={startupDate} onChange={(e) => setStartupDate(e.target.value)} />
        <button className="btn btn-danger" onClick={addStartup}>Add Startup</button>
      </div>

      <div className="card p-4 shadow-lg w-100 mt-4" style={{ maxWidth: "800px" }}>
        <h2 className="text-warning">Startups List</h2>
        <ul className="list-group">
          {startups.map((startup) => (
            <li key={startup._id} className="list-group-item bg-light border-warning">{startup.name} - {startup.industry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
