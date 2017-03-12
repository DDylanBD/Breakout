
const width = 800;
const height = 450;
var game = new Phaser.Game(width, height,Phaser.AUTO,'casse-brique');

var lives = 3;
var score = 0;

var scoreText;
var livesText;

var mainState = {
	preload: function () {
		game.load.image('paddle', 'img/paddle.png');
		game.load.image('brick', 'img/brick4.jpeg');
		game.load.image('ball', 'img/balle3.png');
		game.load.image('background', 'img/starfield.jpg')
	},

	create: function (){
		this.background = game.add.sprite(0, 0, 'background');
		this.background.width = game.width;
		this.background.height = game.height;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.enableBody = true;

		this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		this.paddle = game.add.sprite(200, 400, 'paddle');
		 //Pour que le paddle ne bouge pas quand la balle le frappe.
		 this.paddle.body.immovable = true;
		 this.paddle.body.collideWorldBounds = true;


		 this.bricks = game.add.group();

		 for (var i = 0; i < 12; i++) {
		 	for (var j = 0; j < 5; j++) {

		 		var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');

		 		brick.body.immovable = true;

		 		this.bricks.add(brick);
		 	}
		 }

		 this.ball = game.add.sprite(100, 200, 'ball');

		 this.ball.body.velocity.x = 200;
		 this.ball.body.velocity.y = 200;

		 this.ball.body.bounce.setTo(1);
		 this.ball.body.collideWorldBounds = true;

		 scoreText = game.add.text(700, 420, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "right" });
		 livesText = game.add.text(15, 420, 'lives: 3', { font:"20px Arial", fill:'#ffffff',align:"left" });
		},

		update: function () {
			if(this.left.isDown) this.paddle.body.velocity.x = -400;
			else if (this.right.isDown) this.paddle.body.velocity.x = 400;

			else this.paddle.body.velocity.x= 0;

			game.physics.arcade.collide(this.paddle, this.ball);

			game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

			if(this.ball.y > this.paddle.y)
				game.state.start('main');
		},

		gameOver: function () {

			ball.body.velocity.setTo(0, 0);

		},

		ballLost: function (lives,livesText) {
			lives--;
			livesText.text = 'lives:' + lives;

			// if(lives === 0) {
			// 	gameOver();
			// } else {
			// 	return 'de';
			// }
		},

		hit: function(ball, brick) {
			brick.kill();

			score += 3;
			scoreText.text = 'score: ' + score;
		},
	};

	game.state.add('main', mainState);
	game.state.start('main');
