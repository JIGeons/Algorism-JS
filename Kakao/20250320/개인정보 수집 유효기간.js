// 2024 KAKAO BLIND RECRUITMENT > 개인정보 수집 유효기간
// 프로그래머스 level1

// 풀이 방식
// 1. terms를 Map 형식으로 변환
// 2. privacies를 반복문을 돌면서 유효기간의 마지막 날짜를 계산
// 3. 마지막 날자가 오늘 날짜와 같거나 작으면 파기

function solution(today, terms, privacies) {
  var answer = [];
  const endDate = new Map();
  const todayDate = new Date(today);

  for (let term of terms) {
    const [key, value] = term.split(" ");

    endDate.set(key, Number(value));
  }

  for (let i = 0; i < privacies.length; i++) {
    const [date, key] = privacies[i].split(" ");
    const privacyDate = new Date(date);
    privacyDate.setMonth(privacyDate.getMonth() + endDate.get(key));

    if (privacyDate <= todayDate)
      answer.push(i + 1);
  }

  return answer;
}


const today = "2022.05.19";
const terms = ["A 6", "B 12", "C 3"];
const privacies = ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"];

console.log(solution(today, terms, privacies));