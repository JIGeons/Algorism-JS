// 깊이/너비 우선 탐색(DFS/BFS) > 네트워크
// 프로그래머스 level3

// 풀이 방식
// 1. 첫번째 컴퓨터 n번째 컴퓨터까지 순차 방문 조회
// 2. dfs로 컴퓨터와 네트워크로 연결되어 있는 컴퓨터를 다 방문 처리 한다.
// 3. 하나의 네트워크로 연결되어 있는 모든 컴퓨터를 찾은 경우 answer를 하나 증가시킨다.

function solution(n, computers) {
  let answer = 0;
  const visited = Array(n).fill(false);

  function dfs (computer) {
    // 컴퓨터를 방문상태로 변경
    visited[computer] = true;
    // 해당 컴퓨터와 연결되어 있는 컴퓨터를 찾음
    for (let i = 0; i < n; i++) {
      if (i != computer // 본인 제외
        && computers[i][computer] // 네트워크로 연결이 되어있어야함.
        && !visited[i]) { // 방문하지 않은 컴퓨터인 경우
        dfs(i);
      }
    }
  }

  // n개의 컴퓨터를 조회
  for (let i = 0; i < n; i++) {
    // 방문한 컴퓨터인 경우 넘어가기
    if (visited[i] === true) continue;

    // 방문하지 않은 컴퓨터인 경우 dfs 조회
    dfs(i);
    answer++;
  }
  return answer;
}

const n = 3;
const computers1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]];
const computers2 = [[1, 1, 0], [1, 1, 1], [0, 1, 1]];

console.log(solution(n, computers1));
console.log(solution(n, computers2));

function bfs_solution(n, computers) {
  let answer = 0;
  const visited = Array(n).fill(false);

  function bfs (computer) {
    visited[computer] = true;
    const queue = [computer]; // 탐색할 노드를 저장할 큐

    // 큐에 요소가 남아있는 동안 계속 추가, 삭제
    while (queue.length > 0) {
      computer = queue.shift();
      visited[computer] = true;

      for (let i = 0; i < n; i++) {
        if (i != computer && computers[i][computer] && !visited[i]) {
          queue.push(i);
          visited[i] = true;
        }
      }
    }
  }

  // n개의 컴퓨터를 조회
  for (let i = 0; i < n; i++) {
    // 방문한 컴퓨터인 경우 넘어가기
    if (visited[i] === true) continue;

    // 방문하지 않은 컴퓨터인 경우 dfs 조회
    bfs(i);
    answer++;
  }
  return answer;
}

console.log(bfs_solution(n, computers1));
console.log(bfs_solution(n, computers2));