# Tempo Frontend challenge

## To Run the project you must run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```

# Solution Improvement

### Describe what you have improved in the solution

### Code Indentation Update

#### Reason:

To enhance the visual clarity of the codebase, the indentation spacing was adjusted. Previously, a 4-space indentation was employed, which sometimes led to less readable code, especially in nested structures. Switching to a 2-space indentation provides a more compact and visually appealing code layout.

### Completion of API Service Tests

#### Reason:

Ensuring the reliability and correctness of any application requires comprehensive testing. Initially, the API service lacked some test cases. Completing these tests ensures that the API service functions as expected, providing a safety net against regressions and enhancing confidence in the code's behavior. Proper testing also simplifies future refactoring and feature additions, as developers can be assured that existing functionality remains intact.

### Transition from `var` to `const` and `let`

#### Reason:

Modern JavaScript introduced `const` and `let` as more predictable and safer alternatives to `var`. The use of `var` has several pitfalls, such as variable hoisting and a broader scope, which can lead to unintended behaviors in the code. By transitioning to `const` and `let`, the codebase benefits from:

1. **Block Scope**: Unlike `var`, which is function-scoped, `const` and `let` are block-scoped. This means they are only accessible within the block they are defined, reducing the risk of variable leakage or unintended reassignments.
  
2. **Immutability with `const`**: Variables declared with `const` are read-only, ensuring their values can't be reassigned accidentally. This provides clarity about the variable's intention and can prevent bugs related to unintended reassignments.

3. **Clarity of Intent**: Using `const` by default, and `let` only when necessary, makes the code's intent clearer. Readers can immediately understand if a variable is intended to be reassigned or not.

Overall, this change aligns the codebase with current best practices, enhancing its maintainability and clarity.

### Refactoring File Exports and Directory Structure

#### Reason:

The original codebase utilized a common but potentially confusing pattern: each directory had an `index.ts` file, making it challenging to quickly identify and navigate to specific files using tools like the `cmd + p` shortcut in the VSCode editor. 

To address this:

1. **Descriptive Filenames**: Each file was renamed to match its respective directory name. This makes it more intuitive to locate specific files, especially when there are multiple `index.ts` files open in the editor.

2. **Centralized Exports with `index.ts`**: For directories containing multiple files (like `pages`), all named exports were centralized in a root-level `index.ts` file. This approach not only streamlines imports but also provides a clear overview of what's available for export in that directory.

3. **Streamlined Imports**: With the centralized export approach, importing multiple items from a directory became more coherent. For instance, all components can now be imported in a single line, making the code cleaner and more readable.

This restructuring enhances the developer experience by simplifying file navigation and imports, leading to a more organized and maintainable codebase.

### Refactoring the `Card` Component

#### Before vs. After Analysis:

#### **File Location & Naming**:
- **Before**: The component file was named `Card.tsx`.
- **After**: The component was relocated to `src/components/Card/index.tsx`. This change improves the clarity of the file's purpose and its associated components and styles, making it easier to navigate and understand the project's structure.

#### **Component Structure**:
- **Before**: The component was a default export named `Card`.
- **After**: The component is now a named export, `Card`, which aids in code clarity and IntelliSense suggestions in editors like VSCode. Named exports are generally preferable for consistency and ease of refactoring.

#### **Type Definitions**:
- **Before**: The type `Props` was used for the component's props.
- **After**: A more descriptive type name, `CardProps`, is used. Additionally, the `TColumn` type was extracted, which clearly defines the structure of a column and can be reused elsewhere if necessary.

#### **Component Logic**:
- **Before**: The click handler was defined inline within the JSX.
- **After**: The click handler, `onClick`, is defined as a separate function outside the JSX. This enhances readability and allows for easier unit testing of the handler logic.

#### **Component Composition**:
- **Before**: The column mapping logic was done directly within the component's return statement.
- **After**: 
  - The column mapping logic was abstracted into a separate component, `ColumnList`. This change promotes the Single Responsibility Principle, making the `Card` component cleaner and the logic for rendering columns more modular.
  - Within the `ColumnList` component, individual columns are rendered using the `Column` component, further modularizing the rendering process. Each column's key and value are passed to the `Column` component as props, ensuring that the responsibility of rendering a single column is isolated to the `Column` component. This makes the code more maintainable, easier to understand, and potentially more reusable.

#### **Code Styling**:
- General code styling, such as spacing and indentation, was made more consistent in the refactored version.

#### Summary:

The refactoring process applied to the `Card` component focused on improving code clarity, modularity, and maintainability. By relocating files, refining type definitions, modularizing component logic, and improving code style, the component is now more developer-friendly and easier to maintain and test. The addition of the `ColumnList` and `Column` components further modularizes the rendering process, promoting clean code principles and making the application more scalable.

### Introduction of Hooks for Business Logic

#### Motivation & Benefits:

1. **Concentration of Business Logic**:
   - **Before**: Business logic might have been scattered across different components or parts of the application.
   - **After**: By introducing custom hooks, business logic is now centralized in dedicated functions. This separation of concerns ensures that the components remain clean, focusing primarily on rendering and user interactions. By isolating the business logic in hooks, it becomes easier to manage, update, and test this logic without interfering with the component lifecycle or structure.

2. **Request Cancellation on Component Dismount**:
   - **Problem**: Without proper management, asynchronous operations like API calls can continue even after a component is unmounted. This can lead to memory leaks, unnecessary network usage, and potential errors if the application tries to update the state of a component that's no longer in the DOM.
   - **Solution**: With the introduction of hooks, the ability to cancel API requests when a component is unmounted was implemented. This ensures that the browser doesn't continue to execute unnecessary calls, preserving resources and preventing potential errors. Specifically, the `AbortController` was used to achieve this, allowing for the cancellation of fetch requests.

#### Summary:

The introduction of custom hooks to manage business logic and handle request cancellations represents a strategic move towards a more efficient, maintainable, and resilient application. By centralizing business rules and ensuring that unnecessary operations are terminated when they're no longer needed, the application's performance is optimized, and potential pitfalls are avoided. This approach not only aligns with modern React best practices but also ensures that the application remains scalable and easy to maintain in the long run.

### Husky Library Integration for Pre-commit Git Hooks

#### Reason:

To ensure consistent quality and reliability standards across the codebase, the Husky library was integrated to facilitate pre-commit Git checks. This integration automates the process of checking and enforcing coding standards before any commits are made. As a result, the following commands were added to the pre-commit hooks:

```
npm run prettier
npm run lint:fix
npm run test:clear-cache
npm test
```

By running these commands, the code is automatically formatted according to the project's standards (`npm run prettier`), linting issues are identified and fixed (`npm run lint:fix`), test caches are cleared to ensure accurate test results (`npm run test:clear-cache`), and unit tests are executed to validate the code's functionality (`npm test`). This automated process ensures that all commits adhere to the established quality benchmarks, reducing the likelihood of introducing bugs or inconsistencies.

### Implementation of `useTeamOverview` Hook in `src/pages/TeamOverview/hooks`

#### Reason:

Within the `src/pages/TeamOverview/hooks/useTeamOverview.ts` file, the `useTeamOverview` hook was crafted to manage the retrieval and presentation of team-related data. This hook encapsulates several best practices and optimizations:

1. **Parallel API Calls with `Promise.all`**: 
   - The hook effectively uses `Promise.all` to execute multiple API calls in parallel when fetching the data for team members. This parallel approach considerably diminishes the total processing time, providing a rapid and seamless experience for the user.
   
2. **Use of `AbortController` for Request Cancellation**:
   - The `AbortController` is utilized to gracefully handle scenarios where a user may navigate away from the current page before all API requests have finished. By employing this mechanism, any pending requests are automatically terminated upon the component's dismount, ensuring efficient resource usage and preventing potential issues like memory leaks or event loop congestion.

3. **Adoption of the Immer Library with `use-immer`**:
   - The hook leverages the `immer` library through `use-immer`, ensuring state updates adhere to immutability principles. This is especially crucial in React applications, where direct state mutations can lead to unpredictable behaviors. By using Immer's draft-based approach, the hook facilitates a more intuitive way to update state while preserving the inherent benefits of immutability.

4. **Reducer Pattern with `useImmerReducer`**:
   - The state management within the hook is structured around the reducer pattern, with well-defined actions (`FETCH/INIT`, `FETCH/SUCCESS`, and `FETCH/FAILURE`). This pattern, combined with the use of `useImmerReducer`, presents a clear and maintainable way to handle state transitions based on dispatched actions. The reducer function `teamOverviewReducer` manages the loading state, errors, and data for both the team lead and team members.

5. **Data Mapping Utility**:
   - The retrieved data is transformed using the `mapDataToColumns` utility function, ensuring that the data structure is consistent and suited for presentation. This abstraction enhances the clarity of the hook and offers a centralized location for potential data formatting adjustments.

#### Summary:

The `useTeamOverview` hook, situated in `src/pages/TeamOverview/hooks/useTeamOverview.ts`, represents a comprehensive solution for fetching, managing, and presenting team-related data. By employing best practices like parallel API requests, request cancellation, immutable state updates, and the reducer pattern, this hook ensures an efficient, resilient, and maintainable data management flow within the Team Overview page.
