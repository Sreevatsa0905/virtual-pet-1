//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dog_img,happyDog_img;
;

function preload()
{
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,200,200);
  dog.addImage(dog_img);
  dog.scale = 0.4;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);
  drawSprites();
  //add styles here
  console.log(foodS);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
  }
  textSize(20);
  fill("white");
  text("Press Up arrow to feed the dog",120,60);
  text("Remaining food: "+foodS,50,450);
}

function readStock(data)
{
   foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({
    Food:x
  })
}

