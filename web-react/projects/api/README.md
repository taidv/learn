# Typescript Express Example

## Requirements

* NodeJS 6 LTS
* NPM >= 5
* gulp-cli (Install with `npm i -g gulp-cli`)
	
Should also work with NPM 3, but you might need to run the build command manually `gulp build` after `npm i`.

## Install and Running

This project is designed to run well from VSCode, although it will work elsewhere too.

Just run `npm i` to install the modules and build the code. Now you should be able to start the Express Server in debug mode by typing `F5`.

You can also debug the test cases by selecting the corresponding launch option in the debug screen in VSCode.

Source code is in /src, compiled binaries (or javascript) are in /dist

The build will always run on startup, so you should not have to worry about out-of-date code.
