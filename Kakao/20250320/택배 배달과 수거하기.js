// 2024 KAKAO BLIND RECRUITMENT > 택배 배달과 수거하기
// 프로그래머스 level2

// 풀이 방식
// 1. for문을 사용하여 마지막 집부터 배달하기
// 2. cap의 크기 만큼 배달과 수거를 반복
// 3. 왕복한 거리만큼 정답 수 증가.

function solution(cap, n, deliveries, pickups) {
  var answer = 0;
  //트럭 하나로 모든 배달과 수거를 마치고 물류창고까지 돌아올 수 있는 최소 이동 거리를 return 

  let d = 0;
  let p = 0;
  // 마지막 집부터 방문
  for(let i=n-1; i>=0; i--){
    d -= deliveries[i]; // 배달을 하고
    p -= pickups[i];    // 수거를 한다.

    while(d < 0 || p < 0){
      d += cap;
      p += cap;
      answer += (i+1)*2;
    }
  }

  return answer;
}