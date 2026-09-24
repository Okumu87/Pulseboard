// the array of data

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

// local storage

    export function saveHabits(){
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

    export let habits = loadHabits();

    export function deleteHabit(habitId){
        habits = habits.filter(habit => habit.id !== habitId)
    }