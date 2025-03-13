// 2019 카카오 개발자 겨울 인턴십 > 불량 사용자
// 프로그래머스 level3

// 풀이 방식
// 1. banned_id를 정규 표현식으로 변경
// 2. 해당 아이디가 선택되었는지 확인
// 3. 선택이 된 적이 없는 경우 아이디 비교
// 4. 아이디가 일치하는 경우 다음 dfs 실행

function solution(user_id, banned_id) {
  const visited = Array(user_id.length).fill(false);  // 방문 확인을 위해 배열 생성
  const regex = banned_id.map(id => new RegExp(`^${id.replaceAll('*','.')}$`)); // banned_id를 정규 표현식으로 변경
  const set = new Set();  // 제제 아이디를 넣은 set

  function dfs ( index = 0, arr = [] ) {
    // banned_id.length 만큼 조합을 찬은 경우 set에 추가하고 return;
    if (index === banned_id.length) {
      set.add(arr.sort().join(","));  // 중복된 조합을 제거하기 위해 sort 하고 add set은 add시 중복된 데이터는 추가하지 않는다.
      return ;
    } else {
      for (let i = 0; i < user_id.length; i++) {
        // 해당 문자를 방문했는지 확인
        if (visited[i]) continue;

        // 문자가 일치하는지 확인
        if (user_id[i].match(regex[index])) {
          visited[i] = true;  // 일치하는 경우 방문 처리
          dfs(index + 1, [...arr, user_id[i]]);
          visited[i] = false; // 다음 문자를 확인하기 위해 방문 해제
        }
      }
    }
  };

  dfs();

  return set.size;
}


const userIdList1 = ["frodo", "fradi", "crodo", "abc123", "frodoc"];
const bannedIdList1 = ["fr*d*", "abc1**"];

console.log(solution(userIdList1, bannedIdList1));

const userIdList2 = ["frodo", "fradi", "crodo", "abc123", "frodoc"];
const bannedIdList2 = ["*rodo", "*rodo", "******"];

console.log(solution(userIdList2, bannedIdList2));

const userIdList3 = ["frodo", "fradi", "crodo", "abc123", "frodoc"];
const bannedIdList3 = ["fr*d*", "*rodo", "******", "******"];

console.log(solution(userIdList3, bannedIdList3));