let imgMain = document.getElementById("image");
let optionOne = document.querySelectorAll(".option");
let percentage = document.querySelector('.percentage_pass');
let nextButton = document.querySelector('.next');
let percentageGotten = 100;
let totalQuestions = 1;
let totalCorrect = 0;
let correctButton = 0;
let rightClicked = 3;
let numHigher =0;
let others= [];
let optionArray = [0,1,2,3];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        let dotted = JSON.parse(xhttp.responseText);
        nextButton.addEventListener('click', function() {
         totalQuestions++;
         console.log(totalQuestions);
         console.log(totalCorrect);
         imgMain.classList.add('blur');       
         calculatepercentage();
         enableButtons();
         if(optionOne[numHigher].classList.contains('wrong')){
         optionOne[numHigher].classList.remove('wrong');
        }
         optionOne[rightClicked].classList.remove('right');
       optionOne[correctButton].removeEventListener('click', alright);
        let ranLogoLength = getRandom(dotted.length);
        removeListeners();
 
        let rand2 = getRandom(dotted.length);
        let rand3 = getRandom(dotted.length);
        let rand4 = getRandom(dotted.length);
        populate(dotted,ranLogoLength, rand2, rand3, rand4);
          console.log('now!!');
        }) ;
        let ranLogoLength = getRandom(dotted.length);
        let rand2 = getRandom(dotted.length);
        let rand3 = getRandom(dotted.length);
        let rand4 = getRandom(dotted.length);
        
        populate(dotted,ranLogoLength, rand2, rand3, rand4);
        
        
        
       
    }
};
xhttp.open("GET", "logos.json", true);
xhttp.send();

// get a random value
function getRandom(length){
   return Math.floor(Math.random() * length + 0 )
}

function populate(dataGotten, imgpos, rand2, rand3, rand4){
let thisA = rearrange(optionArray);
 rightClicked = thisA[0];
 correctButton = thisA[0];
  others =[thisA[1], thisA[2], thisA[3]];
 displayWrong(others);
 checkCorrect(rightClicked);

 console.log(thisA);
 //console.log(thisA[0]); 
 imgMain.src = `logos/${dataGotten[imgpos].filename}/${dataGotten[imgpos].filename}.png`;
    optionOne[thisA[0]].innerHTML = dataGotten[imgpos].title;
    optionOne[thisA[1]].innerHTML = dataGotten[rand2].title;
    optionOne[thisA[2]].innerHTML = dataGotten[rand3].title;
    optionOne[thisA[3]].innerHTML = dataGotten[rand4].title;    
  return dataGotten[imgpos].filename;
}

function rearrange(arr){
  return arr.sort(() => Math.random() - 0.5);
}

function checkCorrect(right){
  
  optionOne[right].addEventListener('click', alright);
  
}
function displayWrong(arr){
  console.log(arr)
optionOne[arr[0]].addEventListener('click', function(){
  wronged(arr[0]);
});
optionOne[arr[1]].addEventListener('click', function(){
  wronged(arr[1]);
});
optionOne[arr[2]].addEventListener('click', function(){
  wronged(arr[2]);
});

}

function removeListeners(){
  optionOne[others[0]].removeEventListener('click', wronged);
  optionOne[others[1]].removeEventListener('click', wronged);
  optionOne[others[2]].removeEventListener('click', wronged);
}

function wronged(num){
console.log(num);
imgMain.classList.remove('blur');
 numHigher = num;
optionOne[num].innerHTML = 'Wrong Answer';
optionOne[num].classList.add('wrong');
optionOne[rightClicked].classList.add('right');  
console.log('wrong!');

  optionOne.forEach(item=> item.disabled = true );
}
function alright(){
  updateAnswer();
  imgMain.classList.remove('blur');
  optionOne[rightClicked].innerHTML = 'Correct!';
  optionOne[rightClicked].classList.add('right');
  console.log(totalCorrect);
  optionOne.forEach(item=> item.disabled = true );
  }
  function enableButtons(){
    optionOne.forEach(item=> item.disabled = false );

  }

  function updateAnswer(){
    totalCorrect++;
  }


    function calculatepercentage(){

     let percen = (totalCorrect / totalQuestions) * 100;
    //  console.log(totalCorrect);
      //console.log(totalQuestions);
      
      
     percentage.innerHTML = `${percen}%`;
    }



 


 
