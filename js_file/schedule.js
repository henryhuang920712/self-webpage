let checks = document.querySelectorAll('#calendar .check-btn');
let screen = null;
//console.log(checks.length);
checks.forEach(function(check) {
    check.addEventListener('click', function() {
        nowCalendar = check.getAttribute('data-bs-target');
        screen = document.querySelector(nowCalendar);
        editable(screen);
    });
});

function matchTarget(event, list) {
    let result = null;
    list.forEach(function (item) {
        if (event.target === item) {
            result = item;
        }
        else if (item.contains(event.target)) {
            result = item;
        }
    })
    return result;
}

function renewData(type, inlist) {
    let menu = `<li><a class="dropdown-item">Add items</a></li>`;
    let inputText = "";
    if (type === "courses") {
        inlist.forEach(function (course) {
            menu += `<li><a class="dropdown-item">${course}</a></li>`;
        })
        inputText = "course-input";
    }
    if (type === "classrooms") {
        inlist.forEach(function (classroom) {
            menu += `<li><a class="dropdown-item">${classroom}</a></li>`;
        })
        inputText = "classroom-input";
    }
    refer = `<button class="btn btn-outline-secondary dropdown-toggle table-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">${type}</button>
    <ul class="dropdown-menu">${menu}
    </ul>
    <input type="text" class="form-control w-100 ${inputText}" aria-label="Text input with dropdown button">`;
    return refer;
}

function editable(screen) {
    let blocks = screen.querySelectorAll('table td');
    let classrooms = [];
    let courses = [];
    let colours = ["#C0362C", "#FF8642", "#F4DCB5", "#816C5B", "#C3B7AC", "#E7D3E7", 
                    "#668D3C", "#B1DDA1", "#0097AC", "#3CD6E6", "#007996", "#A8C879", 
                "#678FAE", "#ADA759", "#5AA08D"];
    let saveChanges = screen.querySelector(".save-changes");
    let close = screen.querySelector(".close-modal");
    let hasSaved = false;
    
    screen.addEventListener('click', function (event) {
        let allMenu = screen.querySelectorAll("li > a");
        let result = matchTarget(event, blocks);

        if (result != null) {  // 如果點到任何td
            if (result.querySelectorAll(".input-group").length === 0) {  // 如果現在td裡面沒有input
                previousInput = result.querySelectorAll(".table-text");
                let textStore = [];
                previousInput.forEach(function (item) {
                    textStore.push(item.textContent);
                })

                result.innerHTML = "";
                result.style.backgroundColor = "white";
                let course = document.createElement('div');
                let classroom = document.createElement('div');
                course.setAttribute("class", "input-group input-group-sm mb-3 mw-100 d-flex flex-column align-items-center");
                classroom.setAttribute("class", "input-group input-group-sm mb-3 mw-100 d-flex flex-column align-items-center");

                course.innerHTML = renewData("courses", courses);
                classroom.innerHTML = renewData("classrooms", classrooms);
                result.appendChild(course);
                result.appendChild(classroom);

                let nowInput = result.querySelectorAll("input");
                for (let i = 0; i < textStore.length; i++) {
                    nowInput[i].value = textStore[i];
                }
            }
            else {  // 假設有input，點menu 的功能
                let allMenu = result.querySelectorAll("li > a");
                allMenu.forEach(function (menuItem) {
                    
                    if (event.target === menuItem && menuItem.textContent !== "Add items") {
                        let nearInput = menuItem.closest("ul").nextElementSibling;
                        nearInput.value = menuItem.textContent;
                    }
                })
            }
        }
        else if (event.target === saveChanges) {
            blocks.forEach(function (block) {  // 從input 收納起來
                if (block.querySelectorAll(".course-input").length !== 0) {
                    let nowCourse = block.querySelector(".course-input").value;
                    let nowClassroom = block.querySelector(".classroom-input").value;

                    if (nowCourse !== "" && courses.indexOf(nowCourse) === -1) {
                        courses.push(nowCourse);
                    }
                    if (nowClassroom !== "" && classrooms.indexOf(nowClassroom) === -1) {
                        classrooms.push(nowClassroom);
                    }

                    block.innerHTML = "";
                    let courseText = document.createElement('div');
                    let classroomText = document.createElement('div');
                    courseText.className = ("table-text course-text");
                    classroomText.className = ("table-text classroom-text");
                    courseText.textContent = nowCourse;
                    classroomText.textContent = nowClassroom;
                    block.appendChild(courseText);
                    block.appendChild(classroomText);
                    block.style.backgroundColor = colours[courses.indexOf(nowCourse)]
                }
            })
            hasSaved = true;
        }
        else if (event.target === close) {
            if (!hasSaved) {
                blocks.forEach(function (block) {
                    block.innerHTML = "";
                    block.style.backgroundColor = "transparent";

                })
                classrooms = [];
                courses = [];
            }
        }
    });

}