let timer;             // 5분 타이머를 저장하기 위한 변수
let timeLeft = 5 * 60; // 제한 시간 (5분)

// div를 만들어 놓고, 타이머 값을 넣어줄 위치의 id가 myTimer인지 확인하세요.
let timerElement = document.getElementById('myTimer');

function startTimer() {
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      logout();
    } else {
      timeLeft--;
    }
  }, 1000);
}

// 페이지 디자인에 맞게 로그아웃 처리 로직을 구현해 주세요.
function logout() {
  alert('5분이 지나 로그아웃 되었습니다. 로그인 페이지로 이동합니다.');
  location.href = 'login.html';
};

startTimer();