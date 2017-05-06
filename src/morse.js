const spawn = require('child_process').spawnSync
const sleep = require('sleep')

class Morse {

  constructor(message) {
    const length = 250

    this.lengthDot = length
    this.lengthDash = length * 3
    this.pauseLetter = length
    this.pauseWord = length * 6  // This should be 7 but we add a letter pause

    this.brightnessOn = 100
    this.brightnessOff = 0

    this.morseAlphabet = this.getMorseAlphabet()
    this.message = message.toUpperCase()

  }

  getMorseAlphabet() {
    return {
      "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
      "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
      "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
      "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
      "Y": "-.--", "Z": "--..",

      "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
      "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----."
    }
  }

  getStartingBrightness() {
    const kbrightness = spawn('./kbrightness')
    return kbrightness.stdout.toString()
  }

  convertToMorseCodePattern() {
    let morseCodePattern = []
    for(const char of this.message) {
      let pattern = this.morseAlphabet[char]
      if(pattern != undefined) {
        morseCodePattern.push(pattern)
      } else {
        morseCodePattern.push(char)
      }
    }

    return morseCodePattern
  }

  sequenceItem(brightness, duration) {
    return {
      "brightness": brightness,
      "duration": duration
    }
  }

  dot() {
    return this.sequenceItem(this.brightnessOn, this.lengthDot)
  }

  dash() {
    return this.sequenceItem(this.brightnessOn, this.lengthDash)
  }

  space() {
    return this.sequenceItem(this.brightnessOff, this.pauseWord)
  }

  pause() {
    return this.sequenceItem(this.brightnessOff, this.pauseLetter)
  }

  convertToSequence(morseCodePattern) {
    let sequence = []
    for(const item of morseCodePattern) {
      for(const char of item) {
        switch(char) {
          case ".":
            sequence.push(this.dot())
            break
          case "-":
            sequence.push(this.dash())
            break
          case " ":
            sequence.push(this.space())
            break
        }
        sequence.push(this.pause())
      }
    }
    return sequence
  }

  convert() {
    const morseCodePattern = this.convertToMorseCodePattern()
    return this.convertToSequence(morseCodePattern)
  }

  setBrightness(brightness) {
    spawn('./kbrightness', [brightness])
  }

  play() {
    const startingBrightness = this.getStartingBrightness()
    const sequence = this.convert()

    for(const item of sequence) {
      this.setBrightness(item.brightness)
      sleep.msleep(item.duration)
    }
    this.setBrightness(startingBrightness)
  }

}

module.exports = Morse
