// 코딩테스트 연습 > 해시 > 의상
// 프로그래머스 level2

function solution(clothes) {
  const clothesSet = new Set();

  for (let i = 0; i < clothes.length; i++) {
    clothesSet.add(clothes[i][1]);
  }

  const clothArray = Array.from(clothesSet);
  const clothCnt = Array(clothArray.length).fill(1);

  for (let i = 0; i < clothes.length; i++) {
    let index = clothArray.indexOf(clothes[i][1]);
    clothCnt[index]++;
  }

  let answer = 1;
  for (let i = 0; i < clothCnt.length ; i++)
    answer *= clothCnt[i];


  console.log(clothCnt);
  return answer-1;
}