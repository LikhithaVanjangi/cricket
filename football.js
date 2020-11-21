var possibleRuns = [1,2,3,4,5,6]; 

var team1= {
    name:'CSK',
    runs: [],
    score: 0
};
var team2= {
    name:'RCB',
    runs: [],
    score: 0
};

var turn;

window.onload = ()=>{
    selectTurn(); 
    updateButtonText();
    updateScore(); 
    updateNames(); 
}
// Function to decide who bats
var selectTurn = ()=>{
    turn = Math.round(Math.random())+1;
    console.log(turn);
}

var updateButtonText = ()=>{
    var button = document.getElementById("strike-button");
    console.log(button);
    var result = document.getElementById("result");
    result.style.visibility = "";
    // check if the game is over 
    if(team1.runs.length == 6 && team2.runs.length == 6){
        button.remove(); //delete the strike button
        // check if match is draw
        result.textContent = team1.score === team2.score? `It is a draw`:`${team1.score>team2.score?team1.name:team2.name} Wins`;
    }else{
        // check if the strike is over
        turn = team1.runs.length === 6? 2: team2.runs.length === 6?1 : turn;
        button.textContent = `Strike (${turn===1?team1.name:team2.name})`;
    }
   

}
// function to update the team score
var updateScore =()=>{
    //update the team1 score
    document.getElementById("team-1-score").textContent = team1.score;
     //update the team2 score
     document.getElementById("team-2-score").textContent = team2.score;
     updateRuns();
}

var updateRuns=()=>{
var teamOneRunsElement = document.getElementById("team-1-round-runs").children;
var teamTwoRunsElement = document.getElementById("team-2-round-runs").children;
team1.runs.forEach((run,index)=>{
    teamOneRunsElement[index].textContent = run;
});
team2.runs.forEach((run,index)=>{
    teamTwoRunsElement[index].textContent = run;
});
}

// function to update team names
var updateNames=()=>{
    document.getElementById("team-1-name").textContent = team1.name;
    document.getElementById("team-2-name").textContent = team2.name;
}

var handleStrikeButtonClick = ()=>{
    // select a random run from list of possible runs
    var run = possibleRuns[Math.floor(Math.random()*possibleRuns.length)];
  //  console.log(run);
    run = run === 5? '5':run;
    console.log(run);
    if(turn ===1){
        team1.runs.push(run); // update runs
        team1.score = calculateScore(team1.runs);
        console.log(team1.score);
    }
    else{
        team2.runs.push(run); // update runs
        team2.score = calculateScore(team2.runs);
        console.log(team2.score);
    }
    updateButtonText();
    updateScore();

}
var calculateScore = (runs)=>{
    // whenever you get W , let's assume the score to be 0
    return runs.map(run=>{
        return run == "5"?5:run;
    }).reduce((total,run)=>total+run,0);
};