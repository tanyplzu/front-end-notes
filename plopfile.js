const promptDirectory = require('inquirer-directory');
module.exports = (plop) => {
  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator('add page', {
    description: 'create a page',
    prompts: [
      {
        type: 'input',
        name: 'pageName',
        message: 'pageName',
      },
      {
        type: 'confirm',
        name: 'hasToc',
        default: true,
        message: 'hasToc?',
      },
      {
        type: 'list',
        name: 'sidebarDepth',
        message: 'sidebarDepth:',
        choices: [0, 1],
      },
      {
        type: 'directory',
        name: 'directory',
        message: 'directory:',
        basePath: './docs',
      },
    ],
    actions: function(data) {
      const { pageName, directory } = data;
      const actions = [];
      if (pageName && directory) {
        actions.push({
          type: 'add',
          path: 'docs/{{directory}}/{{pageName}}.md',
          templateFile: 'templates/index.txt',
        });
      }
      return actions;
    },
  });
};
