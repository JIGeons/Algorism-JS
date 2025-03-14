// 정렬 > 가장 큰 수
// 프로그래머스 level2

// 풀이 방식
// 1. 숫자를 String으로 전환한다.
// 2. 두 숫자를 붙였을 때 더 큰 순서로 정렬한다.
// 3. 하나의 문자열로 합친다.

function solution(numbers) {
  let answer = numbers.map(numbers => String(numbers))  // 숫자를 String으로 변환
                  .sort((a, b) => (b + a) - (a + b))    // 붙어있는 두 숫자의 조합이 큰 순서로 정렬
                  .join('');                 // 정렬된 숫자를 하나의 문자열로 합침
  return answer[0] === '0' ? '0' : answer;
}

const numbers1 = [6, 10, 2];
const numbers2 = [3, 30, 34, 5, 9];
console.log(solution(numbers1));
console.log(solution(numbers2));
