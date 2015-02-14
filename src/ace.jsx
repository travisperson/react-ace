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
require('brace/mode/c_cpp');
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
  session: undefined,
  propTypes: {
    mode  : React.PropTypes.string,
    theme : React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      name   : 'brace-editor',
      mode   : 'javascript',
      theme  : 'monokai',
      gutter : true
    };
  },
  componentDidMount: function() {
    // Do the inital setup
    this.editor = ace.edit(this.props.name);
    this.session = this.editor.getSession();
    this.session.setMode('ace/mode/'+this.props.mode);
    this.editor.setTheme('ace/theme/'+this.props.theme);
    this.editor.renderer.setShowGutter(this.props.gutter);
    
    // Setup the patch system
    if(typeof this.props.onChange == "function") {
      this.session.on('change', function(e) {
        this.props.onChange(e.data);
      }.bind(this));
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.theme != this.props.theme) {
      this.editor.setTheme('ace/theme/'+nextProps.theme);
    }

    if(nextProps.mode != this.props.mode) {
      this.session.setMode('ace/mode/'+nextProps.mode);
    }

    if(nextProps.patches && nextProps.patches.length > 0) {
      this.session.getDocument().applyDeltas(nextProps.patches);
    }

    if(nextProps.gutter != this.props.gutter) {
      console.log(nextProps.gutter)
      this.editor.renderer.setShowGutter(nextProps.gutter);
    }
  },
  render: function() {
    return (<div id={this.props.name}></div>);
  }
});
