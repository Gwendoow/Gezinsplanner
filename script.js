let familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];

function saveToStorage() {
  localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
}

function addMember() {
  const input = document.getElementById("memberInput");
  const name = input.value;
  if (name === "") return;

  familyMembers.push({
    name: name,
    tasks: [],
    appointments: [],
    notes: []
  });

  input.value = "";
  saveToStorage();
  render();
}

function addTask(memberIndex) {
  const input = document.getElementById("taskInput-" + memberIndex);
  const value = input.value;
  if (value === "") return;

  familyMembers[memberIndex].tasks.push(value);
  input.value = "";
  saveToStorage();
  render();
}

function deleteTask(memberIndex, taskIndex) {
  familyMembers[memberIndex].tasks.splice(taskIndex, 1);
  saveToStorage();
  render();
}

function addAppointment(memberIndex) {
  const input = document.getElementById("appointmentInput-" + memberIndex);
  const value = input.value;
  if (value === "") return;

  familyMembers[memberIndex].appointments.push(value);
  input.value = "";
  saveToStorage();
  render();
}

function addNote(memberIndex) {
  const input = document.getElementById("noteInput-" + memberIndex);
  const value = input.value;
  if (value === "") return;

  familyMembers[memberIndex].notes.push(value);
  input.value = "";
  saveToStorage();
  render();
}

function render() {
  const container = document.getElementById("familyContainer");
  container.innerHTML = "";

  familyMembers.forEach((member, index) => {
    const div = document.createElement("div");
    div.className = "memberCard";

    div.innerHTML = `
      <h2>${member.name}</h2>

      <div class="section">
        <strong>📋 Taken</strong><br>
        <ul>
          ${member.tasks.map((task, i) =>
            `<li>${task} 
              <button onclick="deleteTask(${index}, ${i})">❌</button>
            </li>`
          ).join("")}
        </ul>
        <input id="taskInput-${index}" placeholder="Nieuwe taak">
        <button onclick="addTask(${index})">Toevoegen</button>
      </div>

      <div class="section">
        <strong>📅 Afspraken</strong><br>
        <ul>
          ${member.appointments.map(app =>
            `<li>${app}</li>`
          ).join("")}
        </ul>
        <input id="appointmentInput-${index}" placeholder="Nieuwe afspraak">
        <button onclick="addAppointment(${index})">Toevoegen</button>
      </div>

      <div class="section">
        <strong>📝 Notities</strong><br>
        <ul>
          ${member.notes.map(note =>
            `<li>${note}</li>`
          ).join("")}
        </ul>
        <input id="noteInput-${index}" placeholder="Nieuwe notitie">
        <button onclick="addNote(${index})">Toevoegen</button>
      </div>
    `;

    container.appendChild(div);
  });
}

render();
