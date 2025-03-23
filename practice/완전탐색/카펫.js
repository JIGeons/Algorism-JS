// 코딩테스트 연습 > 완전탐색 > 카펫
// 프로그래머스 level2

function solution(brown, yellow) {
  let answer = [3, 3];

  // 가로 + 세로의 값을 구함
  let nmsum = (brown + 4) / 2;

  // 가로가 세로보다 더 길기 때문에 세로를 중심으로 반복문 순환
  for (let m = 3; m <= (nmsum - m); m++) {
    let n = nmsum - m;  // 가로의 길이 계산
    let yellowCnt = (n - 2) * (m - 2);  // 노란 카펫의 갯수 개산

    // yellowCnt의 값이 커지면 패스
    if (yellowCnt > yellow) continue;
    answer = [n, m];
  }

  return answer;
}