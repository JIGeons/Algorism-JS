// 코딩테스트 연습 > 완전탐색 > 모의고사
// 프로그래머스 level1

function solution(answers) {
  var answer = [];

  // 응시자의 정답 패턴 작성
  const one = [1,2,3,4,5];
  const two = [2,1,2,3,2,4,2,5];
  const three = [3,3,1,1,2,2,4,4,5,5];

  // 응사자 마다 맞춘 정답 수를 저장할 배열
  const max = [[0,1], [0,2], [0,3]];

  // 채점
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    if (one[i % one.length] == answer) max[0][0]++;
    if (two[i % two.length] == answer) max[1][0]++;
    if (three[i % three.length] == answer) max[2][0]++;
  }

  // 정답 갯수로 내림차순 배열
  max.sort((a, b) => b[0] - a[0]);
  const maxCorrect = max[0][0];

  // 가장 많이 맞춘 응시자를 answer 배열의 삽입
  max.forEach((user) => {
    if (user[0] == maxCorrect) answer.push(user[1]);
  });

  // 응시자를 오름차순 정렬로 반환
  return answer.sort((a, b) => a-b);;
}