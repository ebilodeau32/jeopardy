import placeholderQuestions from "./placeholder-questions.js";

let finalQuestions = placeholderQuestions.filter((question) => question.category === "Final"
);

let finalQuestion = document.getElementById("final-question");
let finalCatgory = document.getElementById("final-category");

//*------------------FINAL JEOPARDY SETUP----------------

finalCatgory.innerText = finalQuestions[0].category;
finalQuestion.innerText = finalQuestions[0].question;