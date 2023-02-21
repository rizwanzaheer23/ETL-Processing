"use strict";
var fs = require("fs");
let objectTransformer = function (data) {
    let url = new URL(data);
    return {
        domain: url.hostname,
        path: url.pathname,
        query_object: Object.fromEntries(new URLSearchParams(url.search)),
        hash: url.hash,
    };
};
fs.readFile("./input.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return false;
    }
    let object = JSON.parse(jsonString);
    let transformdObject = {
        timestamp: object.ts,
        url_object: Object.assign({}, objectTransformer(object.u)),
        ec: object.e,
    };
    fs.writeFile("output.json", JSON.stringify(transformdObject, null, 4), "utf-8", (err2) => {
        if (err2) {
            console.log(err2);
        }
        console.log('Output is saved');
    });
});
