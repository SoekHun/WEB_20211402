

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
		session_set(); // 세션 생성
        form.submit();
    }
}

function login_check() {
  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  // 이메일 형식 체크
  if (!/^([0-9a-zA-Z.-]+)@([0-9a-zA-Z-]+)(.[0-9a-zA-Z_-]+){1,2}$/.test(id)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return false;
  }

  // 패스워드 형식 체크
  if (!/^(.[A-Za-z])(?=.\d)(?=.[$@$!%#?&])[A-Za-z\d$@$!%*#?&]{10,}$/.test(password)) {
    alert("패스워드 형식이 올바르지 않습니다.");
    return false;
  }

  // 이메일과 패스워드가 모두 유효한 형인 경우
  return true;
}
  
	
	function login_count() {
    let login_cnt = parseInt(getCookie("login_cnt"));
    if (isNaN(login_cnt)) {
        login_cnt = 0;
    }
    login_cnt++;
    setCookie("login_cnt", login_cnt, 30);
    console.log("로그인 횟수: " + login_cnt);
}

function logout(){
	session_del(); // 세션 삭제
    location.href="../index.html";
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
    var regex = new RegExp("your_pattern_here", "i"); // 여기에 사용할 정규 표현식 패턴을 입력하세요	
		
	if (test(regex, idValue)) {	
alert(getParameters('id') + '님 방갑습니다!');}// 메시지 창 출력
	}
}











