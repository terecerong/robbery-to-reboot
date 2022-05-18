
function RobberyToReboot() {

  self = this
  this.timerEnemyId = null
  this.timerCount = null

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
    this.timerValue = 15
    this.doorState = [false, false, false]
    this.canvas.style.display = 'block'
    this.gameOverScreen.style.display = 'none'
    this.elemTime.innerHTML = this.timerValue
    this.timer()
    this.startEnemyTimer()
  }


  this.randomDoor = function () {
    return Math.floor(Math.random() * 3)
  }

  this.randomCharacter = function () {
    var number = Math.random()
    if (number < 0.3) {
      return 'victim'
    } else {
      return 'enemy'
    }
  }

  this.startEnemyTimer = function () {
    this.timerEnemyId = setInterval(function () {
      let doorSelected = self.randomDoor()
      self.openDoor(doorSelected)
    }, 2000)
  }


  this.timer = function () {
    this.timerCount = setInterval(function () {
      self.timerValue -= 1
      self.elemTime.innerHTML = self.timerValue
      self.checklife()
      if (self.timerValue <= 0) {
        clearInterval(self.timerCount)
      }
    }, 1000)
  }


  this.addClickEvent = function () {
    for (var i = 0; i < this.placeholders.length; i++) {
      this.placeholders[i].addEventListener('click', function (e) {

        disparo.play()
        var idDoor = e.target.getAttribute('id')
        var doorNumber = parseInt(idDoor[idDoor.length - 1]) - 1
        if (self.placeholders[doorNumber].classList.contains('placeholderVictim')) {
          self.countLives--
          self.lives[self.countLives].style.display = 'none'
          self.placeholders[doorNumber].classList.remove('placeholderVictim')
        } else {
          if (self.countLives > 0 && self.timerValue > 0) {
            self.timerValue += 5
            self.elemTime.innerHTML = self.timerValue
            self.placeholders[doorNumber].classList.remove('placeholderEnemy')
          }
        }
        self.placeholders[doorNumber].classList.add('placeholderEnemyDied')
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
      setTimeOutGameOver = setTimeout(self.gameOver, 300)
    }
  }


  this.openDoor = function (door) {
    if (!self.doorState[door]) {
      self.doors[door].classList.remove('doorBrown')
      if (this.randomCharacter() === 'victim') {
        self.placeholders[door].classList.add('placeholderVictim')
      } else {
        self.placeholders[door].classList.add('placeholderEnemy')
      }
      self.placeholders[door].style.display = 'block'
      self.doorState[door] = true
      setTimeoutCloseDoor = setTimeout(self.closeDoor, 1500, door)
    }
  }


  this.closeDoor = function (door) {
    if (self.doorState[door]) {
      self.placeholders[door].classList.remove('placeholderEnemy')
      self.placeholders[door].classList.remove('placeholderVictim')
      self.placeholders[door].classList.remove('placeholderEnemyDied')
      self.doors[door].classList.add('doorBrown')
      self.placeholders[door].style.display = 'none'
      self.doorState[door] = false
    }
  }

  this.changeDiedToEnemy = function (door) {
    self.placeholders[door].classList.remove('placeholderEnemyDied')
  }


  this.gameOver = function () {
    audioGame.pause()
    gameOver.play()
    clearInterval(self.timerEnemyId)
    clearTimeout(setTimeOutGameOver)
    clearTimeout(setTimeoutCloseDoor)
    clearInterval(self.timerCount)
    for (let i=0; i < self.placeholders.length; i++) {
      self.placeholders[i].classList.remove('placeholderEnemy')
      self.placeholders[i].classList.remove('placeholderVictim')
      self.placeholders[i].classList.remove('placeholderEnemyDied')
      self.doors[i].classList.add('doorBrown')
    }
    self.canvas.style.display = 'none'
    self.gameOverScreen.style.display = 'block'
  }
}

let robbery = new RobberyToReboot()
robbery.addClickEvent()

var audioGame = new Audio('./assets/sound/AudioGame.mp3')
var disparo = new Audio('./assets/sound/Disparo.wav')
var gameOver = new Audio('./assets/sound/GameOver.wav')

function sound() {
  var snd = new Audio('./assets/sound/Click.wav')
  snd.play()
}
