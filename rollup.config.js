import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';

import includePaths from 'rollup-plugin-includepaths';



export default [
	{
		input: './webgpu-renderer.js',
		external: ['three'],
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes", "./three.js/examples/jsm/renderers/webgpu"],
				//include: {
				 // 'three': './three.js/build/three.module.js'
				//}
		  	}),
			strip({
				debugger: true
			})
		],
		output: [
			{
				format: 'esm',
				file: 'build/webgpu-renderer.module.js'
			}
		]
	},
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes", "./three.js/examples/jsm/renderers/webgpu"],
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
				file: 'build/three-webgpu.module.js'
			}
		]
	},
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes", "./three.js/examples/jsm/renderers/webgpu"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			}),
			terser()
		],
		output: [
			{
				format: 'iife',
				name: "THREE",
				file: 'build/three-webgpu.min.js'
			}
		]
	},
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes", "./three.js/examples/jsm/renderers/webgpu"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			}),
			terser()
		],
		output: [
			{
				format: 'iife',
				name: "THREE",
				file: 'build/three-webgpu.js'
			}
		]
	}
];
