const defaultHabits = [
    {id: 0, name: "Drink water", 
        category: "Health", 
        targetPerDay: 5, 
        loggedToday: 0,
        unit: "glasses"},
    {id: 1, 
        name: "Wash hands", 
        category: "Productivity", 
        targetPerDay: 8, 
        loggedToday: 0,
        unit: "times"},
    {id: 2, 
        name: "Pray", 
        category: "Mindfulness", 
        targetPerDay: 6, 
        loggedToday: 0,
        unit: "times"},
    {id: 3, 
        name: "Read books", 
        category: "Others", 
        targetPerDay: 4, 
        loggedToday: 0,
        unit: "pages"}
]


// const habitNames = habits.map(habit => habit.name);

// console.log(habitNames)

// const mindfullnessHabits = habits.filter(habit=>habit.category === "Mindfulness");

// console.log(mindfullnessHabits)

// const habitById = habits.find(habit => habit.id === 3);

// console.log(habitById) 

// const totalDailyTarget = habits.reduce((total, habit) => total + habit.targetPerDay, 0);

// console.log(totalDailyTarget)


// const healthHabits = habits.filter(habit => habit.category === "Health");
// const averageTargetPerDay = healthHabits.reduce((total, habit) => total + habit.targetPerDay, 0) / healthHabits.length;

// console.log(averageTargetPerDay)


  // local storage

    function saveHabits(){
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function loadHabits (){
        const saved = localStorage.getItem('habits');
        if(saved){
            return JSON.parse(saved);
        }else{
            return defaultHabits;
        }
    }

    const habits = loadHabits();

// functions 

function renderHabits (){
    const habitContainer = document.getElementById("habit-list");
    habitContainer.innerHTML = habits.map(habit => 
        `<div>${habit.name} (${habit.category}) — Target: ${habit.targetPerDay} ${habit.unit} ${habit.loggedToday >= habit.targetPerDay ? '✅' : ''} ${habit.loggedToday >= habit.targetPerDay ? 0 : habit.targetPerDay - habit.loggedToday}  <button class="log-btn" data-id="${habit.id}">+1</button></div>`
    ).join('');
    
}

renderHabits();



const habitContainer = document.getElementById("habit-list");

habitContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("log-btn")){
           const habitId = Number(event.target.dataset.id);

           const habit = habits.find(habit => habit.id === habitId);
              if(habit){
                  habit.loggedToday = (habit.loggedToday || 0) + 1;
                  renderHabits();
                    saveHabits();
                 
              }
        }

    });

  