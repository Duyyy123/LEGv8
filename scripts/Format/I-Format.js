class IFormat {
    constructor(IFormatInstruction, PC) {
        this.opcode = toExactBinary(IFormatInstruction.definition.opcode, 10); // 11 bits
        this.immediate = toExactSignBinary(IFormatInstruction.immediate, 12); // 12 bits
        this.Rn = toExactBinary(IFormatInstruction.rn, 5);
        this.Rd = toExactBinary(IFormatInstruction.rd, 5);
        this.address = LEGv8Registers.binaryToHex(
            LEGv8Registers.valueTo64BitBinary(PC.getCurrentAddress()),
        );
        this.aluControl = toExactBinary(
            IFormatInstruction.definition.controlSignals.operation,
            4,
        );
        this.lineNumber = IFormatInstruction.lineNumber; // Line number for debugging
        this.controlSignals = getControlSignals(IFormatInstruction);
    }

    async instructionFetch() {
        const instruction = this.opcode + this.Rn + this.immediate + this.Rd;
        const pathAndData = [
            { pathId: "pc-alu", data: this.address },
            { pathId: "pc-add-4", data: this.address },
            { pathId: "pc-ins-mem", data: instruction },
        ];
        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);
    }

    async instructionDecode() {
        const instruction = this.opcode + this.Rn + this.immediate + this.Rd;
        const instruction20_16 = getBits(instruction, 16, 20); // 20-16 bits

        const pathAndData = [
            { pathId: "Instruction-[31-21]", data: this.opcode },
            { pathId: "Instruction-[9-5]", data: this.Rn },
            { pathId: "Instruction-[20-16]", data: instruction20_16 },
            { pathId: "Instruction-[4-0]", data: this.Rd },
            { pathId: "Instruction-[4-0]-1", data: this.Rd },
            { pathId: "Instruction-[31-0]", data: instruction },
            { pathId: "Instruction-[31-21]-1", data: this.opcode },
        ];

        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);

        // Control signals
        const controlPathAndData = [
            { pathId: "control-reg-loc", data: this.controlSignals.Reg2Loc },
            {
                pathId: "control-uncond-branch",
                data: this.controlSignals.UncondBranch,
            },
            { pathId: "control-mem-read", data: this.controlSignals.MemRead },
            { pathId: "control-mem-reg", data: this.controlSignals.MemtoReg },
            {
                pathId: "control-ALU-op",
                data: this.controlSignals.ALUOp1 + this.controlSignals.ALUOp0,
            },
            {
                pathId: "control-flag-branch",
                data: this.controlSignals.FlagBranch,
            },
            { pathId: "control-mem-write", data: this.controlSignals.MemWrite },
            { pathId: "control-ALU-src", data: this.controlSignals.ALUSrc },
            { pathId: "control-reg-write", data: this.controlSignals.RegWrite },
            { pathId: "control-branch", data: this.controlSignals.Branch },
            {
                pathId: "control-flag-write",
                data: this.controlSignals.FlagWrite,
            },
        ];
        const allControlRuns = controlPathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allControlRuns);
        controlUnitDisplay(this.controlSignals, 1);
        document.getElementById("mux0_0").style.color = "#007BFF";
        document.getElementById("mux1_1").style.color = "#007BFF";
        document.getElementById("mux3_0").style.color = "#007BFF";
        document.getElementById("mux-0").style.background =
            "linear-gradient(to bottom, red 50%, #acb1b3 50%)";
        document.getElementById("mux-1").style.background =
            "linear-gradient(to bottom,  #acb1b3 50%, red 50%)";
        document.getElementById("mux-3").style.background =
            "linear-gradient(to bottom,  #acb1b3 50%, red 50%)";

        document.getElementById("register-handler").style.borderColor =
            "#007BFF";
        document.getElementById("register-handler-write").style.color =
            "#007BFF";

        const muxToRegister = [
            { pathId: "mux-read-res-2", data: instruction20_16 }, // 20-16 bits
        ];
        await Promise.all(
            muxToRegister.map(({ pathId, data }) => run(data, pathId)),
        );
    }

    async execute() {
        const instruction = this.opcode + this.Rn + this.immediate + this.Rd; // Concatenate all parts to form the instruction
        const register1_hexan = LEGv8Registers.binaryToHex(
            registers.readByBinary(this.Rn),
        ); // 9-5 bits
        const register2_hexan = LEGv8Registers.binaryToHex(
            registers.readByBinary(getBits(instruction, 16, 20)),
        );

        const extendImmediate_hexan = LEGv8Registers.binaryToHex(
            LEGv8Registers.signExtend(this.immediate),
        ); // 20-16 bits

        const register1_decimal = LEGv8Registers.binaryToBigInt(
            registers.readByBinary(this.Rn),
        );
        const immediate_decimal = LEGv8Registers.binaryToBigInt(
            LEGv8Registers.signExtend(this.immediate),
        );

        const newRegisterValue = {
            "0010": register1_decimal + immediate_decimal, // ADD
            "0110": register1_decimal - immediate_decimal, // SUB
            "0000": register1_decimal & immediate_decimal, // AND
            "0001": register1_decimal | immediate_decimal, // ORR
        };
        const newRegister_bin = LEGv8Registers.valueTo64BitBinary(
            newRegisterValue[this.aluControl] || 0,
        );
        registers.writeByBinary(this.Rd, newRegister_bin); // Write the result to the destination register

        const pathAndData = [
            { pathId: "read-1-alu", data: register1_hexan },
            { pathId: "read-data-2-mux", data: register2_hexan },
            { pathId: "ALU-control-ALU", data: this.aluControl }, // fix alu control
            { pathId: "Sign-extend-mux", data: extendImmediate_hexan }, // 4-0 bits
            { pathId: "Sign-extend-shift", data: extendImmediate_hexan }, // 4-0 bits
        ];
        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);
        const immediateShifted_bin = LEGv8Registers.valueTo64BitBinary(
            LEGv8Registers.binaryToBigInt(
                LEGv8Registers.signExtend(this.immediate),
            ) << BigInt(2),
        );
        const immediateShifted_hexan =
            LEGv8Registers.binaryToHex(immediateShifted_bin); // Shift left by 2 bits
        const anotherPathAndData = [
            { pathId: "shift-add-alu", data: immediateShifted_hexan }, // 9-5 bits
            { pathId: "mux-alu", data: extendImmediate_hexan }, // 20-16 bits
        ];

        const anotherRuns = anotherPathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(anotherRuns);
    }
    async memoryAccess() {
        const instruction = this.opcode + this.Rn + this.immediate + this.Rd; // Concatenate all parts to form the instruction
        const add4Address = add4ToHexAddress(this.address);

        const register2_hexan = LEGv8Registers.binaryToHex(
            registers.readByBinary(getBits(instruction, 16, 20)),
        ); // 20-16 bits

        const newRegisterValue_hexan = LEGv8Registers.binaryToHex(
            registers.readByBinary(this.Rd),
        ); // 4-0 bits
        const immediateShifted_bin = LEGv8Registers.valueTo64BitBinary(
            LEGv8Registers.binaryToBigInt(this.immediate) << BigInt(2),
        );
        const immediateShifted_hexan =
            LEGv8Registers.binaryToHex(immediateShifted_bin); // Shift left by 2 bits

        const pathAndData = [
            { pathId: "read-data-2-write-data", data: register2_hexan },
            { pathId: "ALU-mux", data: newRegisterValue_hexan }, // 4-0 bits
            { pathId: "ALU-address", data: newRegisterValue_hexan }, // 4-0 bits !!!!
            { pathId: "alu-to-nzcv", data: "0000" }, // 4-0 bits
            { pathId: "alu-add-4-mux", data: add4Address }, // 4-0 bits  !!!
            {
                pathId: "ALU-add-mux",
                data: addHexStrings(this.address, immediateShifted_hexan),
            }, // 4-0 bits
            { pathId: "ALU-and-gate", data: "0" }, // 4-0 bits
        ];
        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);

        // This is the part where read address register in memory
        const anotherPathAndData = [
            { pathId: "read-data-mux", data: "0x000" }, // 4-0 bits  !!!!!
            { pathId: "and-gate-or-gate", data: "0" },
            { pathId: "add-2-or-gate", data: "0" }, // 4-0 bits
        ];
        const anotherRuns = anotherPathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(anotherRuns);
        const orToMux = [
            { pathId: "or-gate-mux", data: "0" }, // 4-0 bits
        ];
        const orRuns = orToMux.map(({ pathId, data }) => run(data, pathId));
        await Promise.all(orRuns);
        document.getElementById("mux2_0").style.color = "#007BFF";
        document.getElementById("mux-2").style.background =
            "linear-gradient(to bottom, red 50%, #acb1b3 50%)";
    }
    async registerWrite() {
        const newRegister_hexan = LEGv8Registers.binaryToHex(
            registers.readByBinary(this.Rd),
        ); // 4-0 bits
        const pathAndData = [
            { pathId: "mux-write-data", data: newRegister_hexan }, // 4-0 bits
            { pathId: "ALU-back-PC", data: add4ToHexAddress(this.address) }, // 4-0 bits
        ];
        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);
        // Update Pc
        PC.setAddress(PC.getCurrentAddress() + 4); // Increment PC by 4 for the next instruction
        jumpToAddress(PC, vec, PC.getCurrentAddress()); // Update the address in the UI

        const pos = binaryToUnsignedDecimal(this.Rd); // Get the position of Rd
        document
            .getElementById(`register-X${pos}`)
            .querySelector("span:last-child").textContent = newRegister_hexan;
        document.getElementById(`register-X${pos}`).style.background =
            "#87CEFA";
        document.getElementById("mux0_0").style.color = "black";
        document.getElementById("mux1_1").style.color = "black";
        document.getElementById("mux2_0").style.color = "black";
        document.getElementById("mux3_0").style.color = "black";
        document.getElementById("register-handler").style.borderColor = "black";
        document.getElementById("register-handler-write").style.color = "black";
        controlUnitDisplay(this.controlSignals, 0);
    }
    async clearInstruction() {
        const pathAndData = [{ pathId: "hidden_path", data: 0 }];
        const allRuns = pathAndData.map(({ pathId, data }) =>
            run(data, pathId),
        );
        await Promise.all(allRuns);
    }
    async run() {
        markLines("assemblyCode", this.lineNumber);
        await this.instructionFetch();
        await this.instructionDecode();
        await this.execute();
        await this.memoryAccess();
        await this.registerWrite();
        await this.clearInstruction();
        if (isBack == true){
            registers.backUpDataByBinary(this.Rd);
        }
    }
}
