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

var PatchEditor = React.createClass({
  getInitialState: function() {
    return ({
      theme: "github"
    });
  },
  getDefaultProps: function () {
    return ({
      themes: ["github", "monokai"],
      patches: []
    });
  },
  handleToolBarChange: function(theme) {
    this.setState({
      theme: theme
    })
  },
  handlePatch: function(patch) {
    if(typeof this.props.handlePatch == "function") {
      this.props.handlePatch(patch);
    }
  },
  render: function () {
    return (
      <div id={this.props.name}>
        <ToolBar onToolBarChange={this.handleToolBarChange} themes={this.props.themes}/>
        <AceEditor mode="javascript" theme={this.state.theme} name={this.props.name + "-editor"} onChange={this.handlePatch} patches={this.props.patches}/>
      </div>
    )
  }
})

var CopyEditors = React.createClass({
  getInitialState: function () {
    return ({
      patches: []
    });
  },
  handlePatch: function(patch) {
    console.log("Patchez")
    this.setState({
      patches: [patch]
    })
  },
  render: function () {
    return (
      <div>
        <PatchEditor name="main" handlePatch={this.handlePatch}/>
        <PatchEditor name="copy" patches={this.state.patches} />
      </div>
    )
  }
})

if (document.getElementById('copy-editor-example') != undefined) {
  console.log("ASD")
  React.render(
    <CopyEditors/>,
    document.getElementById('copy-editor-example')
  );
}
