function RobberyToReboot() {
  self = this
  this.doors = document.getElementsByClassName('door')
  this.placeholders = document.getElementsByClassName('placeholder')
  console.log(this.placeholders)
  this.doorState = [false, false, false] // false = cerrado & true = open.
  
  this.randomDoor = function () {
    return Math.floor(Math.random() * 3)
  }

  this.openDoor = function (door) {
    if (!self.doorState[door]) {
      self.doors[door].classList.remove('doorBrown')
      self.doors[door].classList.add('doorBlack')
      self.placeholders[door].style.backgroundColor = 'blue'
      self.doorState[door] = true
      setTimeout(self.closeDoor, 1500, door)
    }
    
  }

  this.closeDoor = function (door) {
    console.log('close door')
    if (self.doorState[door]) {
      self.doors[door].classList.remove('doorBlack')
      self.doors[door].classList.add('doorBrown')
      self.placeholders[door].style.backgroundColor = 'transparent'
      self.doorState[door] = false
    }

  }
  //EN PROCESO
  this.addClickEvent = function () {
      for (var i = 0; i < this.placeholders.length; i++) {
        this.placeholders[i].addEventListener('click', function(e) {
            var idDoor = this.getAttribute('id') 
            // if (e.target === false) {
            //     console.log('adios')
            // }
            console.log(idDoor)
            // console.log(e.target)
        })
      }
  }


  this.start = function () {
    this.addClickEvent ()

    let timerId = setInterval(function () {
      let doorSelected = self.randomDoor()
      self.openDoor(doorSelected)

      console.log(self.doorState)
    }, 3000)
  }
}

let robbery = new RobberyToReboot()

robbery.start()
/*let door = document.getElementsByClassName('door')
let time = setInterval(function() {
    
    if (door[randomDoor].classList.contains('doorBrown')) {
        door[randomDoor].classList.remove('doorBrown')
        door[randomDoor].classList.add('doorBlack')
        } else {

                door[randomDoor].classList.remove('doorBlack')
                door[randomDoor].classList.add('doorBrown') 
    }
    console.log(door[randomDoor])
    
}, 500);
console.log(door[0].classList.contains('doorBrown'))*/