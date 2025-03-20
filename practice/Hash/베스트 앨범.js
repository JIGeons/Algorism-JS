// 코딩테스트 연습 > 해시 > 베스트 앨범
// 프로그래머스 level3

function solution(genres, plays) {
  var answer = [];
  const genrePlay = [];
  const genreSet = new Set(genres);
  const genreArray = Array.from(genreSet);
  const obj = {};

  // 이차원 배열로 생성
  for (let i = 0; i < genres.length; i++) {
    obj[genres[i]] = (obj[genres[i]] || 0) + Number(plays[i]);
    genrePlay[i] = [genreArray.indexOf(genres[i]), plays[i], i];
  }

  // genrePlay 마지막에 sum을 추가
  for (let i = 0; i < genres.length; i++) {
    genrePlay[i].push(obj[genres[i]]);
  }

  genrePlay.sort((a,b) => {
    if (a[3] == b[3]) {
      return b[1] - a[1];
    } else {
      return b[3] - a[3];
    }
  })

  let genreIndex = -1;
  let cnt = 0;

  console.log(genrePlay);

  genrePlay.forEach((genre) => {
    if (genreIndex != genre[0]) {
      genreIndex = genre[0];
      cnt = 0;
    }

    if (cnt < 2) answer.push(genre[2]);
    cnt++;
  })

  console.log(answer);

  return answer;
}