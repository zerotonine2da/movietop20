// 1. 영화 20개 정보 가져오기 (제목, 내용요약, 평점, 이미지)
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2FjNmEzOTUwMzA4ODdlZjhkOTIzMTA3MjdlNDNmMyIsInN1YiI6IjY1MmYzZTUwMGNiMzM1MTZmNWNiN2RhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuoRLCdB6DN2YhTGYsYKMbHRoPO7m5nbSrvoLpp21do',
    },
};

const title_group = []; //영화 제목 20개
let data = {};
(async function () {
    try {
        const result = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=1',
            options
        ).then((response) => response.json());

        data = result.results;
        drawCard(data);
    } catch (error) {
        console.log(error);
    }
})();

//data:fetch로 가져온 데이터 (result.results)
function drawCard(data) {
    let attachCardList = document.querySelector('#cardList');
    attachCardList.innerHTML = data
        .map(
            (movie) => `
            <a class="cardContainer" id = ${movie.id}>
                <div class="top">
                    <div class="title"><strong>${movie.original_title}</strong></div>
                </div>

                <div class="img">
                    <div class="hoverTop">
                    <p class="p1"><strong>[제목]</strong> ${movie.original_title}</p>
                    <p class="p2"><strong>[평점]</strong> ${movie.vote_average}</p>
                </div>


                <div class="hoverBottom">
                    <p class="p3"><strong>[요약]</strong> ${movie.overview}</p>
                </div>

                <div class="imgFrame" id="imgFile">
                  <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.original_title}"  id : ${movie.id}')" />
                </div>
                </div>
            </a>
            `
        )
        .join('');
    attachCardList.addEventListener('click', clickCardImage); //사진 클릭시 영화 id값 보여주기
}

// 1. 이미지 클릭시 영화id값 보여주기
function clickCardImage({ target }) {
    if (target.matches('.cardContainer')) {
        alert(`영화 id: ${target.id}`);
    } else {
        alert(`영화 id: ${target.parentNode.id}`);
    }
}

// 2. 영화 검색 버튼 클릭 시 조회 조건
document.querySelector('#searchBtn').addEventListener('click', function () {
    doSearch();
});

// 3.검색
function doSearch() {
    let text = document.querySelector('#searchInput').value.toUpperCase();
    let cards = document.getElementsByClassName('top');

    let cardContainer = document.getElementsByClassName('innerDiv');

    let cnt = 0;
    for (let i = 0; i < cards.length; i++) {
        let titleName = cards[i].getElementsByClassName('title');

        if (titleName[0].innerHTML.toUpperCase().indexOf(text) > -1) {
            cardContainer[i].style.display = 'block';
            cnt++;
        } else {
            cardContainer[i].style.display = 'none';
        }
    }
    if (cnt == 0) {
        alert('검색 결과가 없습니다.');
    }
}

// 4.웹사이트 랜딩/새로고침 후 검색 입력란 커서 자동 위치
window.addEventListener('load', () => {
    document.getElementById('searchInput').focus();
});

// 5.키보드 enter => 검색기능
document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        doSearch();
    }
});
