import {useState, useEffect} from "react";
import axios from 'axios';
import './App.css';

function App() {

  const [user, setUser] = useState({ name: '', email: '' });

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const userData = response.data.results[0];
      const { name, email } = userData;
      setUser({ name: `${name.title}.${name.first} ${name.last}`, email });
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const { name, email } = userData;
      setUser({ name: `${name.title}.${name.first} ${name.last}`, email });
    } else {
      fetchUserData();
    }
  }, []);

  const handleRefresh = () => {
    fetchUserData();
  };
  return (
    <div className="App">
      <p>
        <strong>Full Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}


export default App;
