# 🗃️ State Management

Managing state effectively is crucial for optimizing your application's performance. Instead of storing all state information in a single centralized repository, consider dividing it into various categories based on their usage. By categorizing your state, you can streamline your state management process and enhance your application's overall efficiency.

## Component State

Component state is specific to individual components and should not be shared globally. It can be passed down to child components as props when necessary. Typically, you should begin by defining state within the component itself and consider elevating it to a higher level if it's required elsewhere in the application. When managing component state, you can use the following React hooks:

- [useState](https://react.dev/reference/react/useState) - for simpler states that are independent
- [useReducer](https://react.dev/reference/react/useReducer) - for more complex states where on a single action you want to update several pieces of state

## Application State

Application state manages global parts of an application, such as controlling global modals, notifications, and toggling color modes. To ensure optimal performance and ease of maintenance, it is advisable to localize the state as closely as possible to the components that require it. Avoid unnecessarily globalizing all state variables from the outset to maintain a structured and efficient state management architecture.

Good Application State Solutions:

- [context](https://react.dev/learn/passing-data-deeply-with-context) + [hooks](https://react.dev/reference/react-dom/hooks)
- [redux](https://redux.js.org/) + [redux toolkit](https://redux-toolkit.js.org/)
- [jotai](https://github.com/pmndrs/jotai)


## Server Cache State

The Server Cache State refers to the data retrieved from the server that is stored locally on the client-side for future use. While it is feasible to cache remote data within a state management store like Redux, there exist more optimal solutions to this practice. It is essential to consider more efficient caching mechanisms to enhance performance and optimize data retrieval processes.

Good Server Cache Libraries:

- [react-query](https://tanstack.com/query)
- [rtk-Query](https://redux-toolkit.js.org/rtk-query)

## Form State

Forms are a crucial part of any application, and managing form state effectively is essential for a seamless user experience. When handling form state, consider using libraries like Formik or React Hook Form. These libraries provide built-in validation, error handling, and form submission functionalities, making it easier to manage form state within your application.

Depending on the application needs, they might be pretty complex with many different fields that require validation.

Although it is possible to build any form using only React primitives, there are some good solutions out there that help with handling forms such as:

- [React Hook Form](https://react-hook-form.com/) + [Resolvers](https://www.npmjs.com/package/@hookform/resolvers) (Consider this combination over Formik for functional components)
- [Formik](https://formik.org/)

You can also integrate validation libraries with the mentioned solutions to validate inputs on the client. Some good options are:

- [yup](https://github.com/jquense/yup)
- [zod](https://github.com/colinhacks/zod)

## URL State

URL state refers to the data stored and manipulated within the address bar of the browser. This state is commonly managed through URL parameters (e.g., /app/${dynamicParam}) or query parameters (e.g., /app?dynamicParam=1). By incorporating routing solutions like react-router-dom, you can effectively access and control the URL state, enabling dynamic manipulation of application parameters directly from the browser's address bar.
