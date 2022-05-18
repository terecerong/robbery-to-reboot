
function RobberyToReboot() {

  self = this
  this.timerEnemyId = null
  this.canvas = document.getElementById('canvas')
  this.elemTime = document.getElementById('timer')
  this.doors = document.getElementsByClassName('door')
  this.lives = document.getElementsByClassName('heart')
  this.placeholders = document.getElementsByClassName('placeholder')
  this.startingGameScreen = document.getElementById('pantallaInicio')
  this.gameOverScreen = document.getElementById('gameOver')


  this.start = function () {

    audioGame.play()

    this.startingGameScreen.style.display = 'none'
    for (let i = 0; i < this.lives.length; i++) {
      this.lives[i].style.display = 'inline-block'
    }

    this.countLives = 3
    this.timerValue = 5
    this.doorState = [false, false, false]
    this.canvas.style.display = 'block'
    this.gameOverScreen.style.display = 'none'
    this.elemTime.innerHTML = this.timerValue
    this.timer()
    this.addClickEvent()
    this.startEnemyTimer()
  }


  this.randomDoor = function () {
    return Math.floor(Math.random() * 3)
  }

  this.startEnemyTimer = function () {
    this.timerEnemyId = setInterval(function () {
      let doorSelected = self.randomDoor()
      self.openDoor(doorSelected)
    }, 2000)
  }


  this.timer = function () {
    var timerCount = setInterval(function () {
      self.timerValue -= 1
      self.elemTime.innerHTML = self.timerValue
      self.checklife()
      if (self.timerValue <= 0) {
        clearInterval(timerCount)
      }
    }, 1000)
  }


  this.addClickEvent = function () {
    for (var i = 0; i < this.placeholders.length; i++) {
      this.placeholders[i].addEventListener('click', function (e) {
        disparo.play()
        var idDoor = e.target.getAttribute('id')
        var doorNumber = parseInt(idDoor[idDoor.length - 1]) - 1
        if (self.countLives > 0 && self.timerValue > 0) {
          self.timerValue += 5
          self.elemTime.innerHTML = self.timerValue
          self.placeholders[doorNumber].classList.remove('placeholderEnemy')
          setTimeout(function () {
            console.log("hello")
            self.placeholders[doorNumber].classList.add('placeholderEnemyDied')
          }, 200)
        }
      })
    }
  }


  this.checklife = function () {
    if (this.timerValue <= 0) {
      this.countLives--
      this.lives[this.countLives].style.display = 'none'
    }
    if (this.countLives > 0 && this.timerValue <= 0) {
      this.timerValue = 5
    }
    if (this.countLives <= 0) {
      setTimeout(self.gameOver, 300)
    }
  }


  this.openDoor = function (door) {
    if (!self.doorState[door]) {
      self.doors[door].classList.remove('doorBrown')
      self.doors[door].classList.add('placeholderEnemy')
      self.placeholders[door].style.display = 'block'
      self.doorState[door] = true
      setTimeout(self.closeDoor, 1500, door)
    }
  }


  this.closeDoor = function (door) {
    if (self.doorState[door]) {
      self.doors[door].classList.remove('placeholderEnemy')
      self.doors[door].classList.add('doorBrown')
      self.placeholders[door].style.display = 'none'
      self.doorState[door] = false
      setTimeout(self.changeDiedToEnemy, 500, door)
    }
  }


  this.changeDiedToEnemy = function (door) {
    self.placeholders[door].classList.remove('placeholderEnemyDied')
  }


  this.gameOver = function () {
    audioGame.pause()
    console.log(gameOver)
    gameOver.play()
    clearInterval(self.timerEnemyId)
    self.canvas.style.display = 'none'
    self.gameOverScreen.style.display = 'block'
  }
}

let robbery = new RobberyToReboot()

var audioGame = new Audio('../assets/sound/AudioGame.mp3')
var disparo = new Audio('../assets/sound/Disparo.wav')
var gameOver = new Audio('../assets/sound/GameOver.wav')

function sound() {
  var snd = new Audio('../assets/sound/Click.wav')//wav is also supported
  snd.play()//plays the sound
}
