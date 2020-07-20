class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});

const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRefs = document.querySelector('[data-value="secs"]');

function pad(value) {
  return String(value).padStart(2, '0');
}

function timerUpdate(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = mins;
  secsRefs.textContent = secs;
}

function timerA() {
  const dateTarget = timer.targetDate.getTime();

  setInterval(() => {
    const dateCurrent = Date.now();
    timerUpdate(dateTarget - dateCurrent);
  }, 1000);
}

timerA();
