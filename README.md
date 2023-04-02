Pong Javascript Game:

This is a simple implementation of the classic Pong game using JavaScript and the HTML5 canvas element. In this game, two players control paddles on the left and right sides of the screen, trying to hit a bouncing ball back and forth. The objective is to score points by making the ball pass the opponent's paddle.

How to run:

Using an HTML file with a canvas element and id of 'pong'. Set the canvas width and height according to your preference.
Given JavaScript code in a file named pong.js.
Open the HTML file in a web browser.

Controls:

Player 1 (Left Paddle)



Move Up: W
Move Down: S


Player 2 (Right Paddle)

Move Up: ArrowUp

Move Down: ArrowDown

Game Structure

The game uses the canvas 2D context to draw the paddles, ball, and score on the screen.
The update function handles the ball movement, paddle movement, collision detection, and scoring.
The draw function is responsible for rendering the game objects on the canvas.
Keyboard event listeners are used to handle user input for controlling the paddles.
The gameLoop function is the main game loop that continuously calls update and draw using the requestAnimationFrame function.
Customization
You can customize the game by modifying the following properties in the code:

paddleWidth: The width of the paddles.

paddleHeight: The height of the paddles.

ballSize: The size of the ball.

leftPaddle.speed and rightPaddle.speed: The speed of the paddles.

ball.speed: The speed of the ball.
