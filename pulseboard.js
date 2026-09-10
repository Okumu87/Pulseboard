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