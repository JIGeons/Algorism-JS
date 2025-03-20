// 코딩테스트 연습 > 해시 > 완주하지 못한 선수
// 프로그래머스 level1

function solution(participant, completion) {
  var answer = '';
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] != completion[i]) return participant[i];

  }
  return answer;
}