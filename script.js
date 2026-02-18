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

  const tasksHTML = member.tasks.map((task, i) => 
    `${task} <button onclick="removeTask(${i})">❌</button>`
  ).join('<br>') || 'Geen';

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
    members.push({name, tasks: [], appointments: [], notes: []});
    activeMemberIndex = members.length -1;
    renderTabs();
    renderMemberContent();
  }
}

function addTask() {
  const task = prompt('Nieuwe taak:');
  if(task) {
    members[activeMemberIndex].tasks.push(task);
    renderMemberContent();
  }
}

function addAppointment() {
  const app = prompt('Nieuwe afspraak:');
  if(app) {
    members[activeMemberIndex].appointments.push(app);
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

