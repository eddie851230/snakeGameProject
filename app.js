const canvas = document.getElementById("myCanvas");
const paper = canvas.getContext("2d");
// getContext()method會回傳一個canvas的drawing context
// 01先設定單位比較好定義(要被canvas的寬高給整除)
const unit = 20;
const row = canvas.height / unit; //20
const col = canvas.width / unit; //20

// 02建立snake物件，先定義為一個空陣列
let snake = []; //存座標

//29把snake的物件放入函式中
function createSnake() {
  snake[0];
  // 03canvas筆記:
  // 座標是向右跟向下為增
  // 04建立蛇:
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
}

//20 建立class fruit設定果實
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * col) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    paper.fillStyle = "yellow";
    paper.fillRect(this.x, this.y, unit, unit);
  }
  // 23確保沒有重疊
  picklocation() {
    let overlapping = false;
    let new_x; //23.1用來確認有沒有跟蛇的身體重疊
    let new_y;

    // 25 確認蛇的身體任一節有沒有跟果實重疊
    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.lebgth; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          console.log("overlapping");
          overlapping = true; //25.1有異常，才會有true
          return;
        } else {
          overlapping = false;
        }
      }
    }
    //24
    do {
      new_x = Math.floor(Math.random() * col) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      //26
      checkOverlap(new_x, new_y);
    } while (overlapping);

    //27
    this.x = new_x;
    this.y = new_y;
  }
}

// 30 執行初始蛇的含式
createSnake();

// 21引用class Fruit做 myfruit物件
let myFruit = new Fruit();

//14.1設定互動(移動蛇的方向)
window.addEventListener("keydown", changeDirection); //執行changeDirection()
// 09建立方向
let d = "right";
//14.2
function changeDirection(e) {
  // 15 e.key有ArrowLeft、ArrowRight...
  // console.log(e);
  if (e.key == "ArrowRight" && d != "left") {
    // console.log("往右");
    d = "right";
  } else if (e.key == "ArrowLeft" && d != "right") {
    // console.log("往左");
    //16 正在向左執行的蛇不能再往右，才可以繼續向左跑
    d = "left";
  } else if (e.key == "ArrowUp" && d != "down") {
    // console.log("往上");
    d = "up";
  } else if (e.key == "ArrowDown" && d != "up") {
    // console.log("往下");
    d = "down";
  }
  //32防錯機制:
  // 如果上下左右按的速度比跑楨的速度快就有可能出錯;
  // 建立下一楨被畫出來之前，不可以有按按下動作
  window.removeEventListener("keydown", changeDirection);
}

//38 宣告 highestScore變數
let highestScore;
//40 去執行
loadTopScore();

//35分數設定
let score = 0;

document.getElementById("myScore").innerHTML = "遊戲分數: " + score;
document.getElementById("topScore").innerHTML = "遊戲最高分: " + highestScore;

//17設定穿牆功能:思考方向
// 如果向右時，x>=width.length，x的座標就變回0
// 向右時，x<0，就要回到length-一個unit的長度(x=width-unit)
// 同y座標
//思考這個條件式要放在哪裡?

// 08放入此draw函式
function draw() {
  //31 每次畫圖之前都先確認蛇頭有沒有碰到自己
  for (let i = 1; i < i.length; i++) {
    // 從身體的第一節snake[1]去慢慢檢查
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return; //確保下面的函式不會被執行
    }
  }

  // 13.1如果沒有清除原本的canvas，
  // 13.2每次setinterval會在前一楨上面覆蓋，導致越來越長(想像是圖層)
  // 13.3解決方法:每次都重新填滿底色
  paper.fillStyle = "black";
  paper.fillRect(0, 0, canvas.width, canvas.height);

  // 22執行果實的隨機位置
  myFruit.drawFruit();

  console.log("檢查中...");
  // 05將snake設定值放入canvas
  for (let i = 0; i < snake.length; i++) {
    // 06 建立頭
    if (i == 0) {
      paper.fillStyle = "orange";
    } else {
      paper.fillStyle = "pink";
    }
    paper.strokeStyle = "white";

    // 18 承17的問題:在setinterval執行下一個動作(蛇的移動)
    if (snake[i].x > canvas.width) {
      snake[i].x = 0; //回到0
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y > canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    paper.fillRect(snake[i].x, snake[i].y, unit, unit); //高寬都依樣
    paper.strokeRect(snake[i].x, snake[i].y, unit, unit);
    //.fillRect的四個參數:x、y、寬、長
  }

  // 10用d來決定每跳一次後的新座標(蛇的尾巴刪掉，頭的前面增加)
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "left") {
    snakeX -= unit;
  } else if (d == "up") {
    snakeY -= unit;
  } else if (d == "right") {
    snakeX += unit;
  } else if (d == "down") {
    snakeY += unit;
  }

  // 11從以上的基礎就可以製作一個蛇頭的新物件
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //12確認已沒有吃到果實的邏輯
  //22 蛇的頭要跟果實的X、Y座標吻合
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    //28要重新選定一個隨機位置
    myFruit.picklocation();

    //36只要吃到就改變分數
    score++;
    //43 執行歷史分數偵測
    setHighestScore(score);

    document.getElementById("myScore").innerHTML = "遊戲分數: " + score;
    //41 呈現最高的紀錄
    document.getElementById("topScore").innerHTML =
      "遊戲最高分: " + highestScore;
  } else {
    snake.pop(); //12.01刪除尾巴
  }
  snake.unshift(newHead); //12.02頭增加//22.02放在條件式外
  //34
  window.addEventListener("keydown", changeDirection);
}
//07建立更新畫面機制
let myGame = setInterval(draw, 100);

//37最後去查看local storage有沒有存放直
// 紀錄瀏覽器的最高分
function loadTopScore() {
  if (localStorage.getItem("highestScore") == null) {
    //38一開始都還沒有紀錄的狀況會是null
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
    //39localstorage提取的data是string，因此要轉乘num
  }
}
//42 建立一個fumction偵測目前遊戲分數有沒有突破瀏覽器留下的紀錄
function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
