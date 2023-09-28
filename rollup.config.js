import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';
import MagicString from 'magic-string';

import includePaths from 'rollup-plugin-includepaths';

import gzipPlugin from 'rollup-plugin-gzip';
import { gzipAsync } from '@gfx/zopfli'

import tla from 'rollup-plugin-tla';


function header() {

	return {

		renderChunk( code ) {

			code = new MagicString( code );

			code.prepend( `/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */\n` );

			return {
				code: code.toString(),
				map: code.generateMap().toString()
			};

		}

	};

}

export default [
	{
		input: './webgpu-renderer.js',
		external: ['three'],
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes","./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
				//include: {
				 // 'three': './three.js/build/three.module.js'
				//}
		  	}),
			strip({
				debugger: true
			}),
			header()
		],
		output: [
			{
				format: 'esm',
				file: 'build/webgpu-renderer.module.js'
			}
		]
	},
	{
		input: './webgpu-renderer.js',
		external: ['three'],
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes","./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
				//include: {
				 // 'three': './three.js/build/three.module.js'
				//}
		  	}),
			strip({
				debugger: true
			}),
			terser({
               // keep_classnames: /ArrayUniformNode|StorageBufferNode|UserDataNode|IESSpotLight|Material|PointLightHelper|FunctionNode|DirectionalLightHelper|SpotLightHelper|RectAreaLight|LightsNode|ToneMappingNode|HemisphereLightHelper/
            }),
			header(),
			gzipPlugin({
				customCompression: content =>
				  gzipAsync(Buffer.from(content), { numiterations: 15 }),
			})
		],
		output: [
			{
				format: 'esm',
				file: 'build/webgpu-renderer.module.min.js'
			}
		]
	},
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes","./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
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
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes","./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			}),
			terser({
                //keep_classnames: /ArrayUniformNode|StorageBufferNode|UserDataNode|IESSpotLight|Material|PointLightHelper|FunctionNode|DirectionalLightHelper|SpotLightHelper|RectAreaLight|LightsNode|ToneMappingNode|HemisphereLightHelper/
            }),
			header(),
			gzipPlugin({
				customCompression: content =>
				  gzipAsync(Buffer.from(content), { numiterations: 15 }),
			})
		],
		output: [
			{
				format: 'esm',
				file: 'build/three-webgpu.module.min.js'
			}
		]
	},
	{
		input: './three-webgpu-renderer.js',
		plugins: [
		
			includePaths({
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes", "./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			}),
			tla(),
			/*terser({
                keep_classnames: /ArrayUniformNode|StorageBufferNode|UserDataNode|IESSpotLight|Material|PointLightHelper|FunctionNode|DirectionalLightHelper|SpotLightHelper|RectAreaLight|LightsNode|ToneMappingNode|HemisphereLightHelper/
            }),*/
			header()
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
				paths: ["./src", "./three.js/examples/jsm/", "./three.js/examples/jsm/nodes","./three.js/examples/jsm/nodes/materials", "./three.js/examples/jsm/renderers/webgpu"],
				include: {
				  'three': './three.js/build/three.module.js'
				}
		  	}),
			strip({
				debugger: true
			}),
			tla(),
			header()
		],
		output: [
			{
				format: 'iife',
				name: "THREE",
				file: 'build/three-webgpu.js'
			}
		]
	},
	/*{
		input: './linearsrgb-material.js',
		external: ['three'],
		plugins: [
		
			includePaths({
				paths: ["./src"],
		  	}),
			strip({
				debugger: true
			}),
			header()
		],
		output: [
			{
				format: 'esm',
				file: 'build/linearsrgb-material.module.js'
			}
		]
	},*/
];
