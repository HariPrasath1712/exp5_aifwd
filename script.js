// Quiz App
(function(){
  const correctAnswers = { q1: 'B', q2: 'C', q3: 'B', q4: 'C', q5: 'A' };
  const startBtn = document.getElementById('start-quiz');
  const submitBtn = document.getElementById('submit-quiz');
  const timeEl = document.getElementById('time-remaining');
  const warningEl = document.getElementById('warning');
  const quizForm = document.getElementById('quiz-form');
  const resultEl = document.getElementById('quiz-result');

  let timer = null;
  let remaining = 10;
  const quizProgress = document.getElementById('quiz-progress');
  function updateTimerDisplay(){
    timeEl.textContent = remaining;
    if(remaining === 5){
      warningEl.textContent = 'Only 5 seconds remaining!';
    }
    // update progress bar (percentage)
    if(quizProgress){
      const pct = Math.max(0, (remaining / 10) * 100);
      quizProgress.style.width = pct + '%';
    }
  }

  function disableAllInputs(){
    const inputs = quizForm.querySelectorAll('input[type=radio]');
    inputs.forEach(i=> i.disabled = true);
    startBtn.disabled = false;
    submitBtn.disabled = true;
  }

  function computeScore(){
    let score = 0;
    for(const q in correctAnswers){
      const selected = quizForm.querySelector(`input[name="${q}"]:checked`);
      if(selected && selected.value === correctAnswers[q]) score++;
    }
    return score;
  }

  function submitQuiz(){
    if(timer){ clearInterval(timer); timer = null; }
    const score = computeScore();
    resultEl.textContent = `Final Score: ${score} / 5`;
    disableAllInputs();
    warningEl.textContent = '';
    remaining = 10;
    updateTimerDisplay();
    if(quizProgress) quizProgress.style.width = '0%';
  }

  startBtn.addEventListener('click', ()=>{
    // reset
    const inputs = quizForm.querySelectorAll('input[type=radio]');
    inputs.forEach(i=> { i.disabled = false; i.checked = false; });
    resultEl.textContent = '';
    warningEl.textContent = '';
    startBtn.disabled = true;
    submitBtn.disabled = false;
    remaining = 10;
    updateTimerDisplay();

    if(timer) clearInterval(timer);
    timer = setInterval(()=>{
      remaining -= 1;
      updateTimerDisplay();
      if(remaining <= 0){
        submitQuiz();
      }
    }, 1000);
  });

  submitBtn.addEventListener('click', submitQuiz);
})();

// Event Countdown Timer
(function(){
  const startBtn = document.getElementById('start-countdown');
  const input = document.getElementById('event-datetime');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const messageEl = document.getElementById('countdown-message');

  let intervalId = null;

  function updateCountdown(target){
    const now = new Date();
    const diff = target - now;
    if(diff <= 0){
      clearInterval(intervalId);
      daysEl.textContent = '0'; hoursEl.textContent='0'; minutesEl.textContent='0'; secondsEl.textContent='0';
      messageEl.textContent = 'Registration Closed';
      intervalId = null;
      return;
    }
    const total = Math.floor(diff/1000);
    const days = Math.floor(total / (3600*24));
    const hours = Math.floor((total % (3600*24)) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours);
    minutesEl.textContent = String(minutes);
    secondsEl.textContent = String(seconds);
  }

  startBtn.addEventListener('click', ()=>{
    const val = input.value;
    if(!val){ alert('Please choose date and time'); return; }
    const target = new Date(val);
    if(isNaN(target.getTime())){ alert('Invalid date'); return; }
    if(intervalId) clearInterval(intervalId);
    messageEl.textContent = '';
    updateCountdown(target);
    intervalId = setInterval(()=> updateCountdown(target), 1000);
  });
})();
