// 연습문제 > 광물캐기
// 프로그래머스 level2

/**
 * 완전 탐색으로 코드 작성 시, 시간초과 오류에 걸리게 된다.
 * @param picks - 각 곡객이의 수 [dia, iron, stone] 구조로 이루어져있음.
 * @param minerals - "diamond", "iron", "stone" 3개의 문자열로 이루어진 배열
 * @returns {number} - 최소 피로도
 */
function solution (picks, minerals) {
    let answer = 0;
    const tired = [
        [1, 1, 1],  // 다이아 곡괭이
        [1, 1, 5],  // 철 곡괭이
        [1, 5, 25], // 돌 곡괭이
    ];

    // 배열의 총 곡갱이 개수를 계산
    let totalPicks = picks.reduce((sum, count) => sum + count, 0);
    const list = [];
    // 곡갱이 하나당 5번 연속으로 캐야하므로 광물 5개를 하나의 그룹으로 설정한다.
    for (let i = 0; i < minerals.length; i += 5) {
        if (totalPicks == 0 ) break;    // 모든 곡갱이를 다 사용한 경우

        let dia = 0, iron = 0, stone = 0;
        for (let j = i; j < i + 5; j++) {
            if (j == minerals.length) break;

            let mineral = minerals[j];
            let val = 0;
            switch (mineral) {
                case "diamond":
                    val = 2;
                    break;
                case "iron":
                    val = 1;
                    break;
                case "stone":
                    val = 0;
                    break;
            }

            dia += tired[0][val];
            iron += tired[1][val];
            stone += tired[2][val];
        }
        // 5개의 광물을 하나의 곡갱이로 캤을 때의 피로도를 list에 push
        list.push({dia: dia, iron: iron, stone: stone});
        totalPicks--;
    }

    // 돌 곡갱이 기준으로 내림차순 정렬
    // 돌곡갱이로 캤을 때 피로도가 가장 높은 광물들의 그룹을 첫번째로 둔다.
    list.sort((a, b) => b.stone - a.stone);
    for(let obj of list) {
        let dia = obj.dia;
        let iron = obj.iron;
        let stone = obj.stone;

        if (picks[0] > 0) {
            answer += dia;
            picks[0]--;
            continue;
        }
        if (picks[1] > 0) {
            answer += iron;
            picks[1]--;
            continue;
        }
        if (picks[2] > 0) {
            answer += stone;
            picks[2]--;
            continue;
        }
    }

    return answer;
}

// ✅ 실행 방법
const picks_1 = [1, 3, 2];  // 다이아 1개, 철 3개, 돌 2개
const minerals_1 = ["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"];

console.log(solution(picks_1, minerals_1));  // 실행

const picks_2 = [0, 1, 1];  // 다이아 1개, 철 3개, 돌 2개
const minerals_2 = ["diamond", "diamond", "diamond", "diamond", "diamond", "iron", "iron", "iron", "iron", "iron", "diamond"];

console.log(solution(picks_2, minerals_2));  // 실행

/**
 * 완전 탐색으로 코딩
 */
function getMinerals (picks, minerals) {
    let minTired = Infinity;    // 최소 피로도를 저장

    const tired = [
        [1, 1, 1],  // 다이아 곡괭이
        [1, 1, 5],  // 철 곡괭이
        [1, 5, 25], // 돌 곡괭이
    ];

    function dfs(idx, picksLeft, currentTired) {
        if (idx >= minerals.length || picksLeft.every(p => p === 0)) {
            minTired = Math.min(minTired, currentTired);
            return ;
        }

        for (let pickType = 0; pickType < 3; pickType++) {
            // 해당 곡괭이가 남아 있다면 선택
            if (picksLeft[pickType] > 0) {
                let newTired = 0;
                let newPicksLeft = [...picksLeft];
                newPicksLeft[pickType]--;   // 해당 곡괭이 사용

                // 현재 곡괭이로 다음 5개의 광물 캐기
                for (let i = idx; i < idx + 5 && i < minerals.length; i++) {
                    let mineralIdx = minerals[i] === "diamond" ? 2
                                                : minerals[i] === "iron" ? 1 : 0;
                    newTired += tired[pickType][mineralIdx];
                }

                // 다음 광물로 이동 (백트래킹)
                dfs(idx + 5, newPicksLeft, currentTired + newTired);
            }
        }
    }

    dfs(0, picks, 0);   // DFS 탐색 시작
    return minTired;
}

const picks_3 = [1, 3, 2];  // 다이아 1개, 철 3개, 돌 2개
const minerals_3 = ["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"];
const picks_4 = [0, 1, 1];  // 다이아 1개, 철 3개, 돌 2개
const minerals_4 = ["diamond", "diamond", "diamond", "diamond", "diamond", "iron", "iron", "iron", "iron", "iron", "diamond"];

console.log(getMinerals(picks_3, minerals_3));  // 실행
console.log(getMinerals(picks_4, minerals_4));  // 실행