import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve  from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';

import includePaths from 'rollup-plugin-includepaths';



export default [
	/*{
		input: './Three.js',
		plugins: [
			resolve(),
			commonjs({
                            include: './node_modules/**',
                            transformMixedEsModules: true
                        }),
			addons(),
			glsl(),
			header()
		],
		output: [
			{
				format: 'umd',
				name: 'THREE',
				file: '../../test/three.js',
				indent: '\t'
			}
		]
	},
	{
		input: './Three.js',
		plugins: [
			resolve(),
			commonjs({
                            include: './node_modules/**',
                            transformMixedEsModules: true

                        }),
			addons(),
			glsl(),
			terser(),
			header()
		],
		output: [
			{
				format: 'umd',
				name: 'THREE',
				file: '../../lib/three.min.js'
			}
		]
	},*/
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "../three.js/examples/jsm"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			})
		],
		output: [
			{
				format: 'esm',
				file: 'build/three-webgpu-renderer.module.js'
			}
		]
	},
	/*{
		input: './Three.js',
		plugins: [
			addons(),
			glsl(),
			strip({
				debugger: true
			}),
			header()
		],
		output: [
			{
				format: 'esm',
				file: 'build/three.module.js'
			}
		]
	}*/
];
