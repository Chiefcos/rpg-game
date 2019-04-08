$(document).ready();

var randomNumber = [];
var heroAttack = 0;
var opponentAttack = 0;
var heroHealth = 0;
var opponentHealth = 0;
var dubbleStem = [];
var opponent;
var id = [];
var count = 0;

$(".heroes").on("click", function() {
  id = $(this).attr("id");
  //this takes out the attributes of the hero and sets them to a variable
  heroHealth = parseInt($(this).attr("health"));
  heroAttack = parseInt($(this).attr("attack"));

  //this will show the hero's health points
  $(".health-bar-hero").show();
  $(".health-hero").show();
  $(".healthpoints-hero").html(heroHealth);

  // this shows only the player you clicked on
  $(".heroes").hide();
  $(this).show();

  //  This animates the characters background to yellow and makes him move to the middle
  $(this).animate({ left: "-450px" });
  $(this).css({
    "background-color": "rgba(248,186,0, 0.5)",
    border: "5px solid rgba(248,186,0, 0.8)"
  });
});

$(".villains").on("click", function() {
  // this takes out the attributes of the villains and sets them to a variable
  opponentAttack = parseInt($(this).attr("attack"));
  opponentHealth = parseInt($(this).attr("health"));

  // this puts the clicked villain into a variable so I can reuse it.
  opponent = $(this);

  // this shows the opponentshealth
  $(".health-bar-villain").show();
  $(".healthpoints-villain").show();
  $(".healthpoints-villain").html(opponentHealth);
  $(".health-villain").show();

  // this hides the rest of the villains and shows the chosen one
  $(".villains").hide();
  $(this).show();

  // This will animate the characters background and move it to the middle of the page
  $(this).animate({ left: "450px" });
  $(this).css({
    "background-color": "rgba(242,38,19, 0.5)",
    border: "5px solid rgba(242,38,19, 0.8)"
  });

  // this will show the fight button
  $(".fight").show();
});

// when you click on the fight button
$(".fight").on("click", function() {
  // If no enemy has been selected the page will say "choose an enemy"
  if (opponentHealth === null) {
    alert("choose an enemy");
  }
  // If you have chosen an enemy the attack sequence begins
  else {
    heroHealth -= opponentAttack;
    opponentHealth -= heroAttack;
    $(".healthpoints-villain").html(opponentHealth);
    $(".healthpoints-hero").html(heroHealth);
    dubbleStem.push(heroAttack);
  }

  // This increments the attack power of the hero by the initial attack power
  if ((opponentHealth -= heroAttack)) {
    heroAttack += parseInt(dubbleStem);
  }

  // when the hero dies the game over screen will show
  if (heroHealth <= 0) {
    alert("Game Over");
    $(".health-bar-hero").hide();
    $(".gameover").show();
  }

  // when you win you can chose the next enemy
  if (opponentHealth <= 0) {
    alert("you win!");
    $(".villains").show();
    opponent.remove();
    $(".health-bar-villain").hide();
    $(".fight").hide();
    count++;
  }

  // when you have beaten all enemies it shows the gameover screen
  if (count === 4) {
    $(".gameover").show();
    $(".ending").text("you win!");
    $(".health-bar-hero").hide();
  }
});
