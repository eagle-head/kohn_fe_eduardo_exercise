# Tempo Frontend challenge - Eduardo Kohn

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

### Describe what I improved in the solution

### Code Indentation Update

#### Reason:

I felt it was essential to enhance the visual clarity of the codebase, so I adjusted the indentation spacing. I noticed that a 4-space indentation was previously employed, which sometimes led to less readable code, especially in nested structures. By switching to a 2-space indentation, I've made the code layout more compact and visually appealing.

### Completion of API Service Tests

#### Reason:

I believe that to ensure the reliability and correctness of any application, comprehensive testing is paramount. I observed that the API service initially lacked some test cases. By completing these tests, I've made sure that the API service functions as expected, which provides a safety net against regressions and enhances confidence in the code's behavior. This also sets the foundation for simpler future refactoring and feature additions, ensuring that the existing functionality remains intact.

### Transition from `var` to `const` and `let`

#### Reason:

Having kept up with modern JavaScript trends, I recognized that `const` and `let` are more predictable and safer alternatives to `var`. I identified several pitfalls with the use of `var`, such as variable hoisting and broader scope, which can lead to unintended behaviors in the code. By making the transition to `const` and `let`, I ensured the codebase benefits from:

1. **Block Scope**: Unlike `var` which has function scope, `const` and `let` are block-scoped. This ensures they are accessible only within the block they are defined, reducing risks related to variable leakage or unintended reassignments.
  
2. **Immutability with `const`**: Variables declared with `const` are read-only. This means their values can't be accidentally reassigned, providing clearer intent and potentially preventing bugs.

3. **Clarity of Intent**: I adopted a practice of using `const` by default and `let` only when reassignment is necessary. This makes the intent of each variable clearer to anyone reading the code.

In the end, this change aligns the codebase with current best practices, enhancing its maintainability and clarity.

### Refactoring File Exports and Directory Structure

#### Reason:

I observed that the original codebase had a pattern that could be confusing: every directory contained an `index.ts` file. This made it challenging to quickly identify and navigate to specific files, especially when using shortcuts in editors like VSCode. 

To resolve this:

1. **Descriptive Filenames**: I renamed each file to match its directory name, making it more intuitive to locate specific files.
2. **Centralized Exports with `index.ts`**: For directories with multiple files, I centralized all named exports in a root-level `index.ts` file. This not only simplifies imports but also gives a clear overview of what each directory exports.
3. **Streamlined Imports**: With this centralized export strategy, importing multiple items from a directory has become more coherent.

By implementing these changes, I aimed to simplify file navigation and imports, resulting in a more organized and maintainable codebase.

### Refactoring the `Card` Component

#### Before vs. After Analysis:

#### **File Location & Naming**:
- **Before**: The file was named `Card.tsx`.
- **After**: I relocated the component to `src/components/Card/index.tsx`, enhancing the clarity of its purpose and associated components and styles.

#### **Component Structure**:
- **Before**: The component had a default export named `Card`.
- **After**: I changed the component to a named export, `Card`, to improve code clarity and IntelliSense suggestions in editors.

#### **Type Definitions**:
- **Before**: The type `Props` was used for the component's props.
- **After**: I opted for a more descriptive type name, `CardProps`, and extracted the `TColumn` type for clearer definitions and potential reuse.

#### **Component Logic**:
- **Before**: The click handler was defined inline in the JSX.
- **After**: I defined the `onClick` handler as a separate function outside the JSX, enhancing readability and testability.

#### **Component Composition**:
- **Before**: The column mapping logic was directly within the component's return statement.
- **After**: 
  - I abstracted the column mapping logic into a separate `ColumnList` component, promoting modularity.
  - Within `ColumnList`, individual columns are rendered using the `Column` component, making the code more maintainable and potentially more reusable.

#### **Code Styling**:
- I ensured general code styling, like spacing and indentation, remained consistent.

#### Summary:

I focused the refactoring process on the `Card` component to improve its clarity, modularity, and maintainability. By making these changes, I've made the component more developer-friendly and easier to maintain and test.

### Introduction of Hooks for Business Logic

#### Motivation & Benefits:

1. **Concentration of Business Logic**:
   - **Before**: I noticed business logic might have been spread across various parts of the application.
   - **After**: By introducing custom hooks, I centralized business logic in dedicated functions, making components cleaner and more focused on rendering.

2. **Request Cancellation on Component Dismount**:
   - **Problem**: Asynchronous operations, like API calls, could continue even after a component was unmounted.
   - **Solution**: I introduced hooks to cancel API requests upon component dismount, optimizing resource usage and preventing potential issues.

#### Summary:

Introducing custom hooks to manage business logic and request cancellations was a strategic decision I made to optimize the application. This approach ensures better performance and reduced pitfalls, aligning with modern React best practices.

### Husky Library Integration for Pre-commit Git Hooks

#### Reason:

To ensure a consistent standard of quality and reliability in the codebase, I integrated the Husky library to establish pre-commit Git checks. With this setup, before any commits are made, the following commands are run:

```
npm run prettier
npm run lint:fix
npm run test:clear-cache
npm test
```

This ensures that all code adheres to the project's quality benchmarks, reducing potential bugs or inconsistencies.

### Implementation of `useTeamOverview` Hook in `src/pages/TeamOverview/hooks`

#### Reason:

In the `src/pages/TeamOverview/hooks/useTeamOverview.ts` file, I crafted the `useTeamOverview` hook

 to manage the retrieval and presentation of team-related data. This hook encapsulates several optimizations and best practices:

1. **Parallel API Calls with `Promise.all`**: 
   - I employed `Promise.all` to execute multiple API calls in parallel, decreasing the overall processing time.
   
2. **Use of `AbortController` for Request Cancellation**:
   - I used the `AbortController` to handle cases where a user might navigate away before all API requests complete, ensuring efficient resource usage.

3. **Adoption of the Immer Library with `use-immer`**:
   - I integrated the `immer` library through `use-immer` to ensure state updates adhere to immutability principles.

4. **Reducer Pattern with `useImmerReducer`**:
   - I structured state management around the reducer pattern with defined actions to handle state transitions based on dispatched actions.

5. **Data Mapping Utility**:
   - I transformed retrieved data using the `mapDataToColumns` utility, ensuring data consistency for presentation.

#### Summary:

The `useTeamOverview` hook represents my approach to fetching, managing, and presenting team-related data. By employing best practices like parallel API requests, request cancellation, immutable state updates, and the reducer pattern, I aimed to ensure an efficient and maintainable data flow.

### Integration of `useDebounce` Hook in `SearchBar` Component

#### Reason:

I recognized the need to optimize user experience in modern web applications. With the `SearchBar` component being pivotal, I integrated the `useDebounce` hook to enhance its efficiency and responsiveness for several reasons:

1. **Minimized Unnecessary Renderings**:
   - I used the `useDebounce` hook to reduce the frequency of re-renders or new data fetches, ensuring they only occur after a specific delay.

2. **Optimized Performance**:
   - I aimed to limit the number of rapid operations to provide a smoother user experience.

3. **Reduced Server Load**:
   - I ensured requests are made less frequently to reduce server load and costs.

4. **Enhanced User Experience**:
   - By debouncing the input, I aimed to align more closely with user expectations.

#### Summary:

Integrating the `useDebounce` hook into the `SearchBar` component was a strategic decision I made to optimize application performance and user experience. This approach ensures that the component is efficient and user-friendly, reflecting best practices in modern React application development.
