const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/build.js') // If you ejected, use this instead: const defaults = rewire('./build.js')
let config = defaults.__get__('config')

// config.optimization.splitChunks = {
// 	cacheGroups: {
// 		default: false
// 	}
// }
// config.optimization.runtimeChunk = false

config.optimization.minimize = false