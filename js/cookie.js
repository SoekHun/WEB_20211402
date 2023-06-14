function setCookie(name, value, expiredays) {
  var date = new Date();
  date.setDate(date.getDate() + expiredays);
  
  // 5분을 밀리초로 변환
  var fiveMinutesInMilliseconds = 5 * 60 * 1000;
  
  // 만료일에 5분을 추가합니다.
  date.setTime(date.getTime() + fiveMinutesInMilliseconds);

  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure";
}

function getCookie(name) {
  var cookie = document.cookie;
  console.log("쿠키를 요청합니다.");
  if (cookie != "") {
    var cookie_array = cookie.split("; ");
    for ( var index in cookie_array) {
      var cookie_name = cookie_array[index].split("=");
            
      if (cookie_name[0] == "id") {
        return cookie_name[1];
      }
    }
  }
  return ;
}

function deleteCookie(cookieName){
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

// 기본 로그인 유지 시간을 5분으로 설정합니다.
setCookie("login", "yes", 1);