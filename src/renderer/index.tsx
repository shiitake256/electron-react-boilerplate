import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
    render() {
        return (
            <div>
                Hello, React!
            </div>
        )
    }
};

ReactDOM.render(<HelloWorld />, document.getElementsByTagName('body')[0]);
