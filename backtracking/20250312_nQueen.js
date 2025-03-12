// 연습문제 > N-Queen
// 프로그래머스 level2

function solution(n) {
  var answer = 0;
  let queen = Array(n.length).fill(0);  // Queen의 인덱스를 저장할 배열 생성

  // 마지막으로, 첫 줄은 놓은 뒤에 재귀를 돌려야 정상적으로 작동하기 때문에 해당 코드를 작성한다.
  for (let i = 0; i < n; i++) {
    queen[0] = i;
    dfs(1);
  }

  function dfs(row) {
    // row의 값이 n이랑 같은 경우 모든 줄에 퀸을 다 놓았다는 뜻이므로 1을 더해준다.
    if (row === n) {
      answer++;
    }

    // 위 조건이 만족하지 않을 경우
    // row 번째 줄부터 0 ~ n-1 번째 칸까지 탐색을 진행한다.
    for (let col = 0; col < n; col++) {
      // 먼저 row번째 줄의 col 번째 칸에 놓는다.
      queen[row] = col;
      // 못 놓는다고 판별이 되는 경우 반복문을 빠져나와야 하므로, 플레그를 세워둔다.
      let checker = true;

      // 이제 제일 첫 줄부터 row 줄까지 돌면서, 그 col칸에 놓아도 되는지 판별한다.
      for (let i = 0; i < row; i++) {
        // 세로줄에 퀸이 있는지 판단하는 조건문이다.
        // queen[row]는 현재 col 값이고, queen[i]의 값은 i번째 줄의 col 값이므로
        // 같은 경우는 같은 세로 줄에 놓여있다는 의미이다.
        // 때문에 플래그를 끈 뒤, 반복문을 탈출해준다.
        if (queen[row] === queen[i]) {
          checker = false;
          break;
        }

        // 대각선에 퀸이 있는지 판단하는 조건문이다.
        // 현재 놓으려는 곳이 i번째 줄의 퀸과 의 row의 차와 col의 차이가 같은 경우 대각선이라고 판단 할 수 있다.
        // 같은 경우 플래그를 끈 뒤, 반복문을 탈출해준다.
        if (Math.abs(queen[row] - queen[i]) === Math.abs(i - row)) {
          checker = false;
          break;
        }
      }
      // break를 통해 빠져나오지 않았다면, 다음 줄로 넘어가서 탐색을 진행해준다.
      if (checker) dfs(row + 1);
    }
  }
  return answer;
}