// TO DO LIST 구현

// 1. list 추가/삭제/수정/완료 기능 구현 할 것

// 2. 상단에 오늘 날짜가 나오게 할 것

// 3. list를 추가할 때마다 작성 시간이 나오게 할 것

// 4. 할 일 등록시 목표 날짜와 시간을 입력할수 있게 할 것

// 5. 할 일 목록을 DB에 저장시킴 (firebase사용 혹은 DB 직접 연동해도 됨)

///// 할 일을 추가하는 함수 (Main) /////
function addTask() {
    // 할 일과 목표 날짜 및 시간을 입력필드에서 JS로 갖고 옴
    const taskInput = document.getElementById('task');  // id = task 를 갖고 옴
    const dueDateInput = document.getElementById('dueDate');  // id = dueDate 를 갖고 옴
    const taskText = taskInput.value;  // taskInput 의 값을 갖고 옴
    const dueDate = dueDateInput.value;  // dueDateInput 의 값을 갖고 옴

    // date 형식을 써서 date 객체 사용해서 다른 형식으로 출력하는 방법을 적용해보자

    // 할 일이 비어있는지 확인하고 알림 표시
    if (taskText === '') {
        alert('할 일을 입력하세요.');
        return;
    }

    ///// 입력 기능 /////
    const taskList = document.getElementById('taskList');  // id 가 taskList인 할 일 목록을 갖고 옴
    const li = document.createElement('li');  // 새로운 할 일 li 요소 생성
    const taskLabel = document.createElement('label');  // 할 일 내용을 표시하는 label 요소 생성
    taskLabel.textContent = taskText;

    // 작성 시간 구현 기능
    const currentTime = new Date();  // 현재 시간을 표시
    const timeLabel = document.createElement('label');
    timeLabel.textContent = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // 목표 날짜와 시간 입력 기능
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = '목표 날짜 : ' + dueDate;

    // 목표 날짜와 시간에서 "T" 문자 제거 (ISO 8601 형식에서 날짜와 시간을 구분하기 위해 T 생성)
    dueDateLabel.textContent = '목표 날짜 : ' + dueDate.replace('T', ' ');
    
    ///// 완료 기능 /////
    // 완료 버튼
    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';

    // 완료 버튼을 클릭시 토글(on off) 발생 (css 적용 줄긋기)
    completeButton.onclick = () => {
        taskLabel.classList.toggle('completed');
    };
    
    ///// 수정 기능 /////
    // 수정 버튼
    const editButton = document.createElement('button');
    editButton.textContent = '수정';

    // 수정 버튼 클릭시 수정 입력 필드로 변경
    editButton.onclick = () => {
        const taskText = taskLabel.textContent;
        const taskInput = document.createElement('input');
        li.replaceChild(taskInput, taskLabel);

        // 수정 입력 필드에서 포커스가 빠져나갈 때 업데이트
        taskInput.addEventListener('blur', () => {
        const updatedTaskText = taskInput.value;
        if (updatedTaskText !== '') {
            taskLabel.textContent = updatedTaskText;
        }
        li.replaceChild(taskLabel, taskInput);  // 수정된 할 일로 교체
        });
        // 할 일 입력 필드로 변경
        taskInput.focus();
    };

    ///// 삭제 기능 /////
    // 삭제 버튼
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';

    // 삭제 버튼 클릭시 할 일 삭제
    deleteButton.onclick = () => {
        li.remove();
    };

    // 각 요소를 할 일에 추가
    li.appendChild(taskLabel);
    li.appendChild(timeLabel);
    li.appendChild(dueDateLabel);
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // 할 일 목록에 할 일 추가
    taskList.appendChild(li);

    // 값 입력 완료시 입력 필드 초기화(공백)
    taskInput.value = '';  // 할 일
    dueDateInput.value = '';  // 목표 날짜 및 시간
}
// 한 덩어리로 각각 생성해서 리스트 출력하기 (배열로)