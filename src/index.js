
function RobberyToReboot() {
  self = this
  this.elemTime = document.getElementById('timer')
  this.timerValue = 5
  this.lives = 3
  this.doors = document.getElementsByClassName('door')
  this.placeholders = document.getElementsByClassName('placeholder')
  this.doorState = [false, false, false] // false = cerrado & true = open.
  this.randomDoor = function () {
    return Math.floor(Math.random() * 3)
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
      console.log(self.placeholders[door].classList)
  
     setTimeout(self.changeDiedToEnemy, 500, door)
    }
  }

  this.addClickEvent = function () {
    for (var i = 0; i < this.placeholders.length; i++) {
      this.placeholders[i].addEventListener('click', function (e) {
        var idDoor = e.target.getAttribute('id')
        var doorNumber = parseInt(idDoor[idDoor.length - 1]) - 1
        if(self.lives > 0 && self.timerValue > 0){
          self.timerValue += 5
          self.elemTime.innerHTML = self.timerValue
          self.placeholders[doorNumber].classList.remove('placeholderEnemy')
          self.placeholders[doorNumber].classList.add('placeholderEnemyDied')
        }else {
          alert("game over")
        }
      })
    }
    //return doorNumber
  }

  this.changeDiedToEnemy= function(door) {
    self.placeholders[door].classList.remove('placeholderEnemyDied')
    self.placeholders[door].classList.add('placehoderEnemy')
    
  }

  this.timer = function () {
    var timerCount = setInterval(function () {
      self.timerValue -= 1
      self.elemTime.innerHTML = self.timerValue
      if ( self.timerValue <= 0 ) {
        clearInterval(timerCount)
      }
    }, 1000)

  }

  this.gameOver = function() {
    alert('GAME OVER')
  }

  this.start = function () {
    this.elemTime.innerHTML = this.timerValue
    this.timer()
    // this.checkLives()
    this.addClickEvent()
    let timerId = setInterval(function () {
      let doorSelected = self.randomDoor()
      self.openDoor(doorSelected)
    }, 2000)
  }

}
let robbery = new RobberyToReboot()

robbery.start()
