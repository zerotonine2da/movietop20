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

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((response) => {
        // let results = response.results; //api에서 가져온 영화 리스트 20개 (배열 안 객체)
        let map_arr = response.results.map((v) => v);

        map_arr.forEach((x, i) => {
            title_group.push(x['originalTitle']);

            const temp01 = document.createElement('div');
            temp01.className = 'innerDiv';

            let index = i + 1;
            let id = x['id'];
            let originalTitle = x['original_title'];
            let overview = x['overview'];
            let vote_average = x['vote_average'];
            let baseUrl = 'https://image.tmdb.org/t/p/original';
            let posterPath = baseUrl + x['poster_path'];

            temp01.innerHTML = `
            <a class="cardContainer">
    <div class="top">
        <div class="title"><strong>${originalTitle}</strong></div>
        <div class="index">${index}</div>
    </div>
    <div class="img">
        <div class="hoverTop">
            <div class="idBtn" ><button class="idBtn01" onclick="alert('영화 Id: ${id}')">영화 id 보기</button> </div>
            <p class="p1"><strong>[제목]</strong> ${originalTitle}</p>
            <p class="p2"><strong>[평점]</strong> ${vote_average}</p>
        </div>
        <div class="hoverBottom">
            <p class="p3"><strong>[요약]</strong> ${overview}</p>
        </div>

        <div class="imgFrame" id="imgFile">
            <img src="${posterPath}" alt="${originalTitle}" onclick="alert('[${originalTitle}] id : ${id}')" />
        </div>
    </div>
</a>
        
        
            `;

            document.querySelector('#cardList').append(temp01);
        });
    })
    .catch((err) => console.error(err));

// 2. 영화 검색 버튼 클릭 시 조회 조건
document.querySelector('#searchBtn').addEventListener('click', function () {
    Search();
});

// 3.검색
function Search() {
    let text = document.querySelector('#searchInput').value.toUpperCase();
    let cards = document.getElementsByClassName('top');
    let cardContainer = document.getElementsByClassName('innerDiv');

    for (let i = 0; i < cards.length; i++) {
        let titleName = cards[i].getElementsByClassName('title');

        if (titleName[0].innerHTML.toUpperCase().indexOf(text) > -1) {
            cardContainer[i].style.display = 'block';
        } else {
            cardContainer[i].style.display = 'none';
        }
    }
    console.log(cnt);
}

// 4.웹사이트 랜딩/새로고침 후 검색 입력란 커서 자동 위치
window.addEventListener('load', () => {
    document.getElementById('searchInput').focus();
});

// 5.키보드 enter => 검색기능
document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        Search();
    }
});
