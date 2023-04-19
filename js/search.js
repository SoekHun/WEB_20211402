document.getElementById("search_btn").addEventListener('click', search_message);

var search_array =[] //빈 배열- 전역 변수
var MAX_SEARCH_COUNT = 3;

function search_message(){

let search_str = document.querySelector("#search_txt"); // 변수에 저장
if(search_str.value === 0){ 
       alert("검색어가 비었습니다. 입력해주세요"); 
    }
    else{
		if (search_array.length >= MAX_SEARCH_COUNT) {
        search_array.pop(); // 맨 뒤의 값을 삭제
    	}
       alert("검색을 수행합니다!");
	   search_array.unshift(search_str.value); // 맨 앞에 값을 추가
	   //search_array.push(search_str.value); // 배열의 검색어 추가
       let text = document.getElementById("search_message").innerHTML = search_array.toString(); //값 변환  //search_str.value;
       document.querySelector("#form_main").submit();
    }
	//document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
	//console.log(search_str.value); // 콘솔에 출력
}
