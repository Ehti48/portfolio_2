//------------navbar--------//

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

let arrow = document.querySelector(".arrow");

window.addEventListener("scroll", arrowUp);
arrowUp();

function arrowUp() {
    let scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition >= 100) {
        arrow.style.opacity = "1";
    } else {
        arrow.style.opacity = "0";
    }
};



//-------------hamburger----------//

let checkBtn = document.getElementById("checkbtn");
let navBar = document.getElementById("navbar")
let body = document.getElementById("body")

checkBtn.addEventListener("click",()=>{
    if(checkBtn.checked){
        navBar.style.transform = "translateX(0)"
        navBar.style.opacity = "1"
        body.style.overflowY = "hidden"
    }else{
        navBar.style.transform = "translateX(-100%)"
        navBar.style.opacity = "0"
        body.style.overflowY = "auto"
    }
})

//----------animation----------------//

let words = document.querySelectorAll(".word")

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter"
        word.appendChild(span)
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = 
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out"
        }, i * 50);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 300 + i * 50);
    });
    currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);



//-----------------------------------//

// Fetch data from the JSON
fetch('script.json')
  .then(response => response.json())
  .then(data => {
    // Process the data
    console.log(data);

    // Example: Displaying projects in the console
    data.project.forEach(box => {

        let projectSection = document.getElementById("project");
        let topDiv = document.getElementById("top");



    let boxDiv = document.createElement("box");
    boxDiv.classList.add("box");
    boxDiv.id = box.id;

    let image = document.createElement("img");
    image.src = box.src;
    image.alt = box.alt;

    let paragraph = document.createElement("p");
    paragraph.textContent = box.text;

    let gitLink = document.createElement("div");
    gitLink.classList.add("g-link");

    let gitHub = document.createElement("img");
    gitHub.classList.add("git-img");
    gitHub.src = box.git;

    let anchor = document.createElement("a");
    anchor.setAttribute("href", box.gitLink)
    anchor.gitLink = box.gitLink;
    // anchor.target = "_blank"; 
    
    
    gitHub.addEventListener("click",(event)=>{
        
        if(box.gitLink == ""){
            event.preventDefault();
            alert("This Project still in Progress")
        } else {
            anchor.target="_blank";
        }
    })
    
    
    let netlify = document.createElement("img");
    netlify.classList.add("net-img");
    netlify.src = box.netlify;

    let nLink = document.createElement("a");
    nLink.setAttribute("href", box.netLink)
    nLink.netLink = box.netLink;
    
    
    netlify.addEventListener("click",(event)=>{
        
        if(box.netLink == ""){
            event.preventDefault();
            alert("This Project still in Progress")
        } else {
            nLink.target="_blank";
        }
    })

    boxDiv.appendChild(image);
    boxDiv.appendChild(paragraph);


    topDiv.appendChild(boxDiv);
    
    boxDiv.appendChild(gitLink);
    gitLink.appendChild(anchor);
    
    anchor.appendChild(gitHub);
    gitLink.appendChild(nLink);
    nLink.appendChild(netlify);


            projectSection.appendChild(topDiv);

    });
    
  })
  .catch(error => console.error('Error fetching data:', error));
