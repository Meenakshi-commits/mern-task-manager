import TaskItem from "./TaskItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../taskAnimations.css";

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <TransitionGroup className="space-y-3">
      {tasks.map((task) => (
        4react-transition-group.js?v=ce4429c6:1002 Uncaught TypeError: import_react_dom.default.findDOMNode is not a function
    at Transition2.performEnter (react-transition-group.js?v=ce4429c6:1002:78)
    at Transition2.updateStatus (react-transition-group.js?v=ce4429c6:988:14)
    at Transition2.componentDidMount (react-transition-group.js?v=ce4429c6:941:10)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=ce4429c6:18527:22)
    at runWithFiberInDEV (react-dom_client.js?v=ce4429c6:997:72)
    at reappearLayoutEffects (react-dom_client.js?v=ce4429c6:10874:65)
    at recursivelyTraverseReappearLayoutEffects (react-dom_client.js?v=ce4429c6:10986:11)
    at reappearLayoutEffects (react-dom_client.js?v=ce4429c6:10868:13)
    at doubleInvokeEffectsOnFiber (react-dom_client.js?v=ce4429c6:13339:74)
    at runWithFiberInDEV (react-dom_client.js?v=ce4429c6:997:72)
performEnter @ react-transition-group.js?v=ce4429c6:1002
updateStatus @ react-transition-group.js?v=ce4429c6:988
componentDidMount @ react-transition-group.js?v=ce4429c6:941
react_stack_bottom_frame @ react-dom_client.js?v=ce4429c6:18527
runWithFiberInDEV @ react-dom_client.js?v=ce4429c6:997
reappearLayoutEffects @ react-dom_client.js?v=ce4429c6:10874
recursivelyTraverseReappearLayoutEffects @ react-dom_client.js?v=ce4429c6:10986
reappearLayoutEffects @ react-dom_client.js?v=ce4429c6:10868
doubleInvokeEffectsOnFiber @ react-dom_client.js?v=ce4429c6:13339
runWithFiberInDEV @ react-dom_client.js?v=ce4429c6:997
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13312
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13317
commitDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ce4429c6:13347
flushPassiveEffects @ react-dom_client.js?v=ce4429c6:13157
flushPendingEffects @ react-dom_client.js?v=ce4429c6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=ce4429c6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=ce4429c6:13414
flushSpawnedWork @ react-dom_client.js?v=ce4429c6:13067
commitRoot @ react-dom_client.js?v=ce4429c6:12804
commitRootWhenReady @ react-dom_client.js?v=ce4429c6:12016
performWorkOnRoot @ react-dom_client.js?v=ce4429c6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=ce4429c6:13505
performWorkUntilDeadline @ react-dom_client.js?v=ce4429c6:36Understand this error
      ))}
    </TransitionGroup>
  );
}
