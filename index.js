const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "mock_application.json");
const buffer = fs.readFileSync(inputPath, "utf8");
const input = JSON.parse(buffer.toString());

const output = removeDuplicates(input);
const outputPath = path.resolve(__dirname, "clean_application.json");
fs.writeFileSync(outputPath, Buffer.from(JSON.stringify(output)));

/**
 * iterates through the input object and removes the duplicated properties in it
 * @param {Object} obj
 * @param {Map} map
 * @returns void
 */
function iterateObjectToRemoveDuplicates(obj, map) {
  if (obj === null) {
    return;
  }
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const val = obj[key];
    if (typeof val === "object") {
      iterateObjectToRemoveDuplicates(val, map);
    }
    if (!map.has(key)) {
      map.set(key, [val]);
      return;
    }
    const objectsArr = map.get(key);
    let isMatch = false;
    for (const o of objectsArr) {
      if (o === val) {
        delete obj[key];
        isMatch = true;
      }
    }
    if (!isMatch) {
      map.set(key, [...objectsArr, val]);
    }
  });
  return;
}

/**
 *
 * @param {Object} inputJson
 * @returns {Object} obj
 */
function removeDuplicates(inputJson) {
  // Map<keyName, object array>
  const map = new Map();
  iterateObjectToRemoveDuplicates(inputJson, map);
  return inputJson;
}
module.exports = removeDuplicates;
