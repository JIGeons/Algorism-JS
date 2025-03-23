// 코딩테스트 연습 > 완전탐색 > 피로도
// 프로그래머스 level2

function solution(k, dungeons) {
  var answer = -1;
  const visited = Array(dungeons.length).fill(false);

  let max = 0;

  function dfs(depth, k) {
    // 최대 깊이 기록
    max = Math.max(max, depth)

    for (let i = 0; i < dungeons.length; i++) {
      // 던전을 방문하지 않았고, 피로도가 충분한 경우
      if (!visited[i] && k >= dungeons[i][0]) {
        visited[i] = true;  // 던전 방문 체크
        dfs(depth + 1, k - dungeons[i][1]);
        visited[i] = false; // 던전 방문 해제
      }
    }
  }

  dfs(0, k);

  return max;
}