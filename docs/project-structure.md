# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks something like this:

```sh
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- features          # feature based modules
|
+-- guards            # shared route guards used across the entire application
|
+-- hooks             # shared hooks used across the entire application
|
+-- layouts           # shared layouts used across the entire application
|
+-- libs              # reusable libraries pre-configured for the application. e.g. i18n, http (axios), firebase, aws, etc
|
+-- providers         # reusable providers used across the application. e.g. I18nProvider, ThemeProvider, SocketProvider, FirebaseProvider, etc.
|
+-- routes            # application route components. This follows a file-based navigation hierarchy similar to next/remix. always try to group related routes together. e.g. user/profile, user/settings, auth/login, auth/forgot-password, etc.
|
+-- store             # global client-side state store. e.g. Zustand, RTK, Jotai
|
+-- styles            # global styles, colors, mixins, variables. (Optional)
|
+-- themes            # global theme variables used accorss the application. e.g. dark-theme, light-theme, high-contrast (for a11y), etc!
|
+-- utilities         # shared utilities used across the application. e.g. utilities/patterns.js, utilities/date-time.js, utilities/env.js, etc!
|
+-- App.jsx           # Wrapper around app-shell and router and injected into root node
|
+-- AppRouter.jsx     # Configures application routes with lazy loading
|
+-- AppShell.jsx      # Configures required providers and renders the browser-router. You should use this file to configure global providers, contexts, etc!
|
+-- main.jsx          # Entrypoint of the application
```

For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated. This approach helps prevent mixing feature-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, you can enhance collaboration, readability, and scalability in the application's architecture.

A feature could have the following structure:

```sh
src/features/super-cool-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature (if RTK-Query/React-Query used)
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- providers   # providers scoped to a specific feature
|
+-- slices      # client-side state slices scoped to a specific feature
|
```

NOTE: You don't need all of these folders for every feature. Only include the ones that are necessary for the feature.

In the past, it was recommended to use barrel files (index.js/ts exports everything) to export all the files from a feature. However, it can cause issues for Vite to do tree shaking and can lead to performance issues. Therefore, it is recommended to import the files directly.

You might also want to enforce unidirectional codebase architecture. This means that the code should flow in one direction, from shared parts of the code to the application. This is a good practice to follow as it makes the codebase more predictable and easier to understand.


By following these practices, you can ensure that your codebase is well-organized, scalable, and maintainable. This will help you and your team to work more efficiently and effectively on the project.
This approach can also make it easier to apply similar architecture to apps built with Next.js, Remix.
