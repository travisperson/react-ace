var React = require('react');
var AceEditor  = require('../../src/ace.jsx');

var PatchEditor = React.createClass({
  getDefaultProps: function () {
    return ({
      patches: []
    });
  },
  handlePatch: function(patch) {
    if(typeof this.props.handlePatch == "function") {
      this.props.handlePatch(patch);
    }
  },
  render: function () {
    return (
      <div id={this.props.name}>
        <AceEditor mode="javascript" theme="github" name={this.props.name + "-editor"} onChange={this.handlePatch} patches={this.props.patches}/>
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
