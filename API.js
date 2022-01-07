const express = require('express')

const server = express();

var score = 0;

var move = {
    0: "rock",
    1: "scissors",
    2: "paper"
}

var movenum = {
    "rock": 0,
    "scissors": 1,
    "paper": 2
}

var win = {
    0: "Tie/Loss",
    1: "Win"
}
var currentServermove = null;

var decision = [[0, 1, 0], [0, 0, 1], [1, 0, 0]]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var serverallmove="";

server.get('/',async (req,res)=>{
    res.redirect('/start');
})

server.get('/start', async (req, res) => {
    var response = {
        READY: true,
        token: move[getRandomInt(3)]
    }
    currentServermove = response.token;
    serverallmove+=currentServermove+"/";
    
    let usermove = 'rock';  
    let userwin = decision[movenum[usermove]][movenum[currentServermove]]; 
    score =score+ userwin
    console.log('score : ',score);
    if(score==3){
        res.redirect('/v1/token/rock')
    }else{
    res.send(response)
    }
}) 

server.get('/v1/token/rock', async (req, res) => {
    var response = {
        usermove: "rock",
        servermove: serverallmove,
        Total_Score: score
    }
    res.send(response)
})
 
