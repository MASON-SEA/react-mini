//Step Zero: Review
export const review = (container) => {
    const element = {
        type: 'h1',
        props: {
            title: 'foo',
            children: 'Hello'
        }
    };

    const node = document.createElement(element.type);
    node['title'] = element.props.title;

    const text = document.createTextNode('');
    text['nodeValue'] = element.props.children;

    node.append(text);
    container.append(node);
};

//Step I: The createElement Function
const createElement = (type, props, ...children) => {
    return (
        {
            type,
            props: {
                ...props,
                children: children.map(child =>
                    typeof child === 'object'
                        ? child
                        : createTextElement(child)
                )
            }
        }
    )
};

const createTextElement = (text) => {
    return (
        {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: []
            }
        }
    )
};

//Step II: The render Function
// const render = (element, container) => {
//     const dom = element.type === 'TEXT_ELEMENT'
//         ? document.createTextNode('')
//         : document.createElement(element.type);

//     const isProperty = key => key !== 'children';

//     Object.keys(element.props)
//         .filter(isProperty)
//         .forEach(name => {
//             dom[name] = element.props[name];
//         });

//     element.props.children.forEach(child => {
//         render(child, dom);
//     });

//     container.append(dom);
// };

//Step III: Concurrent Mode
//Step IV: Fibers
let nextUnitOfWork = null;//下一个工作单元
let wipRoot = null;//当前组装的fiber树
let currentRoot = null;//正在显示的fiber树
let deletions = null;//删除的节点

const render = (element, container) => {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot//Step VI: Reconciliation
    };
    //Step VI: Reconciliation
    deletions = [];
    nextUnitOfWork = wipRoot;
};

const performUnitOfWork = (fiber) => {
    //add dom node
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    //Step V: Render and Commit Phases
    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    //create new fibers
    const elements = fiber.props.children
    //Step VI: Reconciliation
    reconcileChildren(fiber, elements);

    let index = 0
    let prevSibling = null

    while (index < elements.length) {
        const element = elements[index]

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }

        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }

    //return next unit of work
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }

};

const createDom = (fiber) => {
    const dom = fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type);

    const isProperty = key => key !== 'children';

    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name];
        });

    return dom
}

//Step V: Render and Commit Phases
function commitRoot() {
    //Step VI: Reconciliation
    deletions.forEach(commitWork);
    //add nodes to dom
    commitWork(wipRoot.child);
    //Step VI: Reconciliation
    currentRoot = wipRoot;
    wipRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const domParent = filter.parent.dom;

    //Step VI: Reconciliation
    if (
        fiber.effectTag === 'PLACEMENT' &&
        fiber.dom != null
    ) {
        domParent.append(fiber.dom);
    } else if (filter.effectTag === 'DELETION') {
        domParent.removeChild(fiber.dom);
    } else if (
        fiber.effectTag = 'UPDATE' &&
        fiber.dom != null
    ) {
        updateDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props
        )
    }


    domParent.append(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

//Step VI: Reconciliation
function updateDom(dom, prevSibling, nextProps) {
    
}


function reconcileChildren(wipFiber, elements) {

}


function workLoop(deadline) {

}



const REACT_COCO = {
    createElement,
    render
}

export default REACT_COCO
