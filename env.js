const path = require('path'),
	pjson = require('./package.json'),

	env = new function(){
		this.PKG_NAME = 'tcmenu';

		this.analyseBundle = process.env.ANALYSE_BUNDLE === 'true' || process.argv.indexOf('--dev') !== -1 || false;

		this.timeStamp = Date.now();

		this.extName = `${this.PKG_NAME}.js`;
		this.srcDir = getPath('src');
		this.resourceDir = getPath('resource');
		this.buildDir = getPath('build');
		this.nodeDir = getPath('node_modules');
		this.hicoDir = getPath(this.srcDir, 'lib/hico');
		this.distDir = getPath(this.buildDir, 'dist');
		this.tmpDir = getPath(this.buildDir, 'temp');
		this.installDir = getPath(process.env.USERPROFILE, `Documents/Qlik/Sense/Extensions/${this.PKG_NAME}`);
		this.hicomvcDir = getPath(process.env.HICOMVC_DIR || '../hicomvc');

		this.DATE = new Date().toLocaleDateString().split('.').reverse().join('-'); // convert locale Date DD.MM.YYYY to format YYYY-MM-DD
		this.BUILD_DATE = new Date().toISOString().substr(0, 10);
		this.BUILD_NUMBER = process.env.BUILD_NUMBER || 'dev';
        this.VER = pjson.version;
		this.VERSION = `${this.VER}_${this.BUILD_NUMBER}`;
		this.IS_PROD = process.env.IS_PRODUCTION_BUILD === 'true' || false;

		this.LOG_LEVEL = process.env.LOG_LEVEL || this.IS_PROD ? 'WARN' : 'ALL';
		this.HAS_SERVICE = process.env.HAS_SERVICE === 'true' || false;
		this.SERVICE_URL = process.env.SERVICE_URL || '';

		this.getPath = getPath;

		/**
		 * Resolves a sequence of paths or path segments into an absolute path.
		 * @param {string} paths - A sequence of paths or path segments
		 * @return {string}
		 */
		function getPath(...paths){
			return path.resolve(__dirname, ...paths);
		}
	};

module.exports = env;
