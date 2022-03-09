import InjectionPage from './InjectionPage.svelte';

// no idea if anyone cares about this export
let injectionApp = window.injectionApp;

if (!window.hasRun) {
  injectionApp = new InjectionPage({
    target: document.body,
  });
}
window.hasRun = true;


export default injectionApp;
