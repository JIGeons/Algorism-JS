// 2024 KAKAO WINTER INTERNSHIP > 가장 많이 받은 선물
// 프로그래머스 level1

// 풀이 방식
// 1. friends의 길이로 2차원 배열을 생성
//    ( A[i][i] = 선물 지수,  A[i][j] = i가 j에게 선물을 준 횟수)
// 2. gifts 배열의 순서를 돌면서 이차원 배열의 선물지수와, 선물을 주고 받은 갯수를 저장
// 3. 각자 선물을 받은 갯수를 저장할 배열을 생성
// 4. 이중 반복문으로 선물 교환 -> MAX를 return;

function solution(friends, gifts) {
  // 2차원 배열을 생성
  let fArray = Array.from({length: friends.length}, () => Array(friends.length).fill(0));

  // 반복문을 돌면서 준 선물, 받은 선물, 선물 지수를 계산
  for (let i = 0; i < gifts.length; i++) {
    const gift = gifts[i].split(" "); // 배열로 분리
    const senderIndex = friends.indexOf(gift[0]);
    const receiverIndex = friends.indexOf(gift[1]);
    fArray[senderIndex][receiverIndex]++; // 선물을 준 횟수
    fArray[senderIndex][senderIndex]++; // 준 사람의 선물 지수 증가
    fArray[receiverIndex][receiverIndex]--; // 받은 사람의 선물 지수 감소;
  }

  // 각 친구들이 선물 받은 갯수를 새기위한 배열 생성
  const gift = Array(friends.length).fill(0);

  // 이중 반복문으로 선물 교환
  for (let i = 0; i < gift.length; i++) {
    for (let j = 0; j < gift.length; j++) {

      // i와 j가 같은 경우 본인이므로 continue
      if (i === j) continue;

      // i가 j에게 준 선물이 많은 경우 i가 선물을 받음
      if (fArray[i][j] > fArray[j][i]) {
        gift[i]++;
      }

      // i와 j가 동일하게 주고 받은 경우
      else if ( fArray[i][j] === fArray[j][i] ) {
        // i가 선물 지수가 높을 때 i에게 줌.
        if (fArray[i][i] > fArray[j][j]) gift[i] ++;
      }
    }
  }

  // 선물 받은 갯수를 내림차순 정렬
  gift.sort((a,b) => b-a);
  // 0번째를 반환한다.
  return gift[0];
}

const friends = ["muzi", "ryan", "frodo", "neo"];
const gifts = ["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"];

const friends1 = ["joy", "brad", "alessandro", "conan", "david"];
const gifts1 = ["alessandro brad", "alessandro joy", "alessandro conan", "david alessandro", "alessandro david"];

const friends2 = ["a", "b", "c"];
const gifts2 = ["a b", "b a", "c a", "a c", "a c", "c a"];

console.log(solution(friends, gifts));