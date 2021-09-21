import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// registerApplication({
//   name: "@zuri/navbar",
//   app: () => System.import("@zuri/navbar"),
//   activeWhen: ["/"]
// });

registerApplication({
  name: "@zuri/zuri-plugin-channels",
  app: () => System.import("@zuri/zuri-plugin-channels"),
  activeWhen: ["/channels"]
});


start({
  urlRerouteOnly: true,
});
