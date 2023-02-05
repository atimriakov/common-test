const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const packageJson = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  const [orgName, projectName] = packageJson.name.substring(1).split('/');
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  // if(!webpackConfigEnv.standalone) {
  //   // defaultConfig.externals.push(/@material-ui\/core\/.*/);
     defaultConfig.externals.push('@okta/okta-auth-js');
     defaultConfig.externals.push('@okta/okta-react');
  //
     defaultConfig.externals.push('react');
     defaultConfig.externals.push('react-router');
     defaultConfig.externals.push('react-router-dom');
  // }

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      clean: true,
    },
  });
};
