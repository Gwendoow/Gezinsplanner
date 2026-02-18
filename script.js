// Laad bestaande gegevens of start leeg
let members = JSON.parse(localStorage.getItem('members')) || [];
let activeMemberIndex = 0;

// Renders de tabs bovenaan
function renderTabs() {
  const tabsDiv = document.getElementById('tabs');
  tabsDiv.innerHTML = '';

  members.forEach((member, index) => {
    const tab = document.createElement('div');
    tab.className = 'tab' + (index === activeMemberIndex ? ' active' : '');
    tab.innerText = member.name;
    tab.onclick = () => {
      activeMemberIndex = index;
      renderTabs();
      renderMemberContent();
    };
    tabsDiv.appendChild(tab);
  });
}

// Render de inhoud van het actieve lid
function renderMemberContent() {
  const member = members[activeMemberIndex];
  if(!member) return;

  const div = document.getElementById('memberContent');
  div.style.background = member.color;


 div.innerHTML = `
  <h2>${member.name}</h2>

  <div class="section">
  <div class="section-title">📋 Taken</div>
  ${member.tasks.map((task, i) =>
    `<div>
      <input type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${i})">
      <span style="${task.completed ? 'text-decoration: line-through; opacity:0.6;' : ''}">
        ${task.text}
      </span>
      <button class="delete-btn" onclick="removeTask(${i})">✖</button>
    </div>`
  ).join('') || 'Geen taken'}
  <button class="add-btn" onclick="addTask()">+ Taak toevoegen</button>
</div>


  <div class="section">
  <div class="section-title">📅 Afspraken</div>
  ${member.appointments.map((app, i) =>
    `<div>
      <strong>${app.date}</strong> - ${app.text}
      <button class="delete-btn" onclick="removeAppointment(${i})">✖</button>
    </div>`
  ).join('') || 'Geen afspraken'}
  <button class="add-btn" onclick="addAppointment()">+ Afspraak toevoegen</button>
</div>


  <div class="section">
    <div class="section-title">📝 Notities</div>
    ${member.notes.map((note, i) =>
      `<div>${note}
        <button class="delete-btn" onclick="removeNote(${i})">✖</button>
      </div>`
    ).join('') || 'Geen notities'}
    <button class="add-btn" onclick="addNote()">+ Notitie toevoegen</button>
  </div>

  <button class="delete-btn" onclick="removeMember()">Gezinslid verwijderen</button>
`;


  const appointmentsHTML = member.appointments.map((app, i) => 
    `${app} <button onclick="removeAppointment(${i})">❌</button>`
  ).join('<br>') || 'Geen';

  const notesHTML = member.notes.map((note, i) => 
    `${note} <button onclick="removeNote(${i})">❌</button>`
  ).join('<br>') || 'Geen';

  div.innerHTML = `
    <h2>${member.name}</h2>
    <b>Taken:</b><br>${tasksHTML} <button onclick="addTask()">➕</button><br><br>
    <b>Afspraken:</b><br>${appointmentsHTML} <button onclick="addAppointment()">➕</button><br><br>
    <b>Notities:</b><br>${notesHTML} <button onclick="addNote()">➕</button><br><br>
    <button onclick="removeMember()">Verwijder gezinslid</button>
  `;

  localStorage.setItem('members', JSON.stringify(members));
}

// Toevoegen functies
function addMember() {
  const name = prompt('Naam van gezinslid:');
  if(name) {

    const colors = ["#FFB6C1", "#B5EAD7", "#C7CEEA", "#FFDAC1", "#E2F0CB"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    members.push({
      name,
      color: randomColor,
      tasks: [],
      appointments: [],
      notes: []
    });

    activeMemberIndex = members.length - 1;
    renderTabs();
    renderMemberContent();
  }
}


function addTask() {
  const task = prompt('Nieuwe taak:');
  if(task) {
    members[activeMemberIndex].tasks.push({
      text: task,
      completed: false
    });
    renderMemberContent();
  }
}


function addAppointment() {
  const text = prompt("Beschrijving afspraak:");
  const date = prompt("Datum (bv 20/02/2026):");

  if(text && date) {
    members[activeMemberIndex].appointments.push({
      text,
      date
    });
    renderMemberContent();
  }
}

function addNote() {
  const note = prompt('Nieuwe notitie:');
  if(note) {
    members[activeMemberIndex].notes.push(note);
    renderMemberContent();
  }
}
function toggleTask(index) {
  members[activeMemberIndex].tasks[index].completed =
    !members[activeMemberIndex].tasks[index].completed;
  renderMemberContent();
}

// Verwijderen functies
function removeTask(index) {
  members[activeMemberIndex].tasks.splice(index, 1);
  renderMemberContent();
}

function removeAppointment(index) {
  members[activeMemberIndex].appointments.splice(index, 1);
  renderMemberContent();
}

function removeNote(index) {
  members[activeMemberIndex].notes.splice(index, 1);
  renderMemberContent();
}

function removeMember() {
  if(confirm('Weet je zeker dat je dit gezinslid wilt verwijderen?')) {
    members.splice(activeMemberIndex, 1);
    if(activeMemberIndex >= members.length) activeMemberIndex = members.length -1;
    renderTabs();
    renderMemberContent();
  }
}

// Eerste render
renderTabs();
renderMemberContent();

