const habits = [
    {id: 0, name: "Drink water", 
        category: "Health", 
        targetPerDay: 5, 
        unit: "glasses"},
    {id: 1, 
        name: "Wash hands", 
        category: "Productivity", 
        targetPerDay: 8, 
        unit: "times"},
    {id: 2, 
        name: "Pray", 
        category: "Mindfulness", 
        targetPerDay: 6, 
        unit: "times"},
    {id: 3, 
        name: "Read books", 
        category: "Others", 
        targetPerDay: 4, 
        unit: "pages"}
]


const habitNames = habits.map(habit => habit.name);

console.log(habitNames)

const mindfullnessHabits = habits.filter(habit=>habit.category === "Mindfulness");

console.log(mindfullnessHabits)

const habitById = habits.find(habit => habit.id === 3);

console.log(habitById) 

const totalDailyTarget = habits.reduce((total, habit) => total + habit.targetPerDay, 0);

console.log(totalDailyTarget)


const healthHabits = habits.filter(habit => habit.category === "Health");
const averageTargetPerDay = healthHabits.reduce((total, habit) => total + habit.targetPerDay, 0) / healthHabits.length;

console.log(averageTargetPerDay)

// functions 

function renderHabits (){
    const habitContainer = document.getElementById("habit-list");
    habitContainer.innerHTML = habits.map(habit => 
        `<div>${habit.name} (${habit.category}) — Target: ${habit.targetPerDay} ${habit.unit} ${habit.loggedToday >= habit.targetPerDay ? '✅' : ''}<button class="log-btn" data-id="${habit.id}">+1</button></div>`
    ).join('');
    
}

renderHabits();


document.getElementById("test-btn").addEventListener("click", () => {
  console.log("Button clicked!");
});

const habitContainer = document.getElementById("habit-list");

habitContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("log-btn")){
           const habitId = Number(event.target.dataset.id);

           const habit = habits.find(habit => habit.id === habitId);
              if(habit){
                  habit.loggedToday = (habit.loggedToday || 0) + 1;
                  renderHabits();
              }
        }
    });