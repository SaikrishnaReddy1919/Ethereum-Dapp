import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greetor from "./artifacts/contracts/Greeter.sol/Greeter.json"

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [greeting, setGreetingValue] = useState('');

  async function requestAccount() {
    await window.ethereum.request({method : "eth_requestAccounts"})
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
    if(!greeting) return
    if(window.ethereum !== undefined){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greetor.abi, signer)
      const txn = await contract.setGreeting(greeting)
      setGreetingValue('')
      await txn.wait()
      fetchGreeting()
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>

        <input
        onChange={e => setGreetingValue(e.target.value)}
         placeholder="set greeting"
         value={greeting}></input>
      </header>
    </div>
  );
}

export default App;
