import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greetor from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

function App() {
  const [greeting, setGreetingValue] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [otherUserAccount, setOtherUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greetor.abi, provider);
      try {
        const data = await contract.greet();
        console.log("Data : ", data);
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greetor.abi, signer);
      const txn = await contract.setGreeting(greeting);
      setGreetingValue("");
      await txn.wait();
      fetchGreeting();
    }
  }

  async function getBalance() {
    if (window.ethereum !== undefined) {
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);

      console.log(`Balance of ${account} : `, balance.toString());
    }
  }

  async function getOtherAccountBalance() {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(otherUserAccount);

      console.log(`Balance of ${otherUserAccount} : `, balance.toString());
    }
  }

  async function sendTokens() {
    if (window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const txn = await contract.transfer(userAccount, amount);
      await txn.wait()
      console.log(`Amount ${amount} successfully transferred to ${userAccount}`);
    }
  }
  return (
    <div className="App">
      <h4>Values will be printed on console.</h4>
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>

        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="set greeting"
          value={greeting}
        ></input>

        <br></br>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendTokens}>Send Tokens</button>

        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
          value={userAccount}
        ></input>
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          value={amount}
        ></input>

        <br></br>
        <button onClick={getOtherAccountBalance}>Get Balance of Others</button>
        <input
          onChange={(e) => setOtherUserAccount(e.target.value)}
          placeholder="User Account ID"
          value={otherUserAccount}
        ></input>
      </header>
    </div>
  );
}

export default App;
