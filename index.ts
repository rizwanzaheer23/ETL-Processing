var fs = require("fs");

type url_object = {
  domain: string;
  path: string;
  query_object: {
    [x: string]: string;
  };
  hash: string;
};

type transformedObject = {
  timestamp: number;
  url_object: url_object;
  ec: any;
};


let objectTransformer = function (data: string): url_object {
  let url = new URL(data);
  return {
    domain: url.hostname,
    path: url.pathname,
    query_object: Object.fromEntries(new URLSearchParams(url.search)),
    hash: url.hash,
  };
};

 fs.readFile(
  "./input.json",
"utf8",
  (err: Error, jsonString: string) => {
    if (err) {
      console.log("File read failed:", err);
      return false;
    }
    let object = JSON.parse(jsonString);
     let transformdObject: transformedObject = {
       timestamp: object.ts,
       url_object: { ...objectTransformer(object.u) },
       ec: object.e,
     };
       fs.writeFile(
         "output.json",
         JSON.stringify(transformdObject, null, 4),
         "utf-8",
         (err2: Error) => {
           if (err2) {
             console.log(err2);
           }
           console.log('Output is saved')
         }
       );
  });





 
