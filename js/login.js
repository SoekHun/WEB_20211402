let loginFailCount = 0; // 로그인 실패 횟수

function addJavascript(jsname) {
  // 자바스크립트 외부 연동
  var th = document.getElementsByTagName("head")[0];
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", jsname);
  th.appendChild(s);
}
addJavascript("/js/security.js"); // 암복호화 함수
addJavascript("/js/session.js"); // 세션 함수
addJavascript("/js/cookie.js"); // 쿠키 함수

function login() {
  let form = document.querySelector("#form_main");
  let id = document.querySelector("#floatingInput");
  let password = document.querySelector("#floatingPassword");
  let check = document.querySelector("#idSaveCheck");

  form.action = "../index_login.html";
  form.method = "get";

  if (check.checked == true) {
    // 아이디 체크 o
    alert("쿠키를 저장합니다.");
    setCookie("id", id.value, 1); // 1일 저장
    alert("쿠키 값 :" + id.value);
  } else {
    // 아이디 체크 x
    setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
  }

  if (id.value.length === 0 || password.value.length === 0) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
  } else {
    if (login_check()) {
      session_set(); // 세션 생성
      form.submit();
      login_count(); // 로그인 횟수 체크
    } else {
      loginFailCount++; // 로그인 실패 횟수 증가
      if (loginFailCount >= 3) {
        loginDisabled(); // 로그인 제한
      }
    }
  }
}

function login_check() {
  let id = document.querySelector("#floatingInput");
  let password = document.querySelector("#floatingPassword");

  let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  let regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
  if (regex.test(id.value)) {
    if (reg.test(password.value)) {
      return true;
    } else {
      alert("영문 숫자 특수기호 조합 8자리 이상으로 입력해주세요.");
      return false;
    }
  } else {
    alert("이메일 주소를 포함하여 입력해주세요");
    return false;
  }
}

function login_count() {
  let login_cnt = getCookie("login_cnt");
  if (login_cnt == "") {
    setCookie("login_cnt", 1, 1);
  } else {
    setCookie("login_cnt", Number(login_cnt) + 1, 1);
    alert("로그인 횟수 " + (Number(login_cnt) + 1));
  }
}

function logout() {
  session_del(); // 세션 삭제
  logout_count();
  location.href = "../index.html";
}

function logout_count() {
  // 로그아웃 횟수 체크
  let logout_cnt = getCookie("logout_cnt");
  if (logout_cnt == "") {
    setCookie("logout_cnt", 1, 1);
  } else {
    setCookie("logout_cnt", Number(logout_cnt) + 1, 1);
  }
}

function get_id() {
  if (true) {
    decrypt_text();
  } else {
    var getParameters = function (paramName) {
      var returnValue;
      var url = location.href;
      var parameters = (url.slice(url.indexOf("?") + 1, url.length)).split("&");

      for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split("=")[0];

        if (varName.toUpperCase() == paramName.toUpperCase()) {
          returnValue = parameters[i].split("=")[1];
          return decodeURIComponent(returnValue);
        }
      }
    };

    var idValue = getParameters("id");
    var regex = new RegExp("your_pattern_here", "i"); // 여기에 사용할 정규 표현식 패턴을 입력하세요

    if (test(regex, idValue)) {
      alert(getParameters("id") + "님 방갑습니다!");
    }
  }
}

function loginDisabled() {
  alert("로그인이 제한되었습니다. 잠시 후 다시 시도해주세요.");
  setTimeout(() => {
    loginFailCount = 0; // 로그인 실패 횟수 초기화
  }, 300000); // 5분 (300,000밀리초) 후 로그인 가능
}
