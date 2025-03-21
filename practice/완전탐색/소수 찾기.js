// 코딩테스트 연습 > 완전탐색 > 소수 찾기
// 프로그래머스 level2

function solution(numbers) {
  var answer = 0;

  // 숫자 그룹 만들기
  function makeNumberGroup(numList) {
    // console.log("# numList: ", numList);
    const groupResult = new Set();  // 중복 그룹을 제거하기 위해 set을 사용

    if (numList.length == 1) return numList.map((num) => [num]);

    for (let i = 0; i < numList.length; i++) {
      const first = numList[i];
      groupResult.add(first);

      // 해당 숫자 이전, 이후 번호의 그룹을 찾음.
      const sliceBeforeList = numList.slice(0, i > 0 ? i : 0);
      // console.log("beforeList: ", sliceBeforeList);
      const sliceAfterList = numList.slice(i + 1, numList.length);
      const sliceNumList = [...sliceBeforeList, ...sliceAfterList];
      const numGroup = makeNumberGroup(sliceNumList);
      // console.log("numGroup: ", numGroup);
      numGroup.map ((num) => {
        groupResult.add(first + num);
      });
    }

    return Array.from(groupResult);
  }

  // 소수 찾기
  function getSosu(num) {
    // 0, 1은 수소가 아님
    if (num < 2) return false;

    // 나누어 떨어지는 경우 소수가 아니므로 false 반환
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i == 0) return false
    }

    // 나누어 떨어지지 않는 경우 소수이므로 true 반환
    return true;
  }

  const numberList = Array.from(numbers.split(''));
  const numberGroup = makeNumberGroup(numberList);

  console.log("numberGroup: ", numberGroup);
  // 중복 제거
  const numberSet = new Set();
  numberGroup.forEach((number) => numberSet.add(Number(number)));

  numberSet.forEach((number) => {
    if (getSosu(Number(number))) {
      console.log("소수: ", number)
      answer++;
    }
  });

  return answer;
}