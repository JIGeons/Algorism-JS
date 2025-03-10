// 완전텀색 > 소수 찾기
// 프로그래머스 level2 - 소수찾기
function solution(numbers) {
    const answer = [];
    let nums = numbers.split("");

    // 소수 구하기
    const isPrimeNumber = (number) => {
        if (number <= 1) return false;
        for(let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) return false;
        }
        return true;
    }

    // 순열 만들기
    const getPermutation = (arr, fixed) => {
        if (arr.length >= 1) {
            for (let i = 0; i < arr.length; i++) {
                const newNum = fixed + arr[i];
                const copyArr = [...arr];
                copyArr.splice(i, 1);   // 첫번째 ~ i번째 숫자 제거
                if (!answer.includes(+newNum) && isPrimeNumber(+newNum)) {
                    answer.push(+newNum);   // 소수인 경우 answer 배열에 추가
                }
                getPermutation(copyArr, newNum);    // 재귀 호출
            }
        }
    }

    getPermutation(nums, '');
    return answer.length;
}