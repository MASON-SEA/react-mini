// import { review } from '/react-coco/index.js'
// import REACT_COCO from '/react-coco/index.js'
// import Counter from '/src/component/Count/index.js';
console.log(REACT_COCO)
window.addEventListener('load', () => {

});

const root = document.getElementById('root');
//Step Zero: Review
review(root);

//Step I: The createElement Function

// 1.js
// const element = REACT_COCO.createElement('div', null, 'test');

// 2.jsx
/** @jsx REACT_COCO.createElement */
const element = (
    <div>
        Hello World
    </div>
);


//Step II: The render Function
REACT_COCO.render(element, root);


const updateValue = e => {
    rerender(e.target.value)
}

const rerender = value => {
    /** @jsx REACT_COCO.createElement */
    const element = (
        <div>
            <input onInput={updateValue} value={value} />
            <h2>Hello {value}</h2>
        </div>
    )
    REACT_COCO.render(element, root)
}

rerender('test');

/**@jsx REACT_COCO.createElement */
REACT_COCO.render(<Counter />, root);