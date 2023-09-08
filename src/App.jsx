import { useState } from 'react'

import './App.css'
import CauseRetard from "../src/components/CauseRetard";
import Journee from './components/Journee';
function App() {
  const [retards, setRetards] = useState(null); // State to store the parsed data

  // Function to update the parsed data in the state
  const updateRetards = (data) => {
    setRetards(data);
  };
  
  
  return (
    <>
    <h3>vols retardes</h3>
      <CauseRetard fetchRetards={updateRetards} />
      {retards && (
        <div>
          <h2>Parsed Data:</h2>
          <pre>{JSON.stringify(retards, null, 2)}</pre>
        </div>
      )}
      <h3>Journee</h3>
      <Journee />
    </>
  )
}

export default App
