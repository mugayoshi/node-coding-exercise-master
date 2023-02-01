const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "mock_application.json");
const buffer = fs.readFileSync(inputPath, "utf8");
const input = JSON.parse(buffer.toString());

const output = removeDuplicates(input);
const outputPath = path.resolve(__dirname, "clean_application.json");
fs.writeFileSync(outputPath, Buffer.from(JSON.stringify(output)));

/**
 * 
 * @param {object} obj 
 * @param {Map<number, object[]>} map 
 * @returns void
 */
function iterateObjectToRemoveDuplicates(obj, map) {
  if (obj === null) {
    return;
  }
  const keys = Object.keys(obj);
  for (const key of keys) {
    const val = obj[key];
    if (typeof val !== 'object') {
      continue;
    }
    if (!val) {
      continue;
    }
    const keysChildrenObjs = Object.keys(val);
    const targetObjs = map.get(keysChildrenObjs.length);
    let isMatch = false;
    if (targetObjs && targetObjs.length)  {

      for (const targetObj of targetObjs) {
        if (targetObj === val) {
          delete obj[key];
          isMatch = true;
          break;
        }
      }
    }
    if (!isMatch) {
      if (targetObjs) {
        map.set(keysChildrenObjs.length, [...targetObjs, val]);
      } else {
        map.set(keysChildrenObjs.length, [val]);
      }
    }
    
    iterateObjectToRemoveDuplicates(val, map);
  }
}
/**
 *
 * @param {Object} inputJson
 * @returns {Object} obj
 */
function removeDuplicates(inputJson) {
  // Map<length of keys in an object, object array>
  const map = new Map();
  iterateObjectToRemoveDuplicates(inputJson, map);
  return inputJson;
}
module.exports = removeDuplicates;
