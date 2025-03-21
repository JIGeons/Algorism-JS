// 코딩테스트 연습 > 완전탐색 > 전력망 둘로 나누기
// 프로그래머스 level2

function solution(n, wires) {
  let min = n;

  function bfs(start, graph, visited) {
    let count = 1;
    const queue = [start];
    visited[start] = true;

    while (queue.length) {
      const node = queue.shift();
      console.log(graph[node]);
      for (let next of graph[node]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push(next);
          count++;
        }
      }
    }

    return count;
  }

  for (let i = 0; i < wires.length; i++) {
    // 간선 하나 제거
    const temp = wires.slice(0, i).concat(wires.slice(i + 1));

    // 그래프 초기화
    const graph = Array.from({ length: n + 1 }, () => []);
    for (let [a, b] of temp) {
      graph[a].push(b);
      graph[b].push(a);
    }

    console.log("graph: ", graph);

    // 방문 배열 초기화
    const visited = Array(n + 1).fill(false);

    // 임의의 노드(1)부터 연결된 노드 개수 확인
    const count = bfs(1, graph, visited);
    console.log("count: ", count);
    const diff = Math.abs(n - count - count); // |A - B| = |n - 2*A|

    min = Math.min(min, diff);
  }

  return min;
}
