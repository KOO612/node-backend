const axios = require('axios');

async function getTop() {
  const url = 'https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json';
  try {
    // 네트워크에서 데이터를 받아오므로 await로 기다림
    const result = await axios.get(url);
    const { data } = result;

    // data 또는 articleList 없을 때 예외 처리
    if (!data.articleList || data.articleList.size == 0) {
      throw new Error('데이터 없음');
    }
    // data 에서 필요한 영화 제목과 순위 정보를 뽑아냄
    const movieInfos = data.articleList.map((article, idx) => {
      return { title: article.title, rank: idx + 1 };
    });

    // 데이터 출력
    for (let movieinfo of movieInfos) {
      console.log(`[${movieinfo.rank}위] ${movieinfo.title}`);
    }
  } catch (error) {
    throw new Error();
  }
}

// await를 함수 안에서만 사용 가능하므로 함수를 하나 생성해 실행
getTop();
