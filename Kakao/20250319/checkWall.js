// 2020 KAKAO BLIND RECRUITMENT > 외벽 점검
// 프로그래머스 level3

// 풀이 방식 (dfs)
// 1. 1시간 동안 친구가 갈 수 있는 거리를 내림차순 정렬 -> 최대한 적은 친구를 보내기 위함
// 2. 취약지점 첫 번째부터 시작해서 갈 수 있는 취약지점을 제거
// 3. 최소를 반환

function solution(n, weak, dist) {
  let answer = dist.length + 1;

  const reverseDist = dist.sort((a, b) => b - a);

  function dfs(weakList, count) {
    // 취약 지점을 방문한 경우 최솟값 비교 후 종료
    if (weakList.length === 0) {
      answer = answer > count ? count : answer;
      return ;
    }

    // count와 dist의 길이가 같은 경우 모든 친구가 점검 한 것이므로 종료
    // count와 answer이 같은 경우 해당 케이스는 가능성이 없는 케이스이므로 종료
    if (count === dist.length || count === answer) return;

    let newWeakList = [];

    // 시계 방향으로 검색
    for (let i = 0; i < weakList.length; i++) {
      let start = weakList[i];  // 친구의 출발 위치
      let end = start + reverseDist[count]; // 친구의 도착 위치
      // console.log(`start: ${start}, end: ${end}`);

      // start와 end사이의 외벽을 리스트에서 제거
      if (end < n)  newWeakList = weakList.filter(point => start > point || point > end )
      else newWeakList = weakList.filter(point => end % n < point && point < start );
      // console.log("newWeakList: ", newWeakList);

      dfs(newWeakList, count + 1);
    }
  }

  dfs([...weak], 0);

  return answer !== dist.length + 1 ? answer : -1;
}

const n = 12;
const weak1 = [1, 5, 6, 10];
const dist1 = [1, 2, 3, 4];

const weak2 = [1, 3, 4, 9, 10];
const dist2 = [3, 5, 7];

const n3 = 50;
const weak3 = [1, 2, 3, 4, 5, 6, 30, 33, 36];
const dist3 = [6, 2, 2];

console.log("@ answer:: ", solution(n, weak1, dist1));
console.log("@ answer:: ", solution(n, weak2, dist2));

console.log("@ answer:: ", solution(n3, weak3, dist3));