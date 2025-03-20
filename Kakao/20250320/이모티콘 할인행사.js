// 2024 KAKAO BLIND RECRUITMENT > 이모티콘 할인 행사
// 프로그래머스 level2

function solution (users, emoticons) {
  // 중복 순열 구하기
  function Permutation(arr, selectNum) {
    const result = [];

    if (selectNum === 1) return arr.map((v) => [v]);

    arr. forEach((v, idx, arr) => {
      const fixed = v;
      const restArr = arr;
      const permutaionArr = Permutation(restArr, selectNum - 1);
      const combineFix = permutaionArr.map((v) => [fixed, ...v]);
      result.push(...combineFix);
    })

    return result;
  }


  const answer = [];
  const permutation = Permutation([10, 20, 30, 40], emoticons.length); // 할인율의 중복 순열 구하기

  // 각 조합 별로 구매자, 구독자를 구함.
  permutation.forEach((combi) => {
    let service = 0;  // 이모티콘 플러스 서비스 가입자
    const costs = Array(users.length).fill(0);  // 각 사용자 별 이모티콘 구입 비용

    combi.forEach((c, ci) => {
      users.forEach((user, ui) => {
        // 유저의 최소 구매 할인율이 이모티콘 할인율 이하면
        // costs 배열에 비용을 계산해서 저장
        if (user[0] <= c)
          costs[ui] += emoticons[ci] * ((100 - c) / 100);
      });
    });

    // costs 배열에서 각 원소가 유저의 최대 비용을 넘으면 이모티콘 구매 비용에 더하기
    // 넘지 않으면 이모티콘 플러스 서비스 가입자 증가
    let sum = 0;
    for (let i = 0; i < costs.length; i++) {
      if (costs[i] < users[i][1]) {
        sum += costs[i];
      } else {
        service++;
      }
    }
    answer.push([service, sum]);  // 정답 배열에 추가
  });

  // 이모티콘 플러스 서비스 가입자 순으로 내림차순
  // 가입자가 같은 경우 판매 금액으로 내림 차순
  answer.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    else if (a[0] > b[0]) return b[0]-a[0];
  });

  console.log(answer);

  return answer[0];
}


const users = [[40, 10000], [25, 10000]];
const emoticons = [7000, 9000];
console.log(solution (users, emoticons));

const users1 = [[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]];
const emoticons1 = [1300, 1500, 1600, 4900];
console.log(solution (users1, emoticons1));