// export const load = (url) => {
//   return new Promise((resolve, reject) => {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.async = true;
//     script.src = url;
//     script.onload = resolve;
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// };

// load("https://zuri.chat/zuri-control.js")
//   .then(() => {
//     console.log("Loaded!");
//   })
//   .catch((err) => {
//     console.error("Something went wrong!", err);
//   });

export { GetUserInfo } from "https://zuri.chat/zuri-control.js";
