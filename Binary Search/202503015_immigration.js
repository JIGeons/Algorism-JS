// 이분탐색 > 입국 심사
// 프로그래머스 level3

// 풀이 방식
// 1. 심사관 별 심사시간이 담긴 times 배열을 오름차순으로 정렬
// 2. left=0, right=times[times.length-1] * n(사람 수)로 설정
//     -> 내가 찾아야할 정답의 범위를 left ~ right로 정한다.
// 3. 이분탐색을 진행, 반복문의 제한은 left <= right
//     -> mid 시간동안 처리할 수 인원 수 계산.
//     -> 2. 여부를 따지면 left ~ right의 범위를 좁힌다.
// 4. left < right가 되면 반복문을 종료하고 답을 반환한다.

function solution(n, times) {
  times.sort((a, b) => a - b);  // 시간 오름차순 정렬
  // left와 rigth를 최소, 최대로 설정
  let left = 0;
  let right = times[times.length - 1] * n;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // mid 시간 동안 몇 명을 처리할 수 있는지 계산
    const sum = times.reduce((acc, cur) => {
      return acc + Math.floor(mid / cur);
    }, 0);

    // console.log("## sum: ", sum);
    // 처리 가능 여부에 따라 left, right 조정
    if (sum < n) {  // mid 시간동안 처리 가능한 인원 수가 n보다 작은 경우 최솟값 증가.
      left = mid + 1;
    } else {  // mid 시간동안 처리 가능한 인원 수가 n보다 크거나 같은 경우 최댓값 감소.
      right = mid - 1;
    }
  }

  return left;
}

const n = 6;
const times = [7, 10];

console.log(solution(n, times));