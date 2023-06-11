let loginFailCount = 0; // 로그인 실패 횟수
let countdownInterval; // 카운트다운 인터벌 변수
let remainingTime = 300; // 제한 시간 (5분)을 초 단위로 설정
// onload= "pop_up();"

function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수
 
function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
	let check = document.querySelector("#idSaveCheck");
    
    form.action = "../index_login.html";
    form.method = "get";
	
	if(check.checked == true) { // 아이디 체크 o
            alert("쿠키를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
            alert("쿠키 값 :" + id.value);
        } 
    else { // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
    
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }	
	else{
		 if(login_check()){
        session_set(); // 세션 생성
        form.submit();
        login_count(); // 로그인 횟수 체크   
        } else {
      loginFailCount++; // 로그인 실패 횟수 증가
			startCountdown(); // 카운트다운 시작
      
    }
}

function login_check() {
  let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(id.value)){
    	if(reg.test(password.value)){
            return true;
        }
        else{
            alert("영문 숫자 특수기호 조합 8자리 이상으로 입력해주세요.");
            return false;
            }
    }
    else{
        alert("이메일 주소를 포함하여 입력해주세요");
        return false;
        }
}
  
	

	function login_count() {
     let login_cnt = getCookie("login_cnt");
  if(login_cnt == "") {
    setCookie("login_cnt", 1, 1);
  }
  else {
    setCookie("login_cnt", Number(login_cnt)+1, 1);
	//alert("로그인 횟수 " + (Number(login_cnt) + 1));
  }
}

function logout(){
	session_del(); // 세션 삭제
	logout_count(); 
    location.href="../index.html";
}

function logout_count() { // 로그아웃 횟수 체크
  let logout_cnt = getCookie("logout_cnt");
  if(logout_cnt == "") {
    setCookie("logout_cnt", 1, 1);
  }
  else {
    setCookie("logout_cnt", Number(logout_cnt)+1, 1);
  }
}

function get_id(){
	if(true){
        decrypt_text();
    }
    else{
    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
}; // 함수 끝
		
	var idValue = getParameters("id");
    var regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}", "i"); // 여기에 사용할 정규 표현식 패턴을 입력하세요	
		
	if (test(regex, idValue)) {	
alert(getParameters('id') + '님 방갑습니다!');}// 메시지 창 출력
	}
}

	
function startCountdown() {
  clearInterval(countdownInterval); // 기존 인터벌 중지

  const timerElement = document.getElementById("timer");
  timerElement.innerText = formatTime(remainingTime);

  countdownInterval = setInterval(function () {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(countdownInterval); // 카운트다운 완료 시 인터벌 중지
      loginFailCount = 0; // 로그인 실패 횟수 초기화
      timerElement.innerText = "로그인 제한 시간이 종료되었습니다.";
    } else {
      timerElement.innerText = formatTime(remainingTime);
    }
  }, 1000);

  if (loginFailCount >= 3) {
    // 팝업 창 열기
    openRestrictionPage();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
}

window.onload = function () {
  init(); // 초기화 함수 호출

  if (loginFailCount >= 3) {
    startCountdown();
  }
};
	
	function openPopup() {
  // 팝업 창을 새 창으로 열기
  window.open("logcount.html", "_blank", "width=400,height=300");
}
	
	function openRestrictionPage() {
  // logcount.html을 새 창으로 열기
  window.open("logcount.html", "_blank", "width=400,height=300");
}

		
function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
   
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check(); // 세션 유무 검사
}
	}

