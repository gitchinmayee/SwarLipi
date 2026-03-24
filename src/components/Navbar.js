import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h3>Music Notation App</h3>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
