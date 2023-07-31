const steps = document.querySelectorAll('.step');
let currentStep = 0;
let intervalId;

function showNextStep() {
  steps[currentStep].classList.remove('active');
  currentStep = (currentStep + 1) % steps.length;
  steps[currentStep].classList.add('active');
}

function startAutoAnimation() {
  intervalId = setInterval(showNextStep, 3000); 
}

function pauseAutoAnimation() {
  clearInterval(intervalId);
}

function continueAutoAnimation() {
  startAutoAnimation();
}


steps[currentStep].classList.add('active');


startAutoAnimation();

steps.forEach(step => {
  step.addEventListener('mouseover', pauseAutoAnimation);
  step.addEventListener('mouseout', continueAutoAnimation);
});

