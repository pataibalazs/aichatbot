To setup the project:

0. create `src/config.js` file with the following text:
```javascript
export const CONFIG = {
    API_KEY: "<your_openai_key>"
};
```

1. `npm install`
2. `npm start`
which will use this script `"start": "live-server"`
3. browser will be opened and `http://127.0.0.1:8080/src/` will be the place where the chat will be hosted.

Probably live-server and other packages/dependencies will be installed, but if not then run:
`npm install live-server --save-dev`


If you wanna try out the chat in an `<iframe>` you can use this injected HTML to any site.
```html   
    <iframe scrolling="yes" src="http://127.0.0.1:8080" id=“chat-window” style="border: none; position: fixed; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; bottom: 5rem; right: 1rem; width: 448px; height: 85vh; max-height: 824px; border-radius: 0.75rem; display: flex; z-index: 2147483646; overflow: hidden; left: unset;"></iframe>
```

Feel free to play with the styles, also makes sense to add as the last HTML element just before </body>