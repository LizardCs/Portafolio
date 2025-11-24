const robot = document.getElementById("robot");
const skillsContainer = document.getElementById("skillsContainer");
const btnCV = document.querySelector(".btn-cv");
const perfilGithub = document.querySelector(".perfil-github"); // Obtener el elemento del perfil

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
    const spacingX = 10;
    const spacingY = 105;

    const row = Math.floor(index / perRow);
    const col = index % perRow;

    const itemsThisRow = Math.min(perRow, totalItems - row * perRow);
    const totalWidth = itemsThisRow * (cardWidth + spacingX);
    const offsetX = (perRow * (cardWidth + spacingX) - totalWidth) / 2;

    return {
        x: col * (cardWidth + spacingX) - offsetX,
        y: row * spacingY
    };
}


robot.addEventListener("click", () => {
    if (isAnimatingRobot) return;

    isAnimatingRobot = true;

    if (!launched) {
        
        robot.style.animation = "fadeOutMoveLeft 0.8s ease-in-out forwards"; 

        setTimeout(() => {
            robot.style.animation = "none";
            robot.style.left = "20%"; 
            robot.style.transform = "translate(-50%, -50%)"; 
            
            launchSkills();
            launched = true;
            isAnimatingRobot = false;
        }, 850); 
        
    } else {

        absorbSkills();
        
        const absorptionTime = skills.length * 80 + 400; 

        setTimeout(() => {
            robot.style.animation = "fadeOutMoveCenter 0.8s ease-in-out forwards";
        }, absorptionTime - 400); 
        
        setTimeout(() => {
            robot.style.animation = "bounce 2.5s ease-in-out infinite"; 
            robot.style.left = "50%"; 
            robot.style.transform = "translate(-50%, -50%)";
            
            launched = false;
            isAnimatingRobot = false;
        }, absorptionTime + 850); 
    }
});


function launchSkills() {
    const scene = robot.parentElement;
    const sceneHeight = scene.clientHeight;
    const robotCenterX = scene.clientWidth * 0.20; 
    const robotCenterY = sceneHeight * 0.5;
    const launchX = robotCenterX + 50; 
    const launchY = robotCenterY - 10;
    const gridStartX = robotCenterX + 160; 
    const gridHeight = 3 * 105; 
    const gridStartY = robotCenterY - (gridHeight / 2); 

    skills.forEach((skill, index) => {
        const card = document.createElement("a");
        card.href = skill.link;
        card.target = "_blank";
        card.className = "skill-card";
        card.style.setProperty("--angle", (index - 3) * 4);

        const img = document.createElement("img");
        img.src = skill.icon;

        const label = document.createElement("span");
        label.textContent = skill.name;

        card.appendChild(img);
        card.appendChild(label);
        skillsContainer.appendChild(card);

        card.style.left = `${launchX}px`; 
        card.style.top = `${launchY}px`; 

        const { x, y } = getOffsetForIndex(index, skills.length);

        setTimeout(() => {
            card.classList.add("show");
            card.style.left = `${gridStartX + x}px`;
            card.style.top = `${gridStartY + y}px`;
        }, index * 180);
    });
}

function absorbSkills() {
    const cards = document.querySelectorAll(".skill-card");

    const scene = robot.parentElement;
    const targetX = scene.clientWidth * 0.20 + 50; 
    const targetY = scene.clientHeight * 0.5 - 10;

    cards.forEach((card, i) => {
        setTimeout(() => {
            card.style.transition = "all 0.4s ease-in"; 
            card.style.transform = "scale(0.2) rotate(0deg)";
            card.style.left = `${targetX}px`;
            card.style.top = `${targetY}px`;
            card.style.opacity = "0";
        }, i * 80);
    });

    setTimeout(() => {
        skillsContainer.innerHTML = "";
    }, cards.length * 80 + 400); 
}


// Funcionalidad botón de CV
if (btnCV) {
    btnCV.addEventListener("click", () => {
        alert("Descargando CV de Johan Curicho... (Sustituye esta alerta por tu lógica de descarga)");
    });
}

// --- Animación de Borde de Perfil ---
function startProfileAnimation() {
    // 1. Iniciar la animación de carga rápida
    perfilGithub.classList.add("loading");
    
    // 2. Después de un tiempo, detener la carga y activar el bucle
    const loadingTime = 2000; // 2 segundos de "carga"

    setTimeout(() => {
        perfilGithub.classList.remove("loading");
        
        // 3. Establecer la posición final de la "carga" (arriba, 0 grados)
        perfilGithub.style.setProperty('--initial-rotation', '360deg'); 
        perfilGithub.classList.add("loaded"); 
        
    }, loadingTime);
}

// Inicia la animación cuando la página ha cargado
window.addEventListener('load', startProfileAnimation);