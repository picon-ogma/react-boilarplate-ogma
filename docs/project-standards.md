# ⚙️ Project Standards

Enforcing project standards is crucial for maintaining code quality, consistency, and scalability in a React application. By establishing and adhering to a set of best practices, developers can ensure that the codebase remains clean, organized, and easy to maintain.

#### ESLint

ESLint serves as a valuable linting tool for JavaScript, helping developers in maintaining code quality and adhering to coding standards. By configuring rules in the `.eslintrc.cjs` file, ESLint helps identify and prevent common errors, ensuring code correctness and promoting consistency throughout the codebase. This approach not only helps in catching mistakes early but also enforces uniformity in coding practices, thereby enhancing the overall quality and readability of the code.

[ESLint Configuration Example Code](../.eslintrc.cjs)

#### Prettier

Prettier is a useful tool for maintaining consistent code formatting in your project. By enabling the "format on save" feature in your IDE, code is automatically formatted according to the rules set in the `.prettierrc` configuration file. This practice ensures a uniform code style across your codebase and provides helpful feedback on code issues. If the auto-formatting fails, it signals potential syntax error. Furthermore, Prettier can be integrated with ESLint to handle code formatting tasks alongside enforcing coding standards effectively throughout the development process.

[Prettier Configuration Example Code](../.prettierrc.json)

#### Husky

Husky is a valuable tool for implementing and executing git hooks in your workflow. By utilizing Husky to run code validations before each commit, you can ensure that your code maintains high standards and that no faulty commits are pushed to the repository. Husky enables you to perform various tasks such as linting, code formatting, and type checking before allowing code pushes. You can check how to configure it [here](https://typicode.github.io/husky/#/?id=usage).

#### File naming conventions

We can also enforce the file naming conventions and folder naming conventions in the project. For example, you can enforce that all files should be named in `kebab-case`. This can help you to keep your codebase consistent and easier to navigate.

To enforce this, you can use ESLint:

```js
'check-file/filename-naming-convention': [
  'error',
  {
      '**/*.{js,jsx}': 'KEBAB_CASE',
  },
  {
      // ignore the middle extensions of the filename to support filename like babel.config.js or smoke.spec.ts
      ignoreMiddleExtensions: true,
  },
],
'check-file/folder-naming-convention': [
  'error',
  {
    // all folders within src (except __tests__)should be named in kebab-case
    'src/**/!(__tests__)': 'KEBAB_CASE',
  },
],
```
