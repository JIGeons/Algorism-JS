// 코딩테스트 연습 > 해시 > 포켓몬
// 프로그래머스 level1

function solution(nums) {
  var answer = 0;
  const max = nums.length / 2;
  const set = new Set();

  for (let i of nums)
    set.add(i);

  if (max >= set.size) answer = set.size;
  else answer = max;

  return answer;
}