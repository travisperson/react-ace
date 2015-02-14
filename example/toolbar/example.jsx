var React = require('react');
var AceEditor  = require('../../src/ace.jsx');

var ToolBar = React.createClass({
  handleChange: function() {
    this.props.onToolBarChange(
      this.refs.theme.getDOMNode().value
    )
  },
  render: function() {
    var options = [];
    this.props.themes.forEach(function(theme) {
      var name = theme.charAt(0).toUpperCase() + theme.slice(1);
      options.push(<option value={theme}>{name}</option>)
    }.bind(this))

    return (
      <select ref="theme" onChange={this.handleChange}>
        {options}
      </select>
    )
  }
})

var ToolBarEditor = React.createClass({
  getInitialState: function() {
    return ({
      theme: "github"
    });
  },
  getDefaultProps: function () {
    return ({
      themes: ["github", "monokai"]
    });
  },
  handleToolBarChange: function(theme) {
    this.setState({
      theme: theme
    })
  },
  handlePatch: function(patch) {
    console.log("Got Patch")
    console.log(patch)
  },
  render: function () {
    return (
      <div>
        <ToolBar onToolBarChange={this.handleToolBarChange} themes={this.props.themes}/>
        <AceEditor mode="javascript" theme={this.state.theme} name="toolbar-editor" height="6em" onChange={this.handlePatch}/>
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
