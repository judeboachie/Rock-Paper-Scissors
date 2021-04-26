let playerName = "Bob"; // by default
        let userMove = "Rock"; // by default
        let botMove = "Rock"; // by default
        let userScore = 0;
        let botScore = 0;
        let userWinnings = 0;
        let botWinnings = 0;

        
               
        const choices = ["Rock", "Paper", "Scissors"];

        // Input elements
        const submitButton = document.getElementById("addName");
        const inputBox = document.getElementById("input");

        // Button elements
        const rockButton = document.getElementById("rock");
        const paperButton = document.getElementById("paper");
        const scissorsButton = document.getElementById("scissors");
        const restartButton = document.getElementById("restart");

        // Image elements
        const rockImage = document.getElementById("rock-image");
        const paperImage = document.getElementById("paper-image");
        const scissorsImage = document.getElementById("scissors-image");

        // Text elements
        const resultTextElement = document.getElementById("result");
        const userScoreboard = document.getElementById("userScoreboard");
        const botScoreboard = document.getElementById("botScoreboard");
        const playAgain = document.getElementById("playAgainText");
        const totalWinnings = document.getElementById("totalWinnings");


        // Takes in the user's name
        function addName() {
            const input = document.getElementById("input").value;
            if (input !== "") {
                playerName = input;
            }
            submitButton.style.display = "none";
            inputBox.style.display = "none";

            drawUI();
        }

        // Reveals the rock/paper/scissors buttons and hides the input field... called be addName()
        function drawUI(){
            let title = document.getElementById("title");
            title.style.display = "none";
            rockButton.style.display = "inline";
            paperButton.style.display = "inline";
            scissorsButton.style.display = "inline";
            restartButton.style.display = "inline";

            rockImage.style.display = "inline";
            paperImage.style.display = "inline";
            scissorsImage.style.display = "inline";
        }
        
        
        // Keep track of what the user selected and update the UI
        function selection(choice) {
            userMove = choice;
            // Bot's move
            botMakeMove();
            keepScore(getResult());
            animateResult();
            displayText();
        }
        
        // Gives back what the bot's move is
        function botMakeMove() {
            // rounds the random value to a whole number
            botMove = choices[Math.floor(Math.random() * 3)] // Randomly selects index 0, 1, or 2
        }

        // Figure out who wins... called by selection(choice)
        function getResult() {
            if (userMove == "Rock") {
                if (botMove == "Rock") {
                    return "Draw!";
                } else if (botMove == "Paper") {
                    return "You lose!";
                } else {
                    return "You win!";
                }

            } else if (userMove == "Paper") {
                if (botMove == "Rock") {
                    return "You win!"
                } else if (botMove == "Paper") {
                    return "Draw!";
                } else {
                    return "You lose!";
                }

            } else {
                if (botMove == "Rock") {
                    return "You lose!";
                } else if (botMove == "Paper") {
                    return "You win!";
                } else {
                    return "Draw!";
                }                
            }
        }
        
        // Displays who chose what as well as the score...called by selection(choice)
        function displayText() {
            resultTextElement.innerHTML = "";

            let description = document.createElement("p");
            description.innerHTML = `${playerName} picked ${userMove} and BOT picked ${botMove}`;
            
            let resultElement = document.createElement("p");
            resultElement.innerHTML = getResult();
            
            resultTextElement.appendChild(description);
            resultTextElement.appendChild(resultElement);

            userScoreboard.innerHTML = `${playerName.toUpperCase()}: ${userScore}`;
            botScoreboard.innerHTML = `BOT: ${botScore}`;
        }

        // Highlights images based on the results of the match... called by selection(choice)
        function animateResult(){
            if(userMove == "Rock"){
                if(getResult() == "You win!"){
                    rockImage.style.animation = "winAnimation 1s"
                } else if (getResult() == "You lose!"){
                    rockImage.style.animation = "loseAnimation 1s"
                } else {
                    rockImage.style.animation = "drawAnimation 1s"
                }
            }
            if(userMove == "Paper"){
                if(getResult() == "You win!"){
                    paperImage.style.animation = "winAnimation 1s"
                } else if (getResult() == "You lose!"){
                    paperImage.style.animation = "loseAnimation 1s"
                } else {
                    paperImage.style.animation = "drawAnimation 1s"
                }
            }
            if(userMove == "Scissors"){
                if(getResult() == "You win!"){
                    scissorsImage.style.animation = "winAnimation 1s"
                } else if (getResult() == "You lose!"){
                    scissorsImage.style.animation = "loseAnimation 1s"
                } else {
                    scissorsImage.style.animation = "drawAnimation 1s"
                }
            }
        }
        
        // Updates the score... called by selection(choice)
        function keepScore(){
            if(getResult() == "You win!"){
                userScore += 1;
            } else if (getResult() == "You lose!"){
                botScore += 1;
            }
            matchOver(userScore, botScore);
        }

        // Tells the player that the game is over... called by keepScore(userScore, botScore) 
        function matchOver(){
            if(userScore == 2){
                userScoreboard.innerHTML = `${playerName.toUpperCase()}: ${userScore}`;
                playAgain.innerHTML = `${playerName} has won! Would you like to play again?`;
                disableButtons();
                userWinnings += 1;
                countWinnings();
            } else if (botScore == 2){
                botScoreboard.innerHTML = `BOT: ${botScore}`
                playAgain.innerHTML = "BOT has won! Would you like to play again?";
                disableButtons();
                botWinnings += 1;
                countWinnings();
            }            
        }

        // Tallies the total winnings...called by matchOver() 
        function countWinnings(){
            totalWinnings.innerHTML = `${playerName.toUpperCase()}: ${userWinnings} wins -------------- BOT: ${botWinnings} wins`;
        }

        

        // Disables all buttons once the match is over
        function disableButtons(){
            rockButton.disabled = true;
            paperButton.disabled = true;
            scissorsButton.disabled = true;
        }

        //Cleans the slate
        function restartGame(){
            userScore = 0;
            botScore = 0;

            
            elementList = [resultTextElement, userScoreboard, botScoreboard, playAgain];
            elementList.forEach((element) =>{
                element.innerHTML = "";
            })

            buttonList = [rockButton, paperButton, scissorsButton];
            buttonList.forEach((button) => {
                button.disabled = false
            })
        }
