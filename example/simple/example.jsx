var React = require('react');
var AceEditor  = require('../../src/ace.jsx');

if (document.getElementById('simple-example') != undefined) {
  React.render(
    <AceEditor mode="javascript" theme="github" name="simple-editor" height="6em"/>,
    document.getElementById('simple-example')
  );
}
