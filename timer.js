class Clock {
  constructor() {
    var date = new Date();
    this.hour = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    console.log(`${Clock.timeString(this.hour)}:${Clock.timeString(this.minutes)}:${Clock.timeString(this.seconds)}`);
  }

  static timeString(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  }

  _tick() {
    this.seconds += 1;
    if (this.seconds > 60) {
      this.seconds = this.seconds % 60;
      this.minutes += 1;
      if (this.minutes > 60) {
        this.minutes = this.minutes % 60;
        this.hour += 1;
        if (this.hour > 24) {
          this.hour = this.hour % 24;
        }
      }
    }
    this.printTime();
  }

}
