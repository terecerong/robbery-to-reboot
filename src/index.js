function RobberyToReboot() {
    self = this
    this.doorSprites = document.getElementsByClassName('door')
    this.placeholders = document.getElementsByClassName('placeholder')
    this.doorState = [false, false, false] // false = cerrado & true = open.
    
    this.openRandomDoor = function() {
        const randomDoor = Math.floor(Math.random()* 3)
        if (!this.doorState[randomDoor]) {
            this.doorState[randomDoor] = true
        }
        this.placeholders[randomDoor].style.backgroundColor = 'blue'
    }

    /*this.paintDoor = function() {
        if (this.doorSprites === 'false') {
            this.doorSprites[randomDoor].classList.remove('doorBrown')
            this.doorSprites[randomDoor].classList.add('doorBlack')
        } 
    }*/
    //EN PROCESO

    this.start = function() {
       let click = document.addEventListener('click', this.placeholders)
       let timerId = setInterval (function () {
        self.openRandomDoor()
        // self.paintDoor()
        console.log(self.doorState)
        console.log(click)
       }, 900)
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