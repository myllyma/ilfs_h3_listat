import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/left_strings')
      .then((response) => {
        setLeftList(response.data);
      });

    axios
      .get('http://localhost:3001/right_strings')
      .then((response) => {
        setRightList(response.data);
      });
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
