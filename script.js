const issuesGrid = document.getElementById("issuesGrid");
const allBtn = document.getElementById("allbtn");
const openBtn = document.getElementById("openbtn");
const closedBtn = document.getElementById("closedbtn");
const searchInput = document.getElementById("searchInput");
const loadingSpinner = document.getElementById("loadingSpinner");
let allIssues = [];
// Loading Spinner
function showLoading(){
    loadingSpinner.classList.remove("hidden");
}
function hideLoading(){
    loadingSpinner.classList.add("hidden");
}
// Update Summary
function updateSummary(issues){
    const total = issues.length;
    const open = issues.filter(
        issue => issue.status.toLowerCase() === "open"
    ).length;
    const closed = issues.filter(
        issue => issue.status.toLowerCase() === "closed"
    ).length;
    document.getElementById("totalIssues").textContent = `${total} Issues`;
    document.getElementById("openCount").textContent = open;
    document.getElementById("closedCount").textContent = closed;
}
// Display Issues
function displayIssues(issues){
    updateSummary(issues);
    issuesGrid.innerHTML = "";
    if(issues.length === 0){
        issuesGrid.innerHTML =
        `<p class="col-span-4 text-center text-gray-500">
        No issues found
        </p>`;
        return;
    }
    issues.forEach(issue => {
        const priority = issue.priority?.toUpperCase() || "LOW";
        let priorityColor = "";
        if(priority === "HIGH"){
            priorityColor = "bg-red-100 text-red-500";
        }
        else if(priority === "MEDIUM"){
            priorityColor = "bg-yellow-100 text-yellow-600";
        }
        else{
            priorityColor = "bg-purple-100 text-purple-600";
        }
        const borderColor =
        issue.status.toLowerCase() === "open"
        ? "border-green-500"
        : "border-purple-500";

        const statusColor =
        issue.status.toLowerCase() === "open"
        ? "text-green-600"
        : "text-purple-600";

        const shortDesc =
        issue.description.length > 80
        ? issue.description.slice(0,80) + "..."
        : issue.description;

        const card = document.createElement("div");

        card.className =
        `bg-white rounded-lg shadow p-5 border-t-4 ${borderColor}
        cursor-pointer hover:shadow-xl hover:-translate-y-1
        transition duration-200`;

        card.innerHTML = `
        <div class="flex justify-between items-center mb-3">

            <span class="${statusColor}">
                <i class="fa-regular fa-circle"></i>
            </span>

            <span class="${priorityColor} text-xs px-3 py-1 rounded-full">
                ${priority}
            </span>

        </div>

        <h3 class="font-semibold">${issue.title}</h3>

        <p class="text-gray-500 text-sm mt-2">
            ${shortDesc}
        </p>

        <div class="flex justify-between items-center gap-2 mt-3">

            <span class="text-xs bg-red-100 text-red-500 px-2 py-1 rounded">
            BUG
            </span>

            <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
            HELP WANTED
            </span>
        </div>
        <hr class="border-gray-300 my-3">
        <div class="text-sm text-gray-400">
            #${issue.id} by ${issue.author}
            <br>
            ${issue.created_at}
        </div>
        `;
        card.addEventListener("click", () => {
            loadSingleIssue(issue.id);
        });

        issuesGrid.appendChild(card);
    });
}
// Fetch All Issues
function fetchIssues(){
    showLoading();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
        allIssues = data.data;

        displayIssues(allIssues);

        hideLoading();
    })
    .catch(err => {
        console.error(err);
        issuesGrid.innerHTML =
        `<p class="text-center text-red-500 col-span-4">
        Error loading issues
        </p>`;
        hideLoading();
    });
}
// Open Modal
function openModal(issue){
document.getElementById("modalTitle").textContent = issue.title;
document.getElementById("modalStatus").textContent = issue.status;
document.getElementById("modalDescription").textContent = issue.description;
document.getElementById("modalAuthor").textContent = "#" + issue.id + " by " + issue.author;
document.getElementById("modalDate").textContent = issue.created_at;
const priority = issue.priority?.toUpperCase() || "LOW";
const priorityElement = document.getElementById("modalPriority");
priorityElement.textContent = priority;
priorityElement.className = "badge";
if(priority === "HIGH"){
priorityElement.classList.add("badge-error");
}
else if(priority === "MEDIUM"){
priorityElement.classList.add("badge-warning");
}
else{
priorityElement.classList.add("badge-info");
}
const modal = document.getElementById("issueModal");
modal.showModal();
}
// Load Single Issue
function loadSingleIssue(id){
fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res => res.json())
.then(data => {
const issue = data.data;
openModal(issue);
})
.catch(err => console.log(err));
}
// Active Button
function setActive(button){
document.querySelectorAll(".button-section button")
.forEach(btn => {
btn.classList.remove("bg-blue-600","text-white");
btn.classList.add("text-gray-600");
});
button.classList.add("bg-blue-600","text-white");
}
// Tabs
allBtn.addEventListener("click", () => {
setActive(allBtn);
displayIssues(allIssues);
});
openBtn.addEventListener("click", () => {
setActive(openBtn);
const openIssues =
allIssues.filter(
issue => issue.status.toLowerCase() === "open"
);
displayIssues(openIssues);
});
closedBtn.addEventListener("click", () => {
setActive(closedBtn);
const closedIssues =
allIssues.filter(
issue => issue.status.toLowerCase() === "closed"
);
displayIssues(closedIssues);
});
// Live Search
searchInput.addEventListener("input", () => {
const query = searchInput.value.toLowerCase();
const filtered = allIssues.filter(issue =>
issue.title.toLowerCase().includes(query) ||
issue.description.toLowerCase().includes(query)
);
displayIssues(filtered);
});
// Initial Load
fetchIssues();