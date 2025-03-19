// 2024 KAKAO WINTER INTERNSHIP > 도넛과 막대 그래프
// 프로그래머스 level2

// 풀이 방식
// 1. edges에서 최대값을 찾고 [0, 0]으로 이차원 배열 생성
//    (0번째는 out 간선의 갯수, 1번째는 in 간선의 갯수)
// 2. edges를 반복하여 들어오고 나가는 간선을 생성
// 3. 간선의 갯수에 따라 정점, 막대 그래프, 8자 그래프를 찾음
// 4. 정점에 연결되어있는 그래프의 갯수에서 막대 그래프, 8자 그래프의 갯수를 빼 도넛 그래프의 갯수를 구한다.

function solution(edges) {
  var answer = Array(4).fill(0);
  let maxNode = 0;

  // 노드와 엣지 중에 가장 큰 노드 찾기
  for (let [a, b] of edges) {
    maxNode = Math.max(maxNode, a, b);
  }
  console.log(maxNode);
  // 최대 노드 + 1만큼 2차원 배열 생성
  const nodes = Array.from({length: maxNode + 1}, () => [0, 0]);

  for(let i = 0; i < edges.length; i++) {
    const [node, edge] = edges[i];

    nodes[node][0]++;
    nodes[edge][1]++;
  }

  // console.log(nodes);

  for(let j = 1; j < nodes.length; j++) {
    const [ outCnt, inCnt ] = nodes[j];
    // 정점 번호 (out이 2개 이상, in이 없는 경우)
    if (outCnt >= 2 && inCnt === 0) answer[0] = j;

    // 막대 그래프 (in만 있고, out이 없는 경우)
    else if (outCnt === 0 && inCnt > 0) answer[2]++;
    // 8자 그래프 (in과 out이 각각 2개 이상인 경우)
    else if (outCnt >= 2 && inCnt >= 2) answer[3]++;
  }

  // 정점에 연결된 그래프의 갯수 - 막대 그래프의 갯수 - 8자 그래프의 갯수
  answer[1] = nodes[answer[0]][0] - answer[2] - answer[3];

  return answer;
}

const edges = [[2, 3], [4, 3], [1, 1], [2, 1]];
// console.log(solution(edges));

const edges2 = [[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]];
console.log(solution(edges2));