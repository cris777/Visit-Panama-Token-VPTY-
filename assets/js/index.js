// first detect if window.ethereum is there
// render app
// else
// detect if mobile device

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

// open the deeplink page 
window.open("https://metamask.app.link/dapp/vpty.finthub.org/dashboard.html")

} else {

// install metamask message

}

// Create global userWalletAddress variable
window.userWalletAddress = null;

// when the browser is ready
window.onload = async (event) => {
  // check if ethereum extension is installed
  if (window.ethereum) {
    // create web3 instance
    window.web3 = new Web3(window.ethereum);
  } else {
    // prompt user to install Metamask
    alert("Please install MetaMask or any Ethereum Extension Wallet");
  }

  // check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

  // show the user dashboard
  showUserDashboard();
};

// Web3 login function
const loginWithEth = async () => {
  // check if there is global window.web3 instance
  if (window.web3) {
    try {
      // get the user's ethereum account - prompts metamask to login
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          // if the user cancels the login prompt
          throw Error("Please select an account");
        });

      // set the global userWalletAddress variable to selected account
      window.userWalletAddress = selectedAccount;

      // store the user's wallet address in local storage
      window.localStorage.setItem("userWalletAddress", selectedAccount);

      // show the user dashboard
      showUserDashboard();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("Wallet not found");
  }
};

// function to show the user dashboard
const showUserDashboard = async () => {
  // if the user is not logged in - userWalletAddress is null
  if (!window.userWalletAddress) {
    // change the page title
    document.title = "Visit Panama Token 2025";

    // show the login section
    document.querySelector(".login-section").style.display = "flex";

    // hide the user dashboard section
    document.querySelector(".dashboard-section").style.display = "none";

    // return from the function
    return false;
  }

  // change the page title
  document.title = "Dashboard VPTY";

  // hide the login section
  document.querySelector(".login-section").style.display = "none";

  // show the dashboard section
  document.querySelector(".dashboard-section").style.display = "flex";

  // show the user's wallet address
  showUserWalletAddress();

  // get the user's wallet balance
  getWalletBalance();
};

// show the user's wallet address from the global userWalletAddress variable
const showUserWalletAddress = () => {
  const walletAddressEl = document.querySelector(".wallet-address");
  walletAddressEl.innerHTML = window.userWalletAddress;
};

// get the user's wallet balance
const getWalletBalance = async () => {
  // check if there is global userWalletAddress variable
  if (!window.userWalletAddress) {
    return false;
  }

  // get the user's wallet balance
  const balance = await window.web3.eth.getBalance(window.userWalletAddress);

  // convert the balance to ether
  document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
    balance,
    "ether"
  );
};

// web3 logout function
const logout = () => {
  // set the global userWalletAddress variable to null
  window.userWalletAddress = null;

  // remove the user's wallet address from local storage
  window.localStorage.removeItem("userWalletAddress");

  // show the user dashboard
  showUserDashboard();
};

// when the user clicks the login button run the loginWithEth function
document.querySelector(".login-btn").addEventListener("click", loginWithEth);

// when the user clicks the logout button run the logout function
document.querySelector(".logout-btn").addEventListener("click", logout);


const ethereumButton = document.querySelector(".enableEthereumButton");
const sendEthButton = document.querySelector(".sendEthButton");

let accounts = [];

sendEthButton.addEventListener("click", () => {
  provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0], // The user's active address.
          to: "0x98927156854D38bffEbA0e53feAA0996495f89bC920000000000000000", // Address of the recipient. Not used in contract creation transactions.
          value: "0x0", // Value transferred, in wei. Only required to send ether to the recipient from the initiating external account.
          gasLimit: "0x5028", // Customizable by the user during MetaMask confirmation.
          maxPriorityFeePerGas: "0x3b9aca00", // Customizable by the user during MetaMask confirmation.
          maxFeePerGas: "0x2540be400", // Customizable by the user during MetaMask confirmation.
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error(error));
});

ethereumButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  accounts = await provider // Or window.ethereum if you don't support EIP-6963.
    .request({ method: "eth_requestAccounts" });
}
