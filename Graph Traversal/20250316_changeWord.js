// 깊이/너비 우선 탐색(DFS/BFS) > 단어 변환
// 프로그래머스 level3

// 풀이 방식
// 1. 방문 노드를 표시하기 위해 visited 배열을 생성
// 2. 단어 변환 전 한개의 알파벳만 다른 단어를 찾는 함수 작성
// 3. dfs를 통해 알파벳을 변환하고, 가장 적은 cost를 정답으로 반환.


function solution(begin, target, words) {
  let answer = 50;
  const visited = Array(words.length).fill(false);

  function checkDiff(a, b) {
    let dif_cnt = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) dif_cnt++;
    }

    if (dif_cnt == 1) return true;  // 다른 문자가 1개인 경우

    return false;  // 다른 문자가 1개가 아닌 경우
  }

  function dfs(word, index) {
    if (answer <= index) return;

    if (word == target) {
      answer = Math.min(answer, index);
      return ;
    }

    for(let i = 0; i < words.length; i++){
      // 한개의 문자만 다르고 방문하지 않은 단어이면 탐색 시작
      if (checkDiff(word, words[i]) && !visited[i]) {
        visited[i] = true;
        dfs(words[i], index + 1); // 해당 단어부터 탐색을 다시 시작.
        visited[i] = false; // 백트래킹(방문 표시 해제)하여 다음 분기점부터 다시 탐색 시작
      }
    }
  }

  dfs(begin, 0);

  if (answer == 50) return 0;

  return answer;
}

const begin = "hit";
const target = "cog";
const words1 = ["hot", "dot", "dog", "lot", "log", "cog"];
const words2 = ["hot", "dot", "dog", "lot", "log"];

console.log(solution(begin, target, words1));
console.log(solution(begin, target, words2));

console.log(bfs_solution(begin, target, words1));
console.log(bfs_solution(begin, target, words2));

// (최단 경로를 찾는 문제이므로 bfs가 더 적합)
// 1. target이 words 배열 안에 있는지 확인하고 없으면 0을 반환
// 2. 큐를 사용해서 BFS 탐색 (queue가 빌 때까지 반복)
// 3. 현재 단어가 target인 경우 반환
function bfs_solution(begin, target, words) {
  // 두 단어의 차이가 1개인지 확인하는 함수
  function checkDiff(a, b) {
    let diffCount = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) diffCount++;
    }

    // 다른 문자가 한개인 경우 true, 한개가 아닌 경우 false 반환
    return diffCount === 1;
  }

  // target이 words에 없는 경우 0 반환
  if (!words.includes(target)) return 0;

  let queue = [[begin, 0]]; // [현재 단어, 변환 횟수]
  let visited = new Set();  // 방문한 단어 저장

  while (queue.length > 0) {
    let [word, count] = queue.shift();  // 현재 단어와 변환 횟수 가져오기

    if (word == target) return count; // target에 도달하면 count 반환

    for (let next of words) {
      if (!visited.has(next) && checkDiff(word, next)) {
        visited.add(next);  // 방문 처리
        queue.push([next, count + 1]);  // 큐에 추가
      }
    }
  }

  return 0; // 변환 할 수 없는 경우
}