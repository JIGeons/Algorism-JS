// 코딩테스트 연습 > 해시 > 전화번호 목록
// 프로그래머스 level2

function solution(phone_book) {
  var answer = true;
  phone_book.sort();
  console.log(phone_book)

  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i+1].startsWith(phone_book[i])) return false;
  }

  return answer;
}