const robot = document.getElementById("robot");
const skillsContainer = document.getElementById("skillsContainer");

let launched = false;
let walkingToLeft = false;
let absorbing = false;

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

function moveRobotToLeft(callback) {
  walkingToLeft = true;
  robot.style.animation = "none";

  let pos = parseInt(window.getComputedStyle(robot).left);

  const interval = setInterval(() => {
    pos -= 3;
    robot.style.left = pos + "px";

    if (pos <= 40) {
      clearInterval(interval);
      walkingToLeft = false;
      callback();
    }
  }, 16);
}

robot.addEventListener("click", () => {
  if (walkingToLeft || absorbing) return;

  if (!launched) {
    launched = true;
    robot.classList.add("robot-lean");

    setTimeout(() => {
      robot.classList.remove("robot-lean");
      moveRobotToLeft(launchSkills);
    }, 350);
  } else {
    absorbSkills();
  }
});

function launchSkills() {
  const startX = robot.offsetLeft + 280;
  const startY = robot.offsetTop - 150;

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

    card.style.left = `${startX}px`;
    card.style.top = `${startY}px`;

    const { x, y } = getOffsetForIndex(index, skills.length);

    setTimeout(() => {
      card.classList.add("show");
      card.style.left = `${startX + x}px`;
      card.style.top = `${startY + y}px`;
    }, index * 180);
  });
}

function absorbSkills() {
  absorbing = true;

  const cards = document.querySelectorAll(".skill-card");

  const targetX = robot.offsetLeft + 20;
  const targetY = robot.offsetTop + 20;

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.transform = "scale(0.2)";
      card.style.left = `${targetX}px`;
      card.style.top = `${targetY}px`;
      card.style.opacity = "0";
    }, i * 80);
  });

  setTimeout(() => {
    skillsContainer.innerHTML = "";
    absorbing = false;
    launched = false;

    robot.style.animation = "moveRobot 12s ease-in-out infinite alternate";
  }, cards.length * 80 + 400);
}
