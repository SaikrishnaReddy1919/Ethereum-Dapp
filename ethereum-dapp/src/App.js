import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greetor from "./artifacts/contracts/Greeter.sol/Greeter.json"

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [greeting, setgreeting] = useState();

  async function requestAccount() {

  }

  async function fetchGreeting() {
    if(window.ethereum !== undefined){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greetor.abi, provider)
      try {
        const data = await contract.greet();
        console.log('Data : ', data)
      } catch (error) {
        console.log("Error : ", error)
      }
    }
  }

  async function setGreeting() {
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
