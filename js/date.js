// 페이지 상단 오늘 날짜 구현 기능 (년 월 일)

const dateElement = document.getElementById('date');

function displayDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('ko-KR', options);
    }

// 페이지 로드 시 오늘 날짜 표시
displayDate();