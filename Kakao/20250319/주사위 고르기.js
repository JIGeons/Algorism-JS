// 2024 KAKAO WINTER INTERNSHIP > 주사위 고르기
// 프로그래머스 level3

// 풀이 방식
// 1. 내가 고를 수 있는 주사위의 조합을 만들기
// 2. 나의 조합과 반대되는 상대방의 조합 만들기
// 3. 나의 조합, 상대방의 조합의 합을 각각 하나의 리스트로 만들기
// 4. 이중 반복문으로 나의 합과 상대합을 비교 후 승리 횟수 계산
// 5. 가장 높은 승리 횟수의 조합은 return

function solution(dice) {
  // 주사위 조합 만들기
  function choiceDices(array, selectDicesCnt) {
    const results = [];

    if (selectDicesCnt === 1)
      return array.map((element) => [element]);

    array.forEach((fixed, index, origin) => {
      const myDice = origin.slice(index + 1);
      const combinations = choiceDices(myDice, selectDicesCnt - 1);
      const attached = combinations.map(combination => [fixed, ...combination]);
      results.push(...attached);
    });

    return results;
  }

  // 주사위 조합에서 나올 수 있는 합을 모두 구하고 일차원 배열로 반환
  function getSums (combo) {
    const sums = [];

    const calSums = (count, sum) => {
      if (count === groupSize) {
        sums.push(sum);
        return;
      }

      for (let i = 0; i < 6; i++) {
        calSums(count + 1, sum + dice[combo[count]-1][i]);
      }
    }

    calSums(0,0);

    return sums.sort((a,b) => a - b);
  }

  // 주사위 group을 설정하기 위해 각 index로 주사위 표시
  const dices = dice.map((value, index) => { return index + 1 });
  const groupSize = Math.floor(dices.length / 2); // 인당 가져갈 주사위의 갯수

  const myGroup = choiceDices(dices, groupSize);      // 내 주사위 조합 고르기
  const oppoGroup = myGroup.map((elemtA) => {     // 내가 고른 주사위의 조합을 제외한 나머지 조합 구하기
    return dices.filter(elemtB => !elemtA.includes(elemtB))
  });

  let answer;
  let wins = 0;
  const groupLen = myGroup.length;  // 조합의 길이

  // 내 조합의 합계와 상대 조합의 합계를 비교
  for (let k = 0; k < groupLen; k++) {
    let nowWins = 0;

    // 나와 상대방의 합계를 각각 리스트로 만듬
    const sumA = getSums(myGroup[k]);
    const sumB = getSums(oppoGroup[k]);

    const len = sumA.length;

    // 비교할 값의 위치를 표시하기 위한 포인터
    let pointer = 0;

    // 나와 상대방의 합계 비교
    for (let i = 0; i < len; i++) {
      // 포인터 이전은 이미 이긴 숫자.
      for (let j = pointer; j < len; j++) {
        // 나의 합계가 상대방의 합계보다 작은면 포인터 이동
        if (sumA[i] <= sumB[j]) {
          pointer = j;
          break;
        }

        nowWins++;  // 승리 횟수 추가
      }
      nowWins += pointer; // pointer까지는 모두 이긴 숫자이므로 횟수로 추가
    }

    // 이번 조합의 이긴 횟수가 이전 조합의 이긴 횟수보다 큰 경우 wins update
    if (nowWins > wins) {
      wins = nowWins;
      answer = myGroup[k];
    }
  }


  return answer;
}

const dice = [[1, 2, 3, 4, 5, 6], [3, 3, 3, 3, 4, 4], [1, 3, 3, 4, 4, 4], [1, 1, 4, 4, 5, 5]];

console.log(solution(dice));