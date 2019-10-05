npx babel dist/src/frameline.js --out-file dist/src/frameline.js --presets=@babel/preset-env;
uglifyjs dist/src/frameline.js -c -m --mangle-props -o dist/src/frameline.min.js;