// ===== UI Features ===== //
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁" : "🙈";
});

const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  darkToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀";
});

// ===== Blockchain Integration ===== //
const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "governmentID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "CitizenRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_governmentID",
				"type": "string"
			}
		],
		"name": "registerCitizen",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "citizens",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "governmentID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "governmentID",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct GovChain.CitizenInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "governmentID",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct GovChain.CitizenInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let govChain;

async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    govChain = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Install MetaMask to interact with the blockchain.");
  }
}

initWeb3(); // initialize on load

// ===== Signup Form Submission ===== //
const form = document.getElementById("signupForm");
const errorDiv = document.getElementById("formError");

form.addEventListener("submit", async (e) => {
  errorDiv.textContent = "";

  const email = form.email.value.trim();
  const password = form.password.value;
  const aadhar = form.aadhar.value.trim();
  const name = form.name.value.trim();

  if (!email.includes("@")) {
    e.preventDefault();
    errorDiv.textContent = "Please enter a valid email.";
    return;
  }
  if (password.length <= 5) {
    e.preventDefault();
    errorDiv.textContent = "Password must be at least 5 characters.";
    return;
  }
  if (!/^\d{12}$/.test(aadhar)) {
    e.preventDefault();
    errorDiv.textContent = "Enter a valid 12-digit Aadhar number.";
    return;
  }

  // === Save name + Aadhar to Blockchain ===
  try {
    const accounts = await web3.eth.getAccounts();
    await govChain.methods.registerCitizen(name, aadhar).send({ from: accounts[0] });

    console.log("Stored on blockchain");
  } catch (err) {
    e.preventDefault(); // cancel normal form submission
    console.error("Blockchain Error:", err);
    errorDiv.textContent = "Blockchain error: " + err.message;
  }
});
