// 코딩테스트 연습 > 완전탐색 > 최소 직사각형
// 프로그래머스 level1

function solution(sizes) {
  let x = [];
  let y = [];

  // 2차원 -> 1차원 분리
  for (let i = 0; i < sizes.length; i++) {
    const [w, h] = sizes[i];

    // 긴 부분을 x, 짧은 부분을 y로 입력
    x.push(Math.max(w, h));
    y.push(Math.min(w, h));
  }

  // 내림차순 정렬
  x.sort((a, b) => b-a);
  y.sort((a, b) => b-a);

  // 가장 긴 x와 y를 곱한다.
  return x[0] * y[0];
}