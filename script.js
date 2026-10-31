// ===================================
// FOCUSFLOW - STUDENT LEARNING APP
// ===================================


// 1. STUDY TASK MANAGER

let tasks = JSON.parse(
    localStorage.getItem("focusTasks") || "[]"
);

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const subject = document.getElementById("subject");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("focusTasks", JSON.stringify(tasks));
}

function addTask(name, category) {
    tasks.push({
        id: Date.now() + Math.random(),
        name: name,
        category: category,
        completed: false
    });

    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        if (task.completed) {
            div.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete task");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("span");
        name.textContent = task.name;

        const category = document.createElement("small");
        category.textContent = task.category;

        info.append(name, category);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "danger";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            displayTasks();
        });

        div.append(checkbox, info, deleteButton);
        taskList.appendChild(div);
    });

    updateProgress();
}

function updateProgress() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round(completed / total * 100);

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("percentage").textContent = percentage + "%";

    document.getElementById("progressText").textContent =
        completed + " of " + total + " tasks completed";

    document.getElementById("progressBar").style.width =
        percentage + "%";
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskInput.value.trim();

    if (!name) return;

    addTask(name, subject.value);
    taskInput.value = "";
    taskInput.focus();
});

document.getElementById("clearButton").addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
});


// 2. DAILY STUDY TIPS

const tips = [
    "Study for 25 minutes and take a 5-minute break!",
    "Keep your phone away while studying.",
    "Revise your notes every day.",
    "Break large tasks into smaller tasks.",
    "Consistency is more important than perfection!",
    "Drink water and take regular breaks."
];

const today = new Date().getDate();

document.getElementById("studyTip").textContent =
    tips[today % tips.length];


// 3. COURSE DATA AND WRITTEN LESSONS

const courses = {

    html: {
        name: "HTML for Beginners",
        video: "HTML tutorial for beginners",
        lessons: [
            {
                title: "Introduction to HTML",
                text: `HTML stands for HyperText Markup Language.

HTML is used to create the structure of websites.

A basic HTML document contains:
1. DOCTYPE
2. HTML
3. HEAD
4. BODY

Example:

<h1>Hello World</h1>
<p>My first website</p>

The h1 tag creates a heading.
The p tag creates a paragraph.`
            },
            {
                title: "HTML Headings and Paragraphs",
                text: `HTML provides six heading levels.

<h1> is the largest heading.
<h6> is the smallest heading.

Use <p> to create paragraphs.

Example:

<h1>My Website</h1>
<h2>About Me</h2>
<p>Welcome to my website!</p>`
            },
            {
                title: "HTML Links and Images",
                text: `Links allow users to visit other pages.

Example:

<a href="https://example.com">Visit Website</a>

Images can be added using the img tag.

Example:

<img src="photo.jpg" alt="My Photo">

The alt attribute describes the image.`
            },
            {
                title: "HTML Lists",
                text: `HTML supports ordered and unordered lists.

Unordered list:

<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>

Ordered lists use the <ol> tag.

List items use the <li> tag.`
            },
            {
                title: "HTML Forms",
                text: `Forms collect information from users.

Example:

<form>
<input type="text" placeholder="Your Name">
<input type="email" placeholder="Your Email">
<button type="submit">Submit</button>
</form>

Forms are useful for registration and contact pages.`
            }
        ]
    },

    css: {
        name: "CSS for Beginners",
        video: "CSS tutorial for beginners",
        lessons: [
            {
                title: "Introduction to CSS",
                text: `CSS stands for Cascading Style Sheets.

CSS controls the appearance of a website.

It changes:
- Colors
- Fonts
- Spacing
- Layout
- Backgrounds

Example:

h1 {
    color: blue;
}`
            },
            {
                title: "CSS Colors and Fonts",
                text: `CSS allows you to change text colors and fonts.

Example:

p {
    color: purple;
    font-size: 18px;
    font-family: Arial;
}

You can use color names, HEX values and RGB values.`
            },
            {
                title: "CSS Backgrounds",
                text: `Background properties change the background of elements.

Example:

body {
    background-color: lightblue;
}

You can also use background images and gradients.`
            },
            {
                title: "CSS Box Model",
                text: `Every HTML element is treated as a box.

The box model has:
1. Content
2. Padding
3. Border
4. Margin

Example:

.card {
    padding: 20px;
    border: 1px solid gray;
    margin: 10px;
}`
            },
            {
                title: "CSS Flexbox",
                text: `Flexbox helps arrange elements in rows or columns.

Example:

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

Flexbox makes responsive layouts easier.`
            }
        ]
    },

    js: {
        name: "JavaScript for Beginners",
        video: "JavaScript tutorial for beginners",
        lessons: [
            {
                title: "Introduction to JavaScript",
                text: `JavaScript makes websites interactive.

It can:
- Respond to button clicks
- Validate forms
- Update page content
- Create timers
- Store information

Example:

alert("Hello World!");

JavaScript works with HTML and CSS.`
            },
            {
                title: "Variables",
                text: `Variables store information.

Example:

let name = "Student";
const age = 20;

let can be reassigned.
const cannot be reassigned.

Use meaningful variable names.`
            },
            {
                title: "Data Types",
                text: `Common JavaScript data types:

String: "Hello"
Number: 100
Boolean: true or false
Array: [1, 2, 3]
Object: {name: "Student"}

Different types store different kinds of information.`
            },
            {
                title: "Functions",
                text: `Functions are reusable blocks of code.

Example:

function greet() {
    console.log("Welcome!");
}

greet();

You can call a function whenever you need it.`
            },
            {
                title: "Conditions and Loops",
                text: `Conditions make decisions.

Example:

let marks = 80;

if (marks >= 40) {
    console.log("Pass");
} else {
    console.log("Fail");
}

Loops repeat instructions multiple times.`
            }
        ]
    },

    python: {
        name: "Python for Beginners",
        video: "Python programming tutorial for beginners",
        lessons: [
            {
                title: "Introduction to Python",
                text: `Python is a popular programming language.

It is used for:
- Web development
- Data science
- Automation
- Artificial intelligence

Example:

print("Hello World")

Python is known for readable syntax.`
            },
            {
                title: "Python Variables",
                text: `Variables store values.

Example:

name = "Student"
age = 20
marks = 85.5

print(name)
print(age)

Python automatically identifies the data type.`
            },
            {
                title: "Python Data Types",
                text: `Important Python data types:

String: "Hello"
Integer: 10
Float: 10.5
Boolean: True or False
List: [1, 2, 3]
Dictionary: {"name": "Sam"}

Each type stores different information.`
            },
            {
                title: "If Else Statements",
                text: `If and else statements help make decisions.

Example:

marks = 75

if marks >= 40:
    print("Pass")
else:
    print("Fail")

Indentation is important in Python.`
            },
            {
                title: "Python Loops",
                text: `Loops repeat a block of code.

For loop example:

for i in range(5):
    print(i)

While loop example:

count = 0

while count < 5:
    print(count)
    count += 1`
            }
        ]
    }
};


// 4. COURSE PROGRESS STORAGE

let completedLessons = JSON.parse(
    localStorage.getItem("completedLessons") || "[]"
);

let selectedCourse = null;

function getCourseProgress(courseId) {

    const course = courses[courseId];

    const completed = course.lessons.filter(
        (lesson, index) =>
            completedLessons.includes(courseId + "-" + index)
    ).length;

    return Math.round(
        completed / course.lessons.length * 100
    );
}

function updateAllCourseProgress() {

    Object.keys(courses).forEach(courseId => {

        const percentage = getCourseProgress(courseId);

        document.getElementById("status-" + courseId).textContent =
            percentage + "% completed";
    });
}


// 5. OPEN A COURSE

function openCourse(courseId) {

    selectedCourse = courseId;

    const course = courses[courseId];

    const content = document.getElementById("courseContent");

    content.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "📖 " + course.name;

    const description = document.createElement("p");
    description.textContent = "Select a lesson to start learning.";

    const video = document.createElement("a");
    video.className = "video-link";
    video.href =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(course.video);
    video.target = "_blank";
    video.rel = "noopener noreferrer";
    video.textContent = "▶ Find video lessons on YouTube";

    const progress = document.createElement("p");
    progress.id = "currentCourseProgress";

    const list = document.createElement("ul");
    list.className = "lesson-list";

    course.lessons.forEach((lesson, index) => {

        const lessonId = courseId + "-" + index;

        const li = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = lesson.title;

        const status = document.createElement("span");
        status.textContent =
            completedLessons.includes(lessonId)
                ? " ✓ Completed"
                : " • Not completed";

        const openButton = document.createElement("button");
        openButton.textContent = "Read Lesson";

        openButton.addEventListener("click", () => {
            showLesson(courseId, index);
        });

        li.append(title, document.createElement("br"), status,
                  document.createElement("br"), openButton);

        list.appendChild(li);
    });

    content.append(heading, description, video, progress, list);

    updateCurrentCourseProgress();
}


// 6. DISPLAY WRITTEN LESSON

function showLesson(courseId, index) {

    const course = courses[courseId];
    const lesson = course.lessons[index];
    const lessonId = courseId + "-" + index;

    const content = document.getElementById("courseContent");

    let oldLesson = document.getElementById("lessonArea");

    if (oldLesson) {
        oldLesson.remove();
    }

    const area = document.createElement("div");
    area.id = "lessonArea";
    area.className = "lesson-text";

    const title = document.createElement("h3");
    title.textContent = lesson.title;

    const text = document.createElement("p");
    text.textContent = lesson.text;

    const completeButton = document.createElement("button");

    function updateButton() {
        completeButton.textContent =
            completedLessons.includes(lessonId)
                ? "✓ Lesson Completed"
                : "Mark Lesson as Completed";
    }

    updateButton();

    completeButton.addEventListener("click", () => {

        if (completedLessons.includes(lessonId)) {
            completedLessons = completedLessons.filter(
                id => id !== lessonId
            );
        } else {
            completedLessons.push(lessonId);
        }

        localStorage.setItem(
            "completedLessons",
            JSON.stringify(completedLessons)
        );

        updateButton();
        updateAllCourseProgress();
        updateCurrentCourseProgress();
        openCourse(courseId);

        // Reopen the current written lesson
        showLesson(courseId, index);
    });

    area.append(title, text, completeButton);
    content.appendChild(area);
}


// 7. UPDATE COURSE PROGRESS

function updateCurrentCourseProgress() {

    if (!selectedCourse) return;

    const percentage = getCourseProgress(selectedCourse);

    const progress = document.getElementById(
        "currentCourseProgress"
    );

    if (progress) {
        progress.textContent =
            "Your course progress: " + percentage + "%";
    }
}


// 8. POMODORO STUDY TIMER

let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timerDisplay");
const timerMessage = document.getElementById("timerMessage");

function displayTimer() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

document.getElementById("startTimer").addEventListener("click", () => {

    if (timerInterval !== null) return;

    timerMessage.textContent = "Stay focused! You can do it!";

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {
            timeLeft--;
            displayTimer();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            timerMessage.textContent =
                "Great work! Time for a 5-minute break.";

            alert("Study session completed! Take a break.");
        }

    }, 1000);
});

document.getElementById("pauseTimer").addEventListener("click", () => {

    clearInterval(timerInterval);
    timerInterval = null;

    timerMessage.textContent = "Timer paused.";
});

document.getElementById("resetTimer").addEventListener("click", () => {

    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = 25 * 60;

    displayTimer();

    timerMessage.textContent =
        "Timer reset. Ready to focus?";
});


// 9. START THE APPLICATION

displayTasks();
updateAllCourseProgress();
displayTimer();