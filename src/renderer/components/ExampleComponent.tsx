
import React from 'react';
import ReactDOM from 'react-dom';
// import 'w3-css/w3.css';

class ExampleComponent extends React.Component {
    render() {
        return (
            <div>
                <input className="w3-btn" value="Input Button" />
                <button className="w3-btn">Button Button</button>
                <a className="w3-btn" href="http://www.w3schools.com">Link Button</a>
                <button className="w3-btn w3-khaki">Khaki</button>
                <button className="w3-btn w3-yellow">Yellow</button>
                <button className="w3-btn w3-orange">Orange</button>
                <button className="w3-btn w3-red">Red</button>
                <button className="w3-btn w3-purple">Purple</button>
            </div>
        )
    }
};

export { ExampleComponent }

