document.getElementById("search_btn").addEventListener('click', search_message);
function search_message(){
alert("ㄱㅓㅁㅅㅐㄱ");
let search_str = document.querySelector("#search_txt"); // 변수에 저장
if(search_str.value.length === 0){ // 문자 길이, 엄격한 비교
       alert("검색어가 비었습니다. 입력해주세요"); 
    }
    else{
       alert("검색을 수행합니다!");
       let text = document.getElementById("search_message").innerHTML = search_str.value;
       document.querySelector("#form_main").submit();
    }
}

document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
console.log(search_str.value); // 콘솔에 출력
}