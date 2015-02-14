var React = require('react');
var AceEditor  = require('../src/ace.jsx');

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

var Editor = React.createClass({
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
  render: function () {
    return (
      <div>
        <ToolBar onToolBarChange={this.handleToolBarChange} themes={this.props.themes}/>
        <AceEditor mode="javascript" theme={this.state.theme} name="blah2" height="6em"/>
      </div>
    )
  }
})

React.render(
  <Editor/>,
  document.getElementById('example')
);
