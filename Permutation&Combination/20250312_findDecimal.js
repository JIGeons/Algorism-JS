// 연습문제 > 소수 찾기
// 프로그래머스 level1

function solution(n) {
  var answer = 0;

  // 소수 찾기
  function isPrime(x) {
    for (let i = 2; i <= Math.sqrt(x); i++) {
      if (x % i === 0) return false;
    }
    return true;
  }

  // 2부터 n까지 조회
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) answer++;
  }
  return answer;
}

function useSetSolution(n) {
  const s = new Set();
  // 2를 제외한 짝수는 소수가 아니므로 홀수만 필터링
  for(let i=1; i<=n; i+=2){
    s.add(i);
  }
  s.delete(1);  // 1은 소수가 아니므로 제거
  s.add(2); // 2는 소수이므로 추가
  /**
   * 에라토스테네스의 체 알고리즘을 이용한 소수 판별
   * j는 3부터 루트 n까지 증가하면서 s에 포함된 경우(소수) 필터링을 수행
   * 문제점: j < Math.sqrt(n) 대신 j <= Math.sqrt(n)로 수정해야 한다.
   * j가 소수라면, j의 배수 (j*2, j*3, ...)들을 s에서 제거한다.
   * 그러나 j*2가 아닌 j*j부터 시작해야 중복 제거를 줄일 수 있다.
   */
  for(let j=3; j <= Math.sqrt(n); j+=2){
    if(s.has(j)){
      for(let k= j*j; k <= n; k += j){
        s.delete(k);
      }
    }
  }
  return s.size;
}