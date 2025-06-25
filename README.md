## Work in Progress

The LEGv8 Simulator is currently in an incomplete state. Below are the areas that need further development:

### Missing Features
- **Assembly Logic**: The simulator lacks the core functionality to assemble and execute LEGv8 assembly code. This includes parsing assembly instructions, translating them into machine code, and simulating their execution.
- **Dynamic Updates**: Registers, memory, and stack are not dynamically updated during the simulation. These components need to reflect the current state of the program as it executes.
- **Error Handling**: There is no mechanism to display detailed error messages for invalid assembly code or runtime issues.
- **Help Documentation**: The "Help" button in the header is non-functional and needs to provide useful guidance for users.
- **Memory Navigation**: The memory view is static and lacks features for navigating through larger memory spaces.
- **Stack Visualization**: The stack view is basic and does not support advanced features like stack frame visualization.

### Known Issues
- **UI Responsiveness**: Some UI components may not render correctly on smaller screens or different browsers.
- **Performance**: The current implementation may not handle large assembly programs efficiently.
- **Testing**: The application has not been thoroughly tested, and bugs may exist in the current functionality.

## Future Plans

To complete the project, the following tasks need to be addressed:

1. **Implement Assembly Logic**:
   - Develop a parser for LEGv8 assembly code.
   - Simulate instruction execution and update the program state.

2. **Enhance Dynamic Updates**:
   - Ensure registers, memory, and stack update in real-time during simulation.
   - Highlight changes to provide better visual feedback.

3. **Improve Error Handling**:
   - Add detailed error messages for syntax errors, invalid instructions, and runtime issues.

4. **Expand Memory and Stack Views**:
   - Add navigation controls for memory.
   - Improve stack visualization with better formatting and frame indicators.

5. **Add Debugging Features**:
   - Implement step-back functionality.
   - Allow users to set and manage breakpoints more effectively.

6. **Complete Help Documentation**:
   - Provide a detailed guide on how to use the simulator.
   - Include examples of LEGv8 assembly programs.

7. **Optimize Performance**:
   - Refactor code for better efficiency.
   - Test with larger programs to ensure scalability.

8. **UI Improvements**:
   - Make the interface fully responsive.
   - Enhance the visual design for better usability.

9. **Testing and Validation**:
   - Write unit tests for JavaScript logic.
   - Perform end-to-end testing to ensure all features work as expected.

10. **File Management**:
    - Add support for loading and saving assembly code files.

By addressing these tasks, the LEGv8 Simulator can become a fully functional and user-friendly tool for learning and experimenting with LEGv8 assembly code.
