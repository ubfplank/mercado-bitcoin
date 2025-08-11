require("dotenv").config();
const axios = require("axios");
const WebSocket = require("ws");

let access_token = null;

login()

// ETAPA 1
// MONITORAR O MERCADO

// ETAPA 2 
// AUTENTICAR NA API
async function login() {
    const url = 'https://api.mercadobitcoin.net/api/v4/authorize';
    const body = { login: process.env.API_KEY, password: process.env.API_SECRET };

    const { data } = await axios.post(url, body);
    console.log("Acesso autorizado !");
    setTimeout(login, (data.expiration * 1000) - Date.now());
    access_token = data.access_token;
}

async function getAccountId() {
    const url = 'https://api.mercadobitcoin.net/api/v4/account';
    const headers = { Authorization: `Bearer ${access_token}` };
    const { data } = await axios.get(url, { headers });

    console.log(data);
    process.exit(0);
}

// ETAPA 3
// ENVIAR ORDENS
const ws = new WebSocket("wss://ws.mercadobitcoin.net/ws");

ws.onopen = () => {
    ws.send(JSON.stringify({
        type: "subscribe",
        subscription: {
            name: "ticker",
            id: "" + process.env.STREAM_ID
        }
    }));

    ws.onmessage = (evt) => {
        console.clear();
        console.log(evt.data);
    };
};
//side= buy or sell
async function newOrder(side    
    const url = `https://api.mercadobitcoin.net/api/v4/accounts/${process.env.ACCOUNT_ID}/${process.env.symbol}/orders`;
    const body = {
        qty:process.env.BUY_QTY,
        side,
        type:"market"

    }
const headers = { Authorization: `Bearer ${access_token}` };
  try{
const { data } = await axios.post(url, body, { headers });
    console.log(data);  
  }
  catch(err){
    console.error(err.response.? err.response.data : err.message);
    process.exit(0);
    
  )
    }    
}