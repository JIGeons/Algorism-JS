// 이분탐색 > 징검다리
// 프로그래머스 level4

// 풀이 방식
// 1. 바위를 오름차순으로 정렬
// 2. 이분탐색을 이용해 제거해야하는 바위의 갯수를 계산
// 3. 제거해야하는 바위의 갯수가 작거나 같으면 최솟값 증가
//    제거해야하는 바위의 갯수가 크면 최댓값 감소
// 4. 최솟값이 최댓값보다 커지면 정답 반환.

function solution(distance, rocks, n) {
  var answer = 0;

  // mid가 바위(지점) 간 최소 거리가 되어야 함.
  // 그렇게 하기 위해 제거 해야할 바위의 개수를 리턴한다.
  function getRemovedRockCnt(mid) {
    let before = 0;
    let end = distance;

    let removeCnt = 0;
    for (let i = 0; i < rocks.length; i++) {
      // 현재, 이전 바위와의 거리가 중간 거리보다 작으면 제거
      if (rocks[i] - before < mid) {
        removeCnt++;
        continue;
      }
      // 크거나 같으면 제거하지 않음.
      before = rocks[i];
    }

    // 도착 지점과 이전 바위 거리 비교
    if(end - before < mid) removeCnt++;

    // 제거 해야하는 바위의 갯수를 리턴
    return removeCnt;
  }

  rocks.sort((a, b) => a - b);  // 오름차순 정렬
  let left = 1;
  let right = distance;
  while(left <= right) {
    let mid = Math.floor((left + right) / 2);
    // 제거해야하는 바위 갯수 카운트
    const rockCnt = getRemovedRockCnt(mid);
    if (rockCnt <= n) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return answer;
}

const distance = 25;
const rocks = [2, 14, 11, 21, 17];
const n = 2;

console.log(solution(distance, rocks, n));