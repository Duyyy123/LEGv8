document.addEventListener("DOMContentLoaded", () => {
    // Tab switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");

            // Remove active class from all buttons and tabs
            tabButtons.forEach((btn) =>
                btn.classList.remove("active", "bg-gray-700"),
            );
            document
                .querySelectorAll(".tab-content")
                .forEach((tab) => tab.classList.remove("active"));

            // Add active class to clicked button and corresponding tab
            this.classList.add("active", "bg-gray-700");
            document.getElementById(tabId).classList.add("active");
        });
    });

    // Track cursor position in code editor
    const codeEditor = document.getElementById("assemblyCode");
    const currentLine = document.getElementById("currentLine");
    const currentCol = document.getElementById("currentCol");

    codeEditor.addEventListener("input", updateCursorPosition);
    codeEditor.addEventListener("click", updateCursorPosition);
    codeEditor.addEventListener("keyup", updateCursorPosition);

    function updateCursorPosition() {
        const cursorPosition = codeEditor.selectionStart;
        const textBeforeCursor = codeEditor.value.substring(0, cursorPosition);
        const lineNumber = textBeforeCursor.split("\n").length;
        const colNumber =
            cursorPosition - textBeforeCursor.lastIndexOf("\n") - 1;

        currentLine.textContent = lineNumber;
        currentCol.textContent = Math.max(1, colNumber + 1);
    }

    // Initialize registers display
    const registersContainer = document.querySelector(
        "#registers .grid.grid-cols-3.gap-1",
    );
    const registerTemplate =
        document.getElementById("registerTemplate").content;

    for (let i = 0; i < 31; i++) {
        const registerClone = registerTemplate.cloneNode(true);
        const registerDiv = registerClone.querySelector(".register-cell");
        const registerName = registerDiv.querySelector("span:first-child");
        const registerValue = registerDiv.querySelector("span:last-child");

        registerName.textContent = `X${i}`;
        registerValue.textContent = `0x${(0).toString(16).padStart(8, "0")}`;
        registerDiv.id = `register-X${i}`;

        registersContainer.appendChild(registerClone);
    }

    // Initialize stack display
    const stackContainer = document.querySelector(".stack-view");
    for (let i = 0; i < 10; i++) {
        const address = 0x7ffffff0 - i * 8;
        const row = document.createElement("div");
        row.className = "stack-row grid grid-cols-3 gap-1";

        // Address
        const addrCell = document.createElement("div");
        addrCell.className = "stack-address text-gray-400";
        addrCell.textContent = `0x${address.toString(16).padStart(8, "0")}`;
        row.appendChild(addrCell);

        // Value
        const valueCell = document.createElement("div");
        valueCell.className = "stack-value bg-gray-700 px-2 py-1 rounded";
        valueCell.textContent = `0x${(0).toString(16).padStart(8, "0")}`;
        row.appendChild(valueCell);

        // Note
        const noteCell = document.createElement("div");
        noteCell.className = "stack-note text-gray-400 text-xs";
        noteCell.textContent = i === 0 ? "[SP]" : "";
        row.appendChild(noteCell);

        stackContainer.appendChild(row);
    }

    // Simulate button clicks
    document
        .getElementById("assembleBtn")
        .addEventListener("click", function () {
            document.getElementById("simulatorState").textContent = "Assembled";
            highlightRandomRegister();
        });

    document.getElementById("runBtn").addEventListener("click", function () {
        document.getElementById("simulatorState").textContent = "Running";
        updatePC();
    });

    document.getElementById("stepBtn").addEventListener("click", function () {
        document.getElementById("simulatorState").textContent = "Stepping";
        updatePC();
        highlightRandomRegister();
        updateRandomMemory();
    });

    document.getElementById("pauseBtn").addEventListener("click", function () {
        document.getElementById("simulatorState").textContent = "Paused";
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
        document.getElementById("simulatorState").textContent = "Ready";
        document.getElementById("pcValue").textContent = "0x00000000";
        document.getElementById("cycleCount").textContent = "0";

        // Reset all register highlights
        document.querySelectorAll(".register-cell").forEach((cell) => {
            cell.classList.remove("changed");
        });

        // Reset memory highlights
        document.querySelectorAll(".memory-cell").forEach((cell) => {
            cell.classList.remove("changed", "active");
            cell.textContent = "00";
        });
    });

    // Helper functions for simulation
    function highlightRandomRegister() {
        // Remove previous highlights
        document.querySelectorAll(".register-cell").forEach((cell) => {
            cell.classList.remove("changed");
        });

        // Highlight a random register
        const randomReg = Math.floor(Math.random() * 31);
        const register = document.getElementById(`register-X${randomReg}`);
        if (register) {
            register.classList.add("changed");

            // Update value with a random number
            const randomValue = Math.floor(Math.random() * 256);
            register.querySelector("span:last-child").textContent =
                `0x${randomValue.toString(16).padStart(8, "0")}`;
        }
    }

    function updatePC() {
        const pcElement = document.getElementById("pcValue");
        let currentPC = parseInt(pcElement.textContent.substring(2), 16);
        currentPC += 4; // Increment PC by 4 (assuming 4-byte instructions)
        pcElement.textContent = `0x${currentPC.toString(16).padStart(8, "0")}`;

        // Update cycle count
        const cycleElement = document.getElementById("cycleCount");
        let cycles = parseInt(cycleElement.textContent);
        cycleElement.textContent = (cycles + 1).toString();
    }

    function updateRandomMemory() {
        // Remove previous highlights
        document.querySelectorAll(".memory-cell").forEach((cell) => {
            cell.classList.remove("changed", "active");
        });

        // Update a random memory location
        const randomCell = document.querySelector(
            `.memory-cell[data-address="${Math.floor(Math.random() * 256)}"]`,
        );
        if (randomCell) {
            randomCell.classList.add("changed");
            randomCell.textContent = Math.floor(Math.random() * 256)
                .toString(16)
                .padStart(2, "0");
        }

        // Highlight PC location in memory
        const pcValue = document.getElementById("pcValue").textContent;
        const pcAddress = parseInt(pcValue.substring(2), 16) % 256;
        const pcCell = document.querySelector(
            `.memory-cell[data-address="${pcAddress}"]`,
        );
        if (pcCell) {
            pcCell.classList.add("active");
        }
    }
});

const c = document.getElementById("mainCanvas");
const ctx = c.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 75, 50);

//Turn transparency on
ctx.globalAlpha = 0.2;
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 75, 50);
ctx.fillStyle = "green";
ctx.fillRect(80, 80, 75, 50);
