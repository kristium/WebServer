const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const ws = new WebSocket("wss://kristium.ale32bit.me/");

ws.on('open', function open() {
    console.log("Connected to server node");
});

ws.on('message', function incoming(data) {
    try {
        data = JSON.parse(data);
    } catch (e) {
        data = undefined;
        ws.send(JSON.stringify({
            type: "error",
            error: e.toString(),
            ok: false,
        }))
    }
    if (!data) return false;
    console.log(data)
    switch(data.type){
        case "request":
            ws.send(JSON.stringify({
                type: "request",
                requestID: data.requestID,
                body: fs.readFileSync(path.resolve(__dirname, "static", "test.lua")).toString(),
            }));
            break;
    }
});