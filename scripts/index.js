const { createApp, ref, reactive, computed } = Vue;

createApp({
    setup() {
        // Simulator state
        const simulatorState = ref("Ready");
        const pcValue = ref("0x00000000");
        const cycleCount = ref(0);
        const executionSpeed = ref(5);
        const activeTab = ref("registers");

        // Code editor
        const assemblyCode = ref("");
        const currentLine = ref(1);
        const currentCol = ref(1);

        // Breakpoints
        const newBreakpoint = ref("");
        const breakpoints = ref([]);

        // Registers
        const registers = reactive({
            general: Array.from({ length: 32 }, (_, i) => ({
                name: `X${i}`,
                value: "0x00000000",
                highlight: false,
            })),
            special: [
                {
                    name: "SP",
                    value: "0x7FFFFFF0",
                    highlight: false,
                },
                {
                    name: "FP",
                    value: "0x7FFFFFF0",
                    highlight: false,
                },
                {
                    name: "LR",
                    value: "0x00000000",
                    highlight: false,
                },
                {
                    name: "PC",
                    value: "0x00000000",
                    highlight: false,
                },
            ],
            status: [
                {
                    name: "NZCV",
                    value: "0x00000000",
                    highlight: false,
                },
                {
                    name: "PSTATE",
                    value: "0x00000000",
                    highlight: false,
                },
            ],
        });

        // Memory
        const memoryAddress = ref("0x00000000");
        const memoryRows = ref(
            Array.from({ length: 32 }, (_, i) => ({
                address: `0x${(i * 8).toString(16).padStart(8, "0")}`,
                bytes: Array.from({ length: 8 }, (_, j) => ({
                    value: "00",
                    highlight: false,
                })),
            })),
        );

        // Stack
        const stackPointer = ref("0x7FFFFFF0");
        const stackEntries = ref([
            {
                address: "0x7FFFFFF0",
                value: "0x00000000",
                note: "Bottom",
            },
            {
                address: "0x7FFFFFE8",
                value: "0x00000000",
                note: "",
            },
            {
                address: "0x7FFFFFE0",
                value: "0x00000000",
                note: "",
            },
        ]);

        // Methods
        const updateCursorPosition = (event) => {
            const textarea = event.target;
            const cursorPos = textarea.selectionStart;
            const textLines = textarea.value.substr(0, cursorPos).split("\n");
            currentLine.value = textLines.length;
            currentCol.value = textLines[textLines.length - 1].length + 1;
        };

        const assemble = () => {
            simulatorState.value = "Assembling...";
            // Simulate assembly delay
            setTimeout(() => {
                simulatorState.value = "Ready";
                // Highlight some registers for demo
                registers.general[0].highlight = true;
                registers.general[1].highlight = true;
                registers.special[3].highlight = true;
                pcValue.value = "0x00000004";
            }, 500);
        };

        const run = () => {
            simulatorState.value = "Running";
            cycleCount.value = 0;
            // Simulate running
            const interval = setInterval(() => {
                cycleCount.value++;
                if (cycleCount.value >= 10) {
                    clearInterval(interval);
                    simulatorState.value = "Finished";
                }
            }, 1000 / executionSpeed.value);
        };

        const step = () => {
            simulatorState.value = "Stepping";
            cycleCount.value++;
            // Simulate step
            setTimeout(() => {
                simulatorState.value = "Paused";
                // Update some memory for demo
                memoryRows.value[0].bytes[0].value = "FF";
                memoryRows.value[0].bytes[0].highlight = true;
            }, 300);
        };

        const pause = () => {
            simulatorState.value = "Paused";
        };

        const reset = () => {
            simulatorState.value = "Ready";
            cycleCount.value = 0;
            pcValue.value = "0x00000000";
            // Reset highlights
            registers.general.forEach((reg) => (reg.highlight = false));
            registers.special.forEach((reg) => (reg.highlight = false));
            registers.status.forEach((reg) => (reg.highlight = false));
            memoryRows.value.forEach((row) => {
                row.bytes.forEach((byte) => {
                    byte.value = "00";
                    byte.highlight = false;
                });
            });
        };

        const addBreakpoint = () => {
            if (
                newBreakpoint.value &&
                !breakpoints.value.includes(newBreakpoint.value)
            ) {
                breakpoints.value.push(newBreakpoint.value);
                newBreakpoint.value = "";
            }
        };

        const removeBreakpoint = (index) => {
            breakpoints.value.splice(index, 1);
        };

        const loadCode = () => {
            // In a real app, this would load from a file
            assemblyCode.value = `// Sample LEGv8 code
ADD X0, X1, X2
SUB X3, X4, X5
LDUR X6, [X7, #0]
STUR X8, [X9, #8]`;
        };

        const saveCode = () => {
            // In a real app, this would save to a file
            alert("Code saved (simulated)");
        };

        const clearCode = () => {
            assemblyCode.value = "";
        };

        const loadMemory = () => {
            // In a real app, this would load memory from the specified address
            alert(`Loading memory from ${memoryAddress.value}`);
        };

        const showHelp = () => {
            alert(
                "LEGv8 Simulator Help\n\nUse the controls to assemble and run your code.",
            );
        };

        return {
            // State
            simulatorState,
            pcValue,
            cycleCount,
            executionSpeed,
            activeTab,
            assemblyCode,
            currentLine,
            currentCol,
            newBreakpoint,
            breakpoints,
            registers,
            memoryAddress,
            memoryRows,
            stackPointer,
            stackEntries,

            // Methods
            updateCursorPosition,
            assemble,
            run,
            step,
            pause,
            reset,
            addBreakpoint,
            removeBreakpoint,
            loadCode,
            saveCode,
            clearCode,
            loadMemory,
            showHelp,
        };
    },
}).mount("#app");
