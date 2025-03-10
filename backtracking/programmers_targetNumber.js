// 깊이/너비 우선 탐색(DFS/BFS) > 타겟 넘버
// 프로그래머스 level2

// 내가 짠 코드
function solution(numbers, target) {
    let answer = 0;

    const calcNumber = (arr, result) => {
        if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const plus = parseInt(`+${arr[i]}`, 10);
                const minus = parseInt(`-${arr[i]}`, 10);
                const copyArr = [...arr];
                copyArr.splice(i, 1);
                calcNumber(copyArr, result + plus);
                calcNumber(copyArr, result + minus);
            }
        }
        // arr의 길이가 1이거나 0인 경우
        else if (arr.length == 1) {
            const plus = parseInt(`+${arr[0]}`, 10);
            const minus = parseInt(`-${arr[0]}`, 10);
            if (result + plus == target) answer++;
            if (result + minus == target) answer++;
        }
    }

    calcNumber(numbers, 0);
    return answer;
}

// 정답
function solutionAnswer(numbers, target) {
    let answer = 0;
    const length = number.length;

    function dfs (count, sum) {
        if (count == length) {
            if ( target == sum ) {
                answer++;
            }

            return ;
        }

        dfs(count + 1, sum + numbers[count]);
        dfs(count + 1, sum - numbers[count]);
    }

    dfs(0,0);

    return answer;
}