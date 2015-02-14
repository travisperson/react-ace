var ace = require('brace');
var React = require('react');
require('brace/theme/monokai');
require('brace/theme/github');
require('brace/theme/tomorrow');
require('brace/theme/kuroir');
require('brace/theme/twilight');
require('brace/theme/xcode');
require('brace/theme/textmate');
require('brace/theme/terminal');
require('brace/theme/solarized_dark');
require('brace/theme/solarized_light');


//include as many of the libraries
require('brace/mode/javascript');
require('brace/mode/java');
require('brace/mode/php');
require('brace/mode/python');
require('brace/mode/xml');
require('brace/mode/ruby');
require('brace/mode/sass');
require('brace/mode/markdown');
require('brace/mode/mysql');
require('brace/mode/json');
require('brace/mode/html');
require('brace/mode/handlebars');
require('brace/mode/golang');
require('brace/mode/csharp');
require('brace/mode/coffee');
require('brace/mode/css');

module.exports = React.createClass({
  editor: undefined,
  propTypes: {
    mode  : React.PropTypes.string,
    theme : React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      name   : 'brace-editor',
      mode   : 'javascript',
      theme  : 'monokai'
    };
  },
  componentDidMount: function() {
    this.editor = ace.edit(this.props.name);
    this.editor.getSession().setMode('ace/mode/'+this.props.mode);
    this.editor.setTheme('ace/theme/'+this.props.theme);
    
    if(typeof this.props.onChange == "function") {
      this.editor.getSession().on('change', function(e) {
        this.props.onChange(e.data);
      }.bind(this));
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.theme != this.props.theme) {
      this.editor.setTheme('ace/theme/'+nextProps.theme);
    }

    if(nextProps.patches && nextProps.patches.length > 0) {
      this.editor.getSession().getDocument().applyDeltas(nextProps.patches);
    }
  },
  render: function() {
    return (<div id={this.props.name}></div>);
  }
});
