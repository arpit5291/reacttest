const childe = React.createElement('h1', {}, 'Hello World!');
const childiv = React.createElement('div', {id:'child'}, childe);
const parent = React.createElement('div', {id:'parent'}, childiv);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);