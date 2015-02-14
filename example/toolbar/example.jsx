var React = require('react');
var AceEditor  = require('../../src/ace.jsx');

var ToolBar = React.createClass({
  handleChange: function() {
    this.props.onToolBarChange({
      theme: this.refs.theme.getDOMNode().value,
      mode: this.refs.mode.getDOMNode().value
    })
  },
  render: function() {
    var themes = [];
    this.props.themes.forEach(function(theme) {
      var name = theme.charAt(0).toUpperCase() + theme.slice(1);
      themes.push(<option value={theme}>{name}</option>)
    }.bind(this))

    var modes = [];
    this.props.modes.forEach(function(theme) {
      var name = theme.charAt(0).toUpperCase() + theme.slice(1);
      modes.push(<option value={theme}>{name}</option>)
    }.bind(this))

    return (
      <div>
        <select ref="theme" onChange={this.handleChange}>
          {themes}
        </select>
        <select ref="mode" onChange={this.handleChange}>
          {modes}
        </select>
      </div>
    )
  }
})

var ToolBarEditor = React.createClass({
  getInitialState: function() {
    return ({
      theme: "github",
      mode: "javascript",
    });
  },
  getDefaultProps: function () {
    return ({
      themes: [
        "monokai",
        "github",
        "tomorrow",
        "kuroir",
        "twilight",
        "xcode",
        "textmate",
        "terminal",
        "solarized_dark",
        "solarized_light"
      ],
      modes: [
        "javascript",
        "java",
        "c_cpp",
        "php",
        "python",
        "xml",
        "ruby",
        "sass",
        "markdown",
        "mysql",
        "json",
        "html",
        "handlebars",
        "golang",
        "csharp",
        "coffee",
        "css"
      ]
    });
  },
  handleToolBarChange: function(ob) {
    this.setState(ob)
  },
  handlePatch: function(patch) {
    console.log("Got Patch")
    console.log(patch)
  },
  render: function () {
    return (
      <div>
        <ToolBar onToolBarChange={this.handleToolBarChange} themes={this.props.themes} modes={this.props.modes}/>
        <AceEditor theme={this.state.theme} mode={this.state.mode} name="toolbar-editor" height="6em" onChange={this.handlePatch}/>
      </div>
    )
  }
})

if (document.getElementById('toolbar-example') != undefined) {
  React.render(
    <ToolBarEditor/>,
    document.getElementById('toolbar-example')
  );
}
