const robot = document.getElementById("robot");
const skillsContainer = document.getElementById("skillsContainer");
const btnCV = document.querySelector(".btn-cv");
const perfilGithub = document.querySelector(".perfil-github");
// 1. Seleccionamos el texto de instrucciones
const instructionText = document.querySelector(".instruction-text"); // <--- NUEVO

let launched = false; 
let isAnimatingRobot = false; 

const skills = [
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", link: "https://angular.io/" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", link: "https://react.dev/" },
    { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg", link: "https://ionicframework.com/" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", link: "https://getbootstrap.com/" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", link: "https://nodejs.org/" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", link: "https://www.php.net/" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", link: "https://www.mysql.com/" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", link: "https://www.mongodb.com/" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", link: "https://www.python.org/" },
    { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", link: "https://www.microsoft.com/sql-server" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", link: "https://www.figma.com/" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", link: "https://nextjs.org/" },
    { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", link: "https://developer.android.com/studio" },
    { name: "MATLAB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg", link: "https://www.mathworks.com/products/matlab.html" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", link: "https://www.postgresql.org/" }
];

function getOffsetForIndex(index, totalItems) {
    const perRow = 6;
    const cardWidth = 80;
    
    // Tus ajustes de espacio
    const spacingX = 30; 
    const spacingY = 110; 

    const row = Math.floor(index / perRow);
    const col = index % perRow;

    const itemsThisRow = Math.min(perRow, totalItems - row * perRow);
    const totalRowWidth = itemsThisRow * (cardWidth + spacingX) - spacingX;
    
    const xInRow = col * (cardWidth + spacingX);
    
    return {
        x: xInRow,
        y: row * spacingY,
        totalRowWidth: totalRowWidth 
    };
}

robot.addEventListener("click", () => {
    if (isAnimatingRobot) return;
    isAnimatingRobot = true;

    if (!launched) {
        // --- FASE 1: ABRIR ---
        robot.classList.add("faded");
        
        // 2. Cambiamos el texto inmediatamente al dar clic
        if(instructionText) {
            instructionText.innerHTML = "Lenguajes de programación y herramientas que puedo manejar"; // <--- TEXTO NUEVO
            instructionText.style.color = "#06b6d4"; // (Opcional) Cambia a color morado para resaltar
        }

        setTimeout(() => {
            launchSkills();
            launched = true;
            setTimeout(() => { isAnimatingRobot = false; }, 500); 
        }, 1000); 

    } else {
        // --- FASE 2: CERRAR ---
        absorbSkills();
        
        const absorptionTime = skills.length * 50 + 500; 

        setTimeout(() => {
            robot.classList.remove("faded");
            
            // 3. Devolvemos el texto original cuando el robot regresa
            if(instructionText) {
                instructionText.innerHTML = "(Haz click para ver mis habilidades)"; // <--- TEXTO ORIGINAL
                instructionText.style.color = ""; // Volver al color original
            }

            setTimeout(() => {
                launched = false;
                isAnimatingRobot = false;
            }, 1000);
            
        }, absorptionTime);
    }
});

function launchSkills() {
    const scene = robot.parentElement;
    const centerX = scene.clientWidth / 2;
    const centerY = scene.clientHeight / 2;

    const totalGridHeight = 3 * 105; 
    const startY = centerY - (totalGridHeight / 2);

    skills.forEach((skill, index) => {
        const card = document.createElement("a");
        card.href = skill.link;
        card.target = "_blank";
        card.className = "skill-card";
        card.style.setProperty("--angle", (Math.random() * 60 - 30));

        const img = document.createElement("img");
        img.src = skill.icon;
        const label = document.createElement("span");
        label.textContent = skill.name;

        card.appendChild(img);
        card.appendChild(label);
        skillsContainer.appendChild(card);

        card.style.left = `${centerX}px`; 
        card.style.top = `${centerY}px`; 

        const offset = getOffsetForIndex(index, skills.length);
        const rowStartX = centerX - (offset.totalRowWidth / 2);

        setTimeout(() => {
            card.classList.add("show");
            card.style.left = `${rowStartX + offset.x}px`;
            card.style.top = `${startY + offset.y}px`;
            card.style.zIndex = "20"; 
        }, index * 80); 
    });
}

function absorbSkills() {
    const cards = document.querySelectorAll(".skill-card");
    const scene = robot.parentElement;
    const targetX = scene.clientWidth / 2;
    const targetY = scene.clientHeight / 2;

    cards.forEach((card, i) => {
        const reverseIndex = cards.length - 1 - i;
        setTimeout(() => {
            card.style.transition = "all 0.5s cubic-bezier(0.5, 0, 0, 1)"; 
            card.style.transform = "scale(0.1) rotate(180deg)";
            card.style.left = `${targetX}px`;
            card.style.top = `${targetY}px`;
            card.style.opacity = "0";
        }, reverseIndex * 50); 
    });

    setTimeout(() => {
        skillsContainer.innerHTML = "";
    }, cards.length * 50 + 600); 
}

function startProfileAnimation() {
    if (!perfilGithub) return;
    perfilGithub.classList.add("loading");
    setTimeout(() => {
        perfilGithub.classList.remove("loading");
        perfilGithub.classList.add("loaded"); 
    }, 2000);
}
window.addEventListener('load', startProfileAnimation);