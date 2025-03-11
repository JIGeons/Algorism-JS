// 깊이/너비 우선 탐색(DFS/BFS) > 여행경로
// 프로그래머스 level3

function solution(tickets) {
    let answer = [];
    const results = [];
    const visited = Array(tickets.length).fill(false);

    function dfs (idx, start, route, ticketsLeft) {
        // 1. 탈출 조건 (비행기 티켓을 모두 사용한 경우)
        if (idx == ticketsLeft.length) {
            results.push(route);
            return ;
        }

        // 2. 백트래킹 알고리즘 사용
        for (let i = 0; i < ticketsLeft.length; i++) {
            if (ticketsLeft[i][0] == start && !visited[i]) {
                visited[i] = true;  // 방문 확인
                dfs(idx + 1, ticketsLeft[i][1], route + " " + ticketsLeft[i][1], ticketsLeft);  // 다음 루트로 이동
                visited[i] = false; // 방문 취소
            }
        }
        return ;
    }

    // 2. 완전 탐색 및 정렬
    dfs (0, "ICN", "ICN", tickets);
    results.sort();
    console.log("results: " + results);

    // 3. 정답 출력
    answer = results[0].split(" ");
    return answer;
}

const tickets_1 = [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]];
const tickets_2 = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]];

console.log(solution(tickets_1));
console.log(solution(tickets_2));