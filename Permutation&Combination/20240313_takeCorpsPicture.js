// 2017 카카오코드 본선 > 단체사진 찍기
// 프로그래머스 level3

// 풀이 방식
// 1. 프랜즈를 배열로 선언
// 2. 첫번째 프랜즈부터 줄을 세우고 재귀
// 3. 줄을 다 세우고 조건이 일치하는지 확인

function solution(n, data) {
  let answer = 0;
  const friends = ['A', 'C', 'F', 'J', 'M', 'N', 'R', 'T'];
  const visited = Array(8).fill(false);

  function dfs (line, depth) {
    if (depth === 8) {
      if (check(line)) answer++;
      return ;
    }

    // depth -> 자리(인덱스) , i -> 프렌즈
    for(let i = 0; i < 8; i++) {

      // 아직 줄을 서지 않은 프렌즈면 세우고 재귀
      if (!visited[i]) {
        visited[i] = true;
        dfs(line + friends[i], depth + 1);
        visited[i] = false;
      }
    }
  }

  function check(line) {
    // "N~F=0", "R~T<2"
    for (let cond of data) {
      // 둘 사이의 거리
      let diff = Math.abs(line.indexOf(cond[0]) - line.indexOf(cond[2])) - 1;
      let sign = cond[3];
      let val = cond[4] - '0';

      switch (sign) {
        case "=" :
          if (diff != val) return false;
          break;
        case ">" :
          if (diff <= val) return false;
          break;
        default :
          if (diff >= val) return false;
          break;
      }
    }
    // 걸리지지 않았다면 true
    return true;
  }

  dfs("", 0);
  return answer;
}

const n = 2
const data1 = ["N~F=0", "R~T>2"];
const data2 = ["M~C<2", "C~M>1"];

// N~F=0 -> N: 조건을 제시한 프렌즈, F: 상대방, 0: 간격
console.log(solution(n, data1));
// console.log(solution(n, data2));