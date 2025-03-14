// 2018 KAKAO BLIND RECRUITMENT > [3차] 파일명 정렬
// 프로그래머스 level2

// 풀이 방식
// 1. file의 헤드, 넘버, 테일을 각각 분리한다.
// 2. 정렬 수행을 하는데 head가 같은 경우 number로 정렬을 한다.
// 3. 문자열을 합쳐서 정답 출력

// 다른 사람의 풀이 방식
// 1. 정규식을 사용하여 head와 number를 분리
// 2. head와 num을 비교해서 정렬
// 3. 정렬된 files에서 본문 출력

function solution(files) {
  const filesList = files.map(file => {
    let head = '';
    let number = '';
    let tail = '';
    for (let i = 0; i < file.length; i++) {
      // number가 존재하지 않고, 0-9의 문자가 아닌 경우 head에 추가
      if (!number && !/[0-9]/.test(file[i])) {
        head += file[i];
      }
      // head가 존재하고, 숫자가 나오면 number에 추가 (최대 5자까지)
      else if (head && /[0-9]/.test(file[i]) && (number.length < 5) ) {
        number += file[i];
      }
      // head와 number가 채워진 후 나머지 문자열은 tail로 한다.
      else {
        tail = file.slice(i);
        break;
      }
    }

    return { head: head, number: number, tail: tail };
  });

  filesList.sort((a, b) => {
    // head가 같은 경우
    if (a.head.toLowerCase() === b.head.toLowerCase()) {
      return Number(a.number) - Number(b.number); // 숫자로 오름 차순정렬
    } else {
      // 소문자로 변환해서 비교
      return a.head.toLowerCase().localeCompare(b.head.toLowerCase());
    }
  });

  const fileList = filesList.map(file => {
    return '' + file.head + file.number + file.tail;
  });

  console.log(fileList);

  return fileList;
}

const files1 =  ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"];
const files2 = ["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"];

// solution(files1);

// solution(files2);

function another_solution(files) {
  // ([a-zA-Z-\. ]+) HEAD: 문자(대소문자), -, ., 공백 포함 (1개 이상)
  // ([0-9]{1,5}) NUMBER: 숫자 (1~5자리까지만 허용)
  // (.*) TAIL: 나머지 모든 문자열
  const reg = /^([a-zA-Z-\. ]+)([0-9]{1,5})(.*)$/;
  const fileList = [];

  // 파일명을 정규식으로 분리 fileList에 저장.
  files.forEach((file, index) => {
    let [fileName, head, num] = file.match(reg);
    fileList.push({fileName, head: head.toLowerCase(), num: parseInt(num), index});
  });

  // 파일 이름 정렬
  return fileList.sort((a, b) => {
    // head가 같은 경우 number로 오름차순 정렬
    if (a.head == b.head) {
      return a.num - b.num;
    }
    // head를 비교해서 정렬
    else {
      return a.head.localeCompare(b.head);
    }
  }).map(file => file.fileName);  // 정렬된 파일 리스트의 이름만 출력
}

console.log(another_solution(files1));
console.log(another_solution(files2));