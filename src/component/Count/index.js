/*
 * @Date: 2023-06-08 17:01:39
 * @LastEditors: mason
 * @LastEditTime: 2023-06-08 18:18:54
 * @FilePath: \react-mini\src\component\Count\index.js
 */
function Counter() {
    const [state, setState] = REACT_COCO.useState(1);
    return (
        <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
            Count: {state}
        </h1>
    )
}