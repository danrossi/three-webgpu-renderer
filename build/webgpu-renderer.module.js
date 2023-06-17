import { DynamicDrawUsage, Uint32BufferAttribute, Uint16BufferAttribute, Color, Vector2, Vector3, Vector4, Matrix3, Matrix4, MathUtils, LinearSRGBColorSpace, SRGBColorSpace, TangentSpaceNormalMap, ObjectSpaceNormalMap, StaticDrawUsage, InterleavedBuffer, InterleavedBufferAttribute, DepthTexture, NearestFilter, ShaderMaterial, NoColorSpace, Material, sRGBEncoding, LinearEncoding, Float16BufferAttribute, REVISION, NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, FramebufferTexture, LinearMipmapLinearFilter, UnsignedIntType, DepthFormat, EventDispatcher, PointLight, DirectionalLight, SpotLight, AmbientLight, HemisphereLight, LineBasicMaterial, MeshNormalMaterial, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshPhysicalMaterial, PointsMaterial, SpriteMaterial, MaterialLoader, DepthStencilFormat, UnsignedInt248Type, BackSide, Mesh, SphereGeometry, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Frustum, WebGLRenderTarget, WebGLCubeRenderTarget, BoxGeometry, NoBlending, Scene, LinearFilter, CubeCamera, CustomBlending, MultiplyBlending, SubtractiveBlending, AdditiveBlending, NormalBlending, DoubleSide, FrontSide, SrcAlphaSaturateFactor, OneMinusDstAlphaFactor, DstAlphaFactor, OneMinusDstColorFactor, DstColorFactor, OneMinusSrcAlphaFactor, SrcAlphaFactor, OneMinusSrcColorFactor, SrcColorFactor, OneFactor, ZeroFactor, NotEqualStencilFunc, GreaterStencilFunc, GreaterEqualStencilFunc, EqualStencilFunc, LessEqualStencilFunc, LessStencilFunc, AlwaysStencilFunc, NeverStencilFunc, DecrementWrapStencilOp, IncrementWrapStencilOp, DecrementStencilOp, IncrementStencilOp, InvertStencilOp, ReplaceStencilOp, ZeroStencilOp, KeepStencilOp, MaxEquation, MinEquation, ReverseSubtractEquation, SubtractEquation, AddEquation, NotEqualDepth, GreaterDepth, GreaterEqualDepth, EqualDepth, LessEqualDepth, LessDepth, AlwaysDepth, NeverDepth, CubeReflectionMapping, CubeRefractionMapping, Texture, CubeTexture, FloatType, RGFormat, RedFormat, RGBAFormat, NeverCompare, AlwaysCompare, LessCompare, LessEqualCompare, EqualCompare, GreaterEqualCompare, GreaterCompare, NotEqualCompare, RepeatWrapping, MirroredRepeatWrapping, NearestMipmapNearestFilter, NearestMipmapLinearFilter, RGBA_ASTC_12x12_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_4x4_Format, RGBA_ETC2_EAC_Format, RGB_ETC2_Format, RGBA_S3TC_DXT5_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT1_Format, UnsignedShortType, HalfFloatType, UnsignedByteType, WebGPUCoordinateSystem } from 'three';

class WebGPU {

	static async isAvailable() {
		if (navigator.gpu !== undefined) {

			try {
				const adapter = await navigator.gpu.requestAdapter();

				if (adapter !== null) {
					if (window.GPUShaderStage === undefined) {

						window.GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };

					}

					return true;
				}
			} catch (e) {
				return false;
			}

		}

		return false;
	}
}

class Animation {

	constructor() {

		this.nodes = null;

		this.animationLoop = null;
		this.requestId = null;

		this.isAnimating = false;

		this.context = self;

	}

	start() {

		if ( this.isAnimating === true || this.animationLoop === null || this.nodes === null ) return;

		this.isAnimating = true;

		const update = ( time, frame ) => {

			this.requestId = self.requestAnimationFrame( update );

			this.nodes.nodeFrame.update();

			this.animationLoop( time, frame );

		};

		this.requestId = self.requestAnimationFrame( update );

	}

	stop() {

		self.cancelAnimationFrame( this.requestId );

		this.isAnimating = false;

	}

	setAnimationLoop( callback ) {

		this.animationLoop = callback;

	}

	setNodes( nodes ) {

		this.nodes = nodes;

	}

}

class DataMap {

	constructor() {

		this.data = new WeakMap();

	}

	get( object ) {

		let map = this.data.get( object );

		if ( map === undefined ) {

			map = {};
			this.data.set( object, map );

		}

		return map;

	}

	delete( object ) {

		let map;

		if ( this.data.has( object ) ) {

			map = this.data.get( object );

			this.data.delete( object );

		}

		return map;

	}

	has( object ) {

		return this.data.has( object );

	}

	dispose() {

		this.data.clear();

	}

}

class ChainMap {

	constructor() {

		this.weakMap = new WeakMap();

	}

	get( keys ) {

		if ( Array.isArray( keys ) ) {

			let map = this.weakMap;

			for ( let i = 0; i < keys.length - 1; i ++ ) {

				map = map.get( keys[ i ] );

				if ( map === undefined ) return undefined;

			}

			return map.get( keys[ keys.length - 1 ] );

		} else {

			return super.get( keys );

		}

	}

	set( keys, value ) {

		if ( Array.isArray( keys ) ) {

			let map = this.weakMap;

			for ( let i = 0; i < keys.length - 1; i ++ ) {

				const key = keys[ i ];

				if ( map.has( key ) === false ) map.set( key, new WeakMap() );

				map = map.get( key );

			}

			return map.set( keys[ keys.length - 1 ], value );

		} else {

			return super.set( keys, value );

		}

	}

	delete( keys ) {

		if ( Array.isArray( keys ) ) {

			let map = this.weakMap;

			for ( let i = 0; i < keys.length - 1; i ++ ) {

				map = map.get( keys[ i ] );

				if ( map === undefined ) return false;

			}

			return map.delete( keys[ keys.length - 1 ] );

		} else {

			return super.delete( keys );

		}

	}

	dispose() {

		this.weakMap.clear();

	}

}

let id$3 = 0;

class RenderObject {

	constructor( nodes, geometries, renderer, object, material, scene, camera, lightsNode ) {

		this._nodes = nodes;
		this._geometries = geometries;

		this.id = id$3 ++;

		this.renderer = renderer;
		this.object = object;
		this.material = material;
		this.scene = scene;
		this.camera = camera;
		this.lightsNode = lightsNode;

		this.geometry = object.geometry;

		this.attributes = null;
		this.context = null;
		this.pipeline = null;

		this._materialVersion = - 1;
		this._materialCacheKey = '';

	}

	getNodeBuilder() {

		return this._nodes.getForRender( this );

	}

	getBindings() {

		return this.getNodeBuilder().getBindings();

	}

	getIndex() {

		return this._geometries.getIndex( this );

	}

	getChainArray() {

		return [ this.object, this.material, this.scene, this.camera, this.lightsNode ];

	}

	getAttributes() {

		if ( this.attributes !== null ) return this.attributes;

		const nodeAttributes = this.getNodeBuilder().getAttributesArray();
		const geometry = this.geometry;

		const attributes = [];

		for ( const nodeAttribute of nodeAttributes ) {

			attributes.push( nodeAttribute.node && nodeAttribute.node.attribute ? nodeAttribute.node.attribute : geometry.getAttribute( nodeAttribute.name ) );

		}

		this.attributes = attributes;

		return attributes;

	}

	getCacheKey() {

		const { material, scene, lightsNode } = this;

		if ( material.version !== this._materialVersion ) {

			this._materialVersion = material.version;
			this._materialCacheKey = material.customProgramCacheKey();

		}

		const cacheKey = [];

		cacheKey.push( 'material:' + this._materialCacheKey );
		cacheKey.push( 'nodes:' + this._nodes.getCacheKey( scene, lightsNode ) );

		return '{' + cacheKey.join( ',' ) + '}';

	}

}

class RenderObjects extends ChainMap {

	constructor( renderer, nodes, geometries, pipelines, info ) {

		super();

		this.renderer = renderer;
		this.nodes = nodes;
		this.geometries = geometries;
		this.pipelines = pipelines;
		this.info = info;

		this.dataMap = new DataMap();

	}

	get( object, material, scene, camera, lightsNode ) {

		const chainArray = [ object, material, scene, camera, lightsNode ];

		let renderObject = super.get( chainArray );

		if ( renderObject === undefined ) {

			renderObject = new RenderObject( this.nodes, this.geometries, this.renderer, object, material, scene, camera, lightsNode );

			this._initRenderObject( renderObject );

			this.set( chainArray, renderObject );

		} else {

			const data = this.dataMap.get( renderObject );
			const cacheKey = renderObject.getCacheKey();

			if ( data.cacheKey !== cacheKey ) {

				data.cacheKey = cacheKey;

				this.pipelines.delete( renderObject );
				this.nodes.delete( renderObject );

			}

		}

		return renderObject;

	}

	dispose() {

		super.dispose();

		this.dataMap.clear();

	}

	_initRenderObject( renderObject ) {

		const data = this.dataMap.get( renderObject );

		if ( data.initialized !== true ) {

			data.initialized = true;
			data.cacheKey = renderObject.getCacheKey();

			const onDispose = () => {

				renderObject.material.removeEventListener( 'dispose', onDispose );

				this.pipelines.delete( renderObject );
				this.nodes.delete( renderObject );

				this.delete( renderObject.getChainArray() );

			};

			renderObject.material.addEventListener( 'dispose', onDispose );

		}

	}


}

const AttributeType = {
	VERTEX: 1,
	INDEX: 2,
	STORAGE: 4
};

// size of a chunk in bytes (STD140 layout)

const GPU_CHUNK_BYTES = 16;

// @TODO: Move to src/constants.js

const BlendColorFactor = 211;
const OneMinusBlendColorFactor = 212;

class Attributes extends DataMap {

	constructor( backend ) {

		super();

		this.backend = backend;

	}

	delete( attribute ) {

		const attributeData = super.delete( attribute );

		if ( attributeData !== undefined ) {

			this.backend.destroyAttribute( attribute );

		}

	}

	update( attribute, type ) {

		const data = this.get( attribute );

		if ( data.version === undefined ) {

			if ( type === AttributeType.VERTEX ) {

				this.backend.createAttribute( attribute );

			} else if ( type === AttributeType.INDEX ) {

				this.backend.createIndexAttribute( attribute );

			} else if ( type === AttributeType.STORAGE ) {

				this.backend.createStorageAttribute( attribute );

			}

			data.version = this._getBufferAttribute( attribute ).version;

		} else {

			const bufferAttribute = this._getBufferAttribute( attribute );

			if ( data.version < bufferAttribute.version || bufferAttribute.usage === DynamicDrawUsage ) {

				this.backend.updateAttribute( attribute );

				data.version = bufferAttribute.version;

			}

		}

	}

	_getBufferAttribute( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		return attribute;

	}

}

function arrayNeedsUint32( array ) {

	// assumes larger values usually on last

	for ( let i = array.length - 1; i >= 0; -- i ) {

		if ( array[ i ] >= 65535 ) return true; // account for PRIMITIVE_RESTART_FIXED_INDEX, #24565

	}

	return false;

}

function getWireframeVersion( geometry ) {

	return ( geometry.index !== null ) ? geometry.index.version : geometry.attributes.position.version;

}

function getWireframeIndex( geometry ) {

	const indices = [];

	const geometryIndex = geometry.index;
	const geometryPosition = geometry.attributes.position;

	if ( geometryIndex !== null ) {

		const array = geometryIndex.array;

		for ( let i = 0, l = array.length; i < l; i += 3 ) {

			const a = array[ i + 0 ];
			const b = array[ i + 1 ];
			const c = array[ i + 2 ];

			indices.push( a, b, b, c, c, a );

		}

	} else {

		const array = geometryPosition.array;

		for ( let i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

			const a = i + 0;
			const b = i + 1;
			const c = i + 2;

			indices.push( a, b, b, c, c, a );

		}

	}

	const attribute = new ( arrayNeedsUint32( indices ) ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );
	attribute.version = getWireframeVersion( geometry );

	return attribute;

}

class Geometries extends DataMap {

	constructor( attributes, info ) {

		super();

		this.attributes = attributes;
		this.info = info;

		this.wireframes = new WeakMap();
		this.attributeFrame = new WeakMap();

	}

	has( renderObject ) {

		const geometry = renderObject.geometry;

		return super.has( geometry ) && this.get( geometry ).initialized === true;

	}

	update( renderObject ) {

		if ( this.has( renderObject ) === false ) this.initGeometry( renderObject );

		this.updateAttributes( renderObject );

	}

	initGeometry( renderObject ) {

		const geometry = renderObject.geometry;
		const geometryData = this.get( geometry );

		geometryData.initialized = true;

		this.info.memory.geometries ++;

		const onDispose = () => {

			this.info.memory.geometries --;

			const index = geometry.index;
			const geometryAttributes = renderObject.getAttributes();

			if ( index !== null ) {

				this.attributes.delete( index );

			}

			for ( const geometryAttribute of geometryAttributes ) {

				this.attributes.delete( geometryAttribute );

			}

			const wireframeAttribute = this.wireframes.get( geometry );

			if ( wireframeAttribute !== undefined ) {

				this.attributes.delete( wireframeAttribute );

			}

			geometry.removeEventListener( 'dispose', onDispose );

		};

		geometry.addEventListener( 'dispose', onDispose );

	}

	updateAttributes( renderObject ) {

		const attributes = renderObject.getAttributes();

		for ( const attribute of attributes ) {

			this.updateAttribute( attribute, AttributeType.VERTEX );

		}

		const index = this.getIndex( renderObject );

		if ( index !== null ) {

			this.updateAttribute( index, AttributeType.INDEX );

		}

	}

	updateAttribute( attribute, type ) {

		const frame = this.info.render.frame;

		if ( this.attributeFrame.get( attribute ) !== frame ) {

			this.attributes.update( attribute, type );

			this.attributeFrame.set( attribute, frame );

		}

	}

	getIndex( renderObject ) {

		const { geometry, material } = renderObject;

		let index = geometry.index;

		if ( material.wireframe === true ) {

			const wireframes = this.wireframes;

			let wireframeAttribute = wireframes.get( geometry );

			if ( wireframeAttribute === undefined ) {

				wireframeAttribute = getWireframeIndex( geometry );

				wireframes.set( geometry, wireframeAttribute );

			} else if ( wireframeAttribute.version !== getWireframeVersion( geometry ) ) {

				this.attributes.delete( wireframeAttribute );

				wireframeAttribute = getWireframeIndex( geometry );

				wireframes.set( geometry, wireframeAttribute );

			}

			index = wireframeAttribute;

		}

		return index;

	}

}

class Info {

	constructor() {

		this.autoReset = true;

		this.render = {
			frame: 0,
			drawCalls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};

		this.memory = {
			geometries: 0,
			textures: 0
		};

	}

	update( object, count, instanceCount ) {

		this.render.drawCalls ++;

		if ( object.isMesh || object.isSprite ) {

			this.render.triangles += instanceCount * ( count / 3 );

		} else if ( object.isPoints ) {

			this.render.points += instanceCount * count;

		} else if ( object.isLineSegments ) {

			this.render.lines += instanceCount * ( count / 2 );

		} else if ( object.isLine ) {

			this.render.lines += instanceCount * ( count - 1 );

		} else ;

	}

	reset() {

		this.render.drawCalls = 0;
		this.render.triangles = 0;
		this.render.points = 0;
		this.render.lines = 0;

	}

	dispose() {

		this.reset();

		this.render.frame = 0;

		this.memory.geometries = 0;
		this.memory.textures = 0;

	}

}

class Pipeline {

	constructor( cacheKey ) {

		this.cacheKey = cacheKey;

		this.usedTimes = 0;

	}

}

class RenderPipeline extends Pipeline {

	constructor( cacheKey, vertexProgram, fragmentProgram ) {

		super( cacheKey );

		this.vertexProgram = vertexProgram;
		this.fragmentProgram = fragmentProgram;

	}

}

class ComputePipeline extends Pipeline {

	constructor( cacheKey, computeProgram ) {

		super( cacheKey );

		this.computeProgram = computeProgram;

		this.isComputePipeline = true;

	}

}

let _id = 0;

class ProgrammableStage {

	constructor( code, type ) {

		this.id = _id ++;

		this.code = code;
		this.stage = type;

		this.usedTimes = 0;

	}

}

class Pipelines extends DataMap {

	constructor( backend, nodes ) {

		super();

		this.backend = backend;
		this.nodes = nodes;

		this.bindings = null; // set by the bindings

		this.caches = new Map();
		this.programs = {
			vertex: new Map(),
			fragment: new Map(),
			compute: new Map()
		};

	}

	getForCompute( computeNode ) {

		const { backend } = this;

		const data = this.get( computeNode );

		if ( data.pipeline === undefined ) {

			// release previous cache

			this._releasePipeline( computeNode );

			// get shader

			const nodeBuilder = this.nodes.getForCompute( computeNode );

			// programmable stage

			let stageCompute = this.programs.compute.get( nodeBuilder.computeShader );

			if ( stageCompute === undefined ) {

				stageCompute = new ProgrammableStage( nodeBuilder.computeShader, 'compute' );
				this.programs.compute.set( nodeBuilder.computeShader, stageCompute );

				backend.createProgram( stageCompute );

			}

			// determine compute pipeline

			const pipeline = this._getComputePipeline( stageCompute );

			// keep track of all used times

			pipeline.usedTimes ++;
			stageCompute.usedTimes ++;

			//

			data.pipeline = pipeline;

		}

		return data.pipeline;

	}

	getForRender( renderObject ) {

		const { backend } = this;

		const data = this.get( renderObject );

		if ( this._needsUpdate( renderObject ) ) {

			// release previous cache

			this._releasePipeline( renderObject );

			// get shader

			const nodeBuilder = this.nodes.getForRender( renderObject );

			// programmable stages

			let stageVertex = this.programs.vertex.get( nodeBuilder.vertexShader );

			if ( stageVertex === undefined ) {

				stageVertex = new ProgrammableStage( nodeBuilder.vertexShader, 'vertex' );
				this.programs.vertex.set( nodeBuilder.vertexShader, stageVertex );

				backend.createProgram( stageVertex );

			}

			let stageFragment = this.programs.fragment.get( nodeBuilder.fragmentShader );

			if ( stageFragment === undefined ) {

				stageFragment = new ProgrammableStage( nodeBuilder.fragmentShader, 'fragment' );
				this.programs.fragment.set( nodeBuilder.fragmentShader, stageFragment );

				backend.createProgram( stageFragment );

			}

			// determine render pipeline

			const pipeline = this._getRenderPipeline( renderObject, stageVertex, stageFragment );

			// keep track of all used times

			pipeline.usedTimes ++;
			stageVertex.usedTimes ++;
			stageFragment.usedTimes ++;

			//

			data.pipeline = pipeline;

		}

		return data.pipeline;

	}

	delete( object ) {

		this._releasePipeline( object );

		super.delete( object );

	}

	dispose() {

		super.dispose();

		this.caches = new Map();
		this.programs = {
			vertex: new Map(),
			fragment: new Map(),
			compute: new Map()
		};

	}

	_getComputePipeline( stageCompute ) {

		// check for existing pipeline

		const cacheKey = 'compute:' + stageCompute.id;

		let pipeline = this.caches.get( cacheKey );

		if ( pipeline === undefined ) {

			pipeline = new ComputePipeline( cacheKey, stageCompute );

			this.caches.set( cacheKey, pipeline );

			this.backend.createComputePipeline( pipeline );

		}

		return pipeline;

	}

	_getRenderPipeline( renderObject, stageVertex, stageFragment ) {

		// check for existing pipeline

		const cacheKey = this._getRenderCacheKey( renderObject, stageVertex, stageFragment );

		let pipeline = this.caches.get( cacheKey );

		if ( pipeline === undefined ) {

			pipeline = new RenderPipeline( cacheKey, stageVertex, stageFragment );

			this.caches.set( cacheKey, pipeline );

			renderObject.pipeline = pipeline;

			this.backend.createRenderPipeline( renderObject );

		} else {

			// assign a shared pipeline to renderObject

			renderObject.pipeline = pipeline;

		}

		return pipeline;

	}

	_getRenderCacheKey( renderObject, stageVertex, stageFragment ) {

		const { material } = renderObject;

		const parameters = [
			stageVertex.id, stageFragment.id,
			material.transparent, material.blending, material.premultipliedAlpha,
			material.blendSrc, material.blendDst, material.blendEquation,
			material.blendSrcAlpha, material.blendDstAlpha, material.blendEquationAlpha,
			material.colorWrite,
			material.depthWrite, material.depthTest, material.depthFunc,
			material.stencilWrite, material.stencilFunc,
			material.stencilFail, material.stencilZFail, material.stencilZPass,
			material.stencilFuncMask, material.stencilWriteMask,
			material.side,
			this.backend.getCacheKey( renderObject )
		];

		return parameters.join();

	}

	_releasePipeline( object ) {

		const pipeline = this.get( object ).pipeline;

		//this.bindings.delete( object );

		if ( pipeline && -- pipeline.usedTimes === 0 ) {

			this.caches.delete( pipeline.cacheKey );

			if ( pipeline.isComputePipeline ) {

				this._releaseProgram( pipeline.computeProgram );

			} else {

				this._releaseProgram( pipeline.vertexProgram );
				this._releaseProgram( pipeline.fragmentProgram );

			}

		}

	}

	_releaseProgram( program ) {

		if ( -- program.usedTimes === 0 ) {

			const code = program.code;
			const stage = program.stage;

			this.programs[ stage ].delete( code );

		}

	}

	_needsUpdate( renderObject ) {

		const data = this.get( renderObject );
		const material = renderObject.material;

		let needsUpdate = this.backend.needsUpdate( renderObject );

		// check material state

		if ( data.material !== material || data.materialVersion !== material.version ||
			data.transparent !== material.transparent || data.blending !== material.blending || data.premultipliedAlpha !== material.premultipliedAlpha ||
			data.blendSrc !== material.blendSrc || data.blendDst !== material.blendDst || data.blendEquation !== material.blendEquation ||
			data.blendSrcAlpha !== material.blendSrcAlpha || data.blendDstAlpha !== material.blendDstAlpha || data.blendEquationAlpha !== material.blendEquationAlpha ||
			data.colorWrite !== material.colorWrite ||
			data.depthWrite !== material.depthWrite || data.depthTest !== material.depthTest || data.depthFunc !== material.depthFunc ||
			data.stencilWrite !== material.stencilWrite || data.stencilFunc !== material.stencilFunc ||
			data.stencilFail !== material.stencilFail || data.stencilZFail !== material.stencilZFail || data.stencilZPass !== material.stencilZPass ||
			data.stencilFuncMask !== material.stencilFuncMask || data.stencilWriteMask !== material.stencilWriteMask ||
			data.side !== material.side
		) {

			data.material = material; data.materialVersion = material.version;
			data.transparent = material.transparent; data.blending = material.blending; data.premultipliedAlpha = material.premultipliedAlpha;
			data.blendSrc = material.blendSrc; data.blendDst = material.blendDst; data.blendEquation = material.blendEquation;
			data.blendSrcAlpha = material.blendSrcAlpha; data.blendDstAlpha = material.blendDstAlpha; data.blendEquationAlpha = material.blendEquationAlpha;
			data.colorWrite = material.colorWrite;
			data.depthWrite = material.depthWrite; data.depthTest = material.depthTest; data.depthFunc = material.depthFunc;
			data.stencilWrite = material.stencilWrite; data.stencilFunc = material.stencilFunc;
			data.stencilFail = material.stencilFail; data.stencilZFail = material.stencilZFail; data.stencilZPass = material.stencilZPass;
			data.stencilFuncMask = material.stencilFuncMask; data.stencilWriteMask = material.stencilWriteMask;
			data.side = material.side;

			needsUpdate = true;

		}

		return needsUpdate || data.pipeline !== undefined;

	}

}

class Bindings extends DataMap {

	constructor( backend, nodes, textures, attributes, pipelines, info ) {

		super();

		this.backend = backend;
		this.textures = textures;
		this.pipelines = pipelines;
		this.attributes = attributes;
		this.nodes = nodes;
		this.info = info;

		this.pipelines.bindings = this; // assign bindings to pipelines

		this.updateMap = new WeakMap();

	}

	getForRender( renderObject ) {

		const bindings = renderObject.getBindings();

		const data = this.get( renderObject );

		if ( data.bindings !== bindings ) {

			// each object defines an array of bindings (ubos, textures, samplers etc.)

			data.bindings = bindings;

			this._init( bindings );

			const pipeline = this.pipelines.getForRender( renderObject );

			this.backend.createBindings( bindings, pipeline );

		}

		return data.bindings;

	}

	getForCompute( computeNode ) {

		const data = this.get( computeNode );

		if ( data.bindings === undefined ) {

			const nodeBuilder = this.nodes.getForCompute( computeNode );

			const bindings = nodeBuilder.getBindings();

			data.bindings = bindings;

			this._init( bindings );

			const pipeline = this.pipelines.getForCompute( computeNode );

			this.backend.createBindings( bindings, pipeline );

		}

		return data.bindings;

	}

	updateForCompute( computeNode ) {

		this._update( computeNode, this.getForCompute( computeNode ) );

	}

	updateForRender( renderObject ) {

		this._update( renderObject, this.getForRender( renderObject ) );

	}

	_init( bindings ) {

		for ( const binding of bindings ) {

			if ( binding.isSampler || binding.isSampledTexture ) {

				this.textures.updateTexture( binding.texture );

			} else if ( binding.isStorageBuffer ) {

				const attribute = binding.attribute;

				this.attributes.update( attribute, AttributeType.STORAGE );

			}

		}

	}

	_update( object, bindings ) {

		const { backend } = this;

		const updateMap = this.updateMap;
		const frame = this.info.render.frame;

		let needsBindingsUpdate = false;

		// iterate over all bindings and check if buffer updates or a new binding group is required

		for ( const binding of bindings ) {

			const isShared = binding.isShared;
			const isUpdated = updateMap.get( binding ) === frame;

			if ( isShared && isUpdated ) continue;

			if ( binding.isUniformBuffer ) {

				const needsUpdate = binding.update();

				if ( needsUpdate ) {

					backend.updateBinding( binding );

				}

			} else if ( binding.isSampledTexture ) {

				if ( binding.needsBindingsUpdate ) needsBindingsUpdate = true;

				const needsUpdate = binding.update();

				if ( needsUpdate ) {

					this.textures.updateTexture( binding.texture );

				}

			}

			updateMap.set( binding, frame );

		}

		if ( needsBindingsUpdate === true ) {

			const pipeline = this.pipelines.getForRender( object );

			this.backend.updateBindings( bindings, pipeline );

		}

	}

	dispose() {

		super.dispose();

		this.updateMap = new WeakMap();

	}

}

const NodeShaderStage = {
	VERTEX: 'vertex',
	FRAGMENT: 'fragment'
};

const NodeUpdateType = {
	NONE: 'none',
	FRAME: 'frame',
	RENDER: 'render',
	OBJECT: 'object'
};

const defaultShaderStages = [ 'fragment', 'vertex' ];
const defaultBuildStages = [ 'construct', 'analyze', 'generate' ];
const shaderStages = [ ...defaultShaderStages, 'compute' ];
const vectorComponents = [ 'x', 'y', 'z', 'w' ];

function getCacheKey( object ) {

	let cacheKey = '{';

	if ( object.isNode === true ) {

		cacheKey += `uuid:"${ object.uuid }"`;

	}

	for ( const { property, index, childNode } of getNodeChildren( object ) ) {

		// @TODO: Think about implement NodeArray and NodeObject.

		let childCacheKey = getCacheKey( childNode );
		if ( ! childCacheKey.includes( ',' ) ) childCacheKey = childCacheKey.slice( childCacheKey.indexOf( '"' ), childCacheKey.indexOf( '}' ) );
		cacheKey += `,${ property }${ index !== undefined ? '/' + index : '' }:${ childCacheKey }`;

	}

	cacheKey += '}';

	return cacheKey;

}

function* getNodeChildren( node, toJSON = false ) {

	for ( const property in node ) {

		// Ignore private properties.
		if ( property.startsWith( '_' ) === true ) continue;

		const object = node[ property ];

		if ( Array.isArray( object ) === true ) {

			for ( let i = 0; i < object.length; i ++ ) {

				const child = object[ i ];

				if ( child && ( child.isNode === true || toJSON && typeof child.toJSON === 'function' ) ) {

					yield { property, index: i, childNode: child };

				}

			}

		} else if ( object && object.isNode === true ) {

			yield { property, childNode: object };

		} else if ( typeof object === 'object' ) {

			for ( const subProperty in object ) {

				const child = object[ subProperty ];

				if ( child && ( child.isNode === true || toJSON && typeof child.toJSON === 'function' ) ) {

					yield { property, index: subProperty, childNode: child };

				}

			}

		}

	}

}

function getValueType( value ) {

	if ( value === undefined || value === null ) return null;

	const typeOf = typeof value;

	if ( value.isNode === true ) {

		return 'node';

	} else if ( typeOf === 'number' ) {

		return 'float';

	} else if ( typeOf === 'boolean' ) {

		return 'bool';

	} else if ( typeOf === 'string' ) {

		return 'string';

	} else if ( typeOf === 'function' ) {

		return 'shader';

	} else if ( value.isVector2 === true ) {

		return 'vec2';

	} else if ( value.isVector3 === true ) {

		return 'vec3';

	} else if ( value.isVector4 === true ) {

		return 'vec4';

	} else if ( value.isMatrix3 === true ) {

		return 'mat3';

	} else if ( value.isMatrix4 === true ) {

		return 'mat4';

	} else if ( value.isColor === true ) {

		return 'color';

	} else if ( value instanceof ArrayBuffer ) {

		return 'ArrayBuffer';

	}

	return null;

}

function getValueFromType( type, ...params ) {

	const last4 = type ? type.slice( - 4 ) : undefined;

	if ( ( last4 === 'vec2' || last4 === 'vec3' || last4 === 'vec4' ) && params.length === 1 ) { // ensure same behaviour as in NodeBuilder.format()

		params = last4 === 'vec2' ? [ params[ 0 ], params[ 0 ] ] : [ params[ 0 ], params[ 0 ], params[ 0 ] ];

	}

	if ( type === 'color' ) {

		return new Color( ...params );

	} else if ( last4 === 'vec2' ) {

		return new Vector2( ...params );

	} else if ( last4 === 'vec3' ) {

		return new Vector3( ...params );

	} else if ( last4 === 'vec4' ) {

		return new Vector4( ...params );

	} else if ( last4 === 'mat3' ) {

		return new Matrix3( ...params );

	} else if ( last4 === 'mat4' ) {

		return new Matrix4( ...params );

	} else if ( type === 'bool' ) {

		return params[ 0 ] || false;

	} else if ( ( type === 'float' ) || ( type === 'int' ) || ( type === 'uint' ) ) {

		return params[ 0 ] || 0;

	} else if ( type === 'string' ) {

		return params[ 0 ] || '';

	} else if ( type === 'ArrayBuffer' ) {

		return base64ToArrayBuffer( params[ 0 ] );

	}

	return null;

}

function arrayBufferToBase64( arrayBuffer ) {

	let chars = '';

	const array = new Uint8Array( arrayBuffer );

	for ( let i = 0; i < array.length; i ++ ) {

		chars += String.fromCharCode( array[ i ] );

	}

	return btoa( chars );

}

function base64ToArrayBuffer( base64 ) {

	return Uint8Array.from( atob( base64 ), c => c.charCodeAt( 0 ) ).buffer;

}

const NodeClasses = new Map();

let _nodeId = 0;

class Node {

	constructor( nodeType = null ) {

		this.isNode = true;

		this.nodeType = nodeType;

		this.updateType = NodeUpdateType.NONE;
		this.updateBeforeType = NodeUpdateType.NONE;

		this.uuid = MathUtils.generateUUID();

		Object.defineProperty( this, 'id', { value: _nodeId ++ } );

	}

	get type() {

		return this.constructor.name;

	}

	isGlobal( /*builder*/ ) {

		return false;

	}

	* getChildren() {

		const self = this;

		for ( const { property, index, childNode } of getNodeChildren( this ) ) {

			if ( index !== undefined ) {

				yield { childNode, replaceNode( node ) {

					self[ property ][ index ] = node;

				} };

			} else {

				yield { childNode, replaceNode( node ) {

					self[ property ] = node;

				} };

			}

		}

	}

	traverse( callback, replaceNode = null ) {

		callback( this, replaceNode );

		for ( const { childNode, replaceNode } of this.getChildren() ) {

			childNode.traverse( callback, replaceNode );

		}

	}

	getCacheKey() {

		return getCacheKey( this );

	}

	getHash( /*builder*/ ) {

		return this.uuid;

	}

	getUpdateType() {

		return this.updateType;

	}

	getUpdateBeforeType() {

		return this.updateBeforeType;

	}

	getNodeType( /*builder*/ ) {

		return this.nodeType;

	}

	getReference( builder ) {

		const hash = this.getHash( builder );
		const nodeFromHash = builder.getNodeFromHash( hash );

		return nodeFromHash || this;

	}

	construct( builder ) {

		const nodeProperties = builder.getNodeProperties( this );

		for ( const { childNode } of this.getChildren() ) {

			nodeProperties[ '_node' + childNode.id ] = childNode;

		}

		// return a outputNode if exists
		return null;

	}

	analyze( builder ) {

		const nodeData = builder.getDataFromNode( this );
		nodeData.dependenciesCount = nodeData.dependenciesCount === undefined ? 1 : nodeData.dependenciesCount + 1;

		if ( nodeData.dependenciesCount === 1 ) {

			// node flow children

			const nodeProperties = builder.getNodeProperties( this );

			for ( const childNode of Object.values( nodeProperties ) ) {

				if ( childNode && childNode.isNode === true ) {

					childNode.build( builder );

				}

			}

		}

	}

	generate( builder, output ) {

		const { outputNode } = builder.getNodeProperties( this );

		if ( outputNode && outputNode.isNode === true ) {

			return outputNode.build( builder, output );

		}

	}

	updateBefore( /*frame*/ ) {

	}

	update( /*frame*/ ) {

	}

	build( builder, output = null ) {

		const refNode = this.getReference( builder );

		if ( this !== refNode ) {

			return refNode.build( builder, output );

		}

		builder.addNode( this );
		builder.addChain( this );

		/* Build stages expected results:
			- "construct"	-> Node
			- "analyze"		-> null
			- "generate"	-> String
		*/
		let result = null;

		const buildStage = builder.getBuildStage();

		if ( buildStage === 'construct' ) {

			const properties = builder.getNodeProperties( this );

			if ( properties.initialized !== true || builder.context.tempRead === false ) {

				properties.initialized = true;
				properties.outputNode = this.construct( builder );

				for ( const childNode of Object.values( properties ) ) {

					if ( childNode && childNode.isNode === true ) {

						childNode.build( builder );

					}

				}

			}

		} else if ( buildStage === 'analyze' ) {

			this.analyze( builder );

		} else if ( buildStage === 'generate' ) {

			const isGenerateOnce = this.generate.length === 1;

			if ( isGenerateOnce ) {

				const type = this.getNodeType( builder );
				const nodeData = builder.getDataFromNode( this );

				result = nodeData.snippet;

				if ( result === undefined /*|| builder.context.tempRead === false*/ ) {

					result = this.generate( builder ) || '';

					nodeData.snippet = result;

				}

				result = builder.format( result, type, output );

			} else {

				result = this.generate( builder, output ) || '';

			}

		}

		builder.removeChain( this );

		return result;

	}

	getSerializeChildren() {

		return getNodeChildren( this );

	}

	serialize( json ) {

		const nodeChildren = this.getSerializeChildren();

		const inputNodes = {};

		for ( const { property, index, childNode } of nodeChildren ) {

			if ( index !== undefined ) {

				if ( inputNodes[ property ] === undefined ) {

					inputNodes[ property ] = Number.isInteger( index ) ? [] : {};

				}

				inputNodes[ property ][ index ] = childNode.toJSON( json.meta ).uuid;

			} else {

				inputNodes[ property ] = childNode.toJSON( json.meta ).uuid;

			}

		}

		if ( Object.keys( inputNodes ).length > 0 ) {

			json.inputNodes = inputNodes;

		}

	}

	deserialize( json ) {

		if ( json.inputNodes !== undefined ) {

			const nodes = json.meta.nodes;

			for ( const property in json.inputNodes ) {

				if ( Array.isArray( json.inputNodes[ property ] ) ) {

					const inputArray = [];

					for ( const uuid of json.inputNodes[ property ] ) {

						inputArray.push( nodes[ uuid ] );

					}

					this[ property ] = inputArray;

				} else if ( typeof json.inputNodes[ property ] === 'object' ) {

					const inputObject = {};

					for ( const subProperty in json.inputNodes[ property ] ) {

						const uuid = json.inputNodes[ property ][ subProperty ];

						inputObject[ subProperty ] = nodes[ uuid ];

					}

					this[ property ] = inputObject;

				} else {

					const uuid = json.inputNodes[ property ];

					this[ property ] = nodes[ uuid ];

				}

			}

		}

	}

	toJSON( meta ) {

		const { uuid, type } = this;
		const isRoot = ( meta === undefined || typeof meta === 'string' );

		if ( isRoot ) {

			meta = {
				textures: {},
				images: {},
				nodes: {}
			};

		}

		// serialize

		let data = meta.nodes[ uuid ];

		if ( data === undefined ) {

			data = {
				uuid,
				type,
				meta,
				metadata: {
					version: 4.6,
					type: 'Node',
					generator: 'Node.toJSON'
				}
			};

			if ( isRoot !== true ) meta.nodes[ data.uuid ] = data;

			this.serialize( data );

			delete data.meta;

		}

		// TODO: Copied from Object3D.toJSON

		function extractFromCache( cache ) {

			const values = [];

			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

		if ( isRoot ) {

			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );
			const nodes = extractFromCache( meta.nodes );

			if ( textures.length > 0 ) data.textures = textures;
			if ( images.length > 0 ) data.images = images;
			if ( nodes.length > 0 ) data.nodes = nodes;

		}

		return data;

	}

}

function addNodeClass( nodeClass ) {

	if ( typeof nodeClass !== 'function' || ! nodeClass.name ) throw new Error( `Node class ${ nodeClass.name } is not a class` );
	if ( NodeClasses.has( nodeClass.name ) ) throw new Error( `Redefinition of node class ${ nodeClass.name }` );

	NodeClasses.set( nodeClass.name, nodeClass );

}

class InputNode extends Node {

	constructor( value, nodeType = null ) {

		super( nodeType );

		this.isInputNode = true;

		this.value = value;
		this.precision = null;

	}

	getNodeType( /*builder*/ ) {

		if ( this.nodeType === null ) {

			return getValueType( this.value );

		}

		return this.nodeType;

	}

	getInputType( builder ) {

		return this.getNodeType( builder );

	}

	setPrecision( precision ) {

		this.precision = precision;

		return this;

	}

	serialize( data ) {

		super.serialize( data );

		data.value = this.value;

		if ( this.value && this.value.toArray ) data.value = this.value.toArray();

		data.valueType = getValueType( this.value );
		data.nodeType = this.nodeType;

		if ( data.valueType === 'ArrayBuffer' ) data.value = arrayBufferToBase64( data.value );

		data.precision = this.precision;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.nodeType = data.nodeType;
		this.value = Array.isArray( data.value ) ? getValueFromType( data.valueType, ...data.value ) : data.value;

		this.precision = data.precision || null;

		if ( this.value && this.value.fromArray ) this.value = this.value.fromArray( data.value );

	}

	generate( /*builder, output*/ ) {

	}

}

addNodeClass( InputNode );

class ArrayElementNode extends Node { // @TODO: If extending from TempNode it breaks webgpu_compute

	constructor( node, indexNode ) {

		super();

		this.node = node;
		this.indexNode = indexNode;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	generate( builder ) {

		const nodeSnippet = this.node.build( builder );
		const indexSnippet = this.indexNode.build( builder, 'uint' );

		return `${nodeSnippet}[ ${indexSnippet} ]`;

	}

}

addNodeClass( ArrayElementNode );

class ConvertNode extends Node {

	constructor( node, convertTo ) {

		super();

		this.node = node;
		this.convertTo = convertTo;

	}

	getNodeType( builder ) {

		const requestType = this.node.getNodeType( builder );

		let convertTo = null;

		for ( const overloadingType of this.convertTo.split( '|' ) ) {

			if ( convertTo === null || builder.getTypeLength( requestType ) === builder.getTypeLength( overloadingType ) ) {

				convertTo = overloadingType;

			}

		}

		return convertTo;

	}

	serialize( data ) {

		super.serialize( data );

		data.convertTo = this.convertTo;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.convertTo = data.convertTo;

	}

	generate( builder, output ) {

		const node = this.node;
		const type = this.getNodeType( builder );

		const snippet = node.build( builder, type );

		return builder.format( snippet, type, output );

	}

}

addNodeClass( ConvertNode );

class TempNode extends Node {

	constructor( type ) {

		super( type );

		this.isTempNode = true;

	}

	hasDependencies( builder ) {

		return builder.getDataFromNode( this ).dependenciesCount > 1;

	}

	build( builder, output ) {

		const buildStage = builder.getBuildStage();

		if ( buildStage === 'generate' ) {

			const type = builder.getVectorType( this.getNodeType( builder, output ) );
			const nodeData = builder.getDataFromNode( this );

			if ( builder.context.tempRead !== false && nodeData.propertyName !== undefined ) {

				return builder.format( nodeData.propertyName, type, output );

			} else if ( builder.context.tempWrite !== false && type !== 'void' && output !== 'void' && this.hasDependencies( builder ) ) {

				const snippet = super.build( builder, type );

				const nodeVar = builder.getVarFromNode( this, type );
				const propertyName = builder.getPropertyName( nodeVar );

				builder.addLineFlowCode( `${propertyName} = ${snippet}` );

				nodeData.snippet = snippet;
				nodeData.propertyName = propertyName;

				return builder.format( nodeData.propertyName, type, output );

			}

		}

		return super.build( builder, output );

	}

}

addNodeClass( TempNode );

class JoinNode extends TempNode {

	constructor( nodes = [], nodeType = null ) {

		super( nodeType );

		this.nodes = nodes;

	}

	getNodeType( builder ) {

		if ( this.nodeType !== null ) {

			return builder.getVectorType( this.nodeType );

		}

		return builder.getTypeFromLength( this.nodes.reduce( ( count, cur ) => count + builder.getTypeLength( cur.getNodeType( builder ) ), 0 ) );

	}

	generate( builder, output ) {

		const type = this.getNodeType( builder );
		const nodes = this.nodes;

		const snippetValues = [];

		for ( const input of nodes ) {

			const inputSnippet = input.build( builder );

			snippetValues.push( inputSnippet );

		}

		const snippet = `${ builder.getType( type ) }( ${ snippetValues.join( ', ' ) } )`;

		return builder.format( snippet, type, output );

	}

}

addNodeClass( JoinNode );

const stringVectorComponents = vectorComponents.join( '' );

class SplitNode extends Node {

	constructor( node, components = 'x' ) {

		super();

		this.node = node;
		this.components = components;

	}

	getVectorLength() {

		let vectorLength = this.components.length;

		for ( const c of this.components ) {

			vectorLength = Math.max( vectorComponents.indexOf( c ) + 1, vectorLength );

		}

		return vectorLength;

	}

	getNodeType( builder ) {

		return builder.getTypeFromLength( this.components.length );

	}

	generate( builder, output ) {

		const node = this.node;
		const nodeTypeLength = builder.getTypeLength( node.getNodeType( builder ) );

		let snippet = null;

		if ( nodeTypeLength > 1 ) {

			let type = null;

			const componentsLength = this.getVectorLength();

			if ( componentsLength >= nodeTypeLength ) {

				// needed expand the input node

				type = builder.getTypeFromLength( this.getVectorLength() );

			}

			const nodeSnippet = node.build( builder, type );

			if ( this.components.length === nodeTypeLength && this.components === stringVectorComponents.slice( 0, this.components.length ) ) {

				// unecessary swizzle

				snippet = builder.format( nodeSnippet, type, output );

			} else {

				snippet = builder.format( `${nodeSnippet}.${this.components}`, this.getNodeType( builder ), output );

			}

		} else {

			// ignore .components if .node returns float/integer

			snippet = node.build( builder, output );

		}

		return snippet;

	}

	serialize( data ) {

		super.serialize( data );

		data.components = this.components;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.components = data.components;

	}

}

addNodeClass( SplitNode );

class ConstNode extends InputNode {

	constructor( value, nodeType = null ) {

		super( value, nodeType );

		this.isConstNode = true;

	}

	generateConst( builder ) {

		return builder.getConst( this.getNodeType( builder ), this.value );

	}

	generate( builder, output ) {

		const type = this.getNodeType( builder );

		return builder.format( this.generateConst( builder ), type, output );

	}

}

addNodeClass( ConstNode );

const NodeElements = new Map(); // @TODO: Currently only a few nodes are added, probably also add others

function addNodeElement( name, nodeElement ) {

	if ( NodeElements.has( name ) ) throw new Error( `Redefinition of node element ${ name }` );
	if ( typeof nodeElement !== 'function' ) throw new Error( `Node element ${ name } is not a function` );

	NodeElements.set( name, nodeElement );

}

const shaderNodeHandler = {

	construct( NodeClosure, params ) {

		const inputs = params.shift();

		return NodeClosure( nodeObjects( inputs ), ...params );

	},

	get: function ( node, prop, nodeObj ) {

		if ( typeof prop === 'string' && node[ prop ] === undefined ) {

			if ( NodeElements.has( prop ) ) {

				const nodeElement = NodeElements.get( prop );

				return ( ...params ) => nodeElement( nodeObj, ...params );

			} else if ( prop.endsWith( 'Assign' ) && NodeElements.has( prop.slice( 0, prop.length - 'Assign'.length ) ) ) {

				const nodeElement = NodeElements.get( prop.slice( 0, prop.length - 'Assign'.length ) );

				return ( ...params ) => nodeObj.assign( nodeElement( nodeObj, ...params ) );

			} else if ( /^[xyzwrgbastpq]{1,4}$/.test( prop ) === true ) {

				// accessing properties ( swizzle )

				prop = prop
					.replace( /r|s/g, 'x' )
					.replace( /g|t/g, 'y' )
					.replace( /b|p/g, 'z' )
					.replace( /a|q/g, 'w' );

				return nodeObject( new SplitNode( node, prop ) );

			} else if ( prop === 'width' || prop === 'height' ) {

				// accessing property

				return nodeObject( new SplitNode( node, prop === 'width' ? 'x' : 'y' ) );

			} else if ( /^\d+$/.test( prop ) === true ) {

				// accessing array

				return nodeObject( new ArrayElementNode( node, new ConstNode( Number( prop ), 'uint' ) ) );

			}

		}

		return node[ prop ];

	}

};

const nodeObjectsCacheMap = new WeakMap();

const ShaderNodeObject = function ( obj, altType = null ) {

	const type = getValueType( obj );

	if ( type === 'node' ) {

		let nodeObject = nodeObjectsCacheMap.get( obj );

		if ( nodeObject === undefined ) {

			nodeObject = new Proxy( obj, shaderNodeHandler );
			nodeObjectsCacheMap.set( obj, nodeObject );
			nodeObjectsCacheMap.set( nodeObject, nodeObject );

		}

		return nodeObject;

	} else if ( ( altType === null && ( type === 'float' || type === 'boolean' ) ) || ( type && type !== 'shader' && type !== 'string' ) ) {

		return nodeObject( getConstNode( obj, altType ) );

	} else if ( type === 'shader' ) {

		return shader( obj );

	}

	return obj;

};

const ShaderNodeObjects = function ( objects, altType = null ) {

	for ( const name in objects ) {

		objects[ name ] = nodeObject( objects[ name ], altType );

	}

	return objects;

};

const ShaderNodeArray = function ( array, altType = null ) {

	const len = array.length;

	for ( let i = 0; i < len; i ++ ) {

		array[ i ] = nodeObject( array[ i ], altType );

	}

	return array;

};

const ShaderNodeProxy = function ( NodeClass, scope = null, factor = null, settings = null ) {

	const assignNode = ( node ) => nodeObject( settings !== null ? Object.assign( node, settings ) : node );

	if ( scope === null ) {

		return ( ...params ) => {

			return assignNode( new NodeClass( ...nodeArray( params ) ) );

		};

	} else if ( factor !== null ) {

		factor = nodeObject( factor );

		return ( ...params ) => {

			return assignNode( new NodeClass( scope, ...nodeArray( params ), factor ) );

		};

	} else {

		return ( ...params ) => {

			return assignNode( new NodeClass( scope, ...nodeArray( params ) ) );

		};

	}

};

const ShaderNodeImmutable = function ( NodeClass, ...params ) {

	return nodeObject( new NodeClass( ...nodeArray( params ) ) );

};

class ShaderNodeInternal extends Node {

	constructor( jsFunc ) {

		super();

		this._jsFunc = jsFunc;

	}

	call( inputs, stack, builder ) {

		inputs = nodeObjects( inputs );

		return nodeObject( this._jsFunc( inputs, stack, builder ) );

	}

	getNodeType( builder ) {

		const { outputNode } = builder.getNodeProperties( this );

		return outputNode ? outputNode.getNodeType( builder ) : super.getNodeType( builder );

	}

	construct( builder ) {

		builder.addStack();

		builder.stack.outputNode = nodeObject( this._jsFunc( builder.stack, builder ) );

		return builder.removeStack();

	}

}

const bools = [ false, true ];
const uints = [ 0, 1, 2, 3 ];
const ints = [ - 1, - 2 ];
const floats = [ 0.5, 1.5, 1 / 3, 1e-6, 1e6, Math.PI, Math.PI * 2, 1 / Math.PI, 2 / Math.PI, 1 / ( Math.PI * 2 ), Math.PI / 2 ];

const boolsCacheMap = new Map();
for ( const bool of bools ) boolsCacheMap.set( bool, new ConstNode( bool ) );

const uintsCacheMap = new Map();
for ( const uint of uints ) uintsCacheMap.set( uint, new ConstNode( uint, 'uint' ) );

const intsCacheMap = new Map( [ ...uintsCacheMap ].map( el => new ConstNode( el.value, 'int' ) ) );
for ( const int of ints ) intsCacheMap.set( int, new ConstNode( int, 'int' ) );

const floatsCacheMap = new Map( [ ...intsCacheMap ].map( el => new ConstNode( el.value ) ) );
for ( const float of floats ) floatsCacheMap.set( float, new ConstNode( float ) );
for ( const float of floats ) floatsCacheMap.set( - float, new ConstNode( - float ) );

const cacheMaps = { bool: boolsCacheMap, uint: uintsCacheMap, ints: intsCacheMap, float: floatsCacheMap };

const constNodesCacheMap = new Map( [ ...boolsCacheMap, ...floatsCacheMap ] );

const getConstNode = ( value, type ) => {

	if ( constNodesCacheMap.has( value ) ) {

		return constNodesCacheMap.get( value );

	} else if ( value.isNode === true ) {

		return value;

	} else {

		return new ConstNode( value, type );

	}

};

const safeGetNodeType = ( node ) => {

	try {

		return node.getNodeType();

	} catch {

		return undefined;

	}

};

const ConvertType = function ( type, cacheMap = null ) {

	return ( ...params ) => {

		if ( params.length === 0 || ( ! [ 'bool', 'float', 'int', 'uint' ].includes( type ) && params.every( param => typeof param !== 'object' ) ) ) {

			params = [ getValueFromType( type, ...params ) ];

		}

		if ( params.length === 1 && cacheMap !== null && cacheMap.has( params[ 0 ] ) ) {

			return nodeObject( cacheMap.get( params[ 0 ] ) );

		}

		if ( params.length === 1 ) {

			const node = getConstNode( params[ 0 ], type );
			if ( safeGetNodeType( node ) === type ) return nodeObject( node );
			return nodeObject( new ConvertNode( node, type ) );

		}

		const nodes = params.map( param => getConstNode( param ) );
		return nodeObject( new JoinNode( nodes, type ) );

	};

};

// exports

// utils

const getConstNodeType = ( value ) => ( value !== undefined && value !== null ) ? ( value.nodeType || value.convertTo || ( typeof value === 'string' ? value : null ) ) : null;

// shader node base

function ShaderNode( jsFunc ) {

	return new Proxy( new ShaderNodeInternal( jsFunc ), shaderNodeHandler );

}

const nodeObject = ( val, altType = null ) => /* new */ ShaderNodeObject( val, altType );
const nodeObjects = ( val, altType = null ) => new ShaderNodeObjects( val, altType );
const nodeArray = ( val, altType = null ) => new ShaderNodeArray( val, altType );
const nodeProxy = ( ...val ) => new ShaderNodeProxy( ...val );
const nodeImmutable = ( ...val ) => new ShaderNodeImmutable( ...val );

const shader = ( ...val ) => new ShaderNode( ...val );

addNodeClass( ShaderNode );

// types
// @TODO: Maybe export from ConstNode.js?

const color = new ConvertType( 'color' );

const float = new ConvertType( 'float', cacheMaps.float );
const int = new ConvertType( 'int', cacheMaps.int );
const uint = new ConvertType( 'uint', cacheMaps.uint );
const bool = new ConvertType( 'bool', cacheMaps.bool );

const vec2 = new ConvertType( 'vec2' );
const ivec2 = new ConvertType( 'ivec2' );
const uvec2 = new ConvertType( 'uvec2' );
const bvec2 = new ConvertType( 'bvec2' );

const vec3 = new ConvertType( 'vec3' );
const ivec3 = new ConvertType( 'ivec3' );
const uvec3 = new ConvertType( 'uvec3' );
const bvec3 = new ConvertType( 'bvec3' );

const vec4 = new ConvertType( 'vec4' );
const ivec4 = new ConvertType( 'ivec4' );
const uvec4 = new ConvertType( 'uvec4' );
const bvec4 = new ConvertType( 'bvec4' );

const mat3 = new ConvertType( 'mat3' );
const imat3 = new ConvertType( 'imat3' );
const umat3 = new ConvertType( 'umat3' );
const bmat3 = new ConvertType( 'bmat3' );

const mat4 = new ConvertType( 'mat4' );
const imat4 = new ConvertType( 'imat4' );
const umat4 = new ConvertType( 'umat4' );
const bmat4 = new ConvertType( 'bmat4' );

const string = ( value = '' ) => nodeObject( new ConstNode( value, 'string' ) );
const arrayBuffer = ( value ) => nodeObject( new ConstNode( value, 'ArrayBuffer' ) );

addNodeElement( 'color', color );
addNodeElement( 'float', float );
addNodeElement( 'int', int );
addNodeElement( 'uint', uint );
addNodeElement( 'bool', bool );
addNodeElement( 'vec2', vec2 );
addNodeElement( 'ivec2', ivec2 );
addNodeElement( 'uvec2', uvec2 );
addNodeElement( 'bvec2', bvec2 );
addNodeElement( 'vec3', vec3 );
addNodeElement( 'ivec3', ivec3 );
addNodeElement( 'uvec3', uvec3 );
addNodeElement( 'bvec3', bvec3 );
addNodeElement( 'vec4', vec4 );
addNodeElement( 'ivec4', ivec4 );
addNodeElement( 'uvec4', uvec4 );
addNodeElement( 'bvec4', bvec4 );
addNodeElement( 'mat3', mat3 );
addNodeElement( 'imat3', imat3 );
addNodeElement( 'umat3', umat3 );
addNodeElement( 'bmat3', bmat3 );
addNodeElement( 'mat4', mat4 );
addNodeElement( 'imat4', imat4 );
addNodeElement( 'umat4', umat4 );
addNodeElement( 'bmat4', bmat4 );
addNodeElement( 'string', string );
addNodeElement( 'arrayBuffer', arrayBuffer );

// basic nodes
// HACK - we cannot export them from the corresponding files because of the cyclic dependency
const element = nodeProxy( ArrayElementNode );
const convert = ( node, types ) => nodeObject( new ConvertNode( nodeObject( node ), types ) );

addNodeElement( 'element', element );
addNodeElement( 'convert', convert );

class UniformNode extends InputNode {

	constructor( value, nodeType = null ) {

		super( value, nodeType );

		this.isUniformNode = true;

	}

	getUniformHash( builder ) {

		return this.getHash( builder );

	}

	generate( builder, output ) {

		const type = this.getNodeType( builder );

		const hash = this.getUniformHash( builder );

		let sharedNode = builder.getNodeFromHash( hash );

		if ( sharedNode === undefined ) {

			builder.setHashNode( this, hash );

			sharedNode = this;

		}

		const sharedNodeType = sharedNode.getInputType( builder );

		const nodeUniform = builder.getUniformFromNode( sharedNode, sharedNodeType, builder.shaderStage );
		const propertyName = builder.getPropertyName( nodeUniform );

		return builder.format( propertyName, type, output );

	}

}

const uniform = ( arg1, arg2 ) => {

	const nodeType = getConstNodeType( arg2 || arg1 );

	// @TODO: get ConstNode from .traverse() in the future
	const value = ( arg1 && arg1.isNode === true ) ? ( arg1.node && arg1.node.value ) || arg1.value : arg1;

	return nodeObject( new UniformNode( value, nodeType ) );

};

addNodeClass( UniformNode );

class ArrayUniformNode extends UniformNode {

	constructor( nodes = [] ) {

		super();

		this.isArrayUniformNode = true;

		this.nodes = nodes;

	}

	getNodeType( builder ) {

		return this.nodes[ 0 ].getNodeType( builder );

	}

}

addNodeClass( ArrayUniformNode );

class VaryingNode extends Node {

	constructor( node, name = null ) {

		super();

		this.node = node;
		this.name = name;

	}

	isGlobal() {

		return true;

	}

	getHash( builder ) {

		return this.name || super.getHash( builder );

	}

	getNodeType( builder ) {

		// VaryingNode is auto type

		return this.node.getNodeType( builder );

	}

	generate( builder ) {

		const { name, node } = this;
		const type = this.getNodeType( builder );

		const nodeVarying = builder.getVaryingFromNode( this, type );

		// this property can be used to check if the varying can be optimized for a var
		nodeVarying.needsInterpolation || ( nodeVarying.needsInterpolation = ( builder.shaderStage === 'fragment' ) );

		if ( name !== null ) {

			nodeVarying.name = name;

		}

		const propertyName = builder.getPropertyName( nodeVarying, NodeShaderStage.VERTEX );

		// force node run in vertex stage
		builder.flowNodeFromShaderStage( NodeShaderStage.VERTEX, node, type, propertyName );

		return builder.getPropertyName( nodeVarying );

	}

}

const varying = nodeProxy( VaryingNode );

addNodeElement( 'varying', varying );

addNodeClass( VaryingNode );

class AttributeNode extends Node {

	constructor( attributeName, nodeType = null ) {

		super( nodeType );

		this._attributeName = attributeName;

	}

	getHash( builder ) {

		return this.getAttributeName( builder );

	}

	getNodeType( builder ) {

		const attributeName = this.getAttributeName( builder );

		let nodeType = super.getNodeType( builder );

		if ( nodeType === null ) {

			if ( builder.hasGeometryAttribute( attributeName ) ) {

				const attribute = builder.geometry.getAttribute( attributeName );

				nodeType = builder.getTypeFromAttribute( attribute );

			} else {

				nodeType = 'float';

			}

		}

		return nodeType;

	}

	setAttributeName( attributeName ) {

		this._attributeName = attributeName;

		return this;

	}

	getAttributeName( /*builder*/ ) {

		return this._attributeName;

	}

	generate( builder ) {

		const attributeName = this.getAttributeName( builder );
		const nodeType = this.getNodeType( builder );
		const geometryAttribute = builder.hasGeometryAttribute( attributeName );

		if ( geometryAttribute === true ) {

			const attribute = builder.geometry.getAttribute( attributeName );
			const attributeType = builder.getTypeFromAttribute( attribute );

			const nodeAttribute = builder.getAttribute( attributeName, attributeType );

			if ( builder.shaderStage === 'vertex' ) {

				return builder.format( nodeAttribute.name, attributeType, nodeType );

			} else {

				const nodeVarying = varying( this );

				return nodeVarying.build( builder, nodeType );

			}

		} else {

			return builder.getConst( nodeType );

		}

	}

}

const attribute = ( name, nodeType ) => nodeObject( new AttributeNode( name, nodeType ) );

addNodeClass( AttributeNode );

class BypassNode extends Node {

	constructor( returnNode, callNode ) {

		super();

		this.isBypassNode = true;

		this.outputNode = returnNode;
		this.callNode = callNode;

	}

	getNodeType( builder ) {

		return this.outputNode.getNodeType( builder );

	}

	generate( builder, output ) {

		const snippet = this.callNode.build( builder, 'void' );

		if ( snippet !== '' ) {

			builder.addLineFlowCode( snippet );

		}

		return this.outputNode.build( builder, output );

	}

}

const bypass = nodeProxy( BypassNode );

addNodeElement( 'bypass', bypass );

addNodeClass( BypassNode );

let id$2 = 0;

class NodeCache {

	constructor() {

		this.id = id$2 ++;
		this.nodesData = new WeakMap();

	}

	getNodeData( node ) {

		return this.nodesData.get( node );

	}

	setNodeData( node, data ) {

		this.nodesData.set( node, data );

	}

}

class CacheNode extends Node {

	constructor( node, cache = new NodeCache() ) {

		super();

		this.isCacheNode = true;

		this.node = node;
		this.cache = cache;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	build( builder, ...params ) {

		const previousCache = builder.getCache();

		builder.setCache( this.cache );

		const data = this.node.build( builder, ...params );

		builder.setCache( previousCache );

		return data;

	}

}

const cache = nodeProxy( CacheNode );

addNodeElement( 'cache', cache );

addNodeClass( CacheNode );

class ContextNode extends Node {

	constructor( node, context = {} ) {

		super();

		this.isContextNode = true;

		this.node = node;
		this.context = context;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	construct( builder ) {

		const previousContext = builder.getContext();

		builder.setContext( { ...builder.context, ...this.context } );

		const node = this.node.build( builder );

		builder.setContext( previousContext );

		return node;

	}

	generate( builder, output ) {

		const previousContext = builder.getContext();

		builder.setContext( { ...builder.context, ...this.context } );

		const snippet = this.node.build( builder, output );

		builder.setContext( previousContext );

		return snippet;

	}

}

const context = nodeProxy( ContextNode );

addNodeElement( 'context', context );

addNodeClass( ContextNode );

class InstanceIndexNode extends Node {

	constructor() {

		super( 'uint' );

		this.isInstanceIndexNode = true;

	}

	generate( builder ) {

		const nodeType = this.getNodeType( builder );

		const propertyName = builder.getInstanceIndex();

		let output = null;

		if ( builder.shaderStage === 'vertex' || builder.shaderStage === 'compute' ) {

			output = propertyName;

		} else {

			const nodeVarying = varying( this );

			output = nodeVarying.build( builder, nodeType );

		}

		return output;

	}

}

const instanceIndex = nodeImmutable( InstanceIndexNode );

addNodeClass( InstanceIndexNode );

class LightingModel {

	constructor( init = null, direct = null, indirectDiffuse = null, indirectSpecular = null, ambientOcclusion = null ) {

		this.init = init;
		this.direct = direct;
		this.indirectDiffuse = indirectDiffuse;
		this.indirectSpecular = indirectSpecular;
		this.ambientOcclusion = ambientOcclusion;

	}

}

const lightingModel = ( ...params ) => new LightingModel( ...params );

class NodeAttribute {

	constructor( name, type, node = null ) {

		this.isNodeAttribute = true;

		this.name = name;
		this.type = type;
		this.node = node;

	}

}

class NodeUniform {

	constructor( name, type, node, needsUpdate = undefined ) {

		this.isNodeUniform = true;

		this.name = name;
		this.type = type;
		this.node = node;
		this.needsUpdate = needsUpdate;

	}

	get value() {

		return this.node.value;

	}

	set value( val ) {

		this.node.value = val;

	}

}

class NodeVar {

	constructor( name, type ) {

		this.isNodeVar = true;

		this.name = name;
		this.type = type;

	}

}

class NodeVarying extends NodeVar {

	constructor( name, type ) {

		super( name, type );

		this.needsInterpolation = false;

		this.isNodeVarying = true;

	}

}

class NodeCode {

	constructor( name, type, code = '' ) {

		this.name = name;
		this.type = type;
		this.code = code;

		Object.defineProperty( this, 'isNodeCode', { value: true } );

	}

}

class NodeKeywords {

	constructor() {

		this.keywords = [];
		this.nodes = [];
		this.keywordsCallback = {};

	}

	getNode( name ) {

		let node = this.nodes[ name ];

		if ( node === undefined && this.keywordsCallback[ name ] !== undefined ) {

			node = this.keywordsCallback[ name ]( name );

			this.nodes[ name ] = node;

		}

		return node;

	}

	addKeyword( name, callback ) {

		this.keywords.push( name );
		this.keywordsCallback[ name ] = callback;

		return this;

	}

	parse( code ) {

		const keywordNames = this.keywords;

		const regExp = new RegExp( `\\b${keywordNames.join( '\\b|\\b' )}\\b`, 'g' );

		const codeKeywords = code.match( regExp );

		const keywordNodes = [];

		if ( codeKeywords !== null ) {

			for ( const keyword of codeKeywords ) {

				const node = this.getNode( keyword );

				if ( node !== undefined && keywordNodes.indexOf( node ) === - 1 ) {

					keywordNodes.push( node );

				}

			}

		}

		return keywordNodes;

	}

	include( builder, code ) {

		const keywordNodes = this.parse( code );

		for ( const keywordNode of keywordNodes ) {

			keywordNode.build( builder );

		}

	}

}

class PropertyNode extends Node {

	constructor( nodeType, name = null ) {

		super( nodeType );

		this.name = name;

	}

	getHash( builder ) {

		return this.name || super.getHash( builder );

	}

	isGlobal( /*builder*/ ) {

		return true;

	}

	generate( builder ) {

		const nodeVary = builder.getVarFromNode( this, this.getNodeType( builder ) );
		const name = this.name;

		if ( name !== null ) {

			nodeVary.name = name;

		}

		return builder.getPropertyName( nodeVary );

	}

}

const property = ( type, name ) => nodeObject( new PropertyNode( type, name ) );

const diffuseColor = nodeImmutable( PropertyNode, 'vec4', 'DiffuseColor' );
const roughness = nodeImmutable( PropertyNode, 'float', 'Roughness' );
const metalness = nodeImmutable( PropertyNode, 'float', 'Metalness' );
const clearcoat = nodeImmutable( PropertyNode, 'float', 'Clearcoat' );
const clearcoatRoughness = nodeImmutable( PropertyNode, 'float', 'ClearcoatRoughness' );
const specularColor = nodeImmutable( PropertyNode, 'color', 'SpecularColor' );
const shininess = nodeImmutable( PropertyNode, 'float', 'Shininess' );

addNodeClass( PropertyNode );

class UVNode extends AttributeNode {

	constructor( index = 0 ) {

		super( null, 'vec2' );

		this.isUVNode = true;

		this.index = index;

	}

	getAttributeName( /*builder*/ ) {

		const index = this.index;

		return 'uv' + ( index > 0 ? index : '' );

	}

	serialize( data ) {

		super.serialize( data );

		data.index = this.index;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.index = data.index;

	}

}

const uv = ( ...params ) => nodeObject( new UVNode( ...params ) );

addNodeClass( UVNode );

class TextureSizeNode extends Node {

	constructor( textureNode, levelNode = null ) {

		super( 'uvec2' );

		this.isTextureSizeNode = true;

		this.textureNode = textureNode;
		this.levelNode = levelNode;

	}

	generate( builder, output ) {

		const textureProperty = this.textureNode.build( builder, 'property' );
		const levelNode = this.levelNode.build( builder, 'int' );

		return builder.format( `textureDimensions( ${textureProperty}, ${levelNode} )`, this.getNodeType( builder ), output );

	}

}

const textureSize = nodeProxy( TextureSizeNode );

addNodeElement( 'textureSize', textureSize );

addNodeClass( TextureSizeNode );

class OperatorNode extends TempNode {

	constructor( op, aNode, bNode, ...params ) {

		super();

		this.op = op;

		if ( params.length > 0 ) {

			let finalBNode = bNode;

			for ( let i = 0; i < params.length; i ++ ) {

				finalBNode = new OperatorNode( op, finalBNode, params[ i ] );

			}

			bNode = finalBNode;

		}

		this.aNode = aNode;
		this.bNode = bNode;

	}

	hasDependencies( builder ) {

		return this.op !== '=' ? super.hasDependencies( builder ) : false;

	}

	getNodeType( builder, output ) {

		const op = this.op;

		const aNode = this.aNode;
		const bNode = this.bNode;

		const typeA = aNode.getNodeType( builder );
		const typeB = bNode.getNodeType( builder );

		if ( typeA === 'void' || typeB === 'void' ) {

			return 'void';

		} else if ( op === '=' || op === '%' ) {

			return typeA;

		} else if ( op === '&' || op === '|' || op === '^' || op === '>>' || op === '<<' ) {

			return builder.getIntegerType( typeA );

		} else if ( op === '==' || op === '&&' || op === '||' || op === '^^' ) {

			return 'bool';

		} else if ( op === '<' || op === '>' || op === '<=' || op === '>=' ) {

			const typeLength = output ? builder.getTypeLength( output ) : Math.max( builder.getTypeLength( typeA ), builder.getTypeLength( typeB ) );

			return typeLength > 1 ? `bvec${ typeLength }` : 'bool';

		} else {

			if ( typeA === 'float' && builder.isMatrix( typeB ) ) {

				return typeB;

			} else if ( builder.isMatrix( typeA ) && builder.isVector( typeB ) ) {

				// matrix x vector

				return builder.getVectorFromMatrix( typeA );

			} else if ( builder.isVector( typeA ) && builder.isMatrix( typeB ) ) {

				// vector x matrix

				return builder.getVectorFromMatrix( typeB );

			} else if ( builder.getTypeLength( typeB ) > builder.getTypeLength( typeA ) ) {

				// anytype x anytype: use the greater length vector

				return typeB;

			}

			return typeA;

		}

	}

	generate( builder, output ) {

		const op = this.op;

		const aNode = this.aNode;
		const bNode = this.bNode;

		const type = this.getNodeType( builder, output );

		let typeA = null;
		let typeB = null;

		if ( type !== 'void' ) {

			typeA = aNode.getNodeType( builder );
			typeB = bNode.getNodeType( builder );

			if ( op === '=' ) {

				typeB = typeA;

			} else if ( op === '<' || op === '>' || op === '<=' || op === '>=' || op === '==' ) {

				if ( builder.isVector( typeA ) ) {

					typeB = typeA;

				} else {

					typeA = typeB = 'float';

				}

			} else if ( op === '>>' || op === '<<' ) {

				typeA = type;
				typeB = builder.changeComponentType( typeB, 'uint' );

			} else if ( builder.isMatrix( typeA ) && builder.isVector( typeB ) ) {

				// matrix x vector

				typeB = builder.getVectorFromMatrix( typeA );

			} else if ( builder.isVector( typeA ) && builder.isMatrix( typeB ) ) {

				// vector x matrix

				typeA = builder.getVectorFromMatrix( typeB );

			} else {

				// anytype x anytype

				typeA = typeB = type;

			}

		} else {

			typeA = typeB = type;

		}

		const a = aNode.build( builder, typeA );
		const b = bNode.build( builder, typeB );

		const outputLength = builder.getTypeLength( output );

		if ( output !== 'void' ) {

			if ( op === '=' ) {

				builder.addLineFlowCode( `${a} ${this.op} ${b}` );

				return a;

			} else if ( op === '<' && outputLength > 1 ) {

				return builder.format( `${ builder.getMethod( 'lessThan' ) }( ${a}, ${b} )`, type, output );

			} else if ( op === '<=' && outputLength > 1 ) {

				return builder.format( `${ builder.getMethod( 'lessThanEqual' ) }( ${a}, ${b} )`, type, output );

			} else if ( op === '>' && outputLength > 1 ) {

				return builder.format( `${ builder.getMethod( 'greaterThan' ) }( ${a}, ${b} )`, type, output );

			} else if ( op === '>=' && outputLength > 1 ) {

				return builder.format( `${ builder.getMethod( 'greaterThanEqual' ) }( ${a}, ${b} )`, type, output );

			} else {

				return builder.format( `( ${a} ${this.op} ${b} )`, type, output );

			}

		} else if ( typeA !== 'void' ) {

			return builder.format( `${a} ${this.op} ${b}`, type, output );

		}

	}

	serialize( data ) {

		super.serialize( data );

		data.op = this.op;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.op = data.op;

	}

}

const add = nodeProxy( OperatorNode, '+' );
const sub = nodeProxy( OperatorNode, '-' );
const mul = nodeProxy( OperatorNode, '*' );
const div = nodeProxy( OperatorNode, '/' );
const remainder = nodeProxy( OperatorNode, '%' );
const equal = nodeProxy( OperatorNode, '==' );
const assign = nodeProxy( OperatorNode, '=' );
const lessThan = nodeProxy( OperatorNode, '<' );
const greaterThan = nodeProxy( OperatorNode, '>' );
const lessThanEqual = nodeProxy( OperatorNode, '<=' );
const greaterThanEqual = nodeProxy( OperatorNode, '>=' );
const and = nodeProxy( OperatorNode, '&&' );
const or = nodeProxy( OperatorNode, '||' );
const xor = nodeProxy( OperatorNode, '^^' );
const bitAnd = nodeProxy( OperatorNode, '&' );
const bitOr = nodeProxy( OperatorNode, '|' );
const bitXor = nodeProxy( OperatorNode, '^' );
const shiftLeft = nodeProxy( OperatorNode, '<<' );
const shiftRight = nodeProxy( OperatorNode, '>>' );

addNodeElement( 'add', add );
addNodeElement( 'sub', sub );
addNodeElement( 'mul', mul );
addNodeElement( 'div', div );
addNodeElement( 'remainder', remainder );
addNodeElement( 'equal', equal );
addNodeElement( 'assign', assign );
addNodeElement( 'lessThan', lessThan );
addNodeElement( 'greaterThan', greaterThan );
addNodeElement( 'lessThanEqual', lessThanEqual );
addNodeElement( 'greaterThanEqual', greaterThanEqual );
addNodeElement( 'and', and );
addNodeElement( 'or', or );
addNodeElement( 'xor', xor );
addNodeElement( 'bitAnd', bitAnd );
addNodeElement( 'bitOr', bitOr );
addNodeElement( 'bitXor', bitXor );
addNodeElement( 'shiftLeft', shiftLeft );
addNodeElement( 'shiftRight', shiftRight );

addNodeClass( OperatorNode );

class MathNode extends TempNode {

	constructor( method, aNode, bNode = null, cNode = null ) {

		super();

		this.method = method;

		this.aNode = aNode;
		this.bNode = bNode;
		this.cNode = cNode;

	}

	getInputType( builder ) {

		const aType = this.aNode.getNodeType( builder );
		const bType = this.bNode ? this.bNode.getNodeType( builder ) : null;
		const cType = this.cNode ? this.cNode.getNodeType( builder ) : null;

		const aLen = builder.isMatrix( aType ) ? 0 : builder.getTypeLength( aType );
		const bLen = builder.isMatrix( bType ) ? 0 : builder.getTypeLength( bType );
		const cLen = builder.isMatrix( cType ) ? 0 : builder.getTypeLength( cType );

		if ( aLen > bLen && aLen > cLen ) {

			return aType;

		} else if ( bLen > cLen ) {

			return bType;

		} else if ( cLen > aLen ) {

			return cType;

		}

		return aType;

	}

	getNodeType( builder ) {

		const method = this.method;

		if ( method === MathNode.LENGTH || method === MathNode.DISTANCE || method === MathNode.DOT ) {

			return 'float';

		} else if ( method === MathNode.CROSS ) {

			return 'vec3';

		} else {

			return this.getInputType( builder );

		}

	}

	generate( builder, output ) {

		const method = this.method;

		const type = this.getNodeType( builder );
		const inputType = this.getInputType( builder );

		const a = this.aNode;
		const b = this.bNode;
		const c = this.cNode;

		const isWebGL = builder.renderer.isWebGLRenderer === true;

		if ( method === MathNode.TRANSFORM_DIRECTION ) {

			// dir can be either a direction vector or a normal vector
			// upper-left 3x3 of matrix is assumed to be orthogonal

			let tA = a;
			let tB = b;

			if ( builder.isMatrix( tA.getNodeType( builder ) ) ) {

				tB = vec4( vec3( tB ), 0.0 );

			} else {

				tA = vec4( vec3( tA ), 0.0 );

			}

			const mulNode = mul( tA, tB ).xyz;

			return normalize( mulNode ).build( builder, output );

		} else if ( method === MathNode.NEGATE ) {

			return builder.format( '-' + a.build( builder, inputType ), type, output );

		} else if ( method === MathNode.ONE_MINUS ) {

			return sub( 1.0, a ).build( builder, output );

		} else if ( method === MathNode.RECIPROCAL ) {

			return div( 1.0, a ).build( builder, output );

		} else if ( method === MathNode.DIFFERENCE ) {

			return abs( sub( a, b ) ).build( builder, output );

		} else {

			const params = [];

			if ( method === MathNode.CROSS ) {

				params.push(
					a.build( builder, type ),
					b.build( builder, type )
				);

			} else if ( method === MathNode.STEP ) {

				params.push(
					a.build( builder, builder.getTypeLength( a.getNodeType( builder ) ) === 1 ? 'float' : inputType ),
					b.build( builder, inputType )
				);

			} else if ( ( isWebGL && ( method === MathNode.MIN || method === MathNode.MAX ) ) || method === MathNode.MOD ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, builder.getTypeLength( b.getNodeType( builder ) ) === 1 ? 'float' : inputType )
				);

			} else if ( method === MathNode.REFRACT ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, inputType ),
					c.build( builder, 'float' )
				);

			} else if ( method === MathNode.MIX ) {

				params.push(
					a.build( builder, inputType ),
					b.build( builder, inputType ),
					c.build( builder, builder.getTypeLength( c.getNodeType( builder ) ) === 1 ? 'float' : inputType )
				);

			} else {

				params.push( a.build( builder, inputType ) );
				if ( b !== null ) params.push( b.build( builder, inputType ) );
				if ( c !== null ) params.push( c.build( builder, inputType ) );

			}

			return builder.format( `${ builder.getMethod( method ) }( ${params.join( ', ' )} )`, type, output );

		}

	}

	serialize( data ) {

		super.serialize( data );

		data.method = this.method;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.method = data.method;

	}

}

// 1 input

MathNode.RADIANS = 'radians';
MathNode.DEGREES = 'degrees';
MathNode.EXP = 'exp';
MathNode.EXP2 = 'exp2';
MathNode.LOG = 'log';
MathNode.LOG2 = 'log2';
MathNode.SQRT = 'sqrt';
MathNode.INVERSE_SQRT = 'inversesqrt';
MathNode.FLOOR = 'floor';
MathNode.CEIL = 'ceil';
MathNode.NORMALIZE = 'normalize';
MathNode.FRACT = 'fract';
MathNode.SIN = 'sin';
MathNode.COS = 'cos';
MathNode.TAN = 'tan';
MathNode.ASIN = 'asin';
MathNode.ACOS = 'acos';
MathNode.ATAN = 'atan';
MathNode.ABS = 'abs';
MathNode.SIGN = 'sign';
MathNode.LENGTH = 'length';
MathNode.NEGATE = 'negate';
MathNode.ONE_MINUS = 'oneMinus';
MathNode.DFDX = 'dFdx';
MathNode.DFDY = 'dFdy';
MathNode.ROUND = 'round';
MathNode.RECIPROCAL = 'reciprocal';
MathNode.TRUNC = 'trunc';
MathNode.FWIDTH = 'fwidth';

// 2 inputs

MathNode.ATAN2 = 'atan2';
MathNode.MIN = 'min';
MathNode.MAX = 'max';
MathNode.MOD = 'mod';
MathNode.STEP = 'step';
MathNode.REFLECT = 'reflect';
MathNode.DISTANCE = 'distance';
MathNode.DIFFERENCE = 'difference';
MathNode.DOT = 'dot';
MathNode.CROSS = 'cross';
MathNode.POW = 'pow';
MathNode.TRANSFORM_DIRECTION = 'transformDirection';

// 3 inputs

MathNode.MIX = 'mix';
MathNode.CLAMP = 'clamp';
MathNode.REFRACT = 'refract';
MathNode.SMOOTHSTEP = 'smoothstep';
MathNode.FACEFORWARD = 'faceforward';

const EPSILON = float( 1e-6 );
float( 1e6 );

const radians = nodeProxy( MathNode, MathNode.RADIANS );
const degrees = nodeProxy( MathNode, MathNode.DEGREES );
const exp = nodeProxy( MathNode, MathNode.EXP );
const exp2 = nodeProxy( MathNode, MathNode.EXP2 );
const log = nodeProxy( MathNode, MathNode.LOG );
const log2 = nodeProxy( MathNode, MathNode.LOG2 );
const sqrt = nodeProxy( MathNode, MathNode.SQRT );
const inverseSqrt = nodeProxy( MathNode, MathNode.INVERSE_SQRT );
const floor = nodeProxy( MathNode, MathNode.FLOOR );
const ceil = nodeProxy( MathNode, MathNode.CEIL );
const normalize = nodeProxy( MathNode, MathNode.NORMALIZE );
const fract = nodeProxy( MathNode, MathNode.FRACT );
const sin = nodeProxy( MathNode, MathNode.SIN );
const cos = nodeProxy( MathNode, MathNode.COS );
const tan = nodeProxy( MathNode, MathNode.TAN );
const asin = nodeProxy( MathNode, MathNode.ASIN );
const acos = nodeProxy( MathNode, MathNode.ACOS );
const atan = nodeProxy( MathNode, MathNode.ATAN );
const abs = nodeProxy( MathNode, MathNode.ABS );
const sign = nodeProxy( MathNode, MathNode.SIGN );
const length = nodeProxy( MathNode, MathNode.LENGTH );
const negate = nodeProxy( MathNode, MathNode.NEGATE );
const oneMinus = nodeProxy( MathNode, MathNode.ONE_MINUS );
const dFdx = nodeProxy( MathNode, MathNode.DFDX );
const dFdy = nodeProxy( MathNode, MathNode.DFDY );
const round = nodeProxy( MathNode, MathNode.ROUND );
const reciprocal = nodeProxy( MathNode, MathNode.RECIPROCAL );
const trunc = nodeProxy( MathNode, MathNode.TRUNC );
const fwidth = nodeProxy( MathNode, MathNode.FWIDTH );

const atan2 = nodeProxy( MathNode, MathNode.ATAN2 );
const min$1 = nodeProxy( MathNode, MathNode.MIN );
const max$1 = nodeProxy( MathNode, MathNode.MAX );
const mod = nodeProxy( MathNode, MathNode.MOD );
const step = nodeProxy( MathNode, MathNode.STEP );
const reflect = nodeProxy( MathNode, MathNode.REFLECT );
const distance = nodeProxy( MathNode, MathNode.DISTANCE );
const difference = nodeProxy( MathNode, MathNode.DIFFERENCE );
const dot = nodeProxy( MathNode, MathNode.DOT );
const cross = nodeProxy( MathNode, MathNode.CROSS );
const pow = nodeProxy( MathNode, MathNode.POW );
const pow2 = nodeProxy( MathNode, MathNode.POW, 2 );
const pow3 = nodeProxy( MathNode, MathNode.POW, 3 );
const pow4 = nodeProxy( MathNode, MathNode.POW, 4 );
const transformDirection = nodeProxy( MathNode, MathNode.TRANSFORM_DIRECTION );

const mix = nodeProxy( MathNode, MathNode.MIX );
const clamp = ( value, low = 0, high = 1 ) => nodeObject( new MathNode( MathNode.CLAMP, nodeObject( value ), nodeObject( low ), nodeObject( high ) ) );
const saturate = ( value ) => clamp( value );
const refract = nodeProxy( MathNode, MathNode.REFRACT );
const smoothstep = nodeProxy( MathNode, MathNode.SMOOTHSTEP );
const faceForward = nodeProxy( MathNode, MathNode.FACEFORWARD );

const mixElement = ( t, e1, e2 ) => mix( e1, e2, t );
const smoothstepElement = ( x, low, high ) => smoothstep( low, high, x );

addNodeElement( 'radians', radians );
addNodeElement( 'degrees', degrees );
addNodeElement( 'exp', exp );
addNodeElement( 'exp2', exp2 );
addNodeElement( 'log', log );
addNodeElement( 'log2', log2 );
addNodeElement( 'sqrt', sqrt );
addNodeElement( 'inverseSqrt', inverseSqrt );
addNodeElement( 'floor', floor );
addNodeElement( 'ceil', ceil );
addNodeElement( 'normalize', normalize );
addNodeElement( 'fract', fract );
addNodeElement( 'sin', sin );
addNodeElement( 'cos', cos );
addNodeElement( 'tan', tan );
addNodeElement( 'asin', asin );
addNodeElement( 'acos', acos );
addNodeElement( 'atan', atan );
addNodeElement( 'abs', abs );
addNodeElement( 'sign', sign );
addNodeElement( 'length', length );
addNodeElement( 'negate', negate );
addNodeElement( 'oneMinus', oneMinus );
addNodeElement( 'dFdx', dFdx );
addNodeElement( 'dFdy', dFdy );
addNodeElement( 'round', round );
addNodeElement( 'reciprocal', reciprocal );
addNodeElement( 'trunc', trunc );
addNodeElement( 'fwidth', fwidth );
addNodeElement( 'atan2', atan2 );
addNodeElement( 'min', min$1 );
addNodeElement( 'max', max$1 );
addNodeElement( 'mod', mod );
addNodeElement( 'step', step );
addNodeElement( 'reflect', reflect );
addNodeElement( 'distance', distance );
addNodeElement( 'dot', dot );
addNodeElement( 'cross', cross );
addNodeElement( 'pow', pow );
addNodeElement( 'pow2', pow2 );
addNodeElement( 'pow3', pow3 );
addNodeElement( 'pow4', pow4 );
addNodeElement( 'transformDirection', transformDirection );
addNodeElement( 'mix', mixElement );
addNodeElement( 'clamp', clamp );
addNodeElement( 'refract', refract );
addNodeElement( 'smoothstep', smoothstepElement );
addNodeElement( 'faceForward', faceForward );
addNodeElement( 'difference', difference );
addNodeElement( 'saturate', saturate );

addNodeClass( MathNode );

const sRGBToLinearShader = new ShaderNode( ( inputs ) => {

	const { value } = inputs;
	const { rgb } = value;

	const a = rgb.mul( 0.9478672986 ).add( 0.0521327014 ).pow( 2.4 );
	const b = rgb.mul( 0.0773993808 );
	const factor = rgb.lessThanEqual( 0.04045 );

	const rgbResult = mix( a, b, factor );

	return vec4( rgbResult, value.a );

} );

const LinearTosRGBShader = new ShaderNode( ( inputs ) => {

	const { value } = inputs;
	const { rgb } = value;

	const a = rgb.pow( 0.41666 ).mul( 1.055 ).sub( 0.055 );
	const b = rgb.mul( 12.92 );
	const factor = rgb.lessThanEqual( 0.0031308 );

	const rgbResult = mix( a, b, factor );

	return vec4( rgbResult, value.a );

} );

const getColorSpaceMethod = ( colorSpace ) => {

	let method = null;

	if ( colorSpace === LinearSRGBColorSpace ) {

		method = 'Linear';

	} else if ( colorSpace === SRGBColorSpace ) {

		method = 'sRGB';

	}

	return method;

};

const getMethod = ( source, target ) => {

	return getColorSpaceMethod( source ) + 'To' + getColorSpaceMethod( target );

};

class ColorSpaceNode extends TempNode {

	constructor( method, node ) {

		super( 'vec4' );

		this.method = method;

		this.node = node;

	}

	construct() {

		const { method, node } = this;

		if ( method === ColorSpaceNode.LINEAR_TO_LINEAR )
			return node;

		return Methods[ method ].call( { value: node } );

	}

}

ColorSpaceNode.LINEAR_TO_LINEAR = 'LinearToLinear';
ColorSpaceNode.LINEAR_TO_sRGB = 'LinearTosRGB';
ColorSpaceNode.sRGB_TO_LINEAR = 'sRGBToLinear';

const Methods = {
	[ ColorSpaceNode.LINEAR_TO_sRGB ]: LinearTosRGBShader,
	[ ColorSpaceNode.sRGB_TO_LINEAR ]: sRGBToLinearShader
};

const linearToColorSpace = ( node, colorSpace ) => nodeObject( new ColorSpaceNode( getMethod( LinearSRGBColorSpace, colorSpace ), nodeObject( node ) ) );
const colorSpaceToLinear = ( node, colorSpace ) => nodeObject( new ColorSpaceNode( getMethod( colorSpace, LinearSRGBColorSpace ), nodeObject( node ) ) );

const linearTosRGB = nodeProxy( ColorSpaceNode, ColorSpaceNode.LINEAR_TO_sRGB );
const sRGBToLinear = nodeProxy( ColorSpaceNode, ColorSpaceNode.sRGB_TO_LINEAR );

addNodeElement( 'linearTosRGB', linearTosRGB );
addNodeElement( 'sRGBToLinear', sRGBToLinear );
addNodeElement( 'linearToColorSpace', linearToColorSpace );
addNodeElement( 'colorSpaceToLinear', colorSpaceToLinear );

addNodeClass( ColorSpaceNode );

class ExpressionNode extends Node {

	constructor( snippet = '', nodeType = 'void' ) {

		super( nodeType );

		this.snippet = snippet;

	}

	generate( builder, output ) {

		const type = this.getNodeType( builder );
		const snippet = this.snippet;

		if ( type === 'void' ) {

			builder.addLineFlowCode( snippet );

		} else {

			return builder.format( `( ${ snippet } )`, type, output );

		}

	}

}

const expression = nodeProxy( ExpressionNode );

addNodeClass( ExpressionNode );

let defaultUV;

class TextureNode extends UniformNode {

	constructor( value, uvNode = null, levelNode = null ) {

		super( value );

		this.isTextureNode = true;

		this.uvNode = uvNode;
		this.levelNode = levelNode;

	}

	getUniformHash( /*builder*/ ) {

		return this.value.uuid;

	}

	getNodeType( /*builder*/ ) {

		if ( this.value.isDepthTexture === true ) return 'float';

		return 'vec4';

	}

	getInputType( /*builder*/ ) {

		return 'texture';

	}

	getDefaultUV() {

		return defaultUV || ( defaultUV = uv() );

	}

	construct( builder ) {

		const properties = builder.getNodeProperties( this );

		//

		let uvNode = this.uvNode;

		if ( uvNode === null && builder.context.getUVNode ) {

			uvNode = builder.context.getUVNode( this );

		}

		uvNode || ( uvNode = this.getDefaultUV() );

		//

		let levelNode = this.levelNode;

		if ( levelNode === null && builder.context.getSamplerLevelNode ) {

			levelNode = builder.context.getSamplerLevelNode( this );

		}

		//

		properties.uvNode = uvNode;
		properties.levelNode = levelNode ? builder.context.getMIPLevelAlgorithmNode( this, levelNode ) : null;

	}

	generate( builder, output ) {

		const { uvNode, levelNode } = builder.getNodeProperties( this );

		const texture = this.value;

		if ( ! texture || texture.isTexture !== true ) {

			throw new Error( 'TextureNode: Need a three.js texture.' );

		}

		const textureProperty = super.generate( builder, 'property' );

		if ( output === 'sampler' ) {

			return textureProperty + '_sampler';

		} else if ( builder.isReference( output ) ) {

			return textureProperty;

		} else {

			const nodeType = this.getNodeType( builder );
			const nodeData = builder.getDataFromNode( this );

			let propertyName = nodeData.propertyName;

			if ( propertyName === undefined ) {

				const uvSnippet = uvNode.build( builder, 'vec2' );
				const nodeVar = builder.getVarFromNode( this, nodeType );

				propertyName = builder.getPropertyName( nodeVar );

				let snippet = null;

				if ( levelNode && levelNode.isNode === true ) {

					const levelSnippet = levelNode.build( builder, 'float' );

					snippet = builder.getTextureLevel( texture, textureProperty, uvSnippet, levelSnippet );

				} else {

					snippet = builder.getTexture( texture, textureProperty, uvSnippet );

				}

				builder.addLineFlowCode( `${propertyName} = ${snippet}` );

				nodeData.snippet = snippet;
				nodeData.propertyName = propertyName;

			}

			let snippet = propertyName;

			if ( builder.needsColorSpaceToLinear( this.value ) ) {

				snippet = colorSpaceToLinear( expression( snippet, nodeType ), this.value.colorSpace ).construct( builder ).build( builder, nodeType );

			}

			return builder.format( snippet, nodeType, output );

		}

	}

	uv( uvNode ) {

		const textureNode = this.clone();
		textureNode.uvNode = uvNode;

		return textureNode;

	}

	level( levelNode ) {

		const textureNode = this.clone();
		textureNode.levelNode = levelNode;

		return context( textureNode, {
			getMIPLevelAlgorithmNode: ( textureNode, levelNode ) => levelNode
		} );

	}

	size( levelNode ) {

		return textureSize( this, levelNode );

	}

	serialize( data ) {

		super.serialize( data );

		data.value = this.value.toJSON( data.meta ).uuid;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.value = data.meta.textures[ data.value ];

	}

	clone() {

		return new this.constructor( this.value, this.uvNode, this.levelNode );

	}

}

const texture = nodeProxy( TextureNode );

addNodeElement( 'texture', texture );
//addNodeElement( 'textureLevel', textureLevel );

addNodeClass( TextureNode );

class ReferenceNode extends Node {

	constructor( property, uniformType, object = null ) {

		super();

		this.property = property;

		this.uniformType = uniformType;

		this.object = object;

		this.node = null;

		this.updateType = NodeUpdateType.OBJECT;

		this.setNodeType( uniformType );

	}

	setNodeType( uniformType ) {

		let node = null;

		if ( uniformType === 'texture' ) {

			node = texture( null );

		} else {

			node = uniform( uniformType );

		}

		this.node = node;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	update( frame ) {

		const object = this.object !== null ? this.object : frame.object;
		const property = this.property;

		this.node.value = object[ property ];

	}

	construct( /*builder*/ ) {

		return this.node;

	}

}

const reference = ( name, type, object ) => nodeObject( new ReferenceNode( name, type, object ) );

addNodeClass( ReferenceNode );

class MaterialReferenceNode extends ReferenceNode {

	constructor( property, inputType, material = null ) {

		super( property, inputType, material );

		this.material = material;

	}

	construct( builder ) {

		const material = this.material !== null ? this.material : builder.material;

		this.node.value = material[ this.property ];

		return super.construct( builder );

	}

	update( frame ) {

		this.object = this.material !== null ? this.material : frame.material;

		super.update( frame );

	}

}

const materialReference = ( name, type, material ) => nodeObject( new MaterialReferenceNode( name, type, material ) );

addNodeClass( MaterialReferenceNode );

class MaterialNode extends Node {

	constructor( scope ) {

		super();

		this.scope = scope;

	}

	getNodeType( builder ) {

		const scope = this.scope;
		const material = builder.context.material;

		if ( scope === MaterialNode.COLOR ) {

			return material.map !== null ? 'vec4' : 'vec3';

		} else if ( scope === MaterialNode.OPACITY || scope === MaterialNode.ROTATION ) {

			return 'float';

		} else if ( scope === MaterialNode.UV ) {

			return 'vec2';

		} else if ( scope === MaterialNode.EMISSIVE ) {

			return 'vec3';

		} else if ( scope === MaterialNode.ROUGHNESS || scope === MaterialNode.METALNESS || scope === MaterialNode.SPECULAR || scope === MaterialNode.SHININESS ) {

			return 'float';

		}

	}

	getFloat( property ) {

		//@TODO: Check if it can be cached by property name.

		return materialReference( property, 'float' );

	}

	getColor( property ) {

		//@TODO: Check if it can be cached by property name.

		return materialReference( property, 'color' );

	}

	getTexture( property ) {

		//@TODO: Check if it can be cached by property name.

		const textureRefNode = materialReference( property, 'texture' );
		textureRefNode.node.uvNode = materialUV;

		return textureRefNode;

	}

	construct( builder ) {

		const material = builder.context.material;
		const scope = this.scope;

		let node = null;

		if ( scope === MaterialNode.ALPHA_TEST ) {

			node = this.getFloat( 'alphaTest' );

		} else if ( scope === MaterialNode.COLOR ) {

			const colorNode = this.getColor( 'color' );

			if ( material.map && material.map.isTexture === true ) {

				node = colorNode.mul( this.getTexture( 'map' ) );

			} else {

				node = colorNode;

			}

		} else if ( scope === MaterialNode.OPACITY ) {

			const opacityNode = this.getFloat( 'opacity' );

			if ( material.alphaMap && material.alphaMap.isTexture === true ) {

				node = opacityNode.mul( this.getTexture( 'alphaMap' ) );

			} else {

				node = opacityNode;

			}

		} else if ( scope === MaterialNode.SHININESS ) {

			node = this.getFloat( 'shininess' );

		} else if ( scope === MaterialNode.SPECULAR_COLOR ) {

			node = this.getColor( 'specular' );

		} else if ( scope === MaterialNode.REFLECTIVITY ) {

			const reflectivityNode = this.getFloat( 'reflectivity' );

			if ( material.specularMap && material.specularMap.isTexture === true ) {

				node = reflectivityNode.mul( this.getTexture( 'specularMap' ).r );

			} else {

				node = reflectivityNode;

			}

		} else if ( scope === MaterialNode.ROUGHNESS ) {

			const roughnessNode = this.getFloat( 'roughness' );

			if ( material.roughnessMap && material.roughnessMap.isTexture === true ) {

				node = roughnessNode.mul( this.getTexture( 'roughnessMap' ).g );

			} else {

				node = roughnessNode;

			}

		} else if ( scope === MaterialNode.METALNESS ) {

			const metalnessNode = this.getFloat( 'metalness' );

			if ( material.metalnessMap && material.metalnessMap.isTexture === true ) {

				node = metalnessNode.mul( this.getTexture( 'metalnessMap' ).b );

			} else {

				node = metalnessNode;

			}

		} else if ( scope === MaterialNode.EMISSIVE ) {

			const emissiveNode = this.getColor( 'emissive' );

			if ( material.emissiveMap && material.emissiveMap.isTexture === true ) {

				node = emissiveNode.mul( this.getTexture( 'emissiveMap' ) );

			} else {

				node = emissiveNode;

			}

		} else if ( scope === MaterialNode.CLEARCOAT ) {

			const clearcoatNode = this.getFloat( 'clearcoat' );

			if ( material.clearcoatMap && material.clearcoatMap.isTexture === true ) {

				node = clearcoatNode.mul( this.getTexture( 'clearcoatMap' ).r );

			} else {

				node = clearcoatNode;

			}

		} else if ( scope === MaterialNode.CLEARCOAT_ROUGHNESS ) {

			const clearcoatRoughnessNode = this.getFloat( 'clearcoatRoughness' );

			if ( material.clearcoatRoughnessMap && material.clearcoatRoughnessMap.isTexture === true ) {

				node = clearcoatRoughnessNode.mul( this.getTexture( 'clearcoatRoughnessMap' ).r );

			} else {

				node = clearcoatRoughnessNode;

			}

		} else if ( scope === MaterialNode.ROTATION ) {

			node = this.getFloat( 'rotation' );

		} else if ( scope === MaterialNode.UV ) {

			// uv repeat and offset setting priorities

			let uvScaleMap =
				material.map ||
				material.specularMap ||
				material.displacementMap ||
				material.normalMap ||
				material.bumpMap ||
				material.roughnessMap ||
				material.metalnessMap ||
				material.alphaMap ||
				material.emissiveMap ||
				material.clearcoatMap ||
				material.clearcoatNormalMap ||
				material.clearcoatRoughnessMap ||
				material.iridescenceMap ||
				material.iridescenceThicknessMap ||
				material.specularIntensityMap ||
				material.specularColorMap ||
				material.transmissionMap ||
				material.thicknessMap ||
				material.sheenColorMap ||
				material.sheenRoughnessMap;

			if ( uvScaleMap ) {

				// backwards compatibility
				if ( uvScaleMap.isWebGLRenderTarget ) {

					uvScaleMap = uvScaleMap.texture;

				}

				if ( uvScaleMap.matrixAutoUpdate === true ) {

					uvScaleMap.updateMatrix();

				}

				node = uniform( uvScaleMap.matrix ).mul( vec3( uv(), 1 ) );

			} else {

				node = uv();

			}

		} else {

			const outputType = this.getNodeType( builder );

			node = materialReference( scope, outputType );

		}

		return node;

	}

}

MaterialNode.ALPHA_TEST = 'alphaTest';
MaterialNode.COLOR = 'color';
MaterialNode.OPACITY = 'opacity';
MaterialNode.SHININESS = 'shininess';
MaterialNode.SPECULAR_COLOR = 'specularColor';
MaterialNode.REFLECTIVITY = 'reflectivity';
MaterialNode.ROUGHNESS = 'roughness';
MaterialNode.METALNESS = 'metalness';
MaterialNode.CLEARCOAT = 'clearcoat';
MaterialNode.CLEARCOAT_ROUGHNESS = 'clearcoatRoughness';
MaterialNode.EMISSIVE = 'emissive';
MaterialNode.ROTATION = 'rotation';
MaterialNode.UV = 'uv';

const materialUV = nodeImmutable( MaterialNode, MaterialNode.UV );
const materialAlphaTest = nodeImmutable( MaterialNode, MaterialNode.ALPHA_TEST );
const materialColor = nodeImmutable( MaterialNode, MaterialNode.COLOR );
const materialShininess = nodeImmutable( MaterialNode, MaterialNode.SHININESS );
const materialEmissive = nodeImmutable( MaterialNode, MaterialNode.EMISSIVE );
const materialOpacity = nodeImmutable( MaterialNode, MaterialNode.OPACITY );
const materialSpecularColor = nodeImmutable( MaterialNode, MaterialNode.SPECULAR_COLOR );
const materialReflectivity = nodeImmutable( MaterialNode, MaterialNode.REFLECTIVITY );
const materialRoughness = nodeImmutable( MaterialNode, MaterialNode.ROUGHNESS );
const materialMetalness = nodeImmutable( MaterialNode, MaterialNode.METALNESS );
const materialClearcoat = nodeImmutable( MaterialNode, MaterialNode.CLEARCOAT );
const materialClearcoatRoughness = nodeImmutable( MaterialNode, MaterialNode.CLEARCOAT_ROUGHNESS );
const materialRotation = nodeImmutable( MaterialNode, MaterialNode.ROTATION );

addNodeClass( MaterialNode );

class Object3DNode extends Node {

	constructor( scope = Object3DNode.VIEW_MATRIX, object3d = null ) {

		super();

		this.scope = scope;
		this.object3d = object3d;

		this.updateType = NodeUpdateType.OBJECT;

		this._uniformNode = uniform( null );

	}

	getNodeType() {

		const scope = this.scope;

		if ( scope === Object3DNode.WORLD_MATRIX || scope === Object3DNode.VIEW_MATRIX ) {

			return 'mat4';

		} else if ( scope === Object3DNode.NORMAL_MATRIX ) {

			return 'mat3';

		} else if ( scope === Object3DNode.POSITION || scope === Object3DNode.VIEW_POSITION || scope === Object3DNode.DIRECTION || scope === Object3DNode.SCALE ) {

			return 'vec3';

		}

	}

	update( frame ) {

		const object = this.object3d;
		const uniformNode = this._uniformNode;
		const scope = this.scope;

		if ( scope === Object3DNode.VIEW_MATRIX ) {

			uniformNode.value = object.modelViewMatrix;

		} else if ( scope === Object3DNode.NORMAL_MATRIX ) {

			uniformNode.value = object.normalMatrix;

		} else if ( scope === Object3DNode.WORLD_MATRIX ) {

			uniformNode.value = object.matrixWorld;

		} else if ( scope === Object3DNode.POSITION ) {

			uniformNode.value = uniformNode.value || new Vector3();

			uniformNode.value.setFromMatrixPosition( object.matrixWorld );

		} else if ( scope === Object3DNode.SCALE ) {

			uniformNode.value = uniformNode.value || new Vector3();

			uniformNode.value.setFromMatrixScale( object.matrixWorld );

		} else if ( scope === Object3DNode.DIRECTION ) {

			uniformNode.value = uniformNode.value || new Vector3();

			object.getWorldDirection( uniformNode.value );

		} else if ( scope === Object3DNode.VIEW_POSITION ) {

			const camera = frame.camera;

			uniformNode.value = uniformNode.value || new Vector3();
			uniformNode.value.setFromMatrixPosition( object.matrixWorld );

			uniformNode.value.applyMatrix4( camera.matrixWorldInverse );

		}

	}

	generate( builder ) {

		const scope = this.scope;

		if ( scope === Object3DNode.WORLD_MATRIX || scope === Object3DNode.VIEW_MATRIX ) {

			this._uniformNode.nodeType = 'mat4';

		} else if ( scope === Object3DNode.NORMAL_MATRIX ) {

			this._uniformNode.nodeType = 'mat3';

		} else if ( scope === Object3DNode.POSITION || scope === Object3DNode.VIEW_POSITION || scope === Object3DNode.DIRECTION || scope === Object3DNode.SCALE ) {

			this._uniformNode.nodeType = 'vec3';

		}

		return this._uniformNode.build( builder );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

Object3DNode.VIEW_MATRIX = 'viewMatrix';
Object3DNode.NORMAL_MATRIX = 'normalMatrix';
Object3DNode.WORLD_MATRIX = 'worldMatrix';
Object3DNode.POSITION = 'position';
Object3DNode.SCALE = 'scale';
Object3DNode.VIEW_POSITION = 'viewPosition';
Object3DNode.DIRECTION = 'direction';

nodeProxy( Object3DNode, Object3DNode.DIRECTION );
nodeProxy( Object3DNode, Object3DNode.VIEW_MATRIX );
nodeProxy( Object3DNode, Object3DNode.NORMAL_MATRIX );
nodeProxy( Object3DNode, Object3DNode.WORLD_MATRIX );
const objectPosition = nodeProxy( Object3DNode, Object3DNode.POSITION );
nodeProxy( Object3DNode, Object3DNode.SCALE );
const objectViewPosition = nodeProxy( Object3DNode, Object3DNode.VIEW_POSITION );

addNodeClass( Object3DNode );

class CameraNode extends Object3DNode {

	constructor( scope = CameraNode.POSITION ) {

		super( scope );

	}

	getNodeType( builder ) {

		const scope = this.scope;

		if ( scope === CameraNode.PROJECTION_MATRIX ) {

			return 'mat4';

		} else if ( scope === CameraNode.NEAR || scope === CameraNode.FAR ) {

			return 'float';

		}

		return super.getNodeType( builder );

	}

	update( frame ) {

		const camera = frame.camera;
		const uniformNode = this._uniformNode;
		const scope = this.scope;

		if ( scope === CameraNode.VIEW_MATRIX ) {

			uniformNode.value = camera.matrixWorldInverse;

		} else if ( scope === CameraNode.PROJECTION_MATRIX ) {

			uniformNode.value = camera.projectionMatrix;

		} else if ( scope === CameraNode.NEAR ) {

			uniformNode.value = camera.near;

		} else if ( scope === CameraNode.FAR ) {

			uniformNode.value = camera.far;

		} else {

			this.object3d = camera;

			super.update( frame );

		}

	}

	generate( builder ) {

		const scope = this.scope;

		if ( scope === CameraNode.PROJECTION_MATRIX ) {

			this._uniformNode.nodeType = 'mat4';

		} else if ( scope === CameraNode.NEAR || scope === CameraNode.FAR ) {

			this._uniformNode.nodeType = 'float';

		}

		return super.generate( builder );

	}

}

CameraNode.PROJECTION_MATRIX = 'projectionMatrix';
CameraNode.NEAR = 'near';
CameraNode.FAR = 'far';

const cameraProjectionMatrix = nodeImmutable( CameraNode, CameraNode.PROJECTION_MATRIX );
const cameraNear = nodeImmutable( CameraNode, CameraNode.NEAR );
const cameraFar = nodeImmutable( CameraNode, CameraNode.FAR );
const cameraViewMatrix = nodeImmutable( CameraNode, CameraNode.VIEW_MATRIX );
nodeImmutable( CameraNode, CameraNode.NORMAL_MATRIX );
nodeImmutable( CameraNode, CameraNode.WORLD_MATRIX );
nodeImmutable( CameraNode, CameraNode.POSITION );

addNodeClass( CameraNode );

class ModelNode extends Object3DNode {

	constructor( scope = ModelNode.VIEW_MATRIX ) {

		super( scope );

	}

	update( frame ) {

		this.object3d = frame.object;

		super.update( frame );

	}

}

nodeImmutable( ModelNode, ModelNode.DIRECTION );
const modelViewMatrix = nodeImmutable( ModelNode, ModelNode.VIEW_MATRIX );
const modelNormalMatrix = nodeImmutable( ModelNode, ModelNode.NORMAL_MATRIX );
const modelWorldMatrix = nodeImmutable( ModelNode, ModelNode.WORLD_MATRIX );
nodeImmutable( ModelNode, ModelNode.POSITION );
nodeImmutable( ModelNode, ModelNode.SCALE );
nodeImmutable( ModelNode, ModelNode.VIEW_POSITION );

addNodeClass( ModelNode );

class NormalNode extends Node {

	constructor( scope = NormalNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	isGlobal() {

		return true;

	}

	getHash( /*builder*/ ) {

		return `normal-${this.scope}`;

	}

	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === NormalNode.GEOMETRY ) {

			outputNode = attribute( 'normal', 'vec3' );

		} else if ( scope === NormalNode.LOCAL ) {

			outputNode = varying( normalGeometry );

		} else if ( scope === NormalNode.VIEW ) {

			const vertexNode = modelNormalMatrix.mul( normalLocal );
			outputNode = normalize( varying( vertexNode ) );

		} else if ( scope === NormalNode.WORLD ) {

			// To use inverseTransformDirection only inverse the param order like this: cameraViewMatrix.transformDirection( normalView )
			const vertexNode = normalView.transformDirection( cameraViewMatrix );
			outputNode = normalize( varying( vertexNode ) );

		}

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

NormalNode.GEOMETRY = 'geometry';
NormalNode.LOCAL = 'local';
NormalNode.VIEW = 'view';
NormalNode.WORLD = 'world';

const normalGeometry = nodeImmutable( NormalNode, NormalNode.GEOMETRY );
const normalLocal = nodeImmutable( NormalNode, NormalNode.LOCAL );
const normalView = nodeImmutable( NormalNode, NormalNode.VIEW );
const normalWorld = nodeImmutable( NormalNode, NormalNode.WORLD );
const transformedNormalView = property( 'vec3', 'TransformedNormalView' );
const transformedNormalWorld = transformedNormalView.transformDirection( cameraViewMatrix ).normalize();
const transformedClearcoatNormalView = property( 'vec3', 'TransformedClearcoatNormalView' );

addNodeClass( NormalNode );

class VarNode extends Node {

	constructor( node, name = null ) {

		super();

		this.node = node;
		this.name = name;

	}

	assign( node ) {

		node.traverse( ( childNode, replaceNode ) => {

			if ( replaceNode && childNode.uuid === this.uuid ) {

				replaceNode( this.node );

			}

		} );
		this.node = node;
		return this;

	}

	isGlobal() {

		return true;

	}

	getHash( builder ) {

		return this.name || super.getHash( builder );

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	generate( builder ) {

		const node = this.node;
		const name = this.name;

		if ( name === null && node.isTempNode === true ) {

			return node.build( builder );

		}

		const type = builder.getVectorType( this.getNodeType( builder ) );

		const snippet = node.build( builder, type );
		const nodeVar = builder.getVarFromNode( this, type );

		if ( name !== null ) {

			nodeVar.name = name;

		}

		const propertyName = builder.getPropertyName( nodeVar );

		builder.addLineFlowCode( `${propertyName} = ${snippet}` );

		return propertyName;

	}

}

const label = nodeProxy( VarNode );
const temp = label;

addNodeElement( 'label', label );
addNodeElement( 'temp', temp );

addNodeClass( VarNode );

class TangentNode extends Node {

	constructor( scope = TangentNode.LOCAL ) {

		super();

		this.scope = scope;

	}

	getHash( /*builder*/ ) {

		return `tangent-${this.scope}`;

	}

	getNodeType() {

		const scope = this.scope;

		if ( scope === TangentNode.GEOMETRY ) {

			return 'vec4';

		}

		return 'vec3';

	}


	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === TangentNode.GEOMETRY ) {

			outputNode = attribute( 'tangent', 'vec4' );

		} else if ( scope === TangentNode.LOCAL ) {

			outputNode = varying( tangentGeometry.xyz );

		} else if ( scope === TangentNode.VIEW ) {

			const vertexNode = modelViewMatrix.mul( tangentLocal ).xyz;
			outputNode = normalize( varying( vertexNode ) );

		} else if ( scope === TangentNode.WORLD ) {

			const vertexNode = tangentView.transformDirection( cameraViewMatrix );
			outputNode = normalize( varying( vertexNode ) );

		}

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

TangentNode.GEOMETRY = 'geometry';
TangentNode.LOCAL = 'local';
TangentNode.VIEW = 'view';
TangentNode.WORLD = 'world';

const tangentGeometry = nodeImmutable( TangentNode, TangentNode.GEOMETRY );
const tangentLocal = nodeImmutable( TangentNode, TangentNode.LOCAL );
const tangentView = nodeImmutable( TangentNode, TangentNode.VIEW );
const tangentWorld = nodeImmutable( TangentNode, TangentNode.WORLD );
const transformedTangentView = label( tangentView, 'TransformedTangentView' );
normalize( transformedTangentView.transformDirection( cameraViewMatrix ) );

addNodeClass( TangentNode );

class BitangentNode extends Node {

	constructor( scope = BitangentNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	getHash( /*builder*/ ) {

		return `bitangent-${this.scope}`;

	}

	generate( builder ) {

		const scope = this.scope;

		let crossNormalTangent;

		if ( scope === BitangentNode.GEOMETRY ) {

			crossNormalTangent = normalGeometry.cross( tangentGeometry );

		} else if ( scope === BitangentNode.LOCAL ) {

			crossNormalTangent = normalLocal.cross( tangentLocal );

		} else if ( scope === BitangentNode.VIEW ) {

			crossNormalTangent = normalView.cross( tangentView );

		} else if ( scope === BitangentNode.WORLD ) {

			crossNormalTangent = normalWorld.cross( tangentWorld );

		}

		const vertexNode = crossNormalTangent.mul( tangentGeometry.w ).xyz;

		const outputNode = normalize( varying( vertexNode ) );

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

BitangentNode.GEOMETRY = 'geometry';
BitangentNode.LOCAL = 'local';
BitangentNode.VIEW = 'view';
BitangentNode.WORLD = 'world';

nodeImmutable( BitangentNode, BitangentNode.GEOMETRY );
nodeImmutable( BitangentNode, BitangentNode.LOCAL );
const bitangentView = nodeImmutable( BitangentNode, BitangentNode.VIEW );
nodeImmutable( BitangentNode, BitangentNode.WORLD );
const transformedBitangentView = normalize( transformedNormalView.cross( transformedTangentView ).mul( tangentGeometry.w ) );
normalize( transformedBitangentView.transformDirection( cameraViewMatrix ) );

addNodeClass( BitangentNode );

class PositionNode extends Node {

	constructor( scope = PositionNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	isGlobal() {

		return true;

	}

	getHash( /*builder*/ ) {

		return `position-${this.scope}`;

	}

	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === PositionNode.GEOMETRY ) {

			outputNode = attribute( 'position', 'vec3' );

		} else if ( scope === PositionNode.LOCAL ) {

			outputNode = varying( positionGeometry );

		} else if ( scope === PositionNode.WORLD ) {

			const vertexPositionNode = modelWorldMatrix.mul( positionLocal );
			outputNode = varying( vertexPositionNode );

		} else if ( scope === PositionNode.VIEW ) {

			const vertexPositionNode = modelViewMatrix.mul( positionLocal );
			outputNode = varying( vertexPositionNode );

		} else if ( scope === PositionNode.VIEW_DIRECTION ) {

			const vertexPositionNode = positionView.negate();
			outputNode = normalize( varying( vertexPositionNode ) );

		} else if ( scope === PositionNode.WORLD_DIRECTION ) {

			const vertexPositionNode = positionLocal.transformDirection( modelWorldMatrix );
			outputNode = normalize( varying( vertexPositionNode ) );

		}

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

PositionNode.GEOMETRY = 'geometry';
PositionNode.LOCAL = 'local';
PositionNode.WORLD = 'world';
PositionNode.WORLD_DIRECTION = 'worldDirection';
PositionNode.VIEW = 'view';
PositionNode.VIEW_DIRECTION = 'viewDirection';

const positionGeometry = nodeImmutable( PositionNode, PositionNode.GEOMETRY );
const positionLocal = nodeImmutable( PositionNode, PositionNode.LOCAL );
const positionWorld = nodeImmutable( PositionNode, PositionNode.WORLD );
const positionWorldDirection = nodeImmutable( PositionNode, PositionNode.WORLD_DIRECTION );
const positionView = nodeImmutable( PositionNode, PositionNode.VIEW );
const positionViewDirection = nodeImmutable( PositionNode, PositionNode.VIEW_DIRECTION );

addNodeClass( PositionNode );

class FrontFacingNode extends Node {

	constructor() {

		super( 'bool' );

		this.isFrontFacingNode = true;

	}

	generate( builder ) {

		return builder.getFrontFacing();

	}

}

const frontFacing = nodeImmutable( FrontFacingNode );
const faceDirection = float( frontFacing ).mul( 2.0 ).sub( 1.0 );

addNodeClass( FrontFacingNode );

// Normal Mapping Without Precomputed Tangents
// http://www.thetenthplanet.de/archives/1180

const perturbNormal2ArbNode = new ShaderNode( ( inputs ) => {

	const { eye_pos, surf_norm, mapN, uv } = inputs;

	const q0 = eye_pos.dFdx();
	const q1 = eye_pos.dFdy();
	const st0 = uv.dFdx();
	const st1 = uv.dFdy();

	const N = surf_norm; // normalized

	const q1perp = q1.cross( N );
	const q0perp = N.cross( q0 );

	const T = q1perp.mul( st0.x ).add( q0perp.mul( st1.x ) );
	const B = q1perp.mul( st0.y ).add( q0perp.mul( st1.y ) );

	const det = T.dot( T ).max( B.dot( B ) );
	const scale = faceDirection.mul( det.inverseSqrt() );

	return add( T.mul( mapN.x, scale ), B.mul( mapN.y, scale ), N.mul( mapN.z ) ).normalize();

} );

class NormalMapNode extends TempNode {

	constructor( node, scaleNode = null ) {

		super( 'vec3' );

		this.node = node;
		this.scaleNode = scaleNode;

		this.normalMapType = TangentSpaceNormalMap;

	}

	construct( builder ) {

		const { normalMapType, scaleNode } = this;

		let normalMap = this.node.mul( 2.0 ).sub( 1.0 );

		if ( scaleNode !== null ) {

			normalMap = vec3( normalMap.xy.mul( scaleNode ), normalMap.z );

		}

		let outputNode = null;

		if ( normalMapType === ObjectSpaceNormalMap ) {

			outputNode = modelNormalMatrix.mul( normalMap ).normalize();

		} else if ( normalMapType === TangentSpaceNormalMap ) {

			const tangent = builder.hasGeometryAttribute( 'tangent' );

			if ( tangent === true ) {

				outputNode = TBNViewMatrix.mul( normalMap ).normalize();

			} else {

				outputNode = perturbNormal2ArbNode.call( {
					eye_pos: positionView,
					surf_norm: normalView,
					mapN: normalMap,
					uv: uv()
				} );

			}

		}

		return outputNode;

	}

}

const normalMap = nodeProxy( NormalMapNode );

const TBNViewMatrix = mat3( tangentView, bitangentView, normalView );

addNodeClass( NormalMapNode );

// @TODO: Is this needed? Can it be moved in MaterialNode?

class ExtendedMaterialNode extends MaterialNode {

	constructor( scope ) {

		super( scope );

	}

	getNodeType( builder ) {

		const scope = this.scope;
		let type = null;

		if ( scope === ExtendedMaterialNode.NORMAL || scope === ExtendedMaterialNode.CLEARCOAT_NORMAL ) {

			type = 'vec3';

		}

		return type || super.getNodeType( builder );

	}

	construct( builder ) {

		const material = builder.material;
		const scope = this.scope;

		let node = null;

		if ( scope === ExtendedMaterialNode.NORMAL ) {

			node = material.normalMap ? normalMap( this.getTexture( 'normalMap' ), materialReference( 'normalScale', 'vec2' ) ) : normalView;

		} else if ( scope === ExtendedMaterialNode.CLEARCOAT_NORMAL ) {

			node = material.clearcoatNormalMap ? normalMap( this.getTexture( 'clearcoatNormalMap' ), materialReference( 'clearcoatNormalScale', 'vec2' ) ) : normalView;

		}

		return node || super.construct( builder );

	}

}

ExtendedMaterialNode.NORMAL = 'normal';
ExtendedMaterialNode.CLEARCOAT_NORMAL = 'clearcoatNormal';

const materialNormal = nodeImmutable( ExtendedMaterialNode, ExtendedMaterialNode.NORMAL );
const materialClearcoatNormal = nodeImmutable( ExtendedMaterialNode, ExtendedMaterialNode.CLEARCOAT_NORMAL );

addNodeClass( ExtendedMaterialNode );

class ModelViewProjectionNode extends Node {

	constructor( positionNode = positionLocal ) {

		super( 'vec4' );

		this.positionNode = positionNode;

	}

	construct() {

		return cameraProjectionMatrix.mul( modelViewMatrix ).mul( this.positionNode );

	}

}

const modelViewProjection = nodeProxy( ModelViewProjectionNode );

addNodeClass( ModelViewProjectionNode );

class BufferAttributeNode extends InputNode {

	constructor( value, bufferType, bufferStride = 0, bufferOffset = 0 ) {

		super( value, bufferType );

		this.isBufferNode = true;

		this.bufferType = bufferType;
		this.bufferStride = bufferStride;
		this.bufferOffset = bufferOffset;

		this.usage = StaticDrawUsage;

	}

	construct( builder ) {

		const type = this.getNodeType( builder );
		const array = this.value;
		const itemSize = builder.getTypeLength( type );
		const stride = this.bufferStride || itemSize;
		const offset = this.bufferOffset;

		const buffer = new InterleavedBuffer( array, stride );
		const bufferAttribute = new InterleavedBufferAttribute( buffer, itemSize, offset );

		buffer.setUsage( this.usage );

		this.attribute = bufferAttribute;
		this.attribute.isInstancedBufferAttribute = true; // @TODO: Add a possible: InstancedInterleavedBufferAttribute

	}

	generate( builder ) {

		const nodeType = this.getNodeType( builder );

		const nodeUniform = builder.getBufferAttributeFromNode( this, nodeType );
		const propertyName = builder.getPropertyName( nodeUniform );

		let output = null;

		if ( builder.shaderStage === 'vertex' ) {

			output = propertyName;

		} else {

			const nodeVarying = varying( this );

			output = nodeVarying.build( builder, nodeType );

		}

		return output;

	}

	getInputType( /*builder*/ ) {

		return 'bufferAttribute';

	}

}

const bufferAttribute = ( array, type, stride, offset ) => nodeObject( new BufferAttributeNode( array, type, stride, offset ) );
const dynamicBufferAttribute = ( array, type, stride, offset ) => {

	const node = bufferAttribute( array, type, stride, offset );
	node.usage = DynamicDrawUsage;

	return node;

};

addNodeClass( BufferAttributeNode );

class InstanceNode extends Node {

	constructor( instanceMesh ) {

		super( 'void' );

		this.instanceMesh = instanceMesh;

		this.instanceMatrixNode = null;

	}

	construct( builder ) {

		let instanceMatrixNode = this.instanceMatrixNode;

		if ( instanceMatrixNode === null ) {

			const instanceMesh = this.instanceMesh;
			const instaceAttribute = instanceMesh.instanceMatrix;
			const array = instaceAttribute.array;

			const bufferFn = instaceAttribute.usage === DynamicDrawUsage ? dynamicBufferAttribute : bufferAttribute;

			const instanceBuffers = [
				// F.Signature -> bufferAttribute( array, type, stride, offset )
				bufferFn( array, 'vec4', 16, 0 ),
				bufferFn( array, 'vec4', 16, 4 ),
				bufferFn( array, 'vec4', 16, 8 ),
				bufferFn( array, 'vec4', 16, 12 )
			];

			instanceMatrixNode = mat4( ...instanceBuffers );

			this.instanceMatrixNode = instanceMatrixNode;

		}

		// POSITION

		const instancePosition = instanceMatrixNode.mul( positionLocal ).xyz;

		// NORMAL

		const m = mat3( instanceMatrixNode[ 0 ].xyz, instanceMatrixNode[ 1 ].xyz, instanceMatrixNode[ 2 ].xyz );

		const transformedNormal = normalLocal.div( vec3( m[ 0 ].dot( m[ 0 ] ), m[ 1 ].dot( m[ 1 ] ), m[ 2 ].dot( m[ 2 ] ) ) );

		const instanceNormal = m.mul( transformedNormal ).xyz;

		// ASSIGNS

		builder.stack.assign( positionLocal, instancePosition );
		builder.stack.assign( normalLocal, instanceNormal );

		return builder.stack;

	}

}

const instance = nodeProxy( InstanceNode );

addNodeClass( InstanceNode );

class BufferNode extends UniformNode {

	constructor( value, bufferType, bufferCount = 0 ) {

		super( value, bufferType );

		this.isBufferNode = true;

		this.bufferType = bufferType;
		this.bufferCount = bufferCount;

	}

	getInputType( /*builder*/ ) {

		return 'buffer';

	}

}

const buffer = ( value, type, count ) => nodeObject( new BufferNode( value, type, count ) );

addNodeClass( BufferNode );

const Skinning = new ShaderNode( ( inputs, {}, builder ) => {

	const { index, weight, bindMatrix, bindMatrixInverse, boneMatrices } = inputs;

	const boneMatX = boneMatrices.element( index.x );
	const boneMatY = boneMatrices.element( index.y );
	const boneMatZ = boneMatrices.element( index.z );
	const boneMatW = boneMatrices.element( index.w );

	// POSITION

	const skinVertex = bindMatrix.mul( positionLocal );

	const skinned = add(
		boneMatX.mul( weight.x ).mul( skinVertex ),
		boneMatY.mul( weight.y ).mul( skinVertex ),
		boneMatZ.mul( weight.z ).mul( skinVertex ),
		boneMatW.mul( weight.w ).mul( skinVertex )
	);

	const skinPosition = bindMatrixInverse.mul( skinned ).xyz;

	// NORMAL

	let skinMatrix = add(
		weight.x.mul( boneMatX ),
		weight.y.mul( boneMatY ),
		weight.z.mul( boneMatZ ),
		weight.w.mul( boneMatW )
	);

	skinMatrix = bindMatrixInverse.mul( skinMatrix ).mul( bindMatrix );

	const skinNormal = skinMatrix.transformDirection( normalLocal ).xyz;

	// ASSIGNS

	positionLocal.assign( skinPosition ).build( builder ); // @TODO: For some reason this doesn't work as stack.assign( positionLocal, skinPosition )?
	normalLocal.assign( skinNormal ).build( builder );

	if ( builder.hasGeometryAttribute( 'tangent' ) ) {

		tangentLocal.assign( skinNormal ).build( builder );

	}

} );

class SkinningNode extends Node {

	constructor( skinnedMesh ) {

		super( 'void' );

		this.skinnedMesh = skinnedMesh;

		this.updateType = NodeUpdateType.OBJECT;

		//

		this.skinIndexNode = attribute( 'skinIndex', 'uvec4' );
		this.skinWeightNode = attribute( 'skinWeight', 'vec4' );

		this.bindMatrixNode = uniform( skinnedMesh.bindMatrix, 'mat4' );
		this.bindMatrixInverseNode = uniform( skinnedMesh.bindMatrixInverse, 'mat4' );
		this.boneMatricesNode = buffer( skinnedMesh.skeleton.boneMatrices, 'mat4', skinnedMesh.skeleton.bones.length );

	}

	generate( builder ) {

		/*return new ShaderNode( ( {}, stack, builder ) => Skinning.call( {
			index: this.skinIndexNode,
			weight: this.skinWeightNode,
			bindMatrix: this.bindMatrixNode,
			bindMatrixInverse: this.bindMatrixInverseNode,
			boneMatrices: this.boneMatricesNode
		}, stack, builder ) ).build( builder );*/
		Skinning.call( {
			index: this.skinIndexNode,
			weight: this.skinWeightNode,
			bindMatrix: this.bindMatrixNode,
			bindMatrixInverse: this.bindMatrixInverseNode,
			boneMatrices: this.boneMatricesNode
		}, {}, builder );

	}

	update() {

		this.skinnedMesh.skeleton.update();

	}

}

const skinning = nodeProxy( SkinningNode );

addNodeClass( SkinningNode );

class ReflectVectorNode extends Node {

	constructor() {

		super( 'vec3' );

	}

	getHash( /*builder*/ ) {

		return 'reflectVector';

	}

	construct() {

		const reflectView = positionViewDirection.negate().reflect( transformedNormalView );

		return reflectView.transformDirection( cameraViewMatrix );

	}

}

const reflectVector = nodeImmutable( ReflectVectorNode );

addNodeClass( ReflectVectorNode );

class CubeTextureNode extends TextureNode {

	constructor( value, uvNode = null, levelNode = null ) {

		super( value, uvNode, levelNode );

		this.isCubeTextureNode = true;

	}

	getInputType( /*builder*/ ) {

		return 'cubeTexture';

	}

	getDefaultUV() {

		return reflectVector;

	}

	generate( builder, output ) {

		const { uvNode, levelNode } = builder.getNodeProperties( this );

		const texture = this.value;

		if ( ! texture || texture.isCubeTexture !== true ) {

			throw new Error( 'CubeTextureNode: Need a three.js cube texture.' );

		}

		const textureProperty = UniformNode.prototype.generate.call( this, builder, 'cubeTexture' );

		if ( output === 'sampler' ) {

			return textureProperty + '_sampler';

		} else if ( builder.isReference( output ) ) {

			return textureProperty;

		} else {

			const nodeData = builder.getDataFromNode( this );

			let propertyName = nodeData.propertyName;

			if ( propertyName === undefined ) {

				const cubeUV = vec3( uvNode.x.negate(), uvNode.yz );
				const uvSnippet = cubeUV.build( builder, 'vec3' );

				const nodeVar = builder.getVarFromNode( this, 'vec4' );

				propertyName = builder.getPropertyName( nodeVar );

				let snippet = null;

				if ( levelNode && levelNode.isNode === true ) {

					const levelSnippet = levelNode.build( builder, 'float' );

					snippet = builder.getTextureLevel( this, textureProperty, uvSnippet, levelSnippet );

				} else {

					snippet = builder.getTexture( this, textureProperty, uvSnippet );

				}

				builder.addLineFlowCode( `${propertyName} = ${snippet}` );

				nodeData.snippet = snippet;
				nodeData.propertyName = propertyName;

			}

			return builder.format( propertyName, 'vec4', output );

		}

	}

}

const cubeTexture = nodeProxy( CubeTextureNode );

addNodeElement( 'cubeTexture', cubeTexture );

addNodeClass( CubeTextureNode );

class LightingNode extends Node {

	constructor() {

		super( 'vec3' );

	}

	generate( /*builder*/ ) {

	}

}

addNodeClass( LightingNode );

class CondNode extends Node {

	constructor( condNode, ifNode, elseNode = null ) {

		super();

		this.condNode = condNode;

		this.ifNode = ifNode;
		this.elseNode = elseNode;

	}

	getNodeType( builder ) {

		const ifType = this.ifNode.getNodeType( builder );

		if ( this.elseNode !== null ) {

			const elseType = this.elseNode.getNodeType( builder );

			if ( builder.getTypeLength( elseType ) > builder.getTypeLength( ifType ) ) {

				return elseType;

			}

		}

		return ifType;

	}

	generate( builder ) {

		const type = this.getNodeType( builder );
		const context$1 = { tempWrite: false };

		const { ifNode, elseNode } = this;

		const needsProperty = ifNode.getNodeType( builder ) !== 'void' || ( elseNode && elseNode.getNodeType( builder ) !== 'void' );
		const nodeProperty = needsProperty ? property( type ).build( builder ) : '';

		const nodeSnippet = context( this.condNode/*, context*/ ).build( builder, 'bool' );

		builder.addFlowCode( `\n${ builder.tab }if ( ${ nodeSnippet } ) {\n\n` ).addFlowTab();

		let ifSnippet = context( this.ifNode, context$1 ).build( builder, type );

		ifSnippet = needsProperty ? nodeProperty + ' = ' + ifSnippet + ';' : ifSnippet;

		builder.removeFlowTab().addFlowCode( builder.tab + '\t' + ifSnippet + '\n\n' + builder.tab + '}' );

		if ( elseNode !== null ) {

			builder.addFlowCode( ' else {\n\n' ).addFlowTab();

			let elseSnippet = context( elseNode, context$1 ).build( builder, type );
			elseSnippet = nodeProperty ? nodeProperty + ' = ' + elseSnippet + ';' : elseSnippet;

			builder.removeFlowTab().addFlowCode( builder.tab + '\t' + elseSnippet + '\n\n' + builder.tab + '}\n\n' );

		} else {

			builder.addFlowCode( '\n\n' );

		}

		return nodeProperty;

	}

}

const cond = nodeProxy( CondNode );

addNodeElement( 'cond', cond );

addNodeClass( CondNode );

let depthMaterial = null;

class AnalyticLightNode extends LightingNode {

	constructor( light = null ) {

		super();

		this.updateType = NodeUpdateType.FRAME;

		this.light = light;

		this.rtt = null;
		this.shadowNode = null;

		this.color = new Color();
		this.colorNode = uniform( this.color );

	}

	getHash( /*builder*/ ) {

		return this.light.uuid;

	}

	constructShadow( builder ) {

		let shadowNode = this.shadowNode;

		if ( shadowNode === null ) {

			if ( depthMaterial === null ) depthMaterial = builder.createNodeMaterial( 'MeshBasicNodeMaterial' );

			const shadow = this.light.shadow;
			const rtt = builder.getRenderTarget( shadow.mapSize.width, shadow.mapSize.height );

			const depthTexture = new DepthTexture();
			depthTexture.minFilter = NearestFilter;
			depthTexture.magFilter = NearestFilter;
			depthTexture.image.width = shadow.mapSize.width;
			depthTexture.image.height = shadow.mapSize.height;
			//depthTexture.compareFunction = THREE.LessCompare;

			rtt.depthTexture = depthTexture;

			shadow.camera.updateProjectionMatrix();

			//

			const bias = reference( 'bias', 'float', shadow );

			//const diffuseFactor = normalView.dot( objectViewPosition( this.light ).sub( positionView ).normalize().negate() );
			//bias = mix( bias, 0, diffuseFactor );

			let shadowCoord = uniform( shadow.matrix ).mul( positionWorld );
			shadowCoord = shadowCoord.xyz.div( shadowCoord.w );

			shadowCoord = vec3(
				shadowCoord.x,
				shadowCoord.y.oneMinus(),
				shadowCoord.z
			);

			// @TODO: Optimize using WebGPU compare-sampler

			let depth = texture( depthTexture, shadowCoord.xy );
			depth = depth.mul( .5 ).add( .5 ).add( bias );

			shadowNode = cond( shadowCoord.z.lessThan( depth ).or( shadowCoord.y.lessThan( .000001 ) /*@TODO: find the cause and remove it soon */ ), 1, 0 );
			//shadowNode = step( shadowCoord.z, depth );

			//

			this.rtt = rtt;
			this.colorNode = this.colorNode.mul( shadowNode );

			this.shadowNode = shadowNode;

			//

			this.updateBeforeType = NodeUpdateType.RENDER;

		}

	}

	construct( builder ) {

		if ( this.light.castShadow ) this.constructShadow( builder );

	}

	updateShadow( frame ) {

		const { rtt, light } = this;
		const { renderer, scene } = frame;

		scene.overrideMaterial = depthMaterial;

		rtt.setSize( light.shadow.mapSize.width, light.shadow.mapSize.height );

		light.shadow.updateMatrices( light );

		renderer.setRenderTarget( rtt );
		renderer.render( scene, light.shadow.camera );
		renderer.setRenderTarget( null );

		scene.overrideMaterial = null;

	}

	updateBefore( frame ) {

		const { light } = this;

		if ( light.castShadow ) this.updateShadow( frame );

	}

	update( /*frame*/ ) {

		const { light } = this;

		this.color.copy( light.color ).multiplyScalar( light.intensity );

	}

}

addNodeClass( AnalyticLightNode );

const LightNodes = new WeakMap();

const sortLights = ( lights ) => {

	return lights.sort( ( a, b ) => a.id - b.id );

};

class LightsNode extends Node {

	constructor( lightNodes = [] ) {

		super( 'vec3' );

		this.lightNodes = lightNodes;

		this._hash = null;

	}

	get hasLight() {

		return this.lightNodes.length > 0;

	}

	construct( builder ) {

		const lightNodes = this.lightNodes;

		for ( const lightNode of lightNodes ) {

			lightNode.build( builder );

		}

	}

	getHash( builder ) {

		if ( this._hash === null ) {

			let hash = '';

			const lightNodes = this.lightNodes;

			for ( const lightNode of lightNodes ) {

				hash += lightNode.getHash( builder ) + ' ';

			}

			this._hash = hash;

		}

		return this._hash;

	}

	getLightNodeByHash( hash ) {

		const lightNodes = this.lightNodes;

		for ( const lightNode of lightNodes ) {

			if ( lightNode.light.uuid === hash ) {

				return lightNode;

			}

		}

		return null;

	}

	fromLights( lights = [] ) {

		const lightNodes = [];

		lights = sortLights( lights );

		for ( const light of lights ) {

			let lightNode = this.getLightNodeByHash( light.uuid );

			if ( lightNode === null ) {

				const lightClass = light.constructor;
				const lightNodeClass = LightNodes.has( lightClass ) ? LightNodes.get( lightClass ) : AnalyticLightNode;

				lightNode = nodeObject( new lightNodeClass( light ) );

			}

			lightNodes.push( lightNode );

		}

		this.lightNodes = lightNodes;
		this._hash = null;

		return this;

	}

}

const lights = ( lights ) => nodeObject( new LightsNode().fromLights( lights ) );
const lightsWithoutWrap = nodeProxy( LightsNode );

function addLightNode( lightClass, lightNodeClass ) {

	if ( LightNodes.has( lightClass ) ) throw new Error( `Redefinition of light node ${ lightNodeClass.name }` );
	if ( typeof lightClass !== 'function' || ! lightClass.name ) throw new Error( `Light ${ lightClass.name } is not a class` );
	if ( typeof lightNodeClass !== 'function' || ! lightNodeClass.name ) throw new Error( `Light node ${ lightNodeClass.name } is not a class` );

	LightNodes.set( lightClass, lightNodeClass );

}

class AONode extends LightingNode {

	constructor( aoNode = null ) {

		super();

		this.aoNode = aoNode;

	}

	construct( builder ) {

		const aoIntensity = 1;
		const aoNode = this.aoNode.sub( 1.0 ).mul( aoIntensity ).add( 1.0 );

		builder.context.ambientOcclusion.mulAssign( aoNode );

	}

}

addNodeClass( AONode );

class EquirectUVNode extends TempNode {

	constructor( dirNode = positionWorldDirection ) {

		super( 'vec2' );

		this.dirNode = dirNode;

	}

	construct() {

		const dir = this.dirNode;

		const u = dir.z.atan2( dir.x ).mul( 1 / ( Math.PI * 2 ) ).add( 0.5 );
		const v = dir.y.negate().clamp( - 1.0, 1.0 ).asin().mul( 1 / Math.PI ).add( 0.5 ); // @TODO: The use of negate() here could be an NDC issue.

		return vec2( u, v );

	}

}

const equirectUV = nodeProxy( EquirectUVNode );

addNodeClass( EquirectUVNode );

class MaxMipLevelNode extends UniformNode {

	constructor( textureNode ) {

		super( 0 );

		this.textureNode = textureNode;

		this.updateType = NodeUpdateType.FRAME;

	}

	get texture() {

		return this.textureNode.value;

	}

	update() {

		const texture = this.texture;
		const images = texture.images;
		const image = ( images && images.length > 0 ) ? ( ( images[ 0 ] && images[ 0 ].image ) || images[ 0 ] ) : texture.image;

		if ( image && image.width !== undefined ) {

			const { width, height } = image;

			this.value = Math.log2( Math.max( width, height ) );

		}

	}

}

const maxMipLevel = nodeProxy( MaxMipLevelNode );

addNodeClass( MaxMipLevelNode );

class SpecularMIPLevelNode extends Node {

	constructor( textureNode, roughnessNode = null ) {

		super( 'float' );

		this.textureNode = textureNode;
		this.roughnessNode = roughnessNode;

	}

	construct() {

		const { textureNode, roughnessNode } = this;

		// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html

		const maxMIPLevelScalar = maxMipLevel( textureNode );

		const sigma = roughnessNode.mul( roughnessNode ).mul( Math.PI ).div( roughnessNode.add( 1.0 ) );
		const desiredMIPLevel = maxMIPLevelScalar.add( sigma.log2() );

		return desiredMIPLevel.clamp( 0.0, maxMIPLevelScalar );

	}

}

const specularMIPLevel = nodeProxy( SpecularMIPLevelNode );

addNodeClass( SpecularMIPLevelNode );

class EnvironmentNode extends LightingNode {

	constructor( envNode = null ) {

		super();

		this.envNode = envNode;

	}

	construct( builder ) {

		let envNode = this.envNode;
		const properties = builder.getNodeProperties( this );

		if ( envNode.isTextureNode && envNode.value.isCubeTexture !== true ) {

			const texture = envNode.value;
			const renderer = builder.renderer;

			// @TODO: Add dispose logic here
			const cubeRTT = builder.getCubeRenderTarget( 512 ).fromEquirectangularTexture( renderer, texture );

			envNode = cubeTexture( cubeRTT.texture );

		}

		//

		const intensity = reference( 'envMapIntensity', 'float', builder.material ); // @TODO: Add materialEnvIntensity in MaterialNode

		const radiance = context( envNode, createRadianceContext( roughness, transformedNormalView ) ).mul( intensity );
		const irradiance = context( envNode, createIrradianceContext( transformedNormalWorld ) ).mul( Math.PI ).mul( intensity );

		const isolateRadiance = cache( radiance );

		//

		builder.context.radiance.addAssign( isolateRadiance );

		builder.context.iblIrradiance.addAssign( irradiance );

		//

		let isolateClearcoatRadiance = null;

		if ( builder.context.clearcoatRadiance  ) {

			const clearcoatRadiance = context( envNode, createRadianceContext( clearcoatRoughness, transformedClearcoatNormalView ) ).mul( intensity );

			isolateClearcoatRadiance = cache( clearcoatRadiance );

			builder.context.clearcoatRadiance.addAssign( isolateClearcoatRadiance );

		}

		//

		properties.radiance = isolateRadiance;
		properties.clearcoatRadiance = isolateClearcoatRadiance;
		properties.irradiance = irradiance;

	}

}

const createRadianceContext = ( roughnessNode, normalViewNode ) => {

	let reflectVec = null;
	let textureUVNode = null;

	return {
		getUVNode: ( textureNode ) => {

			let node = null;

			if ( reflectVec === null ) {

				reflectVec = positionViewDirection.negate().reflect( normalViewNode );
				reflectVec = roughnessNode.mul( roughnessNode ).mix( reflectVec, normalViewNode ).normalize();
				reflectVec = reflectVec.transformDirection( cameraViewMatrix );

			}

			if ( textureNode.isCubeTextureNode ) {

				node = reflectVec;

			} else if ( textureNode.isTextureNode ) {

				if ( textureUVNode === null ) {

					// @TODO: Needed PMREM

					textureUVNode = equirectUV( reflectVec );

				}

				node = textureUVNode;

			}

			return node;

		},
		getSamplerLevelNode: () => {

			return roughnessNode;

		},
		getMIPLevelAlgorithmNode: ( textureNode, levelNode ) => {

			return specularMIPLevel( textureNode, levelNode );

		}
	};

};

const createIrradianceContext = ( normalWorldNode ) => {

	let textureUVNode = null;

	return {
		getUVNode: ( textureNode ) => {

			let node = null;

			if ( textureNode.isCubeTextureNode ) {

				node = normalWorldNode;

			} else if ( textureNode.isTextureNode ) {

				if ( textureUVNode === null ) {

					// @TODO: Needed PMREM

					textureUVNode = equirectUV( normalWorldNode );
					textureUVNode = vec2( textureUVNode.x, textureUVNode.y.oneMinus() );

				}

				node = textureUVNode;

			}

			return node;

		},
		getSamplerLevelNode: () => {

			return float( 1 );

		},
		getMIPLevelAlgorithmNode: ( textureNode, levelNode ) => {

			return specularMIPLevel( textureNode, levelNode );

		}
	};

};

addNodeClass( EnvironmentNode );

const NodeMaterials = new Map();

class NodeMaterial extends ShaderMaterial {

	constructor() {

		super();

		this.isNodeMaterial = true;

		this.type = this.constructor.name;

		this.forceSinglePass = false;

		this.lights = true;
		this.normals = true;

		this.lightsNode = null;
		this.envNode = null;

		this.colorNode = null;
		this.normalNode = null;
		this.opacityNode = null;
		this.backdropNode = null;
		this.backdropAlphaNode = null;
		this.alphaTestNode = null;

		this.positionNode = null;

	}

	customProgramCacheKey() {

		return this.type + getCacheKey( this );

	}

	build( builder ) {

		this.construct( builder );

	}

	construct( builder ) {

		// < VERTEX STAGE >

		builder.addStack();

		builder.stack.outputNode = this.constructPosition( builder );

		builder.addFlow( 'vertex', builder.removeStack() );

		// < FRAGMENT STAGE >

		builder.addStack();

		if ( this.normals === true ) this.constructNormal( builder );

		this.constructDiffuseColor( builder );
		this.constructVariants( builder );

		const outgoingLightNode = this.constructLighting( builder );

		builder.stack.outputNode = this.constructOutput( builder, outgoingLightNode, diffuseColor.a );

		builder.addFlow( 'fragment', builder.removeStack() );

	}

	constructPosition( builder ) {

		const object = builder.object;

		let vertex = positionLocal;

		if ( this.positionNode !== null ) {

			vertex = vertex.bypass( positionLocal.assign( this.positionNode ) );

		}

		if ( ( object.instanceMatrix && object.instanceMatrix.isInstancedBufferAttribute === true ) && builder.isAvailable( 'instance' ) === true ) {

			vertex = vertex.bypass( instance( object ) );

		}

		if ( object.isSkinnedMesh === true ) {

			vertex = vertex.bypass( skinning( object ) );

		}

		builder.context.vertex = vertex;

		return modelViewProjection();

	}

	constructDiffuseColor( { stack, geometry } ) {

		let colorNode = this.colorNode ? vec4( this.colorNode ) : materialColor;

		// VERTEX COLORS

		if ( this.vertexColors === true && geometry.hasAttribute( 'color' ) ) {

			colorNode = vec4( colorNode.xyz.mul( attribute( 'color' ) ), colorNode.a );

		}

		// COLOR

		stack.assign( diffuseColor, colorNode );

		// OPACITY

		const opacityNode = this.opacityNode ? float( this.opacityNode ) : materialOpacity;
		stack.assign( diffuseColor.a, diffuseColor.a.mul( opacityNode ) );

		// ALPHA TEST

		if ( this.alphaTestNode || this.alphaTest > 0 ) {

			const alphaTestNode = this.alphaTestNode ? float( this.alphaTestNode ) : materialAlphaTest;

			stack.add( diffuseColor.a.lessThanEqual( alphaTestNode ).discard() );

		}

	}

	constructVariants( /*builder*/ ) {

		// Interface function.

	}

	constructNormal( { stack } ) {

		// NORMAL VIEW

		const normalNode = this.normalNode ? vec3( this.normalNode ) : materialNormal;

		stack.assign( transformedNormalView, normalNode );

		return normalNode;

	}

	getEnvNode( builder ) {

		let node = null;

		if ( this.envNode ) {

			node = this.envNode;

		} else if ( this.envMap ) {

			node = this.envMap.isCubeTexture ? cubeTexture( this.envMap ) : texture( this.envMap );

		} else if ( builder.environmentNode ) {

			node = builder.environmentNode;

		}

		return node;

	}

	constructLights( builder ) {

		const envNode = this.getEnvNode( builder );

		//

		const materialLightsNode = [];

		if ( envNode ) {

			materialLightsNode.push( new EnvironmentNode( envNode ) );

		}

		if ( builder.material.aoMap ) {

			materialLightsNode.push( new AONode( texture( builder.material.aoMap ) ) );

		}

		let lightsNode = this.lightsNode || builder.lightsNode;

		if ( materialLightsNode.length > 0 ) {

			lightsNode = lightsWithoutWrap( [ ...lightsNode.lightNodes, ...materialLightsNode ] );

		}

		return lightsNode;

	}

	constructLightingModel( /*builder*/ ) {

		// Interface function.

	}

	constructLighting( builder ) {

		const { material } = builder;
		const { backdropNode, backdropAlphaNode, emissiveNode } = this;

		// OUTGOING LIGHT

		const lights = this.lights === true || this.lightsNode !== null;

		const lightsNode = lights ? this.constructLights( builder ) : null;

		let outgoingLightNode = diffuseColor.rgb;

		if ( lightsNode && lightsNode.hasLight !== false ) {

			const lightingModelNode = this.constructLightingModel( builder );

			outgoingLightNode = lightsNode.lightingContext( lightingModelNode, backdropNode, backdropAlphaNode );

		} else if ( backdropNode !== null ) {

			outgoingLightNode = vec3( backdropAlphaNode !== null ? mix( outgoingLightNode, backdropNode, backdropAlphaNode ) : backdropNode );

		}

		// EMISSIVE

		if ( ( emissiveNode && emissiveNode.isNode === true ) || ( material.emissive && material.emissive.isColor === true ) ) {

			outgoingLightNode = outgoingLightNode.add( emissiveNode ? vec3( emissiveNode ) : materialEmissive );

		}

		return outgoingLightNode;

	}

	constructOutput( builder, outgoingLight, opacity ) {

		const renderer = builder.renderer;

		// TONE MAPPING

		const toneMappingNode = builder.toneMappingNode;

		if ( toneMappingNode ) {

			outgoingLight = toneMappingNode.context( { color: outgoingLight } );

		}

		// @TODO: Optimize outputNode to vec3.

		let outputNode = vec4( outgoingLight, opacity );

		// ENCODING

		const renderTarget = renderer.getRenderTarget();

		let outputColorSpace;

		if ( renderTarget !== null ) {

			outputColorSpace = renderTarget.texture.colorSpace;

		} else {

			outputColorSpace = renderer.outputColorSpace;

		}

		if ( outputColorSpace !== NoColorSpace ) outputNode = outputNode.linearToColorSpace( outputColorSpace );

		// FOG

		const fogNode = builder.fogNode;

		if ( fogNode ) outputNode = vec4( fogNode.mixAssign( outputNode.rgb ), outputNode.a );

		return outputNode;

	}

	setDefaultValues( material ) {

		// This approach is to reuse the native refreshUniforms*
		// and turn available the use of features like transmission and environment in core

		for ( const property in material ) {

			const value = material[ property ];

			if ( this[ property ] === undefined ) {

				this[ property ] = value;

				if ( value && value.clone ) this[ property ] = value.clone();

			}

		}

		Object.assign( this.defines, material.defines );

		const descriptors = Object.getOwnPropertyDescriptors( material.constructor.prototype );

		for ( const key in descriptors ) {

			if ( Object.getOwnPropertyDescriptor( this.constructor.prototype, key ) === undefined &&
			     descriptors[ key ].get !== undefined ) {

				Object.defineProperty( this.constructor.prototype, key, descriptors[ key ] );

			}

		}

	}

	toJSON( meta ) {

		const isRoot = ( meta === undefined || typeof meta === 'string' );

		if ( isRoot ) {

			meta = {
				textures: {},
				images: {},
				nodes: {}
			};

		}

		const data = Material.prototype.toJSON.call( this, meta );
		const nodeChildren = getNodeChildren( this );

		data.inputNodes = {};

		for ( const { property, childNode } of nodeChildren ) {

			data.inputNodes[ property ] = childNode.toJSON( meta ).uuid;

		}

		// TODO: Copied from Object3D.toJSON

		function extractFromCache( cache ) {

			const values = [];

			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

		if ( isRoot ) {

			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );
			const nodes = extractFromCache( meta.nodes );

			if ( textures.length > 0 ) data.textures = textures;
			if ( images.length > 0 ) data.images = images;
			if ( nodes.length > 0 ) data.nodes = nodes;

		}

		return data;

	}

	static fromMaterial( material ) {

		if ( material.isNodeMaterial === true ) { // is already a node material

			return material;

		}

		const type = material.type.replace( 'Material', 'NodeMaterial' );

		const nodeMaterial = createNodeMaterialFromType( type );

		if ( nodeMaterial === undefined ) {

			throw new Error( `NodeMaterial: Material "${ material.type }" is not compatible.` );

		}

		for ( const key in material ) {

			nodeMaterial[ key ] = material[ key ];

		}

		return nodeMaterial;

	}

}

function addNodeMaterial( nodeMaterial ) {

	if ( typeof nodeMaterial !== 'function' || ! nodeMaterial.name ) throw new Error( `Node material ${ nodeMaterial.name } is not a class` );
	if ( NodeMaterials.has( nodeMaterial.name ) ) throw new Error( `Redefinition of node material ${ nodeMaterial.name }` );

	NodeMaterials.set( nodeMaterial.name, nodeMaterial );

}

function createNodeMaterialFromType( type ) {

	const Material = NodeMaterials.get( type );

	if ( Material !== undefined ) {

		return new Material();

	}

}

addNodeMaterial( NodeMaterial );

class LoopNode extends Node {

	constructor( params = [] ) {

		super();

		this.params = params;

	}

	getVarName( index ) {

		return String.fromCharCode( 'i'.charCodeAt() + index );

	}

	getProperties( builder ) {

		const properties = builder.getNodeProperties( this );

		if ( properties.stackNode !== undefined ) return properties;

		//

		const inputs = {};

		for ( let i = 0, l = this.params.length - 1; i < l; i ++ ) {

			const prop = this.getVarName( i );

			inputs[ prop ] = expression( prop, 'int' );

		}

		properties.returnsNode = this.params[ this.params.length - 1 ].call( inputs, builder.addStack(), builder );
		properties.stackNode = builder.removeStack();

		return properties;

	}

	getNodeType( builder ) {

		const { returnsNode } = this.getProperties( builder );

		return returnsNode ? returnsNode.getNodeType( builder ) : 'void';

	}

	construct( builder ) {

		// construct properties

		this.getProperties( builder );

	}

	generate( builder ) {

		const properties = this.getProperties( builder );

		const context$1 = { tempWrite: false };

		const params = this.params;
		const stackNode = properties.stackNode;

		const returnsSnippet = properties.returnsNode ? properties.returnsNode.build( builder ) : '';

		for ( let i = 0, l = params.length - 1; i < l; i ++ ) {

			const param = params[ i ];
			const property = this.getVarName( i );

			let start = null, end = null, direction = null;

			if ( param.isNode ) {

				start = '0';
				end = param.generate( builder, 'int' );
				direction = 'forward';

			} else {

				start = param.start;
				end = param.end;
				direction = param.direction;

				if ( typeof start === 'number' ) start = start.toString();
				else if ( start && start.isNode ) start = start.generate( builder, 'int' );

				if ( typeof end === 'number' ) end = end.toString();
				else if ( end && end.isNode ) end = end.generate( builder, 'int' );

				if ( start !== undefined && end === undefined ) {

					start = start + ' - 1';
					end = '0';
					direction = 'backwards';

				} else if ( end !== undefined && start === undefined ) {

					start = '0';
					direction = 'forward';

				}

				if ( direction === undefined ) {

					if ( Number( start ) > Number( end ) ) {

						direction = 'backwards';

					} else {

						direction = 'forward';

					}

				}

			}

			const internalParam = { start, end, direction };

			//

			const startSnippet = internalParam.start;
			const endSnippet = internalParam.end;

			let declarationSnippet = '';
			let conditionalSnippet = '';
			let updateSnippet = '';

			declarationSnippet += builder.getVar( 'int', property ) + ' = ' + startSnippet;

			if ( internalParam.direction === 'backwards' ) {

				conditionalSnippet += property + ' >= ' + endSnippet;
				updateSnippet += property + ' --';

			} else {

				// forward

				conditionalSnippet += property + ' < ' + endSnippet;
				updateSnippet += property + ' ++';

			}

			const forSnippet = `for ( ${ declarationSnippet }; ${ conditionalSnippet }; ${ updateSnippet } )`;

			builder.addFlowCode( ( i === 0 ? '\n' : '' ) + builder.tab + forSnippet + ' {\n\n' ).addFlowTab();

		}

		const stackSnippet = context( stackNode, context$1 ).build( builder, 'void' );

		builder.removeFlowTab().addFlowCode( '\n' + builder.tab + stackSnippet );

		for ( let i = 0, l = this.params.length - 1; i < l; i ++ ) {

			builder.addFlowCode( ( i === 0 ? '' : builder.tab ) + '}\n\n' ).removeFlowTab();

		}

		builder.addFlowTab();

		return returnsSnippet;

	}

}

const loop = ( ...params ) => nodeObject( new LoopNode( nodeArray( params, 'int' ) ) );

addNodeElement( 'loop', ( returns, ...params ) => bypass( returns, loop( ...params ) ) );

addNodeClass( LoopNode );

class StackNode extends Node {

	constructor( parent = null ) {

		super();

		this.nodes = [];
		this.outputNode = null;

		this.parent = parent;

		this._currentCond = null;

		this.isStackNode = true;

	}

	getNodeType( builder ) {

		return this.outputNode ? this.outputNode.getNodeType( builder ) : 'void';

	}

	add( node ) {

		this.nodes.push( bypass( expression(), node ) );

		return this;

	}

	if( boolNode, method ) {

		const methodNode = shader( method );
		this._currentCond = cond( boolNode, methodNode );

		return this.add( this._currentCond );

	}

	elseif( boolNode, method ) {

		const methodNode = shader( method );
		const ifNode = cond( boolNode, methodNode );

		this._currentCond.elseNode = ifNode;
		this._currentCond = ifNode;

		return this;

	}

	else( method ) {

		this._currentCond.elseNode = shader( method );

		return this;

	}

	assign( targetNode, sourceValue ) {

		return this.add( assign( targetNode, sourceValue ) );

	}

	loop( ...params ) {

		return this.add( loop( ...params ) );

	}

	build( builder, ...params ) {

		for ( const node of this.nodes ) {

			node.build( builder );

		}

		return this.outputNode ? this.outputNode.build( builder, ...params ) : super.build( builder, ...params );

	}

}

const stack = nodeProxy( StackNode );

addNodeClass( StackNode );

const typeFromLength = new Map( [
	[ 2, 'vec2' ],
	[ 3, 'vec3' ],
	[ 4, 'vec4' ],
	[ 9, 'mat3' ],
	[ 16, 'mat4' ]
] );

const typeFromArray = new Map( [
	[ Int8Array, 'int' ],
	[ Int16Array, 'int' ],
	[ Int32Array, 'int' ],
	[ Uint8Array, 'uint' ],
	[ Uint16Array, 'uint' ],
	[ Uint32Array, 'uint' ],
	[ Float32Array, 'float' ]
] );

const isNonPaddingElementArray = new Set( [ Int32Array, Uint32Array, Float32Array ] );

const toFloat = ( value ) => {

	value = Number( value );

	return value + ( value % 1 ? '' : '.0' );

};

class NodeBuilder {

	constructor( object, renderer, parser ) {

		this.object = object;
		this.material = object && ( object.material || null );
		this.geometry = object && ( object.geometry || null );
		this.renderer = renderer;
		this.parser = parser;

		this.nodes = [];
		this.updateNodes = [];
		this.updateBeforeNodes = [];
		this.hashNodes = {};

		this.lightsNode = null;
		this.environmentNode = null;
		this.fogNode = null;
		this.toneMappingNode = null;

		this.vertexShader = null;
		this.fragmentShader = null;
		this.computeShader = null;

		this.flowNodes = { vertex: [], fragment: [], compute: [] };
		this.flowCode = { vertex: '', fragment: '', compute: [] };
		this.uniforms = { vertex: [], fragment: [], compute: [], index: 0 };
		this.codes = { vertex: [], fragment: [], compute: [] };
		this.bindings = { vertex: [], fragment: [], compute: [] };
		this.bindingsOffset = { vertex: 0, fragment: 0, compute: 0 };
		this.bindingsArray = null;
		this.attributes = [];
		this.bufferAttributes = [];
		this.varyings = [];
		this.vars = { vertex: [], fragment: [], compute: [] };
		this.flow = { code: '' };
		this.chaining = [];
		this.stack = stack();
		this.tab = '\t';

		this.context = {
			keywords: new NodeKeywords(),
			material: this.material,
			getMIPLevelAlgorithmNode: ( textureNode, levelNode ) => levelNode.mul( maxMipLevel( textureNode ) )
		};

		this.cache = new NodeCache();
		this.globalCache = this.cache;

		this.flowsData = new WeakMap();

		this.shaderStage = null;
		this.buildStage = null;

	}

	includes( node ) {

		return this.nodes.includes( node );

	}

	getBindings() {

		let bindingsArray = this.bindingsArray;

		if ( bindingsArray === null ) {

			const bindings = this.bindings;

			this.bindingsArray = bindingsArray = ( this.material !== null ) ? [ ...bindings.vertex, ...bindings.fragment ] : bindings.compute;

		}

		return bindingsArray;

	}

	setHashNode( node, hash ) {

		this.hashNodes[ hash ] = node;

	}

	addNode( node ) {

		if ( this.nodes.indexOf( node ) === - 1 ) {

			const updateType = node.getUpdateType();
			const updateBeforeType = node.getUpdateBeforeType();

			if ( updateType !== NodeUpdateType.NONE ) {

				this.updateNodes.push( node );

			}

			if ( updateBeforeType !== NodeUpdateType.NONE ) {

				this.updateBeforeNodes.push( node );

			}

			this.nodes.push( node );

			this.setHashNode( node, node.getHash( this ) );

		}

	}

	get currentNode() {

		return this.chaining[ this.chaining.length - 1 ];

	}

	addChain( node ) {

		/*
		if ( this.chaining.indexOf( node ) !== - 1 ) {

			console.warn( 'Recursive node: ', node );

		}
		*/

		this.chaining.push( node );

	}

	removeChain( node ) {

		const lastChain = this.chaining.pop();

		if ( lastChain !== node ) {

			throw new Error( 'NodeBuilder: Invalid node chaining!' );

		}

	}

	getMethod( method ) {

		return method;

	}

	getNodeFromHash( hash ) {

		return this.hashNodes[ hash ];

	}

	addFlow( shaderStage, node ) {

		this.flowNodes[ shaderStage ].push( node );

		return node;

	}

	setContext( context ) {

		this.context = context;

	}

	getContext() {

		return this.context;

	}

	setCache( cache ) {

		this.cache = cache;

	}

	getCache() {

		return this.cache;

	}

	isAvailable( /*name*/ ) {

		return false;

	}

	getInstanceIndex() {

	}

	getFrontFacing() {

	}

	getFragCoord() {

	}

	isFlipY() {

		return false;

	}

	getTexture( /* texture, textureProperty, uvSnippet */ ) {

	}

	getTextureLevel( /* texture, textureProperty, uvSnippet, levelSnippet */ ) {

	}

	// @TODO: rename to .generateConst()
	getConst( type, value = null ) {

		if ( value === null ) {

			if ( type === 'float' || type === 'int' || type === 'uint' ) value = 0;
			else if ( type === 'bool' ) value = false;
			else if ( type === 'color' ) value = new Color();
			else if ( type === 'vec2' ) value = new Vector2();
			else if ( type === 'vec3' ) value = new Vector3();
			else if ( type === 'vec4' ) value = new Vector4();

		}

		if ( type === 'float' ) return toFloat( value );
		if ( type === 'int' ) return `${ Math.round( value ) }`;
		if ( type === 'uint' ) return value >= 0 ? `${ Math.round( value ) }u` : '0u';
		if ( type === 'bool' ) return value ? 'true' : 'false';
		if ( type === 'color' ) return `${ this.getType( 'vec3' ) }( ${ toFloat( value.r ) }, ${ toFloat( value.g ) }, ${ toFloat( value.b ) } )`;

		const typeLength = this.getTypeLength( type );

		const componentType = this.getComponentType( type );

		const getConst = value => this.getConst( componentType, value );

		if ( typeLength === 2 ) {

			return `${ this.getType( type ) }( ${ getConst( value.x ) }, ${ getConst( value.y ) } )`;

		} else if ( typeLength === 3 ) {

			return `${ this.getType( type ) }( ${ getConst( value.x ) }, ${ getConst( value.y ) }, ${ getConst( value.z ) } )`;

		} else if ( typeLength === 4 ) {

			return `${ this.getType( type ) }( ${ getConst( value.x ) }, ${ getConst( value.y ) }, ${ getConst( value.z ) }, ${ getConst( value.w ) } )`;

		} else if ( typeLength > 4 && value && ( value.isMatrix3 || value.isMatrix4 ) ) {

			return `${ this.getType( type ) }( ${ value.elements.map( getConst ).join( ', ' ) } )`;

		} else if ( typeLength > 4 ) {

			return `${ this.getType( type ) }()`;

		}

		throw new Error( `NodeBuilder: Type '${type}' not found in generate constant attempt.` );

	}

	getType( type ) {

		return type;

	}

	generateMethod( method ) {

		return method;

	}

	hasGeometryAttribute( name ) {

		return this.geometry && this.geometry.getAttribute( name ) !== undefined;

	}

	getAttribute( name, type ) {

		const attributes = this.attributes;

		// find attribute

		for ( const attribute of attributes ) {

			if ( attribute.name === name ) {

				return attribute;

			}

		}

		// create a new if no exist

		const attribute = new NodeAttribute( name, type );

		attributes.push( attribute );

		return attribute;

	}

	getPropertyName( node/*, shaderStage*/ ) {

		return node.name;

	}

	isVector( type ) {

		return /vec\d/.test( type );

	}

	isMatrix( type ) {

		return /mat\d/.test( type );

	}

	isReference( type ) {

		return type === 'void' || type === 'property' || type === 'sampler' || type === 'texture' || type === 'cubeTexture';

	}

	needsColorSpaceToLinear( /*texture*/ ) {

		return false;

	}

	/** @deprecated, r152 */
	getTextureEncodingFromMap( map ) {
		return this.getTextureColorSpaceFromMap( map ) === SRGBColorSpace ? sRGBEncoding : LinearEncoding;

	}

	getTextureColorSpaceFromMap( map ) {

		let colorSpace;

		if ( map && map.isTexture ) {

			colorSpace = map.colorSpace;

		} else if ( map && map.isWebGLRenderTarget ) {

			colorSpace = map.texture.colorSpace;

		} else {

			colorSpace = NoColorSpace;

		}

		return colorSpace;

	}

	getComponentType( type ) {

		type = this.getVectorType( type );

		if ( type === 'float' || type === 'bool' || type === 'int' || type === 'uint' ) return type;

		const componentType = /(b|i|u|)(vec|mat)([2-4])/.exec( type );

		if ( componentType === null ) return null;

		if ( componentType[ 1 ] === 'b' ) return 'bool';
		if ( componentType[ 1 ] === 'i' ) return 'int';
		if ( componentType[ 1 ] === 'u' ) return 'uint';

		return 'float';

	}

	getVectorType( type ) {

		if ( type === 'color' ) return 'vec3';
		if ( type === 'texture' ) return 'vec4';

		return type;

	}

	getTypeFromLength( length, componentType = 'float' ) {

		if ( length === 1 ) return componentType;

		const baseType = typeFromLength.get( length );
		const prefix = componentType === 'float' ? '' : componentType[ 0 ];

		return prefix + baseType;

	}

	getTypeFromArray( array ) {

		return typeFromArray.get( array.constructor );

	}

	getTypeFromAttribute( attribute ) {

		let dataAttribute = attribute;

		if ( attribute.isInterleavedBufferAttribute ) dataAttribute = attribute.data;

		const array = dataAttribute.array;
		const itemSize = isNonPaddingElementArray.has( array.constructor ) ? attribute.itemSize : dataAttribute.stride || attribute.itemSize;
		const normalized = attribute.normalized;

		let arrayType;

		if ( ! ( attribute instanceof Float16BufferAttribute ) && normalized !== true ) {

			arrayType = this.getTypeFromArray( array );

		}

		return this.getTypeFromLength( itemSize, arrayType );

	}

	getTypeLength( type ) {

		const vecType = this.getVectorType( type );
		const vecNum = /vec([2-4])/.exec( vecType );

		if ( vecNum !== null ) return Number( vecNum[ 1 ] );
		if ( vecType === 'float' || vecType === 'bool' || vecType === 'int' || vecType === 'uint' ) return 1;
		if ( /mat3/.test( type ) === true ) return 9;
		if ( /mat4/.test( type ) === true ) return 16;

		return 0;

	}

	getVectorFromMatrix( type ) {

		return type.replace( 'mat', 'vec' );

	}

	changeComponentType( type, newComponentType ) {

		return this.getTypeFromLength( this.getTypeLength( type ), newComponentType );

	}

	getIntegerType( type ) {

		const componentType = this.getComponentType( type );

		if ( componentType === 'int' || componentType === 'uint' ) return type;

		return this.changeComponentType( type, 'int' );

	}

	addStack() {

		this.stack = stack( this.stack );

		return this.stack;

	}

	removeStack() {

		const currentStack = this.stack;

		this.stack = currentStack.parent;

		return currentStack;

	}

	getDataFromNode( node, shaderStage = this.shaderStage ) {

		const cache = node.isGlobal( this ) ? this.globalCache : this.cache;

		let nodeData = cache.getNodeData( node );

		if ( nodeData === undefined ) {

			nodeData = { vertex: {}, fragment: {}, compute: {} };

			cache.setNodeData( node, nodeData );

		}

		return shaderStage !== null ? nodeData[ shaderStage ] : nodeData;

	}

	getNodeProperties( node, shaderStage = this.shaderStage ) {

		const nodeData = this.getDataFromNode( node, shaderStage );

		return nodeData.properties || ( nodeData.properties = { outputNode: null } );

	}

	getBufferAttributeFromNode( node, type ) {

		const nodeData = this.getDataFromNode( node );

		let bufferAttribute = nodeData.bufferAttribute;

		if ( bufferAttribute === undefined ) {

			const index = this.uniforms.index ++;

			bufferAttribute = new NodeAttribute( 'nodeAttribute' + index, type, node );

			this.bufferAttributes.push( bufferAttribute );

			nodeData.bufferAttribute = bufferAttribute;

		}

		return bufferAttribute;

	}

	getUniformFromNode( node, type, shaderStage = this.shaderStage ) {

		const nodeData = this.getDataFromNode( node, shaderStage );

		let nodeUniform = nodeData.uniform;

		if ( nodeUniform === undefined ) {

			const index = this.uniforms.index ++;

			nodeUniform = new NodeUniform( 'nodeUniform' + index, type, node );

			this.uniforms[ shaderStage ].push( nodeUniform );

			nodeData.uniform = nodeUniform;

		}

		return nodeUniform;

	}

	getVarFromNode( node, type, shaderStage = this.shaderStage ) {

		const nodeData = this.getDataFromNode( node, shaderStage );

		let nodeVar = nodeData.variable;

		if ( nodeVar === undefined ) {

			const vars = this.vars[ shaderStage ];
			const index = vars.length;

			nodeVar = new NodeVar( 'nodeVar' + index, type );

			vars.push( nodeVar );

			nodeData.variable = nodeVar;

		}

		return nodeVar;

	}

	getVaryingFromNode( node, type ) {

		const nodeData = this.getDataFromNode( node, null );

		let nodeVarying = nodeData.varying;

		if ( nodeVarying === undefined ) {

			const varyings = this.varyings;
			const index = varyings.length;

			nodeVarying = new NodeVarying( 'nodeVarying' + index, type );

			varyings.push( nodeVarying );

			nodeData.varying = nodeVarying;

		}

		return nodeVarying;

	}

	getCodeFromNode( node, type, shaderStage = this.shaderStage ) {

		const nodeData = this.getDataFromNode( node );

		let nodeCode = nodeData.code;

		if ( nodeCode === undefined ) {

			const codes = this.codes[ shaderStage ];
			const index = codes.length;

			nodeCode = new NodeCode( 'nodeCode' + index, type );

			codes.push( nodeCode );

			nodeData.code = nodeCode;

		}

		return nodeCode;

	}

	addLineFlowCode( code ) {

		if ( code === '' ) return this;

		code = this.tab + code;

		if ( ! /;\s*$/.test( code ) ) {

			code = code + ';\n';

		}

		this.flow.code += code;

		return this;

	}

	addFlowCode( code ) {

		this.flow.code += code;

		return this;

	}

	addFlowTab() {

		this.tab += '\t';

		return this;

	}

	removeFlowTab() {

		this.tab = this.tab.slice( 0, - 1 );

		return this;

	}

	getFlowData( node/*, shaderStage*/ ) {

		return this.flowsData.get( node );

	}

	flowNode( node ) {

		const output = node.getNodeType( this );

		const flowData = this.flowChildNode( node, output );

		this.flowsData.set( node, flowData );

		return flowData;

	}

	flowChildNode( node, output = null ) {

		const previousFlow = this.flow;

		const flow = {
			code: '',
		};

		this.flow = flow;

		flow.result = node.build( this, output );

		this.flow = previousFlow;

		return flow;

	}

	flowNodeFromShaderStage( shaderStage, node, output = null, propertyName = null ) {

		const previousShaderStage = this.shaderStage;

		this.setShaderStage( shaderStage );

		const flowData = this.flowChildNode( node, output );

		if ( propertyName !== null ) {

			flowData.code += `${ this.tab + propertyName } = ${ flowData.result };\n`;

		}

		this.flowCode[ shaderStage ] = this.flowCode[ shaderStage ] + flowData.code;

		this.setShaderStage( previousShaderStage );

		return flowData;

	}

	getAttributesArray() {

		return this.attributes.concat( this.bufferAttributes );

	}

	getAttributes( /*shaderStage*/ ) {

	}

	getVaryings( /*shaderStage*/ ) {

	}

	getVar( type, name ) {

		return `${type} ${name}`;

	}

	getVars( shaderStage ) {

		let snippet = '';

		const vars = this.vars[ shaderStage ];

		for ( const variable of vars ) {

			snippet += `${ this.getVar( variable.type, variable.name ) }; `;

		}

		return snippet;

	}

	getUniforms( /*shaderStage*/ ) {

	}

	getCodes( shaderStage ) {

		const codes = this.codes[ shaderStage ];

		let code = '';

		for ( const nodeCode of codes ) {

			code += nodeCode.code + '\n';

		}

		return code;

	}

	getHash() {

		return this.vertexShader + this.fragmentShader + this.computeShader;

	}

	setShaderStage( shaderStage ) {

		this.shaderStage = shaderStage;

	}

	getShaderStage() {

		return this.shaderStage;

	}

	setBuildStage( buildStage ) {

		this.buildStage = buildStage;

	}

	getBuildStage() {

		return this.buildStage;

	}

	buildCode() {

	}

	build() {

		// construct() -> stage 1: create possible new nodes and returns an output reference node
		// analyze()   -> stage 2: analyze nodes to possible optimization and validation
		// generate()  -> stage 3: generate shader

		for ( const buildStage of defaultBuildStages ) {

			this.setBuildStage( buildStage );

			if ( this.context.vertex && this.context.vertex.isNode ) {

				this.flowNodeFromShaderStage( 'vertex', this.context.vertex );

			}

			for ( const shaderStage of shaderStages ) {

				this.setShaderStage( shaderStage );

				const flowNodes = this.flowNodes[ shaderStage ];

				for ( const node of flowNodes ) {

					if ( buildStage === 'generate' ) {

						this.flowNode( node );

					} else {

						node.build( this );

					}

				}

			}

		}

		this.setBuildStage( null );
		this.setShaderStage( null );

		// stage 4: build code for a specific output

		this.buildCode();

		return this;

	}

	createNodeMaterial( type ) {

		return createNodeMaterialFromType( type );

	}

	format( snippet, fromType, toType ) {

		fromType = this.getVectorType( fromType );
		toType = this.getVectorType( toType );

		if ( fromType === toType || toType === null || this.isReference( toType ) ) {

			return snippet;

		}

		const fromTypeLength = this.getTypeLength( fromType );
		const toTypeLength = this.getTypeLength( toType );

		if ( fromTypeLength > 4 ) { // fromType is matrix-like

			// @TODO: ignore for now

			return snippet;

		}

		if ( toTypeLength > 4 || toTypeLength === 0 ) { // toType is matrix-like or unknown

			// @TODO: ignore for now

			return snippet;

		}

		if ( fromTypeLength === toTypeLength ) {

			return `${ this.getType( toType ) }( ${ snippet } )`;

		}

		if ( fromTypeLength > toTypeLength ) {

			return this.format( `${ snippet }.${ 'xyz'.slice( 0, toTypeLength ) }`, this.getTypeFromLength( toTypeLength, this.getComponentType( fromType ) ), toType );

		}

		if ( toTypeLength === 4 ) { // toType is vec4-like

			return `${ this.getType( toType ) }( ${ this.format( snippet, fromType, 'vec3' ) }, 1.0 )`;

		}

		if ( fromTypeLength === 2 ) { // fromType is vec2-like and toType is vec3-like

			return `${ this.getType( toType ) }( ${ this.format( snippet, fromType, 'vec2' ) }, 0.0 )`;

		}

		return `${ this.getType( toType ) }( ${ snippet } )`; // fromType is float-like

	}

	getSignature() {

		return `// Three.js r${ REVISION } - NodeMaterial System\n`;

	}

}

class NodeFrame {

	constructor() {

		this.time = 0;
		this.deltaTime = 0;

		this.frameId = 0;
		this.renderId = 0;

		this.startTime = null;

		this.frameMap = new WeakMap();
		this.frameBeforeMap = new WeakMap();
		this.renderMap = new WeakMap();
		this.renderBeforeMap = new WeakMap();

		this.renderer = null;
		this.material = null;
		this.camera = null;
		this.object = null;
		this.scene = null;

	}

	updateBeforeNode( node ) {

		const updateType = node.getUpdateBeforeType();

		if ( updateType === NodeUpdateType.FRAME ) {

			if ( this.frameBeforeMap.get( node ) !== this.frameId ) {

				this.frameBeforeMap.set( node, this.frameId );

				node.updateBefore( this );

			}

		} else if ( updateType === NodeUpdateType.RENDER ) {

			if ( this.renderBeforeMap.get( node ) !== this.renderId || this.frameBeforeMap.get( node ) !== this.frameId ) {

				this.renderBeforeMap.set( node, this.renderId );
				this.frameBeforeMap.set( node, this.frameId );

				node.updateBefore( this );

			}

		} else if ( updateType === NodeUpdateType.OBJECT ) {

			node.updateBefore( this );

		}

	}

	updateNode( node ) {

		const updateType = node.getUpdateType();

		if ( updateType === NodeUpdateType.FRAME ) {

			if ( this.frameMap.get( node ) !== this.frameId ) {

				this.frameMap.set( node, this.frameId );

				node.update( this );

			}

		} else if ( updateType === NodeUpdateType.RENDER ) {

			if ( this.renderMap.get( node ) !== this.renderId || this.frameMap.get( node ) !== this.frameId ) {

				this.renderMap.set( node, this.renderId );
				this.frameMap.set( node, this.frameId );

				node.update( this );

			}

		} else if ( updateType === NodeUpdateType.OBJECT ) {

			node.update( this );

		}

	}

	update() {

		this.frameId ++;

		if ( this.lastTime === undefined ) this.lastTime = performance.now();

		this.deltaTime = ( performance.now() - this.lastTime ) / 1000;

		this.lastTime = performance.now();

		this.time += this.deltaTime;

	}

}

class NodeFunctionInput {

	constructor( type, name, count = null, qualifier = '', isConst = false ) {

		this.type = type;
		this.name = name;
		this.count = count;
		this.qualifier = qualifier;
		this.isConst = isConst;

	}

}

NodeFunctionInput.isNodeFunctionInput = true;

let discardExpression;

class DiscardNode extends CondNode {

	constructor( condNode ) {

		discardExpression = discardExpression || expression( 'discard' );

		super( condNode, discardExpression );

	}

}

const discard = nodeProxy( DiscardNode );

addNodeElement( 'discard', discard );

addNodeClass( DiscardNode );

class MatcapUVNode extends TempNode {

	constructor() {

		super( 'vec2' );

	}

	construct() {

		const x = vec3( positionViewDirection.z, 0, positionViewDirection.x.negate() ).normalize();
		const y = positionViewDirection.cross( x );

		return vec2( x.dot( transformedNormalView ), y.dot( transformedNormalView ) ).mul( 0.495 ).add( 0.5 );

	}

}

nodeImmutable( MatcapUVNode );

addNodeClass( MatcapUVNode );

class TimerNode extends UniformNode {

	constructor( scope = TimerNode.LOCAL, scale = 1, value = 0 ) {

		super( value );

		this.scope = scope;
		this.scale = scale;

		this.updateType = NodeUpdateType.FRAME;

	}
	/*
	@TODO:
	getNodeType( builder ) {

		const scope = this.scope;

		if ( scope === TimerNode.FRAME ) {

			return 'uint';

		}

		return 'float';

	}
*/
	update( frame ) {

		const scope = this.scope;
		const scale = this.scale;

		if ( scope === TimerNode.LOCAL ) {

			this.value += frame.deltaTime * scale;

		} else if ( scope === TimerNode.DELTA ) {

			this.value = frame.deltaTime * scale;

		} else if ( scope === TimerNode.FRAME ) {

			this.value = frame.frameId;

		} else {

			// global

			this.value = frame.time * scale;

		}

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;
		data.scale = this.scale;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;
		this.scale = data.scale;

	}

}

TimerNode.LOCAL = 'local';
TimerNode.GLOBAL = 'global';
TimerNode.DELTA = 'delta';
TimerNode.FRAME = 'frame';

// @TODO: add support to use node in timeScale
const timerLocal = ( timeScale, value = 0 ) => nodeObject( new TimerNode( TimerNode.LOCAL, timeScale, value ) );
nodeImmutable( TimerNode, TimerNode.FRAME );

addNodeClass( TimerNode );

class OscNode extends Node {

	constructor( method = OscNode.SINE, timeNode = timerLocal() ) {

		super();

		this.method = method;
		this.timeNode = timeNode;

	}

	getNodeType( builder ) {

		return this.timeNode.getNodeType( builder );

	}

	construct() {

		const method = this.method;
		const timeNode = nodeObject( this.timeNode );

		let outputNode = null;

		if ( method === OscNode.SINE ) {

			outputNode = timeNode.add( 0.75 ).mul( Math.PI * 2 ).sin().mul( 0.5 ).add( 0.5 );

		} else if ( method === OscNode.SQUARE ) {

			outputNode = timeNode.fract().round();

		} else if ( method === OscNode.TRIANGLE ) {

			outputNode = timeNode.add( 0.5 ).fract().mul( 2 ).sub( 1 ).abs();

		} else if ( method === OscNode.SAWTOOTH ) {

			outputNode = timeNode.fract();

		}

		return outputNode;

	}

	serialize( data ) {

		super.serialize( data );

		data.method = this.method;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.method = data.method;

	}

}

OscNode.SINE = 'sine';
OscNode.SQUARE = 'square';
OscNode.TRIANGLE = 'triangle';
OscNode.SAWTOOTH = 'sawtooth';

nodeProxy( OscNode, OscNode.SINE );
nodeProxy( OscNode, OscNode.SQUARE );
nodeProxy( OscNode, OscNode.TRIANGLE );
nodeProxy( OscNode, OscNode.SAWTOOTH );

addNodeClass( OscNode );

class PackingNode extends TempNode {

	constructor( scope, node ) {

		super();

		this.scope = scope;
		this.node = node;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	construct() {

		const { scope, node } = this;

		let result = null;

		if ( scope === PackingNode.DIRECTION_TO_COLOR ) {

			result = node.mul( 0.5 ).add( 0.5 );

		} else if ( scope === PackingNode.COLOR_TO_DIRECTION ) {

			result = node.mul( 2.0 ).sub( 1 );

		}

		return result;

	}

}

PackingNode.DIRECTION_TO_COLOR = 'directionToColor';
PackingNode.COLOR_TO_DIRECTION = 'colorToDirection';

const directionToColor = nodeProxy( PackingNode, PackingNode.DIRECTION_TO_COLOR );
const colorToDirection = nodeProxy( PackingNode, PackingNode.COLOR_TO_DIRECTION );

addNodeElement( 'directionToColor', directionToColor );
addNodeElement( 'colorToDirection', colorToDirection );

addNodeClass( PackingNode );

class RemapNode extends Node {

	constructor( node, inLowNode, inHighNode, outLowNode, outHighNode ) {

		super();

		this.node = node;
		this.inLowNode = inLowNode;
		this.inHighNode = inHighNode;
		this.outLowNode = outLowNode;
		this.outHighNode = outHighNode;

		this.doClamp = true;

	}

	construct() {

		const { node, inLowNode, inHighNode, outLowNode, outHighNode, doClamp } = this;

		let t = node.sub( inLowNode ).div( inHighNode.sub( inLowNode ) );

		if ( doClamp === true ) t = t.clamp();

		return t.mul( outHighNode.sub( outLowNode ) ).add( outLowNode );

	}

}

const remap = nodeProxy( RemapNode, null, null, { doClamp: false } );
const remapClamp = nodeProxy( RemapNode );

addNodeElement( 'remap', remap );
addNodeElement( 'remapClamp', remapClamp );

addNodeClass( RemapNode );

class RotateUVNode extends TempNode {

	constructor( uvNode, rotationNode, centerNode = vec2( 0.5 ) ) {

		super( 'vec2' );

		this.uvNode = uvNode;
		this.rotationNode = rotationNode;
		this.centerNode = centerNode;

	}

	construct() {

		const { uvNode, rotationNode, centerNode } = this;

		const cosAngle = rotationNode.cos();
		const sinAngle = rotationNode.sin();

		const vector = uvNode.sub( centerNode );

		const rotatedVector = vec2( // @TODO: Maybe we can create mat2 and write something like rotationMatrix.mul( vector )?
			vec2( cosAngle, sinAngle ).dot( vector ),
			vec2( sinAngle.negate(), cosAngle ).dot( vector )
		);

		return rotatedVector.add( centerNode );

	}

}

const rotateUV = nodeProxy( RotateUVNode );

addNodeElement( 'rotateUV', rotateUV );

addNodeClass( RotateUVNode );

class SpriteSheetUVNode extends Node {

	constructor( countNode, uvNode = uv(), frameNode = float( 0 ) ) {

		super( 'vec2' );

		this.countNode = countNode;
		this.uvNode = uvNode;
		this.frameNode = frameNode;

	}

	construct() {

		const { frameNode, uvNode, countNode } = this;

		const { width, height } = countNode;

		const frameNum = frameNode.mod( width.mul( height ) ).floor();

		const column = frameNum.mod( width );
		const row = height.sub( frameNum.add( 1 ).div( width ).ceil() );

		const scale = countNode.reciprocal();
		const uvFrameOffset = vec2( column, row );

		return uvNode.add( uvFrameOffset ).mul( scale );

	}

}

nodeProxy( SpriteSheetUVNode );

addNodeClass( SpriteSheetUVNode );

class TriplanarTexturesNode extends Node {

	constructor( textureXNode, textureYNode = null, textureZNode = null, scaleNode = float( 1 ), positionNode = positionWorld, normalNode = normalWorld ) {

		super( 'vec4' );

		this.textureXNode = textureXNode;
		this.textureYNode = textureYNode;
		this.textureZNode = textureZNode;

		this.scaleNode = scaleNode;

		this.positionNode = positionNode;
		this.normalNode = normalNode;

	}

	construct() {

		const { textureXNode, textureYNode, textureZNode, scaleNode, positionNode, normalNode } = this;

		// Ref: https://github.com/keijiro/StandardTriplanar

		// Blending factor of triplanar mapping
		let bf = normalNode.abs().normalize();
		bf = bf.div( bf.dot( vec3( 1.0 ) ) );

		// Triplanar mapping
		const tx = positionNode.yz.mul( scaleNode );
		const ty = positionNode.zx.mul( scaleNode );
		const tz = positionNode.xy.mul( scaleNode );

		// Base color
		const textureX = textureXNode.value;
		const textureY = textureYNode !== null ? textureYNode.value : textureX;
		const textureZ = textureZNode !== null ? textureZNode.value : textureX;

		const cx = texture( textureX, tx ).mul( bf.x );
		const cy = texture( textureY, ty ).mul( bf.y );
		const cz = texture( textureZ, tz ).mul( bf.z );

		return add( cx, cy, cz );

	}

}

const triplanarTextures = nodeProxy( TriplanarTexturesNode );
const triplanarTexture = ( texture, ...params ) => triplanarTextures( texture, texture, texture, ...params );

addNodeElement( 'triplanarTexture', triplanarTexture );

addNodeClass( TriplanarTexturesNode );

// Mipped Bicubic Texture Filtering by N8
// https://www.shadertoy.com/view/Dl2SDW

const bC = 1.0 / 6.0;

const w0 = ( a ) => mul( bC, mul( a, mul( a, a.negate().add( 3.0 ) ).sub( 3.0 ) ).add( 1.0 ) );

const w1 = ( a ) => mul( bC, mul( a, mul( a, mul( 3.0, a ).sub( 6.0 ) ) ).add( 4.0 ) );

const w2 = ( a ) => mul( bC, mul( a, mul( a, mul( - 3.0, a ).add( 3.0 ) ).add( 3.0 ) ).add( 1.0 ) );

const w3 = ( a ) => mul( bC, pow( a, 3 ) );

const g0 = ( a ) => w0( a ).add( w1( a ) );

const g1 = ( a ) => w2( a ).add( w3( a ) );

// h0 and h1 are the two offset functions
const h0 = ( a ) => add( - 1.0, w1( a ).div( w0( a ).add( w1( a ) ) ) );

const h1 = ( a ) => add( 1.0, w3( a ).div( w2( a ).add( w3( a ) ) ) );

const bicubic = ( textureNode, texelSize, lod ) => {

	const uv = textureNode.uvNode;
	const uvScaled = mul( uv, texelSize.zw ).add( 0.5 );

	const iuv = floor( uvScaled );
	const fuv = fract( uvScaled );

	const g0x = g0( fuv.x );
	const g1x = g1( fuv.x );
	const h0x = h0( fuv.x );
	const h1x = h1( fuv.x );
	const h0y = h0( fuv.y );
	const h1y = h1( fuv.y );

	const p0 = vec2( iuv.x.add( h0x ), iuv.y.add( h0y ) ).sub( 0.5 ).mul( texelSize.xy );
	const p1 = vec2( iuv.x.add( h1x ), iuv.y.add( h0y ) ).sub( 0.5 ).mul( texelSize.xy );
	const p2 = vec2( iuv.x.add( h0x ), iuv.y.add( h1y ) ).sub( 0.5 ).mul( texelSize.xy );
	const p3 = vec2( iuv.x.add( h1x ), iuv.y.add( h1y ) ).sub( 0.5 ).mul( texelSize.xy );

	const a = g0( fuv.y ).mul( add( g0x.mul( textureNode.uv( p0 ).level( lod ) ), g1x.mul( textureNode.uv( p1 ).level( lod ) ) ) );
	const b = g1( fuv.y ).mul( add( g0x.mul( textureNode.uv( p2 ).level( lod ) ), g1x.mul( textureNode.uv( p3 ).level( lod ) ) ) );

	return a.add( b );

};

const textureBicubicMethod = ( textureNode, lodNode ) => {

	const fLodSize = vec2( textureNode.size( int( lodNode ) ) );
	const cLodSize = vec2( textureNode.size( int( lodNode.add( 1.0 ) ) ) );
	const fLodSizeInv = div( 1.0, fLodSize );
	const cLodSizeInv = div( 1.0, cLodSize );
	const fSample = bicubic( textureNode, vec4( fLodSizeInv, fLodSize ), floor( lodNode ) );
	const cSample = bicubic( textureNode, vec4( cLodSizeInv, cLodSize ), ceil( lodNode ) );

	return fract( lodNode ).mix( fSample, cSample );

};

class TextureBicubicNode extends TempNode {

	constructor( textureNode, blurNode = float( 3 ) ) {

		super( 'vec4' );

		this.textureNode = textureNode;
		this.blurNode = blurNode;

	}

	construct() {

		return textureBicubicMethod( this.textureNode, this.blurNode );

	}

}

const textureBicubic = nodeProxy( TextureBicubicNode );

addNodeElement( 'bicubic', textureBicubic );

addNodeClass( TextureBicubicNode );

class PointUVNode extends Node {

	constructor() {

		super( 'vec2' );

		this.isPointUVNode = true;

	}

	generate( /*builder*/ ) {

		return 'vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y )';

	}

}

nodeImmutable( PointUVNode );

addNodeClass( PointUVNode );

class StorageBufferNode extends BufferNode {

	constructor( value, bufferType, bufferCount = 0 ) {

		super( value, bufferType, bufferCount );

		this.isStorageBufferNode = true;

	}

	getInputType( /*builder*/ ) {

		return 'storageBuffer';

	}

}

addNodeClass( StorageBufferNode );

class UserDataNode extends ReferenceNode {

	constructor( property, inputType, userData = null ) {

		super( property, inputType, userData );

		this.userData = userData;

	}

	update( frame ) {

		this.object = this.userData !== null ? this.userData : frame.object.userData;

		super.update( frame );

	}

}

addNodeClass( UserDataNode );

const BurnNode = new ShaderNode( ( { base, blend } ) => {

	const fn = ( c ) => blend[ c ].lessThan( EPSILON ).cond( blend[ c ], base[ c ].oneMinus().div( blend[ c ] ).oneMinus().max( 0 ) );

	return vec3( fn( 'x' ), fn( 'y' ), fn( 'z' ) );

} );

const DodgeNode = new ShaderNode( ( { base, blend } ) => {

	const fn = ( c ) => blend[ c ].equal( 1.0 ).cond( blend[ c ], base[ c ].div( blend[ c ].oneMinus() ).max( 0 ) );

	return vec3( fn( 'x' ), fn( 'y' ), fn( 'z' ) );

} );

const ScreenNode = new ShaderNode( ( { base, blend } ) => {

	const fn = ( c ) => base[ c ].oneMinus().mul( blend[ c ].oneMinus() ).oneMinus();

	return vec3( fn( 'x' ), fn( 'y' ), fn( 'z' ) );

} );

const OverlayNode = new ShaderNode( ( { base, blend } ) => {

	const fn = ( c ) => base[ c ].lessThan( 0.5 ).cond( base[ c ].mul( blend[ c ], 2.0 ), base[ c ].oneMinus().mul( blend[ c ].oneMinus() ).oneMinus() );

	return vec3( fn( 'x' ), fn( 'y' ), fn( 'z' ) );

} );

class BlendModeNode extends TempNode {

	constructor( blendMode, baseNode, blendNode ) {

		super();

		this.blendMode = blendMode;

		this.baseNode = baseNode;
		this.blendNode = blendNode;

	}

	construct() {

		const { blendMode, baseNode, blendNode } = this;
		const params = { base: baseNode, blend: blendNode };

		let outputNode = null;

		if ( blendMode === BlendModeNode.BURN ) {

			outputNode = BurnNode.call( params );

		} else if ( blendMode === BlendModeNode.DODGE ) {

			outputNode = DodgeNode.call( params );

		} else if ( blendMode === BlendModeNode.SCREEN ) {

			outputNode = ScreenNode.call( params );

		} else if ( blendMode === BlendModeNode.OVERLAY ) {

			outputNode = OverlayNode.call( params );

		}

		return outputNode;

	}

}

BlendModeNode.BURN = 'burn';
BlendModeNode.DODGE = 'dodge';
BlendModeNode.SCREEN = 'screen';
BlendModeNode.OVERLAY = 'overlay';

const burn = nodeProxy( BlendModeNode, BlendModeNode.BURN );
const dodge = nodeProxy( BlendModeNode, BlendModeNode.DODGE );
const overlay = nodeProxy( BlendModeNode, BlendModeNode.OVERLAY );
const screen = nodeProxy( BlendModeNode, BlendModeNode.SCREEN );

addNodeElement( 'burn', burn );
addNodeElement( 'dodge', dodge );
addNodeElement( 'overlay', overlay );
addNodeElement( 'screen', screen );

addNodeClass( BlendModeNode );

const saturationNode = new ShaderNode( ( { color, adjustment } ) => {

	return adjustment.mix( luminance( color ), color );

} );

const vibranceNode = new ShaderNode( ( { color, adjustment } ) => {

	const average = add( color.r, color.g, color.b ).div( 3.0 );

	const mx = color.r.max( color.g.max( color.b ) );
	const amt = mx.sub( average ).mul( adjustment ).mul( - 3.0 );

	return mix( color, mx, amt );

} );

const hueNode = new ShaderNode( ( { color, adjustment } ) => {

	const RGBtoYIQ = mat3( 0.299, 0.587, 0.114, 0.595716, - 0.274453, - 0.321263, 0.211456, - 0.522591, 0.311135 );
	const YIQtoRGB = mat3( 1.0, 0.9563, 0.6210, 1.0, - 0.2721, - 0.6474, 1.0, - 1.107, 1.7046 );

	const yiq = RGBtoYIQ.mul( color );

	const hue = yiq.z.atan2( yiq.y ).add( adjustment );
	const chroma = yiq.yz.length();

	return YIQtoRGB.mul( vec3( yiq.x, chroma.mul( hue.cos() ), chroma.mul( hue.sin() ) ) );

} );

class ColorAdjustmentNode extends TempNode {

	constructor( method, colorNode, adjustmentNode = float( 1 ) ) {

		super( 'vec3' );

		this.method = method;

		this.colorNode = colorNode;
		this.adjustmentNode = adjustmentNode;

	}

	construct() {

		const { method, colorNode, adjustmentNode } = this;

		const callParams = { color: colorNode, adjustment: adjustmentNode };

		let outputNode = null;

		if ( method === ColorAdjustmentNode.SATURATION ) {

			outputNode = saturationNode.call( callParams );

		} else if ( method === ColorAdjustmentNode.VIBRANCE ) {

			outputNode = vibranceNode.call( callParams );

		} else if ( method === ColorAdjustmentNode.HUE ) {

			outputNode = hueNode.call( callParams );

		} else ;

		return outputNode;

	}

}

ColorAdjustmentNode.SATURATION = 'saturation';
ColorAdjustmentNode.VIBRANCE = 'vibrance';
ColorAdjustmentNode.HUE = 'hue';

const saturation = nodeProxy( ColorAdjustmentNode, ColorAdjustmentNode.SATURATION );
const vibrance = nodeProxy( ColorAdjustmentNode, ColorAdjustmentNode.VIBRANCE );
const hue = nodeProxy( ColorAdjustmentNode, ColorAdjustmentNode.HUE );

const lumaCoeffs = vec3( 0.2125, 0.7154, 0.0721 );
const luminance = ( color, luma = lumaCoeffs ) => dot( color, luma );

addNodeElement( 'saturation', saturation );
addNodeElement( 'vibrance', vibrance );
addNodeElement( 'hue', hue );

addNodeClass( ColorAdjustmentNode );

class PosterizeNode extends TempNode {

	constructor( sourceNode, stepsNode ) {

		super();

		this.sourceNode = sourceNode;
		this.stepsNode = stepsNode;

	}

	construct() {

		const { sourceNode, stepsNode } = this;

		return sourceNode.mul( stepsNode ).floor().div( stepsNode );

	}

}

const posterize = nodeProxy( PosterizeNode );

addNodeElement( 'posterize', posterize );

addNodeClass( PosterizeNode );

// exposure only
const LinearToneMappingNode = new ShaderNode( ( { color, exposure } ) => {

	return color.mul( exposure ).clamp();

} );

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
const ReinhardToneMappingNode = new ShaderNode( ( { color, exposure } ) => {

	color = color.mul( exposure );

	return color.div( color.add( 1.0 ) ).clamp();

} );

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
const OptimizedCineonToneMappingNode = new ShaderNode( ( { color, exposure } ) => {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color = color.mul( exposure );
	color = color.sub( 0.004 ).max( 0.0 );

	const a = color.mul( color.mul( 6.2 ).add( 0.5 ) );
	const b = color.mul( color.mul( 6.2 ).add( 1.7 ) ).add( 0.06 );

	return a.div( b ).pow( 2.2 );

} );

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
const RRTAndODTFit = new ShaderNode( ( { color } ) => {

	const a = color.mul( color.add( 0.0245786 ) ).sub( 0.000090537 );
	const b = color.mul( color.add( 0.4329510 ).mul( 0.983729 ) ).add( 0.238081 );

	return a.div( b );

} );

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
const ACESFilmicToneMappingNode = new ShaderNode( ( { color, exposure } ) => {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const ACESInputMat = mat3(
		0.59719, 0.35458, 0.04823,
		0.07600, 0.90834, 0.01566,
		0.02840, 0.13383, 0.83777
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const ACESOutputMat = mat3(
		1.60475, - 0.53108, - 0.07367,
		- 0.10208, 1.10813, - 0.00605,
		- 0.00327, - 0.07276, 1.07602
	);

	color = color.mul( exposure ).div( 0.6 );

	color = ACESInputMat.mul( color );

	// Apply RRT and ODT
	color = RRTAndODTFit.call( { color } );

	color = ACESOutputMat.mul( color );

	// Clamp to [0, 1]
	return color.clamp();

} );

const toneMappingLib = {
	[ LinearToneMapping ]: LinearToneMappingNode,
	[ ReinhardToneMapping ]: ReinhardToneMappingNode,
	[ CineonToneMapping ]: OptimizedCineonToneMappingNode,
	[ ACESFilmicToneMapping ]: ACESFilmicToneMappingNode
};

class ToneMappingNode extends TempNode {

	constructor( toneMapping = NoToneMapping, exposureNode = float( 1 ), colorNode = null ) {

		super( 'vec3' );

		this.toneMapping = toneMapping;

		this.exposureNode = exposureNode;
		this.colorNode = colorNode;

	}

	getCacheKey() {

		let cacheKey = super.getCacheKey();
		cacheKey = '{toneMapping:' + this.toneMapping + ',nodes:' + cacheKey + '}';

		return cacheKey;

	}

	construct( builder ) {

		const colorNode = this.colorNode || builder.context.color;
		const toneMapping = this.toneMapping;

		if ( toneMapping === NoToneMapping ) return colorNode;

		const toneMappingParams = { exposure: this.exposureNode, color: colorNode };
		const toneMappingNode = toneMappingLib[ toneMapping ];

		let outputNode = null;

		if ( toneMappingNode ) {

			outputNode = toneMappingNode.call( toneMappingParams );

		} else {

			outputNode = colorNode;

		}

		return outputNode;

	}

}

const toneMapping = ( mapping, exposure, color ) => nodeObject( new ToneMappingNode( mapping, nodeObject( exposure ), nodeObject( color ) ) );

addNodeClass( ToneMappingNode );

let resolution;

class ViewportNode extends Node {

	constructor( scope ) {

		super();

		this.scope = scope;

		this.isViewportNode = true;

	}

	getNodeType() {

		return this.scope === ViewportNode.COORDINATE ? 'vec4' : 'vec2';

	}

	getUpdateType() {

		let updateType = NodeUpdateType.NONE;

		if ( this.scope === ViewportNode.RESOLUTION ) {

			updateType = NodeUpdateType.FRAME;

		}

		this.updateType = updateType;

		return updateType;

	}

	update( { renderer } ) {

		renderer.getDrawingBufferSize( resolution );

	}

	construct( builder ) {

		const scope = this.scope;

		if ( scope === ViewportNode.COORDINATE ) return;

		let output = null;

		if ( scope === ViewportNode.RESOLUTION ) {

			output = uniform( resolution || ( resolution = new Vector2() ) );

		} else {

			const coordinateNode = vec2( new ViewportNode( ViewportNode.COORDINATE ) );
			const resolutionNode = new ViewportNode( ViewportNode.RESOLUTION );

			output = coordinateNode.div( resolutionNode );

			let outX = output.x;
			let outY = output.y;

			if ( /top/i.test( scope ) && builder.isFlipY() ) outY = outY.oneMinus();
			else if ( /bottom/i.test( scope ) && builder.isFlipY() === false ) outY = outY.oneMinus();

			if ( /right/i.test( scope ) ) outX = outX.oneMinus();

			output = vec2( outX, outY );

		}

		return output;

	}

	generate( builder ) {

		if ( this.scope === ViewportNode.COORDINATE ) {

			return builder.getFragCoord();

		}

		return super.generate( builder );

	}

}

ViewportNode.COORDINATE = 'coordinate';
ViewportNode.RESOLUTION = 'resolution';
ViewportNode.TOP_LEFT = 'topLeft';
ViewportNode.BOTTOM_LEFT = 'bottomLeft';
ViewportNode.TOP_RIGHT = 'topRight';
ViewportNode.BOTTOM_RIGHT = 'bottomRight';

nodeImmutable( ViewportNode, ViewportNode.COORDINATE );
nodeImmutable( ViewportNode, ViewportNode.RESOLUTION );
const viewportTopLeft = nodeImmutable( ViewportNode, ViewportNode.TOP_LEFT );
const viewportBottomLeft = nodeImmutable( ViewportNode, ViewportNode.BOTTOM_LEFT );
nodeImmutable( ViewportNode, ViewportNode.TOP_RIGHT );
nodeImmutable( ViewportNode, ViewportNode.BOTTOM_RIGHT );

addNodeClass( ViewportNode );

const _size$1 = new Vector2();

class ViewportTextureNode extends TextureNode {

	constructor( uvNode = viewportTopLeft, levelNode = null, framebufferTexture = null ) {

		if ( framebufferTexture === null ) {

			framebufferTexture = new FramebufferTexture();
			framebufferTexture.minFilter = LinearMipmapLinearFilter;

		}

		super( framebufferTexture, uvNode, levelNode );

		this.generateMipmaps = false;

		this.isOutputTextureNode = true;

		this.updateBeforeType = NodeUpdateType.FRAME;

	}

	updateBefore( frame ) {

		const renderer = frame.renderer;
		renderer.getDrawingBufferSize( _size$1 );

		//

		const framebufferTexture = this.value;

		if ( framebufferTexture.image.width !== _size$1.width || framebufferTexture.image.height !== _size$1.height ) {

			framebufferTexture.image.width = _size$1.width;
			framebufferTexture.image.height = _size$1.height;
			framebufferTexture.needsUpdate = true;

		}

		//

		const currentGenerateMipmaps = framebufferTexture.generateMipmaps;
		framebufferTexture.generateMipmaps = this.generateMipmaps;

		renderer.copyFramebufferToTexture( framebufferTexture );

		framebufferTexture.generateMipmaps = currentGenerateMipmaps;

	}

	clone() {

		return new this.constructor( this.uvNode, this.levelNode, this.value );

	}

}

const viewportTexture = nodeProxy( ViewportTextureNode );
const viewportMipTexture = nodeProxy( ViewportTextureNode, null, null, { generateMipmaps: true } );

addNodeElement( 'viewportTexture', viewportTexture );
addNodeElement( 'viewportMipTexture', viewportMipTexture );

addNodeClass( ViewportTextureNode );

let sharedFramebuffer = null;

class ViewportSharedTextureNode extends ViewportTextureNode {

	constructor( uvNode = viewportTopLeft, levelNode = null ) {

		if ( sharedFramebuffer === null ) {

			sharedFramebuffer = new FramebufferTexture();

		}

		super( uvNode, levelNode, sharedFramebuffer );

	}

}

const viewportSharedTexture = nodeProxy( ViewportSharedTextureNode );

addNodeElement( 'viewportSharedTexture', viewportSharedTexture );

addNodeClass( ViewportSharedTextureNode );

let sharedDepthbuffer = null;

class ViewportDepthTextureNode extends ViewportTextureNode {

	constructor( uvNode = viewportTopLeft, levelNode = null ) {

		if ( sharedDepthbuffer === null ) {

			sharedDepthbuffer = new DepthTexture();
			sharedDepthbuffer.minFilter = LinearMipmapLinearFilter;
			sharedDepthbuffer.type = UnsignedIntType;
			sharedDepthbuffer.format = DepthFormat;

		}

		super( uvNode, levelNode, sharedDepthbuffer );

	}

}

const viewportDepthTexture = nodeProxy( ViewportDepthTextureNode );

addNodeElement( 'viewportDepthTexture', viewportDepthTexture );

addNodeClass( ViewportDepthTextureNode );

class ViewportDepthNode extends Node {

	constructor( scope, textureNode = null ) {

		super( 'float' );

		this.scope = scope;
		this.textureNode = textureNode;

		this.isViewportDepthNode = true;

	}

	construct( /*builder*/ ) {

		const { scope } = this;

		let node = null;

		if ( scope === ViewportDepthNode.DEPTH ) {

			node = viewZToOrthographicDepth( positionView.z, cameraNear, cameraFar );

		} else if ( scope === ViewportDepthNode.DEPTH_TEXTURE ) {

			const texture = this.textureNode || viewportDepthTexture();

			const viewZ = perspectiveDepthToViewZ( texture, cameraNear, cameraFar );
			node = viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

		}

		return node;

	}

}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

// -near maps to 0; -far maps to 1
const viewZToOrthographicDepth = ( viewZ, near, far ) => viewZ.add( near ).div( near.sub( far ) );

// maps perspective depth in [ 0, 1 ] to viewZ
const perspectiveDepthToViewZ = ( depth, near, far ) => near.mul( far ).div( far.sub( near ).mul( depth ).sub( far ) );

ViewportDepthNode.DEPTH = 'depth';
ViewportDepthNode.DEPTH_TEXTURE = 'depthTexture';

nodeImmutable( ViewportDepthNode, ViewportDepthNode.DEPTH );
nodeProxy( ViewportDepthNode, ViewportDepthNode.DEPTH_TEXTURE );

addNodeClass( ViewportDepthNode );

class CodeNode extends Node {

	constructor( code = '', includes = [], language = '' ) {

		super( 'code' );

		this.isCodeNode = true;

		this.code = code;
		this.language = language;

		this._includes = includes;

	}

	setIncludes( includes ) {

		this._includes = includes;

		return this;

	}

	getIncludes( /*builder*/ ) {

		return this._includes;

	}

	generate( builder ) {

		const includes = this.getIncludes( builder );

		for ( const include of includes ) {

			include.build( builder );

		}

		const nodeCode = builder.getCodeFromNode( this, this.getNodeType( builder ) );
		nodeCode.code = this.code;

		return nodeCode.code;

	}

	serialize( data ) {

		super.serialize( data );

		data.code = this.code;
		data.language = this.language;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.code = data.code;
		this.language = data.language;

	}

}

const code = nodeProxy( CodeNode );

addNodeClass( CodeNode );

class FunctionCallNode extends TempNode {

	constructor( functionNode = null, parameters = {} ) {

		super();

		this.functionNode = functionNode;
		this.parameters = parameters;

	}

	setParameters( parameters ) {

		this.parameters = parameters;

		return this;

	}

	getParameters() {

		return this.parameters;

	}

	getNodeType( builder ) {

		return this.functionNode.getNodeType( builder );

	}

	generate( builder ) {

		const params = [];

		const functionNode = this.functionNode;

		const inputs = functionNode.getInputs( builder );
		const parameters = this.parameters;

		if ( Array.isArray( parameters ) ) {

			for ( let i = 0; i < parameters.length; i ++ ) {

				const inputNode = inputs[ i ];
				const node = parameters[ i ];

				params.push( node.build( builder, inputNode.type ) );

			}

		} else {

			for ( const inputNode of inputs ) {

				const node = parameters[ inputNode.name ];

				if ( node !== undefined ) {

					params.push( node.build( builder, inputNode.type ) );

				} else {

					throw new Error( `FunctionCallNode: Input '${inputNode.name}' not found in FunctionNode.` );

				}

			}

		}

		const functionName = functionNode.build( builder, 'property' );

		return `${functionName}( ${params.join( ', ' )} )`;

	}

}

const call = ( func, ...params ) => {

	params = params.length > 1 || ( params[ 0 ] && params[ 0 ].isNode === true ) ? nodeArray( params ) : nodeObjects( params[ 0 ] );

	return nodeObject( new FunctionCallNode( nodeObject( func ), params ) );

};

addNodeElement( 'call', call );

addNodeClass( FunctionCallNode );

class FunctionNode extends CodeNode {

	constructor( code = '', includes = [] ) {

		super( code, includes );

		this.keywords = {};

	}

	getNodeType( builder ) {

		return this.getNodeFunction( builder ).type;

	}

	getInputs( builder ) {

		return this.getNodeFunction( builder ).inputs;

	}

	getNodeFunction( builder ) {

		const nodeData = builder.getDataFromNode( this );

		let nodeFunction = nodeData.nodeFunction;

		if ( nodeFunction === undefined ) {

			nodeFunction = builder.parser.parseFunction( this.code );

			nodeData.nodeFunction = nodeFunction;

		}

		return nodeFunction;

	}

	generate( builder, output ) {

		super.generate( builder );

		const nodeFunction = this.getNodeFunction( builder );

		const name = nodeFunction.name;
		const type = nodeFunction.type;

		const nodeCode = builder.getCodeFromNode( this, type );

		if ( name !== '' ) {

			// use a custom property name

			nodeCode.name = name;

		}

		const propertyName = builder.getPropertyName( nodeCode );

		let code = this.getNodeFunction( builder ).getCode( propertyName );

		const keywords = this.keywords;
		const keywordsProperties = Object.keys( keywords );

		if ( keywordsProperties.length > 0 ) {

			for ( const property of keywordsProperties ) {

				const propertyRegExp = new RegExp( `\\b${property}\\b`, 'g' );
				const nodeProperty = keywords[ property ].build( builder, 'property' );

				code = code.replace( propertyRegExp, nodeProperty );

			}

		}

		nodeCode.code = code;

		if ( output === 'property' ) {

			return propertyName;

		} else {

			return builder.format( `${ propertyName }()`, type, output );

		}

	}

}

const func = ( code, includes ) => nodeObject( new FunctionNode( code, includes ) );

const fn = ( code, includes ) => func( code, includes ).call;

addNodeClass( FunctionNode );

class ScriptableValueNode extends Node {

	constructor( value = null ) {

		super();

		this._value = value;
		this._cache = null;

		this.inputType = null;
		this.outpuType = null;

		this.events = new EventDispatcher();

		this.isScriptableValueNode = true;

	}

	get isScriptableOutputNode() {

		return this.outputType !== null;

	}

	set value( val ) {

		if ( this._value === val ) return;

		if ( this._cache && this.inputType === 'URL' && this.value.value instanceof ArrayBuffer ) {

			URL.revokeObjectURL( this._cache );

			this._cache = null;

		}

		this._value = val;

		this.events.dispatchEvent( { type: 'change' } );

		this.refresh();

	}

	get value() {

		return this._value;

	}

	refresh() {

		this.events.dispatchEvent( { type: 'refresh' } );

	}

	getValue() {

		const value = this.value;

		if ( value && this._cache === null && this.inputType === 'URL' && value.value instanceof ArrayBuffer ) {

			this._cache = URL.createObjectURL( new Blob( [ value.value ] ) );

		} else if ( value && value.value !== null && value.value !== undefined && (
			( ( this.inputType === 'URL' || this.inputType === 'String' ) && typeof value.value === 'string' ) ||
			( this.inputType === 'Number' && typeof value.value === 'number' ) ||
			( this.inputType === 'Vector2' && value.value.isVector2 ) ||
			( this.inputType === 'Vector3' && value.value.isVector3 ) ||
			( this.inputType === 'Vector4' && value.value.isVector4 ) ||
			( this.inputType === 'Color' && value.value.isColor ) ||
			( this.inputType === 'Matrix3' && value.value.isMatrix3 ) ||
			( this.inputType === 'Matrix4' && value.value.isMatrix4 )
		) ) {

			return value.value;

		}

		return this._cache || value;

	}

	getNodeType( builder ) {

		return this.value && this.value.isNode ? this.value.getNodeType( builder ) : 'float';

	}

	construct() {

		return this.value && this.value.isNode ? this.value : float();

	}

	serialize( data ) {

		super.serialize( data );

		if ( this.value !== null ) {

			if ( this.inputType === 'ArrayBuffer' ) {

				data.value = arrayBufferToBase64( this.value );

			} else {

				data.value = this.value ? this.value.toJSON( data.meta ).uuid : null;

			}

		} else {

			data.value = null;

		}

		data.inputType = this.inputType;
		data.outputType = this.outputType;

	}

	deserialize( data ) {

		super.deserialize( data );

		let value = null;

		if ( data.value !== null ) {

			if ( data.inputType === 'ArrayBuffer' ) {

				value = base64ToArrayBuffer( data.value );

			} else if ( data.inputType === 'Texture' ) {

				value = data.meta.textures[ data.value ];

			} else {

				value = data.meta.nodes[ data.value ] || null;

			}

		}

		this.value = value;

		this.inputType = data.inputType;
		this.outputType = data.outputType;

	}

}

const scriptableValue = nodeProxy( ScriptableValueNode );

addNodeElement( 'scriptableValue', scriptableValue );

addNodeClass( ScriptableValueNode );

class Resources extends Map {

	get( key, callback = null, ...params ) {

		if ( this.has( key ) ) return super.get( key );

		if ( callback !== null ) {

			const value = callback( ...params );
			this.set( key, value );
			return value;

		}

	}

}

class Parameters {

	constructor( scriptableNode ) {

		this.scriptableNode = scriptableNode;

	}

	get parameters() {

		return this.scriptableNode.parameters;

	}

	get layout() {

		return this.scriptableNode.getLayout();

	}

	getInputLayout( id ) {

		return this.scriptableNode.getInputLayout( id );

	}

	get( name ) {

		const param = this.parameters[ name ];
		const value = param ? param.getValue() : null;

		return value;

	}

}

const global = new Resources();

class ScriptableNode extends Node {

	constructor( codeNode = null, parameters = {} ) {

		super();

		this.codeNode = codeNode;
		this.parameters = parameters;

		this._local = new Resources();
		this._output = scriptableValue();
		this._outputs = {};
		this._source = this.source;
		this._method = null;
		this._object = null;
		this._value = null;
		this._needsOutputUpdate = true;

		this.onRefresh = this.onRefresh.bind( this );

		this.isScriptableNode = true;

	}

	get source() {

		return this.codeNode ? this.codeNode.code : '';

	}

	setLocal( name, value ) {

		return this._local.set( name, value );

	}

	getLocal( name ) {

		return this._local.get( name );

	}

	onRefresh() {

		this._refresh();

	}

	getInputLayout( id ) {

		for ( const element of this.getLayout() ) {

			if ( element.inputType && ( element.id === id || element.name === id ) ) {

				return element;

			}

		}

	}

	getOutputLayout( id ) {

		for ( const element of this.getLayout() ) {

			if ( element.outputType && ( element.id === id || element.name === id ) ) {

				return element;

			}

		}

	}

	setOutput( name, value ) {

		const outputs = this._outputs;

		if ( outputs[ name ] === undefined ) {

			outputs[ name ] = scriptableValue( value );

		} else {

			outputs[ name ].value = value;

		}

		return this;

	}

	getOutput( name ) {

		return this._outputs[ name ];

	}

	getParameter( name ) {

		return this.parameters[ name ];

	}

	setParameter( name, value ) {

		const parameters = this.parameters;

		if ( value && value.isScriptableNode ) {

			this.deleteParameter( name );

			parameters[ name ] = value;
			parameters[ name ].getDefaultOutput().events.addEventListener( 'refresh', this.onRefresh );

		} else if ( value && value.isScriptableValueNode ) {

			this.deleteParameter( name );

			parameters[ name ] = value;
			parameters[ name ].events.addEventListener( 'refresh', this.onRefresh );

		} else if ( parameters[ name ] === undefined ) {

			parameters[ name ] = scriptableValue( value );
			parameters[ name ].events.addEventListener( 'refresh', this.onRefresh );

		} else {

			parameters[ name ].value = value;

		}

		return this;

	}

	getValue() {

		return this.getDefaultOutput().getValue();

	}

	deleteParameter( name ) {

		let valueNode = this.parameters[ name ];

		if ( valueNode ) {

			if ( valueNode.isScriptableNode ) valueNode = valueNode.getDefaultOutput();

			valueNode.events.removeEventListener( 'refresh', this.onRefresh );

		}

		return this;

	}

	clearParameters() {

		for ( const name of Object.keys( this.parameters ) ) {

			this.deleteParameter( name );

		}

		this.needsUpdate = true;

		return this;

	}

	call( name, ...params ) {

		const object = this.getObject();
		const method = object[ name ];

		if ( typeof method === 'function' ) {

			return method( ...params );

		}

	}

	async callAsync( name, ...params ) {

		const object = this.getObject();
		const method = object[ name ];

		if ( typeof method === 'function' ) {

			return method.constructor.name === 'AsyncFunction' ? await method( ...params ) : method( ...params );

		}

	}

	getNodeType( builder ) {

		return this.getDefaultOutputNode().getNodeType( builder );

	}

	refresh( output = null ) {

		if ( output !== null ) {

			this.getOutput( output ).refresh();

		} else {

			this._refresh();

		}

	}

	getObject() {

		if ( this.needsUpdate ) this.dispose();
		if ( this._object !== null ) return this._object;

		//

		const refresh = () => this.refresh();
		const setOutput = ( id, value ) => this.setOutput( id, value );

		const parameters = new Parameters( this );

		const THREE = global.get( 'THREE' );
		const TSL = global.get( 'TSL' );

		const method = this.getMethod( this.codeNode );
		const params = [ parameters, this._local, global, refresh, setOutput, THREE, TSL ];

		this._object = method( ...params );

		const layout = this._object.layout;

		if ( layout ) {

			if ( layout.cache === false ) {

				this._local.clear();

			}

			// default output
			this._output.outputType = layout.outputType || null;

			if ( Array.isArray( layout.elements ) ) {

				for ( const element of layout.elements ) {

					const id = element.id || element.name;

					if ( element.inputType ) {

						if ( this.getParameter( id ) === undefined ) this.setParameter( id, null );

						this.getParameter( id ).inputType = element.inputType;

					}

					if ( element.outputType ) {

						if ( this.getOutput( id ) === undefined ) this.setOutput( id, null );

						this.getOutput( id ).outputType = element.outputType;

					}

				}

			}

		}

		return this._object;

	}

	deserialize( data ) {

		super.deserialize( data );

		for ( const name in this.parameters ) {

			let valueNode = this.parameters[ name ];

			if ( valueNode.isScriptableNode ) valueNode = valueNode.getDefaultOutput();

			valueNode.events.addEventListener( 'refresh', this.onRefresh );

		}

	}

	getLayout() {

		return this.getObject().layout;

	}

	getDefaultOutputNode() {

		const output = this.getDefaultOutput().value;

		if ( output && output.isNode ) {

			return output;

		}

		return float();

	}

	getDefaultOutput()	{

		return this._exec()._output;

	}

	getMethod() {

		if ( this.needsUpdate ) this.dispose();
		if ( this._method !== null ) return this._method;

		//

		const parametersProps = [ 'parameters', 'local', 'global', 'refresh', 'setOutput', 'THREE', 'TSL' ];
		const interfaceProps = [ 'layout', 'init', 'main', 'dispose' ];

		const properties = interfaceProps.join( ', ' );
		const declarations = 'var ' + properties + '; var output = {};\n';
		const returns = '\nreturn { ...output, ' + properties + ' };';

		const code = declarations + this.codeNode.code + returns;

		//

		this._method = new Function( ...parametersProps, code );

		return this._method;

	}

	dispose() {

		if ( this._method === null ) return;

		if ( this._object && typeof this._object.dispose === 'function' ) {

			this._object.dispose();

		}

		this._method = null;
		this._object = null;
		this._source = null;
		this._value = null;
		this._needsOutputUpdate = true;
		this._output.value = null;
		this._outputs = {};

	}

	construct() {

		return this.getDefaultOutputNode();

	}

	set needsUpdate( value ) {

		if ( value === true ) this.dispose();

	}

	get needsUpdate() {

		return this.source !== this._source;

	}

	_exec()	{

		if ( this.codeNode === null ) return this;

		if ( this._needsOutputUpdate === true ) {

			this._value = this.call( 'main' );

			this._needsOutputUpdate = false;

		}

		this._output.value = this._value;

		return this;

	}

	_refresh() {

		this.needsUpdate = true;

		this._exec();

		this._output.refresh();

	}

}

const scriptable = nodeProxy( ScriptableNode );

addNodeElement( 'scriptable', scriptable );

addNodeClass( ScriptableNode );

class FogNode extends Node {

	constructor( colorNode, factorNode ) {

		super( 'float' );

		this.isFogNode = true;

		this.colorNode = colorNode;
		this.factorNode = factorNode;

	}

	mixAssign( outputNode ) {

		return this.mix( outputNode, this.colorNode );

	}

	construct() {

		return this.factorNode;

	}

}

const fog = nodeProxy( FogNode );

addNodeElement( 'fog', fog );

addNodeClass( FogNode );

class FogRangeNode extends FogNode {

	constructor( colorNode, nearNode, farNode ) {

		super( colorNode );

		this.isFogRangeNode = true;

		this.nearNode = nearNode;
		this.farNode = farNode;

	}

	construct() {

		return smoothstep( this.nearNode, this.farNode, positionView.z.negate() );

	}

}

const rangeFog = nodeProxy( FogRangeNode );

addNodeElement( 'rangeFog', rangeFog );

addNodeClass( FogRangeNode );

class FogExp2Node extends FogNode {

	constructor( colorNode, densityNode ) {

		super( colorNode );

		this.isFogExp2Node = true;

		this.densityNode = densityNode;

	}

	construct() {

		const depthNode = positionView.z.negate();
		const densityNode = this.densityNode;

		return densityNode.mul( densityNode, depthNode, depthNode ).negate().exp().oneMinus();

	}

}

const densityFog = nodeProxy( FogExp2Node );

addNodeElement( 'densityFog', densityFog );

addNodeClass( FogExp2Node );

let min = null;
let max = null;

class RangeNode extends Node {

	constructor( minNode = float(), maxNode = float() ) {

		super();

		this.minNode = minNode;
		this.maxNode = maxNode;

	}

	getVectorLength( builder ) {

		const minLength = builder.getTypeLength( getValueType( this.minNode.value ) );
		const maxLength = builder.getTypeLength( getValueType( this.maxNode.value ) );

		return minLength > maxLength ? minLength : maxLength;

	}

	getNodeType( builder ) {

		return builder.object.isInstancedMesh === true ? builder.getTypeFromLength( this.getVectorLength( builder ) ) : 'float';

	}

	construct( builder ) {

		const object = builder.object;

		let output = null;

		if ( object.isInstancedMesh === true ) {

			let minValue = this.minNode.value;
			let maxValue = this.maxNode.value;

			const minLength = builder.getTypeLength( getValueType( minValue ) );
			const maxLength = builder.getTypeLength( getValueType( maxValue ) );

			min = min || new Vector4();
			max = max || new Vector4();

			min.setScalar( 0 );
			max.setScalar( 0 );

			if ( minLength === 1 ) min.setScalar( minValue );
			else if ( minValue.isColor ) min.set( minValue.r, minValue.g, minValue.b );
			else min.set( minValue.x, minValue.y, minValue.z || 0, minValue.w || 0 );

			if ( maxLength === 1 ) max.setScalar( maxValue );
			else if ( maxValue.isColor ) max.set( maxValue.r, maxValue.g, maxValue.b );
			else max.set( maxValue.x, maxValue.y, maxValue.z || 0, maxValue.w || 0 );

			const stride = 4;

			const length = stride * object.count;
			const array = new Float32Array( length );

			for ( let i = 0; i < length; i ++ ) {

				const index = i % stride;

				const minElementValue = min.getComponent( index );
				const maxElementValue = max.getComponent( index );

				array[ i ] = MathUtils.lerp( minElementValue, maxElementValue, Math.random() );

			}

			const nodeType = this.getNodeType( builder );

			output = buffer( array, 'vec4', object.count ).element( instanceIndex ).convert( nodeType );
			//output = bufferAttribute( array, 'vec4', 4, 0 ).convert( nodeType );

		} else {

			output = float( 0 );

		}

		return output;

	}

}

nodeProxy( RangeNode );

addNodeClass( RangeNode );

class ComputeNode extends Node {

	constructor( computeNode, count, workgroupSize = [ 64 ] ) {

		super( 'void' );

		this.isComputeNode = true;

		this.computeNode = computeNode;

		this.count = count;
		this.workgroupSize = workgroupSize;
		this.dispatchCount = 0;

		this.updateType = NodeUpdateType.OBJECT;

		this.updateDispatchCount();

	}

	updateDispatchCount() {

		const { count, workgroupSize } = this;

		let size = workgroupSize[ 0 ];

		for ( let i = 1; i < workgroupSize.length; i ++ )
			size *= workgroupSize[ i ];

		this.dispatchCount = Math.ceil( count / size );

	}

	onInit() { }

	update( { renderer } ) {

		renderer.compute( this );

	}

	generate( builder ) {

		const { shaderStage } = builder;

		if ( shaderStage === 'compute' ) {

			const snippet = this.computeNode.build( builder, 'void' );

			if ( snippet !== '' ) {

				builder.addLineFlowCode( snippet );

			}

		}

	}

}

const compute = ( node, count, workgroupSize ) => nodeObject( new ComputeNode( nodeObject( node ), count, workgroupSize ) );

addNodeElement( 'compute', compute );

addNodeClass( ComputeNode );

class LightNode extends Node {

	constructor( scope = LightNode.TARGET_DIRECTION, light = null ) {

		super();

		this.scope = scope;
		this.light = light;

	}

	construct() {

		const { scope, light } = this;

		let output = null;

		if ( scope === LightNode.TARGET_DIRECTION ) {

			output = cameraViewMatrix.transformDirection( objectPosition( light ).sub( objectPosition( light.target ) ) );

		}

		return output;

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

LightNode.TARGET_DIRECTION = 'targetDirection';

const lightTargetDirection = nodeProxy( LightNode, LightNode.TARGET_DIRECTION );

addNodeClass( LightNode );

const getDistanceAttenuation = new ShaderNode( ( inputs ) => {

	const { lightDistance, cutoffDistance, decayExponent } = inputs;

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	const distanceFalloff = lightDistance.pow( decayExponent ).max( 0.01 ).reciprocal();

	return cutoffDistance.greaterThan( 0 ).cond(
		distanceFalloff.mul( lightDistance.div( cutoffDistance ).pow4().oneMinus().clamp().pow2() ),
		distanceFalloff
	);

} ); // validated

class PointLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

		this.cutoffDistanceNode = uniform( 0 );
		this.decayExponentNode = uniform( 0 );

	}

	update( frame ) {

		const { light } = this;

		super.update( frame );

		this.cutoffDistanceNode.value = light.distance;
		this.decayExponentNode.value = light.decay;

	}

	construct( builder ) {

		const { colorNode, cutoffDistanceNode, decayExponentNode, light } = this;

		const lVector = objectViewPosition( light ).sub( positionView ); // @TODO: Add it into LightNode

		const lightDirection = lVector.normalize();
		const lightDistance = lVector.length();

		const lightAttenuation = getDistanceAttenuation.call( {
			lightDistance,
			cutoffDistance: cutoffDistanceNode,
			decayExponent: decayExponentNode
		} );

		const lightColor = colorNode.mul( lightAttenuation );

		const lightingModelFunctionNode = builder.context.lightingModelNode;
		const reflectedLight = builder.context.reflectedLight;

		if ( lightingModelFunctionNode && lightingModelFunctionNode.direct ) {

			lightingModelFunctionNode.direct.call( {
				lightDirection,
				lightColor,
				reflectedLight
			} );

		}

	}

}

addLightNode( PointLight, PointLightNode );

addNodeClass( PointLightNode );

class DirectionalLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

	}

	construct( builder ) {

		super.construct( builder );

		const lightColor = this.colorNode;
		const lightDirection = lightTargetDirection( this.light );
		const lightingModelFunctionNode = builder.context.lightingModelNode;
		const reflectedLight = builder.context.reflectedLight;

		if ( lightingModelFunctionNode && lightingModelFunctionNode.direct ) {

			lightingModelFunctionNode.direct.call( {
				lightDirection,
				lightColor,
				reflectedLight
			} );

		}

	}

}

addLightNode( DirectionalLight, DirectionalLightNode );

addNodeClass( DirectionalLightNode );

class SpotLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

		this.coneCosNode = uniform( 0 );
		this.penumbraCosNode = uniform( 0 );

		this.cutoffDistanceNode = uniform( 0 );
		this.decayExponentNode = uniform( 0 );

	}

	update( frame ) {

		super.update( frame );

		const { light } = this;

		this.coneCosNode.value = Math.cos( light.angle );
		this.penumbraCosNode.value = Math.cos( light.angle * ( 1 - light.penumbra ) );

		this.cutoffDistanceNode.value = light.distance;
		this.decayExponentNode.value = light.decay;

	}

	getSpotAttenuation( angleCosine ) {

		const { coneCosNode, penumbraCosNode } = this;

		return smoothstep( coneCosNode, penumbraCosNode, angleCosine );

	}

	construct( builder ) {

		super.construct( builder );

		const { colorNode, cutoffDistanceNode, decayExponentNode, light } = this;

		const lVector = objectViewPosition( light ).sub( positionView ); // @TODO: Add it into LightNode

		const lightDirection = lVector.normalize();
		const angleCos = lightDirection.dot( lightTargetDirection( light ) );
		const spotAttenuation = this.getSpotAttenuation( angleCos );

		const lightDistance = lVector.length();

		const lightAttenuation = getDistanceAttenuation.call( {
			lightDistance,
			cutoffDistance: cutoffDistanceNode,
			decayExponent: decayExponentNode
		} );

		const lightColor = colorNode.mul( spotAttenuation ).mul( lightAttenuation );

		const lightingModelFunctionNode = builder.context.lightingModelNode;
		const reflectedLight = builder.context.reflectedLight;

		if ( lightingModelFunctionNode && lightingModelFunctionNode.direct ) {

			lightingModelFunctionNode.direct.call( {
				lightDirection,
				lightColor,
				reflectedLight
			} );

		}

	}

}

addLightNode( SpotLight, SpotLightNode );

addNodeClass( SpotLightNode );

class IESSpotLight extends SpotLight {

	constructor( color, intensity, distance, angle, penumbra, decay ) {

		super( color, intensity, distance, angle, penumbra, decay );

		this.iesMap = null;

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		this.iesMap = source.iesMap;

		return this;

	}

}

class IESSpotLightNode extends SpotLightNode {

	getSpotAttenuation( angleCosine ) {

		const iesMap = this.light.iesMap;

		let spotAttenuation = null;

		if ( iesMap && iesMap.isTexture === true ) {

			const angle = angleCosine.acos().mul( 1.0 / Math.PI );

			spotAttenuation = texture( iesMap, vec2( angle, 0 ), 0 ).r;

		} else {

			spotAttenuation = super.getSpotAttenuation( angleCosine );

		}

		return spotAttenuation;

	}

}

addLightNode( IESSpotLight, IESSpotLightNode );

addNodeClass( IESSpotLightNode );

class AmbientLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

	}

	construct( { context } ) {

		context.irradiance.addAssign( this.colorNode );

	}

}

addLightNode( AmbientLight, AmbientLightNode );

addNodeClass( AmbientLightNode );

class LightingContextNode extends ContextNode {

	constructor( node, lightingModelNode = null, backdropNode = null, backdropAlphaNode = null ) {

		super( node );

		this.lightingModelNode = lightingModelNode;
		this.backdropNode = backdropNode;
		this.backdropAlphaNode = backdropAlphaNode;

	}

	getNodeType( /*builder*/ ) {

		return 'vec3';

	}

	construct( builder ) {

		const { lightingModelNode, backdropNode, backdropAlphaNode } = this;

		const context = this.context = {}; // reset context
		const properties = builder.getNodeProperties( this );

		const directDiffuse = vec3().temp(),
			directSpecular = vec3().temp(),
			indirectDiffuse = vec3().temp(),
			indirectSpecular = vec3().temp();

		let totalDiffuse = add( directDiffuse, indirectDiffuse );

		if ( backdropNode !== null ) {

			totalDiffuse = vec3( backdropAlphaNode !== null ? mix( totalDiffuse, backdropNode, backdropAlphaNode ) : backdropNode );

		}

		const totalSpecular = add( directSpecular, indirectSpecular );
		const total = add( totalDiffuse, totalSpecular ).temp();

		const reflectedLight = {
			directDiffuse,
			directSpecular,
			indirectDiffuse,
			indirectSpecular,
			total
		};

		const lighting = {
			radiance: vec3().temp(),
			irradiance: vec3().temp(),
			iblIrradiance: vec3().temp(),
			ambientOcclusion: float( 1 ).temp()
		};

		context.reflectedLight = reflectedLight;
		context.lightingModelNode = lightingModelNode || context.lightingModelNode;

		Object.assign( properties, reflectedLight, lighting );
		Object.assign( context, lighting );

		// @TODO: Call needed return a new node ( or rename the ShaderNodeInternal.call() function ), it's not moment to run
		if ( lightingModelNode && lightingModelNode.init ) lightingModelNode.init.call( context, builder.stack, builder );

		if ( lightingModelNode && lightingModelNode.indirectDiffuse ) lightingModelNode.indirectDiffuse.call( context, builder.stack, builder );
		if ( lightingModelNode && lightingModelNode.indirectSpecular ) lightingModelNode.indirectSpecular.call( context, builder.stack, builder );
		if ( lightingModelNode && lightingModelNode.ambientOcclusion ) lightingModelNode.ambientOcclusion.call( context, builder.stack, builder );

		return super.construct( builder );

	}

	generate( builder ) {

		const { context } = this;
		const type = this.getNodeType( builder );

		super.generate( builder, type );

		return context.reflectedLight.total.build( builder, type );

	}

}

const lightingContext = nodeProxy( LightingContextNode );

addNodeElement( 'lightingContext', lightingContext );

addNodeClass( LightingContextNode );

class HemisphereLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

		this.lightPositionNode = objectPosition( light );
		this.lightDirectionNode = this.lightPositionNode.normalize();

		this.groundColorNode = uniform( new Color() );

	}

	update( frame ) {

		const { light } = this;

		super.update( frame );

		this.lightPositionNode.object3d = light;

		this.groundColorNode.value.copy( light.groundColor ).multiplyScalar( light.intensity );

	}

	generate( builder ) {

		const { colorNode, groundColorNode, lightDirectionNode } = this;

		const dotNL = normalView.dot( lightDirectionNode );
		const hemiDiffuseWeight = dotNL.mul( 0.5 ).add( 0.5 );

		const irradiance = mix( groundColorNode, colorNode, hemiDiffuseWeight );

		builder.context.irradiance.addAssign( irradiance );

	}

}

addLightNode( HemisphereLight, HemisphereLightNode );

addNodeClass( HemisphereLightNode );

const checkerShaderNode = new ShaderNode( ( inputs ) => {

	const uv = inputs.uv.mul( 2.0 );

	const cx = uv.x.floor();
	const cy = uv.y.floor();
	const result = cx.add( cy ).mod( 2.0 );

	return result.sign();

} );

class CheckerNode extends TempNode {

	constructor( uvNode = uv() ) {

		super( 'float' );

		this.uvNode = uvNode;

	}

	generate( builder ) {

		return checkerShaderNode.call( { uv: this.uvNode } ).build( builder );

	}

}

const checker = nodeProxy( CheckerNode );

addNodeElement( 'checker', checker );

addNodeClass( CheckerNode );

const defaultValues$7 = new LineBasicMaterial();

class LineBasicNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isLineBasicNodeMaterial = true;

		this.lights = false;
		this.normals = false;

		this.setDefaultValues( defaultValues$7 );

		this.setValues( parameters );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.lightNode = source.lightNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( LineBasicNodeMaterial );

const defaultValues$6 = new MeshNormalMaterial();

class MeshNormalNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshNormalNodeMaterial = true;

		this.setDefaultValues( defaultValues$6 );

		this.setValues( parameters );

	}

	constructDiffuseColor( { stack } ) {

		const opacityNode = this.opacityNode ? float( this.opacityNode ) : materialOpacity;

		stack.assign( diffuseColor, vec4( directionToColor( transformedNormalView ), opacityNode ) );

	}

	copy( source ) {

		this.opacityNode = source.opacityNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( MeshNormalNodeMaterial );

const defaultValues$5 = new MeshBasicMaterial();

class MeshBasicNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshBasicNodeMaterial = true;

		this.lights = false;

		this.setDefaultValues( defaultValues$5 );

		this.setValues( parameters );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.lightNode = source.lightNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( MeshBasicNodeMaterial );

const BRDF_Lambert = new ShaderNode( ( inputs ) => {

	return inputs.diffuseColor.mul( 1 / Math.PI ); // punctual light

} ); // validated

const F_Schlick = new ShaderNode( ( inputs ) => {

	const { f0, f90, dotVH } = inputs;

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	const fresnel = dotVH.mul( - 5.55473 ).sub( 6.98316 ).mul( dotVH ).exp2();

	return f0.mul( fresnel.oneMinus() ).add( f90.mul( fresnel ) );

} ); // validated

const G_BlinnPhong_Implicit = () => float( 0.25 );

const D_BlinnPhong = new ShaderNode( ( { dotNH } ) => {

	return shininess.mul( 0.5 / Math.PI ).add( 1.0 ).mul( dotNH.pow( shininess ) );

} );

const BRDF_BlinnPhong = new ShaderNode( ( { lightDirection } ) => {

	const halfDir = lightDirection.add( positionViewDirection ).normalize();

	const dotNH = transformedNormalView.dot( halfDir ).clamp();
	const dotVH = positionViewDirection.dot( halfDir ).clamp();

	const F = F_Schlick.call( { f0: specularColor, f90: 1.0, dotVH } );
	const G = G_BlinnPhong_Implicit();
	const D = D_BlinnPhong.call( { dotNH } );

	return F.mul( G ).mul( D );

} );

const RE_Direct_BlinnPhong = new ShaderNode( ( { lightDirection, lightColor, reflectedLight } ) => {

	const dotNL = transformedNormalView.dot( lightDirection ).clamp();
	const irradiance = dotNL.mul( lightColor );

	reflectedLight.directDiffuse.addAssign( irradiance.mul( BRDF_Lambert.call( { diffuseColor: diffuseColor.rgb } ) ) );

	reflectedLight.directSpecular.addAssign( irradiance.mul( BRDF_BlinnPhong.call( { lightDirection } ) ).mul( materialReflectivity ) );

} );

const RE_IndirectDiffuse_BlinnPhong = new ShaderNode( ( { irradiance, reflectedLight } ) => {

	reflectedLight.indirectDiffuse.addAssign( irradiance.mul( BRDF_Lambert.call( { diffuseColor } ) ) );

} );

const phongLightingModel = lightingModel( null, RE_Direct_BlinnPhong, RE_IndirectDiffuse_BlinnPhong );

const defaultValues$4 = new MeshPhongMaterial();

class MeshPhongNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshPhongNodeMaterial = true;

		this.lights = true;

		this.shininessNode = null;
		this.specularNode = null;

		this.setDefaultValues( defaultValues$4 );

		this.setValues( parameters );

	}

	constructLightingModel( /*builder*/ ) {

		return phongLightingModel;

	}

	constructVariants( { stack } ) {

		// SHININESS

		const shininessNode = ( this.shininessNode ? float( this.shininessNode ) : materialShininess ).max( 1e-4 ); // to prevent pow( 0.0, 0.0 )

		stack.assign( shininess, shininessNode );

		// SPECULAR COLOR

		const specularNode = this.specularNode || materialSpecularColor;

		stack.assign( specularColor, specularNode );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.shininessNode = source.shininessNode;
		this.specularNode = source.specularNode;

		this.lightNode = source.lightNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( MeshPhongNodeMaterial );

const getGeometryRoughness = new ShaderNode( () => {

	const dxy = normalGeometry.dFdx().abs().max( normalGeometry.dFdy().abs() );
	const geometryRoughness = dxy.x.max( dxy.y ).max( dxy.z );

	return geometryRoughness;

} );

const getRoughness = new ShaderNode( ( inputs ) => {

	const { roughness } = inputs;

	const geometryRoughness = getGeometryRoughness.call();

	let roughnessFactor = roughness.max( 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.
	roughnessFactor = roughnessFactor.add( geometryRoughness );
	roughnessFactor = roughnessFactor.min( 1.0 );

	return roughnessFactor;

} );

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
const V_GGX_SmithCorrelated = new ShaderNode( ( inputs ) => {

	const { alpha, dotNL, dotNV } = inputs;

	const a2 = alpha.pow2();

	const gv = dotNL.mul( a2.add( a2.oneMinus().mul( dotNV.pow2() ) ).sqrt() );
	const gl = dotNV.mul( a2.add( a2.oneMinus().mul( dotNL.pow2() ) ).sqrt() );

	return div( 0.5, gv.add( gl ).max( EPSILON ) );

} ); // validated

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
const D_GGX = new ShaderNode( ( inputs ) => {

	const { alpha, dotNH } = inputs;

	const a2 = alpha.pow2();

	const denom = dotNH.pow2().mul( a2.oneMinus() ).oneMinus(); // avoid alpha = 0 with dotNH = 1

	return a2.div( denom.pow2() ).mul( 1 / Math.PI );

} ); // validated

// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
const BRDF_GGX = new ShaderNode( ( inputs ) => {

	const { lightDirection, f0, f90, roughness } = inputs;

	const normalView = inputs.normalView || transformedNormalView;

	const alpha = roughness.pow2(); // UE4's roughness

	const halfDir = lightDirection.add( positionViewDirection ).normalize();

	const dotNL = normalView.dot( lightDirection ).clamp();
	const dotNV = normalView.dot( positionViewDirection ).clamp(); // @ TODO: Move to core dotNV
	const dotNH = normalView.dot( halfDir ).clamp();
	const dotVH = positionViewDirection.dot( halfDir ).clamp();

	const F = F_Schlick.call( { f0, f90, dotVH } );
	const V = V_GGX_SmithCorrelated.call( { alpha, dotNL, dotNV } );
	const D = D_GGX.call( { alpha, dotNH } );

	return F.mul( V ).mul( D );

} ); // validated

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
const DFGApprox = new ShaderNode( ( inputs ) => {

	const { roughness } = inputs;

	const dotNV = inputs.dotNV || transformedNormalView.dot( positionViewDirection ).clamp(); // @ TODO: Move to core dotNV

	const c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	const r = roughness.mul( c0 ).add( c1 );

	const a004 = r.x.mul( r.x ).min( dotNV.mul( - 9.28 ).exp2() ).mul( r.x ).add( r.y );

	const fab = vec2( - 1.04, 1.04 ).mul( a004 ).add( r.zw );

	return fab;

} );

const EnvironmentBRDF = new ShaderNode( ( inputs ) => {

	const { dotNV, specularColor, specularF90, roughness } = inputs;

	const fab = DFGApprox.call( { dotNV, roughness } );
	return specularColor.mul( fab.x ).add( specularF90.mul( fab.y ) );

} );

const clearcoatF0 = vec3( 0.04 );
const clearcoatF90 = vec3( 1 );

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
const computeMultiscattering = ( singleScatter, multiScatter, specularF90 = float( 1 ) ) => {

	const fab = DFGApprox.call( { roughness } );

	const FssEss = specularColor.mul( fab.x ).add( specularF90.mul( fab.y ) );

	const Ess = fab.x.add( fab.y );
	const Ems = Ess.oneMinus();

	const Favg = specularColor.add( specularColor.oneMinus().mul( 0.047619 ) ); // 1/21
	const Fms = FssEss.mul( Favg ).div( Ems.mul( Favg ).oneMinus() );

	singleScatter.addAssign( FssEss );
	multiScatter.addAssign( Fms.mul( Ems ) );

};

const LM_Init = new ShaderNode( ( context, stack, builder ) => {

	if ( builder.includes( clearcoat ) ) {

		context.clearcoatRadiance = vec3().temp();
		context.reflectedLight.clearcoatSpecular = vec3().temp();

		const dotNVcc = transformedClearcoatNormalView.dot( positionViewDirection ).clamp();

		const Fcc = F_Schlick.call( {
			dotVH: dotNVcc,
			f0: clearcoatF0,
			f90: clearcoatF90
		} );

		const outgoingLight = context.reflectedLight.total;
		const clearcoatLight = outgoingLight.mul( clearcoat.mul( Fcc ).oneMinus() ).add( context.reflectedLight.clearcoatSpecular.mul( clearcoat ) );

		outgoingLight.assign( clearcoatLight );

	}

} );

const RE_IndirectSpecular_Physical = new ShaderNode( ( context ) => {

	const { radiance, iblIrradiance, reflectedLight } = context;

	if ( reflectedLight.clearcoatSpecular ) {

		const dotNVcc = transformedClearcoatNormalView.dot( positionViewDirection ).clamp();

		const clearcoatEnv = EnvironmentBRDF.call( {
			dotNV: dotNVcc,
			specularColor: clearcoatF0,
			specularF90: clearcoatF90,
			roughness: clearcoatRoughness
		} );

		reflectedLight.clearcoatSpecular.addAssign( context.clearcoatRadiance.mul( clearcoatEnv ) );

	}

	// Both indirect specular and indirect diffuse light accumulate here

	const singleScattering = vec3().temp();
	const multiScattering = vec3().temp();
	const cosineWeightedIrradiance = iblIrradiance.mul( 1 / Math.PI );

	computeMultiscattering( singleScattering, multiScattering );

	const totalScattering = singleScattering.add( multiScattering );

	const diffuse = diffuseColor.mul( totalScattering.r.max( totalScattering.g ).max( totalScattering.b ).oneMinus() );

	reflectedLight.indirectSpecular.addAssign( radiance.mul( singleScattering ) );
	reflectedLight.indirectSpecular.addAssign( multiScattering.mul( cosineWeightedIrradiance ) );

	reflectedLight.indirectDiffuse.addAssign( diffuse.mul( cosineWeightedIrradiance ) );

} );

const RE_IndirectDiffuse_Physical = new ShaderNode( ( context ) => {

	const { irradiance, reflectedLight } = context;

	reflectedLight.indirectDiffuse.addAssign( irradiance.mul( BRDF_Lambert.call( { diffuseColor } ) ) );

} );

const RE_Direct_Physical = new ShaderNode( ( inputs ) => {

	const { lightDirection, lightColor, reflectedLight } = inputs;

	const dotNL = transformedNormalView.dot( lightDirection ).clamp();
	const irradiance = dotNL.mul( lightColor );

	if ( reflectedLight.clearcoatSpecular ) {

		const dotNLcc = transformedClearcoatNormalView.dot( lightDirection ).clamp();
		const ccIrradiance = dotNLcc.mul( lightColor );

		reflectedLight.clearcoatSpecular.addAssign( ccIrradiance.mul( BRDF_GGX.call( { lightDirection, f0: clearcoatF0, f90: clearcoatF90, roughness: clearcoatRoughness, normalView: transformedClearcoatNormalView } ) ) );

	}

	reflectedLight.directDiffuse.addAssign( irradiance.mul( BRDF_Lambert.call( { diffuseColor: diffuseColor.rgb } ) ) );

	reflectedLight.directSpecular.addAssign( irradiance.mul( BRDF_GGX.call( { lightDirection, f0: specularColor, f90: 1, roughness } ) ) );

} );

const RE_AmbientOcclusion_Physical = new ShaderNode( ( context ) => {

	const { ambientOcclusion, reflectedLight } = context;

	const dotNV = transformedNormalView.dot( positionViewDirection ).clamp(); // @ TODO: Move to core dotNV

	const aoNV = dotNV.add( ambientOcclusion );
	const aoExp = roughness.mul( - 16.0 ).oneMinus().negate().exp2();

	const aoNode = ambientOcclusion.sub( aoNV.pow( aoExp ).oneMinus() ).clamp();

	reflectedLight.indirectDiffuse.mulAssign( ambientOcclusion );

	reflectedLight.indirectSpecular.mulAssign( aoNode );


} );

const physicalLightingModel = lightingModel( LM_Init, RE_Direct_Physical, RE_IndirectDiffuse_Physical, RE_IndirectSpecular_Physical, RE_AmbientOcclusion_Physical );

const defaultValues$3 = new MeshStandardMaterial();

class MeshStandardNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshStandardNodeMaterial = true;

		this.emissiveNode = null;

		this.metalnessNode = null;
		this.roughnessNode = null;

		this.setDefaultValues( defaultValues$3 );

		this.setValues( parameters );

	}

	constructLightingModel( /*builder*/ ) {

		return physicalLightingModel;

	}

	constructVariants( { stack } ) {

		// METALNESS

		const metalnessNode = this.metalnessNode ? float( this.metalnessNode ) : materialMetalness;

		stack.assign( metalness, metalnessNode );

		// ROUGHNESS

		let roughnessNode = this.roughnessNode ? float( this.roughnessNode ) : materialRoughness;
		roughnessNode = getRoughness.call( { roughness: roughnessNode } );

		stack.assign( roughness, roughnessNode );

		// SPECULAR COLOR

		const specularColorNode = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessNode );

		stack.assign( specularColor, specularColorNode );

		// DIFFUSE COLOR

		stack.assign( diffuseColor, vec4( diffuseColor.rgb.mul( metalnessNode.oneMinus() ), diffuseColor.a ) );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.normalNode = source.normalNode;

		this.emissiveNode = source.emissiveNode;

		this.metalnessNode = source.metalnessNode;
		this.roughnessNode = source.roughnessNode;

		this.envNode = source.envNode;

		this.lightsNode = source.lightsNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( MeshStandardNodeMaterial );

const defaultValues$2 = new MeshPhysicalMaterial();

class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshPhysicalNodeMaterial = true;

		this.clearcoatNode = null;
		this.clearcoatRoughnessNode = null;
		this.clearcoatNormalNode = null;

		this.sheenNode = null;
		this.sheenRoughnessNode = null;

		this.iridescenceNode = null;
		this.iridescenceIORNode = null;
		this.iridescenceThicknessNode = null;

		this.specularIntensityNode = null;
		this.specularColorNode = null;

		this.transmissionNode = null;
		this.thicknessNode = null;
		this.attenuationDistanceNode = null;
		this.attenuationColorNode = null;

		this.setDefaultValues( defaultValues$2 );

		this.setValues( parameters );

	}

	constructVariants( builder ) {

		super.constructVariants( builder );

		const { stack } = builder;

		// CLEARCOAT

		const clearcoatNode = this.clearcoatNode ? float( this.clearcoatNode ) : materialClearcoat;
		const clearcoatRoughnessNode = this.clearcoatRoughnessNode ? float( this.clearcoatRoughnessNode ) : materialClearcoatRoughness;

		stack.assign( clearcoat, clearcoatNode );
		stack.assign( clearcoatRoughness, clearcoatRoughnessNode );

	}

	constructNormal( builder ) {

		super.constructNormal( builder );

		// CLEARCOAT NORMAL

		const clearcoatNormalNode = this.clearcoatNormalNode ? vec3( this.clearcoatNormalNode ) : materialClearcoatNormal;

		builder.stack.assign( transformedClearcoatNormalView, clearcoatNormalNode );

	}

	copy( source ) {

		this.clearcoatNode = source.clearcoatNode;
		this.clearcoatRoughnessNode = source.clearcoatRoughnessNode;
		this.clearcoatNormalNode = source.clearcoatNormalNode;

		this.sheenNode = source.sheenNode;
		this.sheenRoughnessNode = source.sheenRoughnessNode;

		this.iridescenceNode = source.iridescenceNode;
		this.iridescenceIORNode = source.iridescenceIORNode;
		this.iridescenceThicknessNode = source.iridescenceThicknessNode;

		this.specularIntensityNode = source.specularIntensityNode;
		this.specularColorNode = source.specularColorNode;

		this.transmissionNode = source.transmissionNode;
		this.thicknessNode = source.thicknessNode;
		this.attenuationDistanceNode = source.attenuationDistanceNode;
		this.attenuationColorNode = source.attenuationColorNode;

		return super.copy( source );

	}

}

addNodeMaterial( MeshPhysicalNodeMaterial );

const defaultValues$1 = new PointsMaterial();

class PointsNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isPointsNodeMaterial = true;

		this.lights = false;
		this.normals = false;

		this.transparent = true;

		this.colorNode = null;
		this.opacityNode = null;

		this.alphaTestNode = null;

		this.lightNode = null;

		this.sizeNode = null;

		this.positionNode = null;

		this.setDefaultValues( defaultValues$1 );

		this.setValues( parameters );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.lightNode = source.lightNode;

		this.sizeNode = source.sizeNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

addNodeMaterial( PointsNodeMaterial );

const defaultValues = new SpriteMaterial();

class SpriteNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isSpriteNodeMaterial = true;

		this.lights = false;
		this.normals = false;

		this.colorNode = null;
		this.opacityNode = null;

		this.alphaTestNode = null;

		this.lightNode = null;

		this.positionNode = null;
		this.rotationNode = null;
		this.scaleNode = null;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

	constructPosition( { object, context } ) {

		// < VERTEX STAGE >

		const { positionNode, rotationNode, scaleNode } = this;

		const vertex = positionLocal;

		let mvPosition = modelViewMatrix.mul( vec3( positionNode || 0 ) );

		let scale = vec2( modelWorldMatrix[ 0 ].xyz.length(), modelWorldMatrix[ 1 ].xyz.length() );

		if ( scaleNode !== null ) {

			scale = scale.mul( scaleNode );

		}

		let alignedPosition = vertex.xy;

		if ( object.center && object.center.isVector2 === true ) {

			alignedPosition = alignedPosition.sub( uniform( object.center ).sub( 0.5 ) );

		}

		alignedPosition = alignedPosition.mul( scale );

		const rotation = rotationNode || materialRotation;

		const cosAngle = rotation.cos();
		const sinAngle = rotation.sin();

		const rotatedPosition = vec2( // @TODO: Maybe we can create mat2 and write something like rotationMatrix.mul( alignedPosition )?
			vec2( cosAngle, sinAngle.negate() ).dot( alignedPosition ),
			vec2( sinAngle, cosAngle ).dot( alignedPosition )
		);

		mvPosition = vec4( mvPosition.xy.add( rotatedPosition ), mvPosition.zw );

		const modelViewProjection = cameraProjectionMatrix.mul( mvPosition );

		context.vertex = vertex;

		return modelViewProjection;

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.lightNode = source.lightNode;

		this.positionNode = source.positionNode;
		this.rotationNode = source.rotationNode;
		this.scaleNode = source.scaleNode;

		return super.copy( source );

	}

}

addNodeMaterial( SpriteNodeMaterial );

const superFromTypeFunction = MaterialLoader.createMaterialFromType;

MaterialLoader.createMaterialFromType = function ( type ) {

	const material = createNodeMaterialFromType( type );

	if ( material !== undefined ) {

		return material;

	}

	return superFromTypeFunction.call( this, type );

};

class NodeParser {

	parseFunction( /*source*/ ) {

	}

}

class NodeFunction {

	constructor( type, inputs, name = '', presicion = '' ) {

		this.type = type;
		this.inputs = inputs;
		this.name = name;
		this.presicion = presicion;

	}

	getCode( /*name = this.name*/ ) {

	}

}

NodeFunction.isNodeFunction = true;

// Original shader code from:
// https://github.com/AcademySoftwareFoundation/MaterialX/blob/main/libraries/stdlib/genglsl/lib/mx_noise.glsl

const mx_noise = code( `float mx_select(bool b, float t, float f)
{
    return b ? t : f;
}

float mx_negate_if(float val, bool b)
{
    return b ? -val : val;
}

int mx_floor(float x)
{
    return int(floor(x));
}

// return mx_floor as well as the fractional remainder
float mx_floorfrac(float x, out int i)
{
    i = mx_floor(x);
    return x - float(i);
}

float mx_bilerp(float v0, float v1, float v2, float v3, float s, float t)
{
    float s1 = 1.0 - s;
    return (1.0 - t) * (v0*s1 + v1*s) + t * (v2*s1 + v3*s);
}
vec3 mx_bilerp(vec3 v0, vec3 v1, vec3 v2, vec3 v3, float s, float t)
{
    float s1 = 1.0 - s;
    return (1.0 - t) * (v0*s1 + v1*s) + t * (v2*s1 + v3*s);
}
float mx_trilerp(float v0, float v1, float v2, float v3, float v4, float v5, float v6, float v7, float s, float t, float r)
{
    float s1 = 1.0 - s;
    float t1 = 1.0 - t;
    float r1 = 1.0 - r;
    return (r1*(t1*(v0*s1 + v1*s) + t*(v2*s1 + v3*s)) +
            r*(t1*(v4*s1 + v5*s) + t*(v6*s1 + v7*s)));
}
vec3 mx_trilerp(vec3 v0, vec3 v1, vec3 v2, vec3 v3, vec3 v4, vec3 v5, vec3 v6, vec3 v7, float s, float t, float r)
{
    float s1 = 1.0 - s;
    float t1 = 1.0 - t;
    float r1 = 1.0 - r;
    return (r1*(t1*(v0*s1 + v1*s) + t*(v2*s1 + v3*s)) +
            r*(t1*(v4*s1 + v5*s) + t*(v6*s1 + v7*s)));
}

// 2 and 3 dimensional gradient functions - perform a dot product against a
// randomly chosen vector. Note that the gradient vector is not normalized, but
// this only affects the overal "scale" of the result, so we simply account for
// the scale by multiplying in the corresponding "perlin" function.
float mx_gradient_float(uint hash, float x, float y)
{
    // 8 possible directions (+-1,+-2) and (+-2,+-1)
    uint h = hash & 7u;
    float u = mx_select(h<4u, x, y);
    float v = 2.0 * mx_select(h<4u, y, x);
    // compute the dot product with (x,y).
    return mx_negate_if(u, bool(h&1u)) + mx_negate_if(v, bool(h&2u));
}
float mx_gradient_float(uint hash, float x, float y, float z)
{
    // use vectors pointing to the edges of the cube
    uint h = hash & 15u;
    float u = mx_select(h<8u, x, y);
    float v = mx_select(h<4u, y, mx_select((h==12u)||(h==14u), x, z));
    return mx_negate_if(u, bool(h&1u)) + mx_negate_if(v, bool(h&2u));
}
vec3 mx_gradient_vec3(uvec3 hash, float x, float y)
{
    return vec3(mx_gradient_float(hash.x, x, y), mx_gradient_float(hash.y, x, y), mx_gradient_float(hash.z, x, y));
}
vec3 mx_gradient_vec3(uvec3 hash, float x, float y, float z)
{
    return vec3(mx_gradient_float(hash.x, x, y, z), mx_gradient_float(hash.y, x, y, z), mx_gradient_float(hash.z, x, y, z));
}
// Scaling factors to normalize the result of gradients above.
// These factors were experimentally calculated to be:
//    2D:   0.6616
//    3D:   0.9820
float mx_gradient_scale2d(float v) { return 0.6616 * v; }
float mx_gradient_scale3d(float v) { return 0.9820 * v; }
vec3 mx_gradient_scale2d(vec3 v) { return 0.6616 * v; }
vec3 mx_gradient_scale3d(vec3 v) { return 0.9820 * v; }

/// Bitwise circular rotation left by k bits (for 32 bit unsigned integers)
uint mx_rotl32(uint x, int k)
{
    return (x<<k) | (x>>(32-k));
}

void mx_bjmix(inout uint a, inout uint b, inout uint c)
{
    a -= c; a ^= mx_rotl32(c, 4); c += b;
    b -= a; b ^= mx_rotl32(a, 6); a += c;
    c -= b; c ^= mx_rotl32(b, 8); b += a;
    a -= c; a ^= mx_rotl32(c,16); c += b;
    b -= a; b ^= mx_rotl32(a,19); a += c;
    c -= b; c ^= mx_rotl32(b, 4); b += a;
}

// Mix up and combine the bits of a, b, and c (doesn't change them, but
// returns a hash of those three original values).
uint mx_bjfinal(uint a, uint b, uint c)
{
    c ^= b; c -= mx_rotl32(b,14);
    a ^= c; a -= mx_rotl32(c,11);
    b ^= a; b -= mx_rotl32(a,25);
    c ^= b; c -= mx_rotl32(b,16);
    a ^= c; a -= mx_rotl32(c,4);
    b ^= a; b -= mx_rotl32(a,14);
    c ^= b; c -= mx_rotl32(b,24);
    return c;
}

// Convert a 32 bit integer into a floating point number in [0,1]
float mx_bits_to_01(uint bits)
{
    return float(bits) / float(uint(0xffffffff));
}

float mx_fade(float t)
{
   return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

uint mx_hash_int(int x)
{
    uint len = 1u;
    uint seed = uint(0xdeadbeef) + (len << 2u) + 13u;
    return mx_bjfinal(seed+uint(x), seed, seed);
}

uint mx_hash_int(int x, int y)
{
    uint len = 2u;
    uint a, b, c;
    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;
    a += uint(x);
    b += uint(y);
    return mx_bjfinal(a, b, c);
}

uint mx_hash_int(int x, int y, int z)
{
    uint len = 3u;
    uint a, b, c;
    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;
    a += uint(x);
    b += uint(y);
    c += uint(z);
    return mx_bjfinal(a, b, c);
}

uint mx_hash_int(int x, int y, int z, int xx)
{
    uint len = 4u;
    uint a, b, c;
    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;
    a += uint(x);
    b += uint(y);
    c += uint(z);
    mx_bjmix(a, b, c);
    a += uint(xx);
    return mx_bjfinal(a, b, c);
}

uint mx_hash_int(int x, int y, int z, int xx, int yy)
{
    uint len = 5u;
    uint a, b, c;
    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;
    a += uint(x);
    b += uint(y);
    c += uint(z);
    mx_bjmix(a, b, c);
    a += uint(xx);
    b += uint(yy);
    return mx_bjfinal(a, b, c);
}

uvec3 mx_hash_vec3(int x, int y)
{
    uint h = mx_hash_int(x, y);
    // we only need the low-order bits to be random, so split out
    // the 32 bit result into 3 parts for each channel
    uvec3 result;
    result.x = (h      ) & 0xFFu;
    result.y = (h >> 8 ) & 0xFFu;
    result.z = (h >> 16) & 0xFFu;
    return result;
}

uvec3 mx_hash_vec3(int x, int y, int z)
{
    uint h = mx_hash_int(x, y, z);
    // we only need the low-order bits to be random, so split out
    // the 32 bit result into 3 parts for each channel
    uvec3 result;
    result.x = (h      ) & 0xFFu;
    result.y = (h >> 8 ) & 0xFFu;
    result.z = (h >> 16) & 0xFFu;
    return result;
}

float mx_perlin_noise_float(vec2 p)
{
    int X, Y;
    float fx = mx_floorfrac(p.x, X);
    float fy = mx_floorfrac(p.y, Y);
    float u = mx_fade(fx);
    float v = mx_fade(fy);
    float result = mx_bilerp(
        mx_gradient_float(mx_hash_int(X  , Y  ), fx    , fy     ),
        mx_gradient_float(mx_hash_int(X+1, Y  ), fx-1.0, fy     ),
        mx_gradient_float(mx_hash_int(X  , Y+1), fx    , fy-1.0),
        mx_gradient_float(mx_hash_int(X+1, Y+1), fx-1.0, fy-1.0),
        u, v);
    return mx_gradient_scale2d(result);
}

float mx_perlin_noise_float(vec3 p)
{
    int X, Y, Z;
    float fx = mx_floorfrac(p.x, X);
    float fy = mx_floorfrac(p.y, Y);
    float fz = mx_floorfrac(p.z, Z);
    float u = mx_fade(fx);
    float v = mx_fade(fy);
    float w = mx_fade(fz);
    float result = mx_trilerp(
        mx_gradient_float(mx_hash_int(X  , Y  , Z  ), fx    , fy    , fz     ),
        mx_gradient_float(mx_hash_int(X+1, Y  , Z  ), fx-1.0, fy    , fz     ),
        mx_gradient_float(mx_hash_int(X  , Y+1, Z  ), fx    , fy-1.0, fz     ),
        mx_gradient_float(mx_hash_int(X+1, Y+1, Z  ), fx-1.0, fy-1.0, fz     ),
        mx_gradient_float(mx_hash_int(X  , Y  , Z+1), fx    , fy    , fz-1.0),
        mx_gradient_float(mx_hash_int(X+1, Y  , Z+1), fx-1.0, fy    , fz-1.0),
        mx_gradient_float(mx_hash_int(X  , Y+1, Z+1), fx    , fy-1.0, fz-1.0),
        mx_gradient_float(mx_hash_int(X+1, Y+1, Z+1), fx-1.0, fy-1.0, fz-1.0),
        u, v, w);
    return mx_gradient_scale3d(result);
}

vec3 mx_perlin_noise_vec3(vec2 p)
{
    int X, Y;
    float fx = mx_floorfrac(p.x, X);
    float fy = mx_floorfrac(p.y, Y);
    float u = mx_fade(fx);
    float v = mx_fade(fy);
    vec3 result = mx_bilerp(
        mx_gradient_vec3(mx_hash_vec3(X  , Y  ), fx    , fy     ),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y  ), fx-1.0, fy     ),
        mx_gradient_vec3(mx_hash_vec3(X  , Y+1), fx    , fy-1.0),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1), fx-1.0, fy-1.0),
        u, v);
    return mx_gradient_scale2d(result);
}

vec3 mx_perlin_noise_vec3(vec3 p)
{
    int X, Y, Z;
    float fx = mx_floorfrac(p.x, X);
    float fy = mx_floorfrac(p.y, Y);
    float fz = mx_floorfrac(p.z, Z);
    float u = mx_fade(fx);
    float v = mx_fade(fy);
    float w = mx_fade(fz);
    vec3 result = mx_trilerp(
        mx_gradient_vec3(mx_hash_vec3(X  , Y  , Z  ), fx    , fy    , fz     ),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y  , Z  ), fx-1.0, fy    , fz     ),
        mx_gradient_vec3(mx_hash_vec3(X  , Y+1, Z  ), fx    , fy-1.0, fz     ),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1, Z  ), fx-1.0, fy-1.0, fz     ),
        mx_gradient_vec3(mx_hash_vec3(X  , Y  , Z+1), fx    , fy    , fz-1.0),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y  , Z+1), fx-1.0, fy    , fz-1.0),
        mx_gradient_vec3(mx_hash_vec3(X  , Y+1, Z+1), fx    , fy-1.0, fz-1.0),
        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1, Z+1), fx-1.0, fy-1.0, fz-1.0),
        u, v, w);
    return mx_gradient_scale3d(result);
}

float mx_cell_noise_float(float p)
{
    int ix = mx_floor(p);
    return mx_bits_to_01(mx_hash_int(ix));
}

float mx_cell_noise_float(vec2 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    return mx_bits_to_01(mx_hash_int(ix, iy));
}

float mx_cell_noise_float(vec3 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    int iz = mx_floor(p.z);
    return mx_bits_to_01(mx_hash_int(ix, iy, iz));
}

float mx_cell_noise_float(vec4 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    int iz = mx_floor(p.z);
    int iw = mx_floor(p.w);
    return mx_bits_to_01(mx_hash_int(ix, iy, iz, iw));
}

vec3 mx_cell_noise_vec3(float p)
{
    int ix = mx_floor(p);
    return vec3(
            mx_bits_to_01(mx_hash_int(ix, 0)),
            mx_bits_to_01(mx_hash_int(ix, 1)),
            mx_bits_to_01(mx_hash_int(ix, 2))
    );
}

vec3 mx_cell_noise_vec3(vec2 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    return vec3(
            mx_bits_to_01(mx_hash_int(ix, iy, 0)),
            mx_bits_to_01(mx_hash_int(ix, iy, 1)),
            mx_bits_to_01(mx_hash_int(ix, iy, 2))
    );
}

vec3 mx_cell_noise_vec3(vec3 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    int iz = mx_floor(p.z);
    return vec3(
            mx_bits_to_01(mx_hash_int(ix, iy, iz, 0)),
            mx_bits_to_01(mx_hash_int(ix, iy, iz, 1)),
            mx_bits_to_01(mx_hash_int(ix, iy, iz, 2))
    );
}

vec3 mx_cell_noise_vec3(vec4 p)
{
    int ix = mx_floor(p.x);
    int iy = mx_floor(p.y);
    int iz = mx_floor(p.z);
    int iw = mx_floor(p.w);
    return vec3(
            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 0)),
            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 1)),
            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 2))
    );
}

float mx_fractal_noise_float(vec3 p, int octaves, float lacunarity, float diminish)
{
    float result = 0.0;
    float amplitude = 1.0;
    for (int i = 0;  i < octaves; ++i)
    {
        result += amplitude * mx_perlin_noise_float(p);
        amplitude *= diminish;
        p *= lacunarity;
    }
    return result;
}

vec3 mx_fractal_noise_vec3(vec3 p, int octaves, float lacunarity, float diminish)
{
    vec3 result = vec3(0.0);
    float amplitude = 1.0;
    for (int i = 0;  i < octaves; ++i)
    {
        result += amplitude * mx_perlin_noise_vec3(p);
        amplitude *= diminish;
        p *= lacunarity;
    }
    return result;
}

vec2 mx_fractal_noise_vec2(vec3 p, int octaves, float lacunarity, float diminish)
{
    return vec2(mx_fractal_noise_float(p, octaves, lacunarity, diminish),
                mx_fractal_noise_float(p+vec3(19, 193, 17), octaves, lacunarity, diminish));
}

vec4 mx_fractal_noise_vec4(vec3 p, int octaves, float lacunarity, float diminish)
{
    vec3  c = mx_fractal_noise_vec3(p, octaves, lacunarity, diminish);
    float f = mx_fractal_noise_float(p+vec3(19, 193, 17), octaves, lacunarity, diminish);
    return vec4(c, f);
}

float mx_worley_distance(vec2 p, int x, int y, int xoff, int yoff, float jitter, int metric)
{
    vec3  tmp = mx_cell_noise_vec3(vec2(x+xoff, y+yoff));
    vec2  off = vec2(tmp.x, tmp.y);

    off -= 0.5f;
    off *= jitter;
    off += 0.5f;

    vec2 cellpos = vec2(float(x), float(y)) + off;
    vec2 diff = cellpos - p;
    if (metric == 2)
        return abs(diff.x) + abs(diff.y);       // Manhattan distance
    if (metric == 3)
        return max(abs(diff.x), abs(diff.y));   // Chebyshev distance
    // Either Euclidian or Distance^2
    return dot(diff, diff);
}

float mx_worley_distance(vec3 p, int x, int y, int z, int xoff, int yoff, int zoff, float jitter, int metric)
{
    vec3  off = mx_cell_noise_vec3(vec3(x+xoff, y+yoff, z+zoff));

    off -= 0.5f;
    off *= jitter;
    off += 0.5f;

    vec3 cellpos = vec3(float(x), float(y), float(z)) + off;
    vec3 diff = cellpos - p;
    if (metric == 2)
        return abs(diff.x) + abs(diff.y) + abs(diff.z); // Manhattan distance
    if (metric == 3)
        return max(max(abs(diff.x), abs(diff.y)), abs(diff.z)); // Chebyshev distance
    // Either Euclidian or Distance^2
    return dot(diff, diff);
}

float mx_worley_noise_float(vec2 p, float jitter, int metric)
{
    int X, Y;
    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));
    float sqdist = 1e6f;        // Some big number for jitter > 1 (not all GPUs may be IEEE)
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);
            sqdist = min(sqdist, dist);
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}

vec2 mx_worley_noise_vec2(vec2 p, float jitter, int metric)
{
    int X, Y;
    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));
    vec2 sqdist = vec2(1e6f, 1e6f);
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);
            if (dist < sqdist.x)
            {
                sqdist.y = sqdist.x;
                sqdist.x = dist;
            }
            else if (dist < sqdist.y)
            {
                sqdist.y = dist;
            }
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}

vec3 mx_worley_noise_vec3(vec2 p, float jitter, int metric)
{
    int X, Y;
    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));
    vec3 sqdist = vec3(1e6f, 1e6f, 1e6f);
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);
            if (dist < sqdist.x)
            {
                sqdist.z = sqdist.y;
                sqdist.y = sqdist.x;
                sqdist.x = dist;
            }
            else if (dist < sqdist.y)
            {
                sqdist.z = sqdist.y;
                sqdist.y = dist;
            }
            else if (dist < sqdist.z)
            {
                sqdist.z = dist;
            }
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}

float mx_worley_noise_float(vec3 p, float jitter, int metric)
{
    int X, Y, Z;
    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));
    float sqdist = 1e6f;
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            for (int z = -1; z <= 1; ++z)
            {
                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);
                sqdist = min(sqdist, dist);
            }
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}

vec2 mx_worley_noise_vec2(vec3 p, float jitter, int metric)
{
    int X, Y, Z;
    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));
    vec2 sqdist = vec2(1e6f, 1e6f);
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            for (int z = -1; z <= 1; ++z)
            {
                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);
                if (dist < sqdist.x)
                {
                    sqdist.y = sqdist.x;
                    sqdist.x = dist;
                }
                else if (dist < sqdist.y)
                {
                    sqdist.y = dist;
                }
            }
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}

vec3 mx_worley_noise_vec3(vec3 p, float jitter, int metric)
{
    int X, Y, Z;
    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));
    vec3 sqdist = vec3(1e6f, 1e6f, 1e6f);
    for (int x = -1; x <= 1; ++x)
    {
        for (int y = -1; y <= 1; ++y)
        {
            for (int z = -1; z <= 1; ++z)
            {
                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);
                if (dist < sqdist.x)
                {
                    sqdist.z = sqdist.y;
                    sqdist.y = sqdist.x;
                    sqdist.x = dist;
                }
                else if (dist < sqdist.y)
                {
                    sqdist.z = sqdist.y;
                    sqdist.y = dist;
                }
                else if (dist < sqdist.z)
                {
                    sqdist.z = dist;
                }
            }
        }
    }
    if (metric == 0)
        sqdist = sqrt(sqdist);
    return sqdist;
}` );

const includes$1 = [ mx_noise ];

fn( 'float mx_perlin_noise_float( any p )', includes$1 );
fn( 'vec2 mx_perlin_noise_vec2( any p )', includes$1 );
fn( 'vec3 mx_perlin_noise_vec3( any p )', includes$1 );

fn( 'float mx_cell_noise_float( vec3 p )', includes$1 );

fn( 'float mx_worley_noise_float( any p, float jitter, int metric )', includes$1 );
fn( 'float mx_worley_noise_vec2( any p, float jitter, int metric )', includes$1 );
fn( 'float mx_worley_noise_vec3( any p, float jitter, int metric )', includes$1 );

fn( 'float mx_fractal_noise_float( vec3 p, int octaves, float lacunarity, float diminish )', includes$1 );
fn( 'float mx_fractal_noise_vec2( vec3 p, int octaves, float lacunarity, float diminish )', includes$1 );
fn( 'float mx_fractal_noise_vec3( vec3 p, int octaves, float lacunarity, float diminish )', includes$1 );
fn( 'float mx_fractal_noise_vec4( vec3 p, int octaves, float lacunarity, float diminish )', includes$1 );

// Original shader code from:
// https://github.com/AcademySoftwareFoundation/MaterialX/blob/main/libraries/stdlib/genglsl/lib/mx_hsv.glsl

fn( `vec3 mx_hsvtorgb(vec3 hsv)
{
    // Reference for this technique: Foley & van Dam
    float h = hsv.x; float s = hsv.y; float v = hsv.z;
    if (s < 0.0001f) {
      return vec3 (v, v, v);
    } else {
        h = 6.0f * (h - floor(h));  // expand to [0..6)
        int hi = int(trunc(h));
        float f = h - float(hi);
        float p = v * (1.0f-s);
        float q = v * (1.0f-s*f);
        float t = v * (1.0f-s*(1.0f-f));
        if (hi == 0)
            return vec3 (v, t, p);
        else if (hi == 1)
            return vec3 (q, v, p);
        else if (hi == 2)
            return vec3 (p, v, t);
        else if (hi == 3)
            return vec3 (p, q, v);
        else if (hi == 4)
            return vec3 (t, p, v);
        return vec3 (v, p, q);
    }
}` );

fn( `vec3 mx_rgbtohsv(vec3 c)
{
    // See Foley & van Dam
    float r = c.x; float g = c.y; float b = c.z;
    float mincomp = min (r, min(g, b));
    float maxcomp = max (r, max(g, b));
    float delta = maxcomp - mincomp;  // chroma
    float h, s, v;
    v = maxcomp;
    if (maxcomp > 0.0f)
        s = delta / maxcomp;
    else s = 0.0f;
    if (s <= 0.0f)
        h = 0.0f;
    else {
        if      (r >= maxcomp) h = (g-b) / delta;
        else if (g >= maxcomp) h = 2.0f + (b-r) / delta;
        else                   h = 4.0f + (r-g) / delta;
        h *= (1.0f/6.0f);
        if (h < 0.0f)
            h += 1.0f;
    }
    return vec3(h, s, v);
}` );

// Original shader code from:
// https://github.com/AcademySoftwareFoundation/MaterialX/blob/main/libraries/stdlib/genglsl/lib/mx_transform_color.glsl

const mx_transform_color = code( `#define M_AP1_TO_REC709 mat3(1.705079555511475, -0.1297005265951157, -0.02416634373366833, -0.6242334842681885, 1.138468623161316, -0.1246141716837883, -0.0808461606502533, -0.008768022060394287, 1.148780584335327)

vec3 mx_srgb_texture_to_lin_rec709(vec3 color)
{
    bvec3 isAbove = greaterThan(color, vec3(0.04045));
    vec3 linSeg = color / 12.92;
    vec3 powSeg = pow(max(color + vec3(0.055), vec3(0.0)) / 1.055, vec3(2.4));
    return mix(linSeg, powSeg, isAbove);
}` );

const includes = [ mx_transform_color ];

fn( 'vec3 mx_srgb_texture_to_lin_rec709( vec3 color )', includes );

function painterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.material.id !== b.material.id ) {

		return a.material.id - b.material.id;

	} else if ( a.z !== b.z ) {

		return a.z - b.z;

	} else {

		return a.id - b.id;

	}

}

function reversePainterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.z !== b.z ) {

		return b.z - a.z;

	} else {

		return a.id - b.id;

	}

}

class RenderList {

	constructor() {

		this.renderItems = [];
		this.renderItemsIndex = 0;

		this.opaque = [];
		this.transparent = [];

		this.lightsNode = lights( [] );
		this.lightsArray = [];

	}

	init() {

		this.renderItemsIndex = 0;

		this.opaque.length = 0;
		this.transparent.length = 0;
		this.lightsArray.length = 0;

		return this;

	}

	getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

		let renderItem = this.renderItems[ this.renderItemsIndex ];

		if ( renderItem === undefined ) {

			renderItem = {
				id: object.id,
				object: object,
				geometry: geometry,
				material: material,
				groupOrder: groupOrder,
				renderOrder: object.renderOrder,
				z: z,
				group: group
			};

			this.renderItems[ this.renderItemsIndex ] = renderItem;

		} else {

			renderItem.id = object.id;
			renderItem.object = object;
			renderItem.geometry = geometry;
			renderItem.material = material;
			renderItem.groupOrder = groupOrder;
			renderItem.renderOrder = object.renderOrder;
			renderItem.z = z;
			renderItem.group = group;

		}

		this.renderItemsIndex ++;

		return renderItem;

	}

	push( object, geometry, material, groupOrder, z, group ) {

		const renderItem = this.getNextRenderItem( object, geometry, material, groupOrder, z, group );

		( material.transparent === true ? this.transparent : this.opaque ).push( renderItem );

	}

	unshift( object, geometry, material, groupOrder, z, group ) {

		const renderItem = this.getNextRenderItem( object, geometry, material, groupOrder, z, group );

		( material.transparent === true ? this.transparent : this.opaque ).unshift( renderItem );

	}

	pushLight( light ) {

		this.lightsArray.push( light );

	}

	getLightsNode() {

		return this.lightsNode.fromLights( this.lightsArray );

	}

	sort( customOpaqueSort, customTransparentSort ) {

		if ( this.opaque.length > 1 ) this.opaque.sort( customOpaqueSort || painterSortStable );
		if ( this.transparent.length > 1 ) this.transparent.sort( customTransparentSort || reversePainterSortStable );

	}

	finish() {

		// update lights

		this.lightsNode.fromLights( this.lightsArray );

		// Clear references from inactive renderItems in the list

		for ( let i = this.renderItemsIndex, il = this.renderItems.length; i < il; i ++ ) {

			const renderItem = this.renderItems[ i ];

			if ( renderItem.id === null ) break;

			renderItem.id = null;
			renderItem.object = null;
			renderItem.geometry = null;
			renderItem.material = null;
			renderItem.program = null;
			renderItem.group = null;

		}

	}

}

class RenderLists {

	constructor() {

		this.lists = new ChainMap();

	}

	get( scene, camera ) {

		const lists = this.lists;
		const keys = [ scene, camera ];

		let list = lists.get( keys );

		if ( list === undefined ) {

			list = new RenderList();
			lists.set( keys, list );

		}

		return list;

	}

	dispose() {

		this.lists = new ChainMap();

	}

}

let id$1 = 0;

class RenderContext {

	constructor() {

		this.id = id$1 ++;

		this.color = true;
		this.clearColor = true;
		this.clearColorValue = { r: 0, g: 0, b: 0, a: 1 };

		this.depth = true;
		this.clearDepth = true;
		this.clearDepthValue = 1;

		this.stencil = true;
		this.clearStencil = true;
		this.clearStencilValue = 1;

		this.viewport = false;
		this.viewportValue = new Vector4();

		this.scissor = false;
		this.scissorValue = new Vector4();

		this.texture = null;
		this.depthTexture = null;
		this.activeCubeFace = 0;

	}

}

class RenderContexts {

	constructor() {

		this.renderStates = new ChainMap();

	}

	get( scene, camera ) {

		const chainKey = [ scene, camera ];

		let renderState = this.renderStates.get( chainKey );

		if ( renderState === undefined ) {

			renderState = new RenderContext();

			this.renderStates.set( chainKey, renderState );

		}

		return renderState;

	}

	dispose() {

		this.renderStates = new ChainMap();

	}

}

const _size = new Vector2();

class Textures extends DataMap {

	constructor( backend, info ) {

		super();

		this.backend = backend;
		this.info = info;

	}

	updateRenderTarget( renderTarget ) {

		const renderTargetData = this.get( renderTarget );

		const texture = renderTarget.texture;
		const size = this.getSize( texture );

		let depthTexture = renderTarget.depthTexture || renderTargetData.depthTexture;

		if ( depthTexture === undefined ) {

			depthTexture = new DepthTexture();
			depthTexture.format = DepthStencilFormat;
			depthTexture.type = UnsignedInt248Type;
			depthTexture.image.width = size.width;
			depthTexture.image.height = size.height;

		}

		if ( renderTargetData.width !== size.width || size.height !== renderTargetData.height ) {

			texture.needsUpdate = true;
			depthTexture.needsUpdate = true;

			depthTexture.image.width = size.width;
			depthTexture.image.height = size.height;

		}

		renderTargetData.width = size.width;
		renderTargetData.height = size.height;
		renderTargetData.texture = texture;
		renderTargetData.depthTexture = depthTexture;

		this.updateTexture( texture );
		this.updateTexture( depthTexture );

		// dispose handler

		if ( renderTargetData.initialized !== true ) {

			renderTargetData.initialized = true;

			// dispose

			const onDispose = () => {

				renderTarget.removeEventListener( 'dispose', onDispose );

				this._destroyTexture( texture );
				this._destroyTexture( depthTexture );

			};

			renderTarget.addEventListener( 'dispose', onDispose );

		}

	}

	updateTexture( texture ) {

		const textureData = this.get( texture );
		if ( textureData.initialized === true && textureData.version === texture.version ) return;

		const isRenderTexture = texture.isRenderTargetTexture || texture.isDepthTexture || texture.isFramebufferTexture;
		const backend = this.backend;

		if ( isRenderTexture && textureData.initialized === true ) {

			// it's an update

			backend.destroySampler( texture );
			backend.destroyTexture( texture );

		}

		//

		if ( isRenderTexture ) {

			backend.createSampler( texture );
			backend.createTexture( texture );

		} else {

			const needsCreate = textureData.initialized !== true;

			if ( needsCreate ) backend.createSampler( texture );

			if ( texture.version > 0 ) {

				const image = texture.image;

				if ( image === undefined ) ; else if ( image.complete === false ) ; else {

					if ( textureData.isDefaultTexture === undefined || textureData.isDefaultTexture === true ) {

						backend.createTexture( texture );

						textureData.isDefaultTexture = false;

					}

					backend.updateTexture( texture );

				}

			} else {

				// async update

				backend.createDefaultTexture( texture );

				textureData.isDefaultTexture = true;

			}

		}

		// dispose handler

		if ( textureData.initialized !== true ) {

			textureData.initialized = true;

			//

			this.info.memory.textures ++;

			// dispose

			const onDispose = () => {

				texture.removeEventListener( 'dispose', onDispose );

				this._destroyTexture( texture );

				this.info.memory.textures --;

			};

			texture.addEventListener( 'dispose', onDispose );

		}

		//

		textureData.version = texture.version;

	}

	getSize( texture, target = _size ) {

		if ( texture.isCubeTexture ) {

			target.width = texture.image[ 0 ].width;
			target.height = texture.image[ 0 ].height;

		} else {

			target.width = texture.image.width;
			target.height = texture.image.height;

		}

		return target;

	}

	_destroyTexture( texture ) {

		this.backend.destroySampler( texture );
		this.backend.destroyTexture( texture );

		this.delete( texture );

	}

}

let _clearAlpha;
const _clearColor = new Color();

class Background extends DataMap {

	constructor( renderer, nodes ) {

		super();

		this.renderer = renderer;
		this.nodes = nodes;

		this.boxMesh = null;
		this.boxMeshNode = null;

	}

	update( scene, renderList, renderContext ) {

		const renderer = this.renderer;
		const background = ( scene.isScene === true ) ? this.nodes.getBackgroundNode( scene ) || scene.background : null;

		let forceClear = false;

		if ( background === null ) {

			// no background settings, use clear color configuration from the renderer

			_clearColor.copy( renderer._clearColor );
			_clearAlpha = renderer._clearAlpha;

		} else if ( background.isColor === true ) {

			// background is an opaque color

			_clearColor.copy( background );
			_clearAlpha = 1;
			forceClear = true;

		} else if ( background.isNode === true ) {

			const sceneData = this.get( scene );
			const backgroundNode = background;

			_clearColor.copy( renderer._clearColor );
			_clearAlpha = renderer._clearAlpha;

			let boxMesh = this.boxMesh;

			if ( boxMesh === null ) {

				this.boxMeshNode = context( backgroundNode, {
					// @TODO: Add Texture2D support using node context
					getUVNode: () => positionWorldDirection
				} );

				const nodeMaterial = new MeshBasicNodeMaterial();
				nodeMaterial.colorNode = this.boxMeshNode;
				nodeMaterial.side = BackSide;
				nodeMaterial.depthTest = false;
				nodeMaterial.depthWrite = false;
				nodeMaterial.fog = false;

				this.boxMesh = boxMesh = new Mesh( new SphereGeometry( 1, 32, 32 ), nodeMaterial );
				boxMesh.frustumCulled = false;

				boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

					const scale = camera.far;

					this.matrixWorld.makeScale( scale, scale, scale ).copyPosition( camera.matrixWorld );

				};

			}

			const backgroundCacheKey = backgroundNode.getCacheKey();

			if ( sceneData.backgroundCacheKey !== backgroundCacheKey ) {

				this.boxMeshNode.node = backgroundNode;

				boxMesh.material.needsUpdate = true;

				sceneData.backgroundCacheKey = backgroundCacheKey;

			}

			renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

		} else ;

		//

		if ( renderer.autoClear === true || forceClear === true ) {

			_clearColor.multiplyScalar( _clearAlpha );

			const clearColorValue = renderContext.clearColorValue;

			clearColorValue.r = _clearColor.r;
			clearColorValue.g = _clearColor.g;
			clearColorValue.b = _clearColor.b;
			clearColorValue.a = _clearAlpha;

			renderContext.depthClearValue = renderer._clearDepth;
			renderContext.stencilClearValue = renderer._clearStencil;

			renderContext.clearColor = renderer.autoClearColor === true;
			renderContext.clearDepth = renderer.autoClearDepth === true;
			renderContext.clearStencil = renderer.autoClearStencil === true;

		} else {

			renderContext.clearColor = false;
			renderContext.clearDepth = false;
			renderContext.clearStencil = false;

		}

	}

}

class Nodes extends DataMap {

	constructor( renderer, backend ) {

		super();

		this.renderer = renderer;
		this.backend = backend;
		this.nodeFrame = new NodeFrame();

	}

	getForRender( renderObject ) {

		const renderObjectData = this.get( renderObject );

		let nodeBuilder = renderObjectData.nodeBuilder;

		if ( nodeBuilder === undefined ) {

			nodeBuilder = this.backend.createNodeBuilder( renderObject.object, this.renderer );
			nodeBuilder.material = renderObject.material;
			nodeBuilder.lightsNode = renderObject.lightsNode;
			nodeBuilder.environmentNode = this.getEnvironmentNode( renderObject.scene );
			nodeBuilder.fogNode = this.getFogNode( renderObject.scene );
			nodeBuilder.toneMappingNode = this.getToneMappingNode();
			nodeBuilder.build();

			renderObjectData.nodeBuilder = nodeBuilder;

		}

		return nodeBuilder;

	}

	getForCompute( computeNode ) {

		const computeData = this.get( computeNode );

		let nodeBuilder = computeData.nodeBuilder;

		if ( nodeBuilder === undefined ) {

			nodeBuilder = this.backend.createNodeBuilder( computeNode, this.renderer );
			nodeBuilder.build();

			computeData.nodeBuilder = nodeBuilder;

		}

		return nodeBuilder;

	}

	getEnvironmentNode( scene ) {

		return scene.environmentNode || this.get( scene ).environmentNode || null;

	}

	getBackgroundNode( scene ) {

		return scene.backgroundNode || this.get( scene ).backgroundNode || null;

	}

	getFogNode( scene ) {

		return scene.fogNode || this.get( scene ).fogNode || null;

	}

	getToneMappingNode() {

		return this.renderer.toneMappingNode || this.get( this.renderer ).toneMappingNode || null;

	}

	getCacheKey( scene, lightsNode ) {

		const environmentNode = this.getEnvironmentNode( scene );
		const fogNode = this.getFogNode( scene );
		const toneMappingNode = this.getToneMappingNode();

		const cacheKey = [];

		if ( lightsNode ) cacheKey.push( 'lightsNode:' + lightsNode.getCacheKey() );
		if ( environmentNode ) cacheKey.push( 'environmentNode:' + environmentNode.getCacheKey() );
		if ( fogNode ) cacheKey.push( 'fogNode:' + fogNode.getCacheKey() );
		if ( toneMappingNode ) cacheKey.push( 'toneMappingNode:' + toneMappingNode.getCacheKey() );

		return '{' + cacheKey.join( ',' ) + '}';

	}

	updateScene( scene ) {

		this.updateEnvironment( scene );
		this.updateFog( scene );
		this.updateBackground( scene );
		this.updateToneMapping();

	}

	updateToneMapping() {

		const renderer = this.renderer;
		const rendererData = this.get( renderer );
		const rendererToneMapping = renderer.toneMapping;

		if ( rendererToneMapping !== NoToneMapping ) {

			if ( rendererData.toneMapping !== rendererToneMapping ) {

				const rendererToneMappingNode = rendererData.rendererToneMappingNode || toneMapping( rendererToneMapping, reference( 'toneMappingExposure', 'float', renderer ) );
				rendererToneMappingNode.toneMapping = rendererToneMapping;

				rendererData.rendererToneMappingNode = rendererToneMappingNode;
				rendererData.toneMappingNode = rendererToneMappingNode;
				rendererData.toneMapping = rendererToneMapping;

			}

		} else {

			// Don't delete rendererData.rendererToneMappingNode
			delete rendererData.toneMappingNode;
			delete rendererData.toneMapping;

		}

	}

	updateBackground( scene ) {

		const sceneData = this.get( scene );
		const background = scene.background;

		if ( background ) {

			if ( sceneData.background !== background ) {

				let backgroundNode = null;

				if ( background.isCubeTexture === true ) {

					backgroundNode = cubeTexture( background, transformDirection( positionWorld, modelWorldMatrix ) );

				} else if ( background.isTexture === true ) {

					let nodeUV = null;

					if ( background.mapping === EquirectangularReflectionMapping || background.mapping === EquirectangularRefractionMapping ) {

						nodeUV = equirectUV();

					} else {

						nodeUV = viewportBottomLeft;

					}

					backgroundNode = texture( background, nodeUV );

				} else if ( background.isColor !== true ) ;

				sceneData.backgroundNode = backgroundNode;
				sceneData.background = background;

			}

		} else if ( sceneData.backgroundNode ) {

			delete sceneData.backgroundNode;
			delete sceneData.background;

		}

	}

	updateFog( scene ) {

		const sceneData = this.get( scene );
		const fog = scene.fog;

		if ( fog ) {

			if ( sceneData.fog !== fog ) {

				let fogNode = null;

				if ( fog.isFogExp2 ) {

					fogNode = densityFog( reference( 'color', 'color', fog ), reference( 'density', 'float', fog ) );

				} else if ( fog.isFog ) {

					fogNode = rangeFog( reference( 'color', 'color', fog ), reference( 'near', 'float', fog ), reference( 'far', 'float', fog ) );

				} else ;

				sceneData.fogNode = fogNode;
				sceneData.fog = fog;

			}

		} else {

			delete sceneData.fogNode;
			delete sceneData.fog;

		}

	}

	updateEnvironment( scene ) {

		const sceneData = this.get( scene );
		const environment = scene.environment;

		if ( environment ) {

			if ( sceneData.environment !== environment ) {

				let environmentNode = null;

				if ( environment.isCubeTexture === true ) {

					environmentNode = cubeTexture( environment );

				} else if ( environment.isTexture === true ) {

					environmentNode = texture( environment );

				} else ;

				sceneData.environmentNode = environmentNode;
				sceneData.environment = environment;

			}

		} else if ( sceneData.environmentNode ) {

			delete sceneData.environmentNode;
			delete sceneData.environment;

		}

	}

	getNodeFrame( renderObject ) {

		const nodeFrame = this.nodeFrame;
		nodeFrame.scene = renderObject.scene;
		nodeFrame.object = renderObject.object;
		nodeFrame.camera = renderObject.camera;
		nodeFrame.renderer = renderObject.renderer;
		nodeFrame.material = renderObject.material;

		return nodeFrame;

	}

	updateBefore( renderObject ) {

		const nodeFrame = this.getNodeFrame( renderObject );
		const nodeBuilder = this.getForRender( renderObject );

		for ( const node of nodeBuilder.updateBeforeNodes ) {

			nodeFrame.updateBeforeNode( node );

		}

	}

	updateForCompute( /*computeNode*/ ) { }

	updateForRender( renderObject ) {

		const nodeFrame = this.getNodeFrame( renderObject );
		const nodeBuilder = this.getForRender( renderObject );

		for ( const node of nodeBuilder.updateNodes ) {

			nodeFrame.updateNode( node );

		}

	}

	dispose() {

		super.dispose();

		this.nodeFrame = new NodeFrame();

	}

}

const _drawingBufferSize = new Vector2();
const _screen = new Vector4();
const _frustum = new Frustum();
const _projScreenMatrix = new Matrix4();
const _vector3 = new Vector3();

class Renderer {

	constructor( backend ) {

		this.isRenderer = true;

		// public

		this.domElement = backend.getDomElement();

		this.backend = backend;

		this.autoClear = true;
		this.autoClearColor = true;
		this.autoClearDepth = true;
		this.autoClearStencil = true;

		this.outputColorSpace = SRGBColorSpace;

		this.toneMapping = NoToneMapping;
		this.toneMappingExposure = 1.0;

		this.sortObjects = true;

		this.depth = true;
		this.stencil = true;

		// internals

		this._pixelRatio = 1;
		this._width = this.domElement.width;
		this._height = this.domElement.height;

		this._viewport = new Vector4( 0, 0, this._width, this._height );
		this._scissor = new Vector4( 0, 0, this._width, this._height );
		this._scissorTest = false;

		this._info = null;
		this._properties = null;
		this._attributes = null;
		this._geometries = null;
		this._nodes = null;
		this._bindings = null;
		this._objects = null;
		this._pipelines = null;
		this._renderLists = null;
		this._renderContexts = null;
		this._textures = null;
		this._background = null;

		this._animation = new Animation();

		this._currentRenderContext = null;
		this._lastRenderContext = null;

		this._opaqueSort = null;
		this._transparentSort = null;

		this._clearAlpha = 1;
		this._clearColor = new Color( 0x000000 );
		this._clearDepth = 1;
		this._clearStencil = 0;

		this._renderTarget = null;
		this._currentActiveCubeFace = 0;

		this._initialized = false;
		this._initPromise = null;

		// backwards compatibility

		this.shadowMap = {
			enabled: false,
			type: null
		};

		this.xr = {
			enabled: false
		};

	}

	async init() {

		if ( this._initialized ) {

			throw new Error( 'Renderer: Backend has already been initialized.' );

		}

		if ( this._initPromise !== null ) {

			return this._initPromise;

		}

		this._initPromise = new Promise( async ( resolve, reject ) => {

			const backend = this.backend;

			try {

				await backend.init( this );

			} catch ( error ) {

				reject( error );
				return;

			}

			this._info = new Info();
			this._nodes = new Nodes( this, backend );
			this._attributes = new Attributes( backend );
			this._background = new Background( this, this._nodes );
			this._geometries = new Geometries( this._attributes, this._info );
			this._textures = new Textures( backend, this._info );
			this._pipelines = new Pipelines( backend, this._nodes );
			this._bindings = new Bindings( backend, this._nodes, this._textures, this._attributes, this._pipelines, this._info );
			this._objects = new RenderObjects( this, this._nodes, this._geometries, this._pipelines, this._info );
			this._renderLists = new RenderLists();
			this._renderContexts = new RenderContexts();

			//

			this._animation.setNodes( this._nodes );
			this._animation.start();

			this._initialized = true;

			resolve();

		} );

		return this._initPromise;

	}

	get coordinateSystem() {

		return this.backend.coordinateSystem;

	}

	async compile( /*scene, camera*/ ) {

	}

	async render( scene, camera ) {

		if ( this._initialized === false ) await this.init();

		// preserve render tree

		const nodeFrame = this._nodes.nodeFrame;

		const previousRenderId = nodeFrame.renderId;
		const previousRenderState = this._currentRenderContext;

		//

		const renderContext = this._renderContexts.get( scene, camera );
		const renderTarget = this._renderTarget;
		const activeCubeFace = this._activeCubeFace;

		this._currentRenderContext = renderContext;

		nodeFrame.renderId ++;

		//

		const coordinateSystem = this.coordinateSystem;

		if ( camera.coordinateSystem !== coordinateSystem ) {

			camera.coordinateSystem = coordinateSystem;

			camera.updateProjectionMatrix();

		}

		//

		if ( this._animation.isAnimating === false ) nodeFrame.update();

		if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();

		if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

		if ( this._info.autoReset === true ) this._info.reset();

		this._info.render.frame ++;

		//

		let viewport = this._viewport;
		let scissor = this._scissor;
		let pixelRatio = this._pixelRatio;

		if ( renderTarget !== null ) {

			viewport = renderTarget.viewport;
			scissor = renderTarget.scissor;
			pixelRatio = 1;

		}

		this.getDrawingBufferSize( _drawingBufferSize );

		_screen.set( 0, 0, _drawingBufferSize.width, _drawingBufferSize.height );

		const minDepth = ( viewport.minDepth === undefined ) ? 0 : viewport.minDepth;
		const maxDepth = ( viewport.maxDepth === undefined ) ? 1 : viewport.maxDepth;

		renderContext.viewportValue.copy( viewport ).multiplyScalar( pixelRatio ).floor();
		renderContext.viewportValue.minDepth = minDepth;
		renderContext.viewportValue.maxDepth = maxDepth;
		renderContext.viewport = renderContext.viewportValue.equals( _screen ) === false;

		renderContext.scissorValue.copy( scissor ).multiplyScalar( pixelRatio ).floor();
		renderContext.scissor = this._scissorTest && renderContext.scissorValue.equals( _screen ) === false;

		renderContext.depth = this.depth;
		renderContext.stencil = this.stencil;

		//

		_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromProjectionMatrix( _projScreenMatrix, coordinateSystem );

		const renderList = this._renderLists.get( scene, camera );
		renderList.init();

		this._projectObject( scene, camera, 0, renderList );

		renderList.finish();

		if ( this.sortObjects === true ) {

			renderList.sort( this._opaqueSort, this._transparentSort );

		}

		//

		if ( renderTarget !== null ) {

			this._textures.updateRenderTarget( renderTarget );

			const renderTargetData = this._textures.get( renderTarget );

			renderContext.texture = renderTargetData.texture;
			renderContext.depthTexture = renderTargetData.depthTexture;

		} else {

			renderContext.texture = null;
			renderContext.depthTexture = null;

		}

		renderContext.activeCubeFace = activeCubeFace;

		//

		this._nodes.updateScene( scene );

		//

		this._background.update( scene, renderList, renderContext );

		//

		this.backend.beginRender( renderContext );

		// process render lists

		const opaqueObjects = renderList.opaque;
		const transparentObjects = renderList.transparent;
		const lightsNode = renderList.lightsNode;

		if ( opaqueObjects.length > 0 ) this._renderObjects( opaqueObjects, camera, scene, lightsNode );
		if ( transparentObjects.length > 0 ) this._renderObjects( transparentObjects, camera, scene, lightsNode );

		// finish render pass

		this.backend.finishRender( renderContext );

		// restore render tree

		nodeFrame.renderId = previousRenderId;
		this._currentRenderContext = previousRenderState;

		this._lastRenderContext = renderContext;

	}

	setAnimationLoop( callback ) {

		if ( this._initialized === false ) this.init();

		const animation = this._animation;

		animation.setAnimationLoop( callback );

		( callback === null ) ? animation.stop() : animation.start();

	}

	async getArrayBuffer( attribute ) {

		return await this.backend.getArrayBuffer( attribute );

	}

	getContext() {

		return this._context;

	}

	getPixelRatio() {

		return this._pixelRatio;

	}

	getDrawingBufferSize( target ) {

		return target.set( this._width * this._pixelRatio, this._height * this._pixelRatio ).floor();

	}

	getSize( target ) {

		return target.set( this._width, this._height );

	}

	setPixelRatio( value = 1 ) {

		this._pixelRatio = value;

		this.setSize( this._width, this._height, false );

	}

	setDrawingBufferSize( width, height, pixelRatio ) {

		this._width = width;
		this._height = height;

		this._pixelRatio = pixelRatio;

		this.domElement.width = Math.floor( width * pixelRatio );
		this.domElement.height = Math.floor( height * pixelRatio );

		this.setViewport( 0, 0, width, height );

		if ( this._initialized ) this.backend.updateSize();

	}

	setSize( width, height, updateStyle = true ) {

		this._width = width;
		this._height = height;

		this.domElement.width = Math.floor( width * this._pixelRatio );
		this.domElement.height = Math.floor( height * this._pixelRatio );

		if ( updateStyle === true ) {

			this.domElement.style.width = width + 'px';
			this.domElement.style.height = height + 'px';

		}

		this.setViewport( 0, 0, width, height );

		if ( this._initialized ) this.backend.updateSize();

	}

	setOpaqueSort( method ) {

		this._opaqueSort = method;

	}

	setTransparentSort( method ) {

		this._transparentSort = method;

	}

	getScissor( target ) {

		const scissor = this._scissor;

		target.x = scissor.x;
		target.y = scissor.y;
		target.width = scissor.width;
		target.height = scissor.height;

		return target;

	}

	setScissor( x, y, width, height ) {

		const scissor = this._scissor;

		if ( x.isVector4 ) {

			scissor.copy( x );

		} else {

			scissor.set( x, y, width, height );

		}

	}

	getScissorTest() {

		return this._scissorTest;

	}

	setScissorTest( boolean ) {

		this._scissorTest = boolean;

	}

	getViewport( target ) {

		return target.copy( this._viewport );

	}

	setViewport( x, y, width, height, minDepth = 0, maxDepth = 1 ) {

		const viewport = this._viewport;

		if ( x.isVector4 ) {

			viewport.copy( x );

		} else {

			viewport.set( x, y, width, height );

		}

		viewport.minDepth = minDepth;
		viewport.maxDepth = maxDepth;

	}

	getClearColor( target ) {

		return target.copy( this._clearColor );

	}

	setClearColor( color, alpha = 1 ) {

		this._clearColor.set( color );
		this._clearAlpha = alpha;

	}

	getClearAlpha() {

		return this._clearAlpha;

	}

	setClearAlpha( alpha ) {

		this._clearAlpha = alpha;

	}

	getClearDepth() {

		return this._clearDepth;

	}

	setClearDepth( depth ) {

		this._clearDepth = depth;

	}

	getClearStencil() {

		return this._clearStencil;

	}

	setClearStencil( stencil ) {

		this._clearStencil = stencil;

	}

	clear( color = true, depth = true, stencil = true ) {

		const renderContext = this._currentRenderContext || this._lastRenderContext;

		if ( renderContext ) this.backend.clear( renderContext, color, depth, stencil );

	}

	clearColor() {

		this.clear( true, false, false );

	}

	clearDepth() {

		this.clear( false, true, false );

	}

	clearStencil() {

		this.clear( false, false, true );

	}

	dispose() {

		this._objects.dispose();
		this._properties.dispose();
		this._pipelines.dispose();
		this._nodes.dispose();
		this._bindings.dispose();
		this._info.dispose();
		this._renderLists.dispose();
		this._renderContexts.dispose();
		this._textures.dispose();

		this.setRenderTarget( null );
		this.setAnimationLoop( null );

	}

	setRenderTarget( renderTarget, activeCubeFace = 0 ) {

		this._renderTarget = renderTarget;
		this._activeCubeFace = activeCubeFace;

	}

	async compute( computeNodes ) {

		if ( this._initialized === false ) await this.init();

		const backend = this.backend;
		const pipelines = this._pipelines;
		const computeGroup = Array.isArray( computeNodes ) ? computeNodes : [ computeNodes ];

		backend.beginCompute( computeGroup );

		for ( const computeNode of computeGroup ) {

			// onInit

			if ( pipelines.has( computeNode ) === false ) {

				computeNode.onInit( { renderer: this } );

			}

			this._nodes.updateForCompute( computeNode );
			this._bindings.updateForCompute( computeNode );

			const computePipeline = pipelines.getForCompute( computeNode );
			const computeBindings = this._bindings.getForCompute( computeNode );

			backend.compute( computeGroup, computeNode, computeBindings, computePipeline );

		}

		backend.finishCompute( computeGroup );

	}

	getRenderTarget() {

		return this._renderTarget;

	}

	hasFeature( name ) {

		return this.backend.hasFeature( name );

	}

	copyFramebufferToTexture( framebufferTexture ) {

		const renderContext = this._currentRenderContext || this._lastRenderContext;

		this._textures.updateTexture( framebufferTexture );

		this.backend.copyFramebufferToTexture( framebufferTexture, renderContext );

	}

	_projectObject( object, camera, groupOrder, renderList ) {

		if ( object.visible === false ) return;

		const visible = object.layers.test( camera.layers );

		if ( visible ) {

			if ( object.isGroup ) {

				groupOrder = object.renderOrder;

			} else if ( object.isLOD ) {

				if ( object.autoUpdate === true ) object.update( camera );

			} else if ( object.isLight ) {

				renderList.pushLight( object );

			} else if ( object.isSprite ) {

				if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

					if ( this.sortObjects === true ) {

						_vector3.setFromMatrixPosition( object.matrixWorld ).applyMatrix4( _projScreenMatrix );

					}

					const geometry = object.geometry;
					const material = object.material;

					if ( material.visible ) {

						renderList.push( object, geometry, material, groupOrder, _vector3.z, null );

					}

				}

			} else if ( object.isLineLoop ) ; else if ( object.isMesh || object.isLine || object.isPoints ) {

				if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

					const geometry = object.geometry;
					const material = object.material;

					if ( this.sortObjects === true ) {

						if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

						_vector3
							.copy( geometry.boundingSphere.center )
							.applyMatrix4( object.matrixWorld )
							.applyMatrix4( _projScreenMatrix );

					}

					if ( Array.isArray( material ) ) {

						const groups = geometry.groups;

						for ( let i = 0, l = groups.length; i < l; i ++ ) {

							const group = groups[ i ];
							const groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								renderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

							}

						}

					} else if ( material.visible ) {

						renderList.push( object, geometry, material, groupOrder, _vector3.z, null );

					}

				}

			}

		}

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			this._projectObject( children[ i ], camera, groupOrder, renderList );

		}

	}

	_renderObjects( renderList, camera, scene, lightsNode ) {

		// process renderable objects

		for ( let i = 0, il = renderList.length; i < il; i ++ ) {

			const renderItem = renderList[ i ];

			// @TODO: Add support for multiple materials per object. This will require to extract
			// the material from the renderItem object and pass it with its group data to _renderObject().

			const { object, geometry, material, group } = renderItem;

			if ( camera.isArrayCamera ) {

				const cameras = camera.cameras;

				for ( let j = 0, jl = cameras.length; j < jl; j ++ ) {

					const camera2 = cameras[ j ];

					if ( object.layers.test( camera2.layers ) ) {

						const vp = camera2.viewport;
						const minDepth = ( vp.minDepth === undefined ) ? 0 : vp.minDepth;
						const maxDepth = ( vp.maxDepth === undefined ) ? 1 : vp.maxDepth;

						const viewportValue = this._currentRenderContext.viewportValue;
						viewportValue.copy( vp ).multiplyScalar( this._pixelRatio ).floor();
						viewportValue.minDepth = minDepth;
						viewportValue.maxDepth = maxDepth;

						this.backend.updateViewport( this._currentRenderContext );

						this._renderObject( object, scene, camera2, geometry, material, group, lightsNode );

					}

				}

			} else {

				this._renderObject( object, scene, camera, geometry, material, group, lightsNode );

			}

		}

	}

	_renderObject( object, scene, camera, geometry, material, group, lightsNode ) {

		material = scene.overrideMaterial !== null ? scene.overrideMaterial : material;

		//

		object.onBeforeRender( this, scene, camera, geometry, material, group );

		//

		const renderObject = this._objects.get( object, material, scene, camera, lightsNode );
		renderObject.context = this._currentRenderContext;

		//

		this._nodes.updateBefore( renderObject );

		//

		object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
		object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

		//

		this._nodes.updateForRender( renderObject );
		this._geometries.update( renderObject );
		this._bindings.updateForRender( renderObject );

		//

		this.backend.draw( renderObject, this._info );

	}

}

const GPUPrimitiveTopology = {
	PointList: 'point-list',
	LineList: 'line-list',
	LineStrip: 'line-strip',
	TriangleList: 'triangle-list',
	TriangleStrip: 'triangle-strip',
};

const GPUCompareFunction = {
	Never: 'never',
	Less: 'less',
	Equal: 'equal',
	LessEqual: 'less-equal',
	Greater: 'greater',
	NotEqual: 'not-equal',
	GreaterEqual: 'greater-equal',
	Always: 'always'
};

const GPUStoreOp = {
	Store: 'store',
	Discard: 'discard'
};

const GPULoadOp = {
	Load: 'load',
	Clear: 'clear'
};

const GPUFrontFace = {
	CCW: 'ccw',
	CW: 'cw'
};

const GPUCullMode = {
	None: 'none',
	Front: 'front',
	Back: 'back'
};

const GPUIndexFormat = {
	Uint16: 'uint16',
	Uint32: 'uint32'
};

const GPUTextureFormat = {

	// 8-bit formats

	R8Unorm: 'r8unorm',
	R8Snorm: 'r8snorm',
	R8Uint: 'r8uint',
	R8Sint: 'r8sint',

	// 16-bit formats

	R16Uint: 'r16uint',
	R16Sint: 'r16sint',
	R16Float: 'r16float',
	RG8Unorm: 'rg8unorm',
	RG8Snorm: 'rg8snorm',
	RG8Uint: 'rg8uint',
	RG8Sint: 'rg8sint',

	// 32-bit formats

	R32Uint: 'r32uint',
	R32Sint: 'r32sint',
	R32Float: 'r32float',
	RG16Uint: 'rg16uint',
	RG16Sint: 'rg16sint',
	RG16Float: 'rg16float',
	RGBA8Unorm: 'rgba8unorm',
	RGBA8UnormSRGB: 'rgba8unorm-srgb',
	RGBA8Snorm: 'rgba8snorm',
	RGBA8Uint: 'rgba8uint',
	RGBA8Sint: 'rgba8sint',
	BGRA8Unorm: 'bgra8unorm',
	BGRA8UnormSRGB: 'bgra8unorm-srgb',
	// Packed 32-bit formats
	RGB9E5UFloat: 'rgb9e5ufloat',
	RGB10A2Unorm: 'rgb10a2unorm',
	RG11B10uFloat: 'rgb10a2unorm',

	// 64-bit formats

	RG32Uint: 'rg32uint',
	RG32Sint: 'rg32sint',
	RG32Float: 'rg32float',
	RGBA16Uint: 'rgba16uint',
	RGBA16Sint: 'rgba16sint',
	RGBA16Float: 'rgba16float',

	// 128-bit formats

	RGBA32Uint: 'rgba32uint',
	RGBA32Sint: 'rgba32sint',
	RGBA32Float: 'rgba32float',

	// Depth and stencil formats

	Stencil8: 'stencil8',
	Depth16Unorm: 'depth16unorm',
	Depth24Plus: 'depth24plus',
	Depth24PlusStencil8: 'depth24plus-stencil8',
	Depth32Float: 'depth32float',

	// 'depth32float-stencil8' extension

	Depth32FloatStencil8: 'depth32float-stencil8',

	// BC compressed formats usable if 'texture-compression-bc' is both
	// supported by the device/user agent and enabled in requestDevice.

	BC1RGBAUnorm: 'bc1-rgba-unorm',
	BC1RGBAUnormSRGB: 'bc1-rgba-unorm-srgb',
	BC2RGBAUnorm: 'bc2-rgba-unorm',
	BC2RGBAUnormSRGB: 'bc2-rgba-unorm-srgb',
	BC3RGBAUnorm: 'bc3-rgba-unorm',
	BC3RGBAUnormSRGB: 'bc3-rgba-unorm-srgb',
	BC4RUnorm: 'bc4-r-unorm',
	BC4RSnorm: 'bc4-r-snorm',
	BC5RGUnorm: 'bc5-rg-unorm',
	BC5RGSnorm: 'bc5-rg-snorm',
	BC6HRGBUFloat: 'bc6h-rgb-ufloat',
	BC6HRGBFloat: 'bc6h-rgb-float',
	BC7RGBAUnorm: 'bc7-rgba-unorm',
	BC7RGBAUnormSRGB: 'bc7-rgba-srgb',

	// ETC2 compressed formats usable if 'texture-compression-etc2' is both
	// supported by the device/user agent and enabled in requestDevice.

	ETC2RGB8Unorm: 'etc2-rgb8unorm',
	ETC2RGB8UnormSRGB: 'etc2-rgb8unorm-srgb',
	ETC2RGB8A1Unorm: 'etc2-rgb8a1unorm',
	ETC2RGB8A1UnormSRGB: 'etc2-rgb8a1unorm-srgb',
	ETC2RGBA8Unorm: 'etc2-rgba8unorm',
	ETC2RGBA8UnormSRGB: 'etc2-rgba8unorm-srgb',
	EACR11Unorm: 'eac-r11unorm',
	EACR11Snorm: 'eac-r11snorm',
	EACRG11Unorm: 'eac-rg11unorm',
	EACRG11Snorm: 'eac-rg11snorm',

	// ASTC compressed formats usable if 'texture-compression-astc' is both
	// supported by the device/user agent and enabled in requestDevice.

	ASTC4x4Unorm: 'astc-4x4-unorm',
	ASTC4x4UnormSRGB: 'astc-4x4-unorm-srgb',
	ASTC5x4Unorm: 'astc-5x4-unorm',
	ASTC5x4UnormSRGB: 'astc-5x4-unorm-srgb',
	ASTC5x5Unorm: 'astc-5x5-unorm',
	ASTC5x5UnormSRGB: 'astc-5x5-unorm-srgb',
	ASTC6x5Unorm: 'astc-6x5-unorm',
	ASTC6x5UnormSRGB: 'astc-6x5-unorm-srgb',
	ASTC6x6Unorm: 'astc-6x6-unorm',
	ASTC6x6UnormSRGB: 'astc-6x6-unorm-srgb',
	ASTC8x5Unorm: 'astc-8x5-unorm',
	ASTC8x5UnormSRGB: 'astc-8x5-unorm-srgb',
	ASTC8x6Unorm: 'astc-8x6-unorm',
	ASTC8x6UnormSRGB: 'astc-8x6-unorm-srgb',
	ASTC8x8Unorm: 'astc-8x8-unorm',
	ASTC8x8UnormSRGB: 'astc-8x8-unorm-srgb',
	ASTC10x5Unorm: 'astc-10x5-unorm',
	ASTC10x5UnormSRGB: 'astc-10x5-unorm-srgb',
	ASTC10x6Unorm: 'astc-10x6-unorm',
	ASTC10x6UnormSRGB: 'astc-10x6-unorm-srgb',
	ASTC10x8Unorm: 'astc-10x8-unorm',
	ASTC10x8UnormSRGB: 'astc-10x8-unorm-srgb',
	ASTC10x10Unorm: 'astc-10x10-unorm',
	ASTC10x10UnormSRGB: 'astc-10x10-unorm-srgb',
	ASTC12x10Unorm: 'astc-12x10-unorm',
	ASTC12x10UnormSRGB: 'astc-12x10-unorm-srgb',
	ASTC12x12Unorm: 'astc-12x12-unorm',
	ASTC12x12UnormSRGB: 'astc-12x12-unorm-srgb',

};

const GPUAddressMode = {
	ClampToEdge: 'clamp-to-edge',
	Repeat: 'repeat',
	MirrorRepeat: 'mirror-repeat'
};

const GPUFilterMode = {
	Linear: 'linear',
	Nearest: 'nearest'
};

const GPUBlendFactor = {
	Zero: 'zero',
	One: 'one',
	SrcColor: 'src-color',
	OneMinusSrcColor: 'one-minus-src-color',
	SrcAlpha: 'src-alpha',
	OneMinusSrcAlpha: 'one-minus-src-alpha',
	DstColor: 'dst-color',
	OneMinusDstColor: 'one-minus-dst-color',
	DstAlpha: 'dst-alpha',
	OneMinusDstAlpha: 'one-minus-dst-alpha',
	SrcAlphaSaturated: 'src-alpha-saturated',
	BlendColor: 'blend-color',
	OneMinusBlendColor: 'one-minus-blend-color'
};

const GPUBlendOperation = {
	Add: 'add',
	Subtract: 'subtract',
	ReverseSubtract: 'reverse-subtract',
	Min: 'min',
	Max: 'max'
};

const GPUColorWriteFlags = {
	None: 0,
	Red: 0x1,
	Green: 0x2,
	Blue: 0x4,
	Alpha: 0x8,
	All: 0xF
};

const GPUStencilOperation = {
	Keep: 'keep',
	Zero: 'zero',
	Replace: 'replace',
	Invert: 'invert',
	IncrementClamp: 'increment-clamp',
	DecrementClamp: 'decrement-clamp',
	IncrementWrap: 'increment-wrap',
	DecrementWrap: 'decrement-wrap'
};

const GPUTextureDimension = {
	OneD: '1d',
	TwoD: '2d',
	ThreeD: '3d'
};

const GPUTextureViewDimension = {
	OneD: '1d',
	TwoD: '2d',
	TwoDArray: '2d-array',
	Cube: 'cube',
	CubeArray: 'cube-array',
	ThreeD: '3d'
};

const GPUTextureAspect = {
	All: 'all',
	StencilOnly: 'stencil-only',
	DepthOnly: 'depth-only'
};

const GPUInputStepMode = {
	Vertex: 'vertex',
	Instance: 'instance'
};

const GPUFeatureName = {
	DepthClipControl: 'depth-clip-control',
	Depth32FloatStencil8: 'depth32float-stencil8',
	TextureCompressionBC: 'texture-compression-bc',
	TextureCompressionETC2: 'texture-compression-etc2',
	TextureCompressionASTC: 'texture-compression-astc',
	TimestampQuery: 'timestamp-query',
	IndirectFirstInstance: 'indirect-first-instance',
	ShaderF16: 'shader-f16',
	RG11B10UFloat: 'rg11b10ufloat-renderable',
	BGRA8UNormStorage: 'bgra8unorm-storage',
	Float32Filterable: 'float32-filterable'
};

class Binding {

	constructor( name = '' ) {

		this.name = name;

	}

}

function getFloatLength( floatLength ) {

	// ensure chunk size alignment (STD140 layout)

	return floatLength + ( ( GPU_CHUNK_BYTES - ( floatLength % GPU_CHUNK_BYTES ) ) % GPU_CHUNK_BYTES );

}

function getVectorLength( count, vectorLength = 4 ) {

	const strideLength = getStrideLength( vectorLength );

	const floatLength = strideLength * count;

	return getFloatLength( floatLength );

}

function getStrideLength( vectorLength ) {

	const strideLength = 4;

	return vectorLength + ( ( strideLength - ( vectorLength % strideLength ) ) % strideLength );

}

class Buffer extends Binding {

	constructor( name, buffer = null ) {

		super( name );

		this.isBuffer = true;

		this.bytesPerElement = Float32Array.BYTES_PER_ELEMENT;

		this._buffer = buffer;

	}

	get byteLength() {

		return getFloatLength( this._buffer.byteLength );

	}

	get buffer() {

		return this._buffer;

	}

	update() {

		return true;

	}

}

class UniformBuffer extends Buffer {

	constructor( name, buffer = null ) {

		super( name, buffer );

		this.isUniformBuffer = true;

	}

}

class UniformsGroup extends UniformBuffer {

	constructor( name ) {

		super( name );

		this.isUniformsGroup = true;

		// the order of uniforms in this array must match the order of uniforms in the shader

		this.uniforms = [];

	}

	addUniform( uniform ) {

		this.uniforms.push( uniform );

		return this;

	}

	removeUniform( uniform ) {

		const index = this.uniforms.indexOf( uniform );

		if ( index !== - 1 ) {

			this.uniforms.splice( index, 1 );

		}

		return this;

	}

	get buffer() {

		let buffer = this._buffer;

		if ( buffer === null ) {

			const byteLength = this.byteLength;

			buffer = new Float32Array( new ArrayBuffer( byteLength ) );

			this._buffer = buffer;

		}

		return buffer;

	}

	get byteLength() {

		let offset = 0; // global buffer offset in bytes

		for ( let i = 0, l = this.uniforms.length; i < l; i ++ ) {

			const uniform = this.uniforms[ i ];

			// offset within a single chunk in bytes

			const chunkOffset = offset % GPU_CHUNK_BYTES;
			const remainingSizeInChunk = GPU_CHUNK_BYTES - chunkOffset;

			// conformance tests

			if ( chunkOffset !== 0 && ( remainingSizeInChunk - uniform.boundary ) < 0 ) {

				// check for chunk overflow

				offset += ( GPU_CHUNK_BYTES - chunkOffset );

			} else if ( chunkOffset % uniform.boundary !== 0 ) {

				// check for correct alignment

				offset += ( chunkOffset % uniform.boundary );

			}

			uniform.offset = ( offset / this.bytesPerElement );

			offset += ( uniform.itemSize * this.bytesPerElement );

		}

		return Math.ceil( offset / GPU_CHUNK_BYTES ) * GPU_CHUNK_BYTES;

	}

	update() {

		let updated = false;

		for ( const uniform of this.uniforms ) {

			if ( this.updateByType( uniform ) === true ) {

				updated = true;

			}

		}

		return updated;

	}

	updateByType( uniform ) {

		if ( uniform.isFloatUniform ) return this.updateNumber( uniform );
		if ( uniform.isVector2Uniform ) return this.updateVector2( uniform );
		if ( uniform.isVector3Uniform ) return this.updateVector3( uniform );
		if ( uniform.isVector4Uniform ) return this.updateVector4( uniform );
		if ( uniform.isColorUniform ) return this.updateColor( uniform );
		if ( uniform.isMatrix3Uniform ) return this.updateMatrix3( uniform );
		if ( uniform.isMatrix4Uniform ) return this.updateMatrix4( uniform );

	}

	updateNumber( uniform ) {

		let updated = false;

		const a = this.buffer;
		const v = uniform.getValue();
		const offset = uniform.offset;

		if ( a[ offset ] !== v ) {

			a[ offset ] = v;
			updated = true;

		}

		return updated;

	}

	updateVector2( uniform ) {

		let updated = false;

		const a = this.buffer;
		const v = uniform.getValue();
		const offset = uniform.offset;

		if ( a[ offset + 0 ] !== v.x || a[ offset + 1 ] !== v.y ) {

			a[ offset + 0 ] = v.x;
			a[ offset + 1 ] = v.y;

			updated = true;

		}

		return updated;

	}

	updateVector3( uniform ) {

		let updated = false;

		const a = this.buffer;
		const v = uniform.getValue();
		const offset = uniform.offset;

		if ( a[ offset + 0 ] !== v.x || a[ offset + 1 ] !== v.y || a[ offset + 2 ] !== v.z ) {

			a[ offset + 0 ] = v.x;
			a[ offset + 1 ] = v.y;
			a[ offset + 2 ] = v.z;

			updated = true;

		}

		return updated;

	}

	updateVector4( uniform ) {

		let updated = false;

		const a = this.buffer;
		const v = uniform.getValue();
		const offset = uniform.offset;

		if ( a[ offset + 0 ] !== v.x || a[ offset + 1 ] !== v.y || a[ offset + 2 ] !== v.z || a[ offset + 4 ] !== v.w ) {

			a[ offset + 0 ] = v.x;
			a[ offset + 1 ] = v.y;
			a[ offset + 2 ] = v.z;
			a[ offset + 3 ] = v.w;

			updated = true;

		}

		return updated;

	}

	updateColor( uniform ) {

		let updated = false;

		const a = this.buffer;
		const c = uniform.getValue();
		const offset = uniform.offset;

		if ( a[ offset + 0 ] !== c.r || a[ offset + 1 ] !== c.g || a[ offset + 2 ] !== c.b ) {

			a[ offset + 0 ] = c.r;
			a[ offset + 1 ] = c.g;
			a[ offset + 2 ] = c.b;

			updated = true;

		}

		return updated;

	}

	updateMatrix3( uniform ) {

		let updated = false;

		const a = this.buffer;
		const e = uniform.getValue().elements;
		const offset = uniform.offset;

		if ( a[ offset + 0 ] !== e[ 0 ] || a[ offset + 1 ] !== e[ 1 ] || a[ offset + 2 ] !== e[ 2 ] ||
			a[ offset + 4 ] !== e[ 3 ] || a[ offset + 5 ] !== e[ 4 ] || a[ offset + 6 ] !== e[ 5 ] ||
			a[ offset + 8 ] !== e[ 6 ] || a[ offset + 9 ] !== e[ 7 ] || a[ offset + 10 ] !== e[ 8 ] ) {

			a[ offset + 0 ] = e[ 0 ];
			a[ offset + 1 ] = e[ 1 ];
			a[ offset + 2 ] = e[ 2 ];
			a[ offset + 4 ] = e[ 3 ];
			a[ offset + 5 ] = e[ 4 ];
			a[ offset + 6 ] = e[ 5 ];
			a[ offset + 8 ] = e[ 6 ];
			a[ offset + 9 ] = e[ 7 ];
			a[ offset + 10 ] = e[ 8 ];

			updated = true;

		}

		return updated;

	}

	updateMatrix4( uniform ) {

		let updated = false;

		const a = this.buffer;
		const e = uniform.getValue().elements;
		const offset = uniform.offset;

		if ( arraysEqual( a, e, offset ) === false ) {

			a.set( e, offset );
			updated = true;

		}

		return updated;

	}

}

function arraysEqual( a, b, offset ) {

	for ( let i = 0, l = b.length; i < l; i ++ ) {

		if ( a[ offset + i ] !== b[ i ] ) return false;

	}

	return true;

}

class Uniform {

	constructor( name, value = null ) {

		this.name = name;
		this.value = value;

		this.boundary = 0; // used to build the uniform buffer according to the STD140 layout
		this.itemSize = 0;

		this.offset = 0; // this property is set by WebGPUUniformsGroup and marks the start position in the uniform buffer

	}

	setValue( value ) {

		this.value = value;

	}

	getValue() {

		return this.value;

	}

}

class FloatUniform extends Uniform {

	constructor( name, value = 0 ) {

		super( name, value );

		this.isFloatUniform = true;

		this.boundary = 4;
		this.itemSize = 1;

	}

}

class Vector2Uniform extends Uniform {

	constructor( name, value = new Vector2() ) {

		super( name, value );

		this.isVector2Uniform = true;

		this.boundary = 8;
		this.itemSize = 2;

	}

}

class Vector3Uniform extends Uniform {

	constructor( name, value = new Vector3() ) {

		super( name, value );

		this.isVector3Uniform = true;

		this.boundary = 16;
		this.itemSize = 3;

	}

}

class Vector4Uniform extends Uniform {

	constructor( name, value = new Vector4() ) {

		super( name, value );

		this.isVector4Uniform = true;

		this.boundary = 16;
		this.itemSize = 4;

	}

}

class ColorUniform extends Uniform {

	constructor( name, value = new Color() ) {

		super( name, value );

		this.isColorUniform = true;

		this.boundary = 16;
		this.itemSize = 3;

	}

}

class Matrix3Uniform extends Uniform {

	constructor( name, value = new Matrix3() ) {

		super( name, value );

		this.isMatrix3Uniform = true;

		this.boundary = 48;
		this.itemSize = 12;

	}

}

class Matrix4Uniform extends Uniform {

	constructor( name, value = new Matrix4() ) {

		super( name, value );

		this.isMatrix4Uniform = true;

		this.boundary = 64;
		this.itemSize = 16;

	}

}

class FloatNodeUniform extends FloatUniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Vector2NodeUniform extends Vector2Uniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Vector3NodeUniform extends Vector3Uniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Vector4NodeUniform extends Vector4Uniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class ColorNodeUniform extends ColorUniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Matrix3NodeUniform extends Matrix3Uniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Matrix4NodeUniform extends Matrix4Uniform {

	constructor( nodeUniform ) {

		super( nodeUniform.name, nodeUniform.value );

		this.nodeUniform = nodeUniform;

	}

	getValue() {

		return this.nodeUniform.value;

	}

}

class Sampler extends Binding {

	constructor( name, texture ) {

		super( name );

		this.texture = texture;
		this.version = texture.version;

		this.isSampler = true;

	}

}

class NodeSampler extends Sampler {

	constructor( name, textureNode ) {

		super( name, textureNode.value );

		this.textureNode = textureNode;

	}

	getTexture() {

		return this.textureNode.value;

	}

}

let id = 0;

class SampledTexture extends Binding {

	constructor( name, texture ) {

		super( name );

		this.id = id ++;

		this.texture = texture;
		this.version = texture.version;

		this.isSampledTexture = true;

	}

	get needsBindingsUpdate() {

		const { texture, version } = this;

		return texture.isVideoTexture ? true : version !== texture.version; // @TODO: version === 0 && texture.version > 0 ( add it just to External Textures like PNG,JPG )

	}

	update() {

		if ( this.version !== this.texture.version ) {

			this.version = this.texture.version;

			return true;

		}

		return false;

	}

}

class SampledCubeTexture extends SampledTexture {

	constructor( name, texture ) {

		super( name, texture );

		this.isSampledCubeTexture = true;

	}

}

class NodeSampledTexture extends SampledTexture {

	constructor( name, textureNode ) {

		super( name, textureNode.value );

		this.textureNode = textureNode;

	}

	getTexture() {

		return this.textureNode.value;

	}

}

class NodeSampledCubeTexture extends SampledCubeTexture {

	constructor( name, textureNode ) {

		super( name, textureNode.value );

		this.textureNode = textureNode;

	}

	getTexture() {

		return this.textureNode.value;

	}

}

class StorageBuffer extends Buffer {

	constructor( name, attribute ) {

		super( name, attribute.array );

		this.attribute = attribute;

		this.isStorageBuffer = true;

	}

}

// @TODO: Consider rename WebGLRenderTarget to just RenderTarget

class RenderTarget extends WebGLRenderTarget {

	constructor( width, height, options = {} ) {

		super( width, height, options );

	}

}

// @TODO: Consider rename WebGLCubeRenderTarget to just CubeRenderTarget

class CubeRenderTarget extends WebGLCubeRenderTarget {

	constructor( size = 1, options = {} ) {

		super( size, options );

		this.isCubeRenderTarget = true;

	}

	fromEquirectangularTexture( renderer, texture$1 ) {

		const currentMinFilter = texture$1.minFilter;
		const currentGenerateMipmaps = texture$1.generateMipmaps;

		texture$1.generateMipmaps = true;

		this.texture.type = texture$1.type;
		this.texture.colorSpace = texture$1.colorSpace;

		this.texture.generateMipmaps = texture$1.generateMipmaps;
		this.texture.minFilter = texture$1.minFilter;
		this.texture.magFilter = texture$1.magFilter;

		const geometry = new BoxGeometry( 5, 5, 5 );

		const uvNode = equirectUV( positionWorldDirection );

		const material = createNodeMaterialFromType( 'MeshBasicNodeMaterial' );
		material.colorNode = texture( texture$1, uvNode, 0 );
		material.side = BackSide;
		material.blending = NoBlending;

		const mesh = new Mesh( geometry, material );

		const scene = new Scene();
		scene.add( mesh );

		// Avoid blurred poles
		if ( texture$1.minFilter === LinearMipmapLinearFilter ) texture$1.minFilter = LinearFilter;

		const camera = new CubeCamera( 1, 10, this );
		camera.update( renderer, scene );

		texture$1.minFilter = currentMinFilter;
		texture$1.currentGenerateMipmaps = currentGenerateMipmaps;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	}

}

const declarationRegexp = /^[fn]*\s*([a-z_0-9]+)?\s*\(([\s\S]*?)\)\s*[\-\>]*\s*([a-z_0-9]+)?/i;
const propertiesRegexp = /[a-z_0-9]+/ig;

const wgslTypeLib$1 = {
	f32: 'float'
};

const parse = ( source ) => {

	source = source.trim();

	const declaration = source.match( declarationRegexp );

	if ( declaration !== null && declaration.length === 4 ) {

		// tokenizer

		const inputsCode = declaration[ 2 ];
		const propsMatches = [];

		let nameMatch = null;

		while ( ( nameMatch = propertiesRegexp.exec( inputsCode ) ) !== null ) {

			propsMatches.push( nameMatch );

		}

		// parser

		const inputs = [];

		let i = 0;

		while ( i < propsMatches.length ) {

			// default

			const name = propsMatches[ i ++ ][ 0 ];
			let type = propsMatches[ i ++ ][ 0 ];

			type = wgslTypeLib$1[ type ] || type;

			// precision

			if ( i < propsMatches.length && /^[fui]\d{2}$/.test( propsMatches[ i ][ 0 ] ) === true )
				i ++;

			// add input

			inputs.push( new NodeFunctionInput( type, name ) );

		}

		//

		const blockCode = source.substring( declaration[ 0 ].length );

		const name = declaration[ 1 ] !== undefined ? declaration[ 1 ] : '';
		const type = declaration[ 3 ] || 'void';

		return {
			type,
			inputs,
			name,
			inputsCode,
			blockCode
		};

	} else {

		throw new Error( 'FunctionNode: Function is not a WGSL code.' );

	}

};

class WGSLNodeFunction extends NodeFunction {

	constructor( source ) {

		const { type, inputs, name, inputsCode, blockCode } = parse( source );

		super( type, inputs, name );

		this.inputsCode = inputsCode;
		this.blockCode = blockCode;

	}

	getCode( name = this.name ) {

		const type = this.type !== 'void' ? '-> ' + this.type : '';

		return `fn ${ name } ( ${ this.inputsCode.trim() } ) ${ type }` + this.blockCode;

	}

}

class WGSLNodeParser extends NodeParser {

	parseFunction( source ) {

		return new WGSLNodeFunction( source );

	}

}

/*
const gpuShaderStageLib = {
	'vertex': GPUShaderStage.VERTEX,
	'fragment': GPUShaderStage.FRAGMENT,
	'compute': GPUShaderStage.COMPUTE
};
*/

const supports = {
	instance: true
};

const wgslTypeLib = {
	float: 'f32',
	int: 'i32',
	uint: 'u32',
	bool: 'bool',
	color: 'vec3<f32>',

	vec2: 'vec2<f32>',
	ivec2: 'vec2<i32>',
	uvec2: 'vec2<u32>',
	bvec2: 'vec2<bool>',

	vec3: 'vec3<f32>',
	ivec3: 'vec3<i32>',
	uvec3: 'vec3<u32>',
	bvec3: 'vec3<bool>',

	vec4: 'vec4<f32>',
	ivec4: 'vec4<i32>',
	uvec4: 'vec4<u32>',
	bvec4: 'vec4<bool>',

	mat3: 'mat3x3<f32>',
	imat3: 'mat3x3<i32>',
	umat3: 'mat3x3<u32>',
	bmat3: 'mat3x3<bool>',

	mat4: 'mat4x4<f32>',
	imat4: 'mat4x4<i32>',
	umat4: 'mat4x4<u32>',
	bmat4: 'mat4x4<bool>'
};

const wgslMethods = {
	dFdx: 'dpdx',
	dFdy: 'dpdy',
	mod: 'threejs_mod',
	lessThanEqual: 'threejs_lessThanEqual',
	inversesqrt: 'inverseSqrt'
};

const wgslPolyfill = {
	lessThanEqual: new CodeNode( `
fn threejs_lessThanEqual( a : vec3<f32>, b : vec3<f32> ) -> vec3<bool> {

	return vec3<bool>( a.x <= b.x, a.y <= b.y, a.z <= b.z );

}
` ),
	mod: new CodeNode( `
fn threejs_mod( x : f32, y : f32 ) -> f32 {

	return x - y * floor( x / y );

}
` ),
	repeatWrapping: new CodeNode( `
fn threejs_repeatWrapping( uv : vec2<f32>, dimension : vec2<u32> ) -> vec2<u32> {

	let uvScaled = vec2<u32>( uv * vec2<f32>( dimension ) );

	return ( ( uvScaled % dimension ) + dimension ) % dimension;

}
` )
};

class WebGPUNodeBuilder extends NodeBuilder {

	constructor( object, renderer ) {

		super( object, renderer, new WGSLNodeParser() );

		this.uniformsGroup = {};

		this.builtins = {
			vertex: new Map(),
			fragment: new Map(),
			compute: new Map(),
			attribute: new Map()
		};

	}

	build() {

		const { object, material } = this;

		if ( material !== null ) {

			NodeMaterial.fromMaterial( material ).build( this );

		} else {

			this.addFlow( 'compute', object );

		}

		return super.build();

	}

	needsColorSpaceToLinear( texture ) {

		return texture.isVideoTexture === true;

	}

	getSampler( textureProperty, uvSnippet, shaderStage = this.shaderStage ) {

		if ( shaderStage === 'fragment' ) {

			return `textureSample( ${textureProperty}, ${textureProperty}_sampler, ${uvSnippet} )`;

		} else {

			this._include( 'repeatWrapping' );

			const dimension = `textureDimensions( ${textureProperty}, 0 )`;

			return `textureLoad( ${textureProperty}, threejs_repeatWrapping( ${uvSnippet}, ${dimension} ), 0 )`;

		}

	}

	getVideoSampler( textureProperty, uvSnippet, shaderStage = this.shaderStage ) {

		if ( shaderStage === 'fragment' ) {

			return `textureSampleBaseClampToEdge( ${textureProperty}, ${textureProperty}_sampler, vec2<f32>( ${uvSnippet}.x, 1.0 - ${uvSnippet}.y ) )`;

		}

	}

	getSamplerLevel( textureProperty, uvSnippet, biasSnippet, shaderStage = this.shaderStage ) {

		if ( shaderStage === 'fragment' ) {

			return `textureSampleLevel( ${textureProperty}, ${textureProperty}_sampler, ${uvSnippet}, ${biasSnippet} )`;

		} else {

			this._include( 'repeatWrapping' );

			const dimension = `textureDimensions( ${textureProperty}, 0 )`;

			return `textureLoad( ${textureProperty}, threejs_repeatWrapping( ${uvSnippet}, ${dimension} ), i32( ${biasSnippet} ) )`;

		}

	}

	getTexture( texture, textureProperty, uvSnippet, shaderStage = this.shaderStage ) {

		let snippet = null;

		if ( texture.isVideoTexture === true ) {

			snippet = this.getVideoSampler( textureProperty, uvSnippet, shaderStage );

		} else {

			snippet = this.getSampler( textureProperty, uvSnippet, shaderStage );

		}

		return snippet;

	}

	getTextureLevel( texture, textureProperty, uvSnippet, biasSnippet, shaderStage = this.shaderStage ) {

		let snippet = null;

		if ( texture.isVideoTexture === true ) {

			snippet = this.getVideoSampler( textureProperty, uvSnippet, shaderStage );

		} else {

			snippet = this.getSamplerLevel( textureProperty, uvSnippet, biasSnippet, shaderStage );

		}

		return snippet;

	}

	getPropertyName( node, shaderStage = this.shaderStage ) {

		if ( node.isNodeVarying === true && node.needsInterpolation === true ) {

			if ( shaderStage === 'vertex' ) {

				return `NodeVaryings.${ node.name }`;

			}

		} else if ( node.isNodeUniform === true ) {

			const name = node.name;
			const type = node.type;

			if ( type === 'texture' || type === 'cubeTexture' ) {

				return name;

			} else if ( type === 'buffer' || type === 'storageBuffer' ) {

				return `NodeBuffer_${node.node.id}.${name}`;

			} else {

				return `NodeUniforms.${name}`;

			}

		}

		return super.getPropertyName( node );

	}

	getUniformFromNode( node, type, shaderStage ) {

		const uniformNode = super.getUniformFromNode( node, type, shaderStage );
		const nodeData = this.getDataFromNode( node, shaderStage );

		if ( nodeData.uniformGPU === undefined ) {

			let uniformGPU;

			const bindings = this.bindings[ shaderStage ];

			if ( type === 'texture' || type === 'cubeTexture' ) {

				const sampler = new NodeSampler( `${uniformNode.name}_sampler`, uniformNode.node );

				let texture = null;

				if ( type === 'texture' ) {

					texture = new NodeSampledTexture( uniformNode.name, uniformNode.node );

				} else if ( type === 'cubeTexture' ) {

					texture = new NodeSampledCubeTexture( uniformNode.name, uniformNode.node );

				}

				// add first textures in sequence and group for last
				const lastBinding = bindings[ bindings.length - 1 ];
				const index = lastBinding && lastBinding.isUniformsGroup ? bindings.length - 1 : bindings.length;

				if ( shaderStage === 'fragment' ) {

					bindings.splice( index, 0, sampler, texture );

					uniformGPU = [ sampler, texture ];

				} else {

					bindings.splice( index, 0, texture );

					uniformGPU = [ texture ];

				}

			} else if ( type === 'buffer' || type === 'storageBuffer' ) {

				const bufferClass = type === 'storageBuffer' ? StorageBuffer : UniformBuffer;
				const buffer = new bufferClass( 'NodeBuffer_' + node.id, node.value );
				//buffer.setVisibility( gpuShaderStageLib[ shaderStage ] );

				// add first textures in sequence and group for last
				const lastBinding = bindings[ bindings.length - 1 ];
				const index = lastBinding && lastBinding.isUniformsGroup ? bindings.length - 1 : bindings.length;

				bindings.splice( index, 0, buffer );

				uniformGPU = buffer;

			} else {

				let uniformsGroup = this.uniformsGroup[ shaderStage ];

				if ( uniformsGroup === undefined ) {

					uniformsGroup = new UniformsGroup( 'nodeUniforms' );
					//uniformsGroup.setVisibility( gpuShaderStageLib[ shaderStage ] );

					this.uniformsGroup[ shaderStage ] = uniformsGroup;

					bindings.push( uniformsGroup );

				}

				if ( node.isArrayUniformNode === true ) {

					uniformGPU = [];

					for ( const uniformNode of node.nodes ) {

						const uniformNodeGPU = this._getNodeUniform( uniformNode, type );

						// fit bounds to buffer
						uniformNodeGPU.boundary = getVectorLength( uniformNodeGPU.itemSize );
						uniformNodeGPU.itemSize = getStrideLength( uniformNodeGPU.itemSize );

						uniformsGroup.addUniform( uniformNodeGPU );

						uniformGPU.push( uniformNodeGPU );

					}

				} else {

					uniformGPU = this._getNodeUniform( uniformNode, type );

					uniformsGroup.addUniform( uniformGPU );

				}

			}

			nodeData.uniformGPU = uniformGPU;

			if ( shaderStage === 'vertex' ) {

				this.bindingsOffset[ 'fragment' ] = bindings.length;

			}

		}

		return uniformNode;

	}

	isReference( type ) {

		return super.isReference( type ) || type === 'texture_2d' || type === 'texture_cube';

	}

	getBuiltin( name, property, type, shaderStage = this.shaderStage ) {

		const map = this.builtins[ shaderStage ];

		if ( map.has( name ) === false ) {

			map.set( name, {
				name,
				property,
				type
			} );

		}

		return property;

	}

	getInstanceIndex() {

		if ( this.shaderStage === 'vertex' ) {

			return this.getBuiltin( 'instance_index', 'instanceIndex', 'u32', 'attribute' );

		}

		return 'instanceIndex';

	}

	getFrontFacing() {

		return this.getBuiltin( 'front_facing', 'isFront', 'bool' );

	}

	getFragCoord() {

		return this.getBuiltin( 'position', 'fragCoord', 'vec4<f32>', 'fragment' );

	}

	isFlipY() {

		return false;

	}

	getAttributes( shaderStage ) {

		const snippets = [];

		if ( shaderStage === 'compute' ) {

			this.getBuiltin( 'global_invocation_id', 'id', 'vec3<u32>', 'attribute' );

		}

		if ( shaderStage === 'vertex' || shaderStage === 'compute' ) {

			for ( const { name, property, type } of this.builtins.attribute.values() ) {

				snippets.push( `@builtin( ${name} ) ${property} : ${type}` );

			}

			const attributes = this.getAttributesArray();

			for ( let index = 0, length = attributes.length; index < length; index ++ ) {

				const attribute = attributes[ index ];
				const name = attribute.name;
				const type = this.getType( attribute.type );

				snippets.push( `@location( ${index} ) ${ name } : ${ type }` );

			}

		}

		return snippets.join( ',\n\t' );

	}

	getVar( type, name ) {

		return `var ${ name } : ${ this.getType( type ) }`;

	}

	getVars( shaderStage ) {

		const snippets = [];
		const vars = this.vars[ shaderStage ];

		for ( const variable of vars ) {

			snippets.push( `\t${ this.getVar( variable.type, variable.name ) };` );

		}

		return `\n${ snippets.join( '\n' ) }\n`;

	}

	getVaryings( shaderStage ) {

		const snippets = [];

		if ( shaderStage === 'vertex' ) {

			this.getBuiltin( 'position', 'Vertex', 'vec4<f32>', 'vertex' );

		}

		if ( shaderStage === 'vertex' || shaderStage === 'fragment' ) {

			const varyings = this.varyings;
			const vars = this.vars[ shaderStage ];

			for ( let index = 0; index < varyings.length; index ++ ) {

				const varying = varyings[ index ];

				if ( varying.needsInterpolation ) {

					let attributesSnippet = `@location( ${index} )`;

					if ( varying.type === 'int' || varying.type === 'uint' ) {

						attributesSnippet += ' @interpolate( flat )';

					}

					snippets.push( `${ attributesSnippet } ${ varying.name } : ${ this.getType( varying.type ) }` );

				} else if ( vars.includes( varying ) === false ) {

					vars.push( varying );

				}

			}

		}

		for ( const { name, property, type } of this.builtins[ shaderStage ].values() ) {

			snippets.push( `@builtin( ${name} ) ${property} : ${type}` );

		}

		const code = snippets.join( ',\n\t' );

		return shaderStage === 'vertex' ? this._getWGSLStruct( 'NodeVaryingsStruct', '\t' + code ) : code;

	}

	getUniforms( shaderStage ) {

		const uniforms = this.uniforms[ shaderStage ];

		const bindingSnippets = [];
		const bufferSnippets = [];
		const groupSnippets = [];

		let index = this.bindingsOffset[ shaderStage ];

		for ( const uniform of uniforms ) {

			if ( uniform.type === 'texture' || uniform.type === 'cubeTexture' ) {

				if ( shaderStage === 'fragment' ) {

					bindingSnippets.push( `@group( 0 ) @binding( ${index ++} ) var ${uniform.name}_sampler : sampler;` );

				}

				const texture = uniform.node.value;

				let textureType;

				if ( texture.isCubeTexture === true ) {

					textureType = 'texture_cube<f32>';

				} else if ( texture.isDepthTexture === true ) {

					textureType = 'texture_depth_2d';

				} else if ( texture.isVideoTexture === true ) {

					textureType = 'texture_external';

				} else {

					textureType = 'texture_2d<f32>';

				}

				bindingSnippets.push( `@group( 0 ) @binding( ${index ++} ) var ${uniform.name} : ${textureType};` );

			} else if ( uniform.type === 'buffer' || uniform.type === 'storageBuffer' ) {

				const bufferNode = uniform.node;
				const bufferType = this.getType( bufferNode.bufferType );
				const bufferCount = bufferNode.bufferCount;

				const bufferCountSnippet = bufferCount > 0 ? ', ' + bufferCount : '';
				const bufferSnippet = `\t${uniform.name} : array< ${bufferType}${bufferCountSnippet} >\n`;
				const bufferAccessMode = bufferNode.isStorageBufferNode ? 'storage,read_write' : 'uniform';

				bufferSnippets.push( this._getWGSLStructBinding( 'NodeBuffer_' + bufferNode.id, bufferSnippet, bufferAccessMode, index ++ ) );

			} else {

				const vectorType = this.getType( this.getVectorType( uniform.type ) );

				if ( Array.isArray( uniform.value ) === true ) {

					const length = uniform.value.length;

					groupSnippets.push( `uniform ${vectorType}[ ${length} ] ${uniform.name}` );

				} else {

					groupSnippets.push( `\t${uniform.name} : ${ vectorType}` );

				}

			}

		}

		let code = bindingSnippets.join( '\n' );
		code += bufferSnippets.join( '\n' );

		if ( groupSnippets.length > 0 ) {

			code += this._getWGSLStructBinding( 'NodeUniforms', groupSnippets.join( ',\n' ), 'uniform', index ++ );

		}

		return code;

	}

	buildCode() {

		const shadersData = this.material !== null ? { fragment: {}, vertex: {} } : { compute: {} };

		for ( const shaderStage in shadersData ) {

			let flow = '// code\n\n';
			flow += this.flowCode[ shaderStage ];

			const flowNodes = this.flowNodes[ shaderStage ];
			const mainNode = flowNodes[ flowNodes.length - 1 ];

			for ( const node of flowNodes ) {

				const flowSlotData = this.getFlowData( node/*, shaderStage*/ );
				const slotName = node.name;

				if ( slotName ) {

					if ( flow.length > 0 ) flow += '\n';

					flow += `\t// flow -> ${ slotName }\n\t`;

				}

				flow += `${ flowSlotData.code }\n\t`;

				if ( node === mainNode && shaderStage !== 'compute' ) {

					flow += '// result\n\t';

					if ( shaderStage === 'vertex' ) {

						flow += 'NodeVaryings.Vertex = ';

					} else if ( shaderStage === 'fragment' ) {

						flow += 'return ';

					}

					flow += `${ flowSlotData.result };`;

				}

			}

			const stageData = shadersData[ shaderStage ];

			stageData.uniforms = this.getUniforms( shaderStage );
			stageData.attributes = this.getAttributes( shaderStage );
			stageData.varyings = this.getVaryings( shaderStage );
			stageData.vars = this.getVars( shaderStage );
			stageData.codes = this.getCodes( shaderStage );
			stageData.flow = flow;

		}

		if ( this.material !== null ) {

			this.vertexShader = this._getWGSLVertexCode( shadersData.vertex );
			this.fragmentShader = this._getWGSLFragmentCode( shadersData.fragment );

		} else {

			this.computeShader = this._getWGSLComputeCode( shadersData.compute, ( this.object.workgroupSize || [ 64 ] ).join( ', ' ) );

		}

	}

	getRenderTarget( width, height, options ) {

		return new RenderTarget( width, height, options );

	}

	getCubeRenderTarget( size, options ) {

		return new CubeRenderTarget( size, options );

	}

	getMethod( method ) {

		if ( wgslPolyfill[ method ] !== undefined ) {

			this._include( method );

		}

		return wgslMethods[ method ] || method;

	}

	getType( type ) {

		return wgslTypeLib[ type ] || type;

	}

	isAvailable( name ) {

		return supports[ name ] === true;

	}

	_include( name ) {

		wgslPolyfill[ name ].build( this );

	}

	_getNodeUniform( uniformNode, type ) {

		if ( type === 'float' ) return new FloatNodeUniform( uniformNode );
		if ( type === 'vec2' ) return new Vector2NodeUniform( uniformNode );
		if ( type === 'vec3' ) return new Vector3NodeUniform( uniformNode );
		if ( type === 'vec4' ) return new Vector4NodeUniform( uniformNode );
		if ( type === 'color' ) return new ColorNodeUniform( uniformNode );
		if ( type === 'mat3' ) return new Matrix3NodeUniform( uniformNode );
		if ( type === 'mat4' ) return new Matrix4NodeUniform( uniformNode );

		throw new Error( `Uniform "${type}" not declared.` );

	}

	_getWGSLVertexCode( shaderData ) {

		return `${ this.getSignature() }

// uniforms
${shaderData.uniforms}

// varyings
${shaderData.varyings}

// codes
${shaderData.codes}

@vertex
fn main( ${shaderData.attributes} ) -> NodeVaryingsStruct {

	// system
	var NodeVaryings: NodeVaryingsStruct;

	// vars
	${shaderData.vars}

	// flow
	${shaderData.flow}

	return NodeVaryings;

}
`;

	}

	_getWGSLFragmentCode( shaderData ) {

		return `${ this.getSignature() }

// uniforms
${shaderData.uniforms}

// codes
${shaderData.codes}

@fragment
fn main( ${shaderData.varyings} ) -> @location( 0 ) vec4<f32> {

	// vars
	${shaderData.vars}

	// flow
	${shaderData.flow}

}
`;

	}

	_getWGSLComputeCode( shaderData, workgroupSize ) {

		return `${ this.getSignature() }
// system
var<private> instanceIndex : u32;

// uniforms
${shaderData.uniforms}

// codes
${shaderData.codes}

@compute @workgroup_size( ${workgroupSize} )
fn main( ${shaderData.attributes} ) {

	// system
	instanceIndex = id.x;

	// vars
	${shaderData.vars}

	// flow
	${shaderData.flow}

}
`;

	}

	_getWGSLStruct( name, vars ) {

		return `
struct ${name} {
${vars}
};`;

	}

	_getWGSLStructBinding( name, vars, access, binding = 0, group = 0 ) {

		const structName = name + 'Struct';
		const structSnippet = this._getWGSLStruct( structName, vars );

		return `${structSnippet}
@binding( ${binding} ) @group( ${group} )
var<${access}> ${name} : ${structName};`;

	}

}

let vector2 = null;
let vector4 = null;

class Backend {

	constructor( parameters = {} ) {

		this.parameters = Object.assign( {}, parameters );
		this.data = new WeakMap();
		this.renderer = null;
		this.domElement = null;

	}

	async init( renderer ) {

		this.renderer = renderer;

	}

	// render context

	begin( renderContext ) { }

	finish( renderContext ) { }

	// render object

	draw( renderObject, info ) { }

	// program

	createProgram( program ) { }

	destroyProgram( program ) { }

	// bindings

	createBindings( renderObject ) { }

	updateBindings( renderObject ) { }

	// pipeline

	createRenderPipeline( renderObject ) { }

	createComputePipeline( computeNode, pipeline ) { }

	destroyPipeline( pipeline ) { }

	// cache key

	needsUpdate( renderObject ) { } // return Boolean ( fast test )

	getCacheKey( renderObject ) { } // return String

	// node builder

	createNodeBuilder( renderObject ) { } // return NodeBuilder (ADD IT)

	// textures

	createSampler( texture ) { }

	createDefaultTexture( texture ) { }

	createTexture( texture ) { }

	// attributes

	createAttribute( attribute ) { }

	createIndexAttribute( attribute ) { }

	updateAttribute( attribute ) { }

	destroyAttribute( attribute ) { }

	// canvas

	updateSize() { }

	// utils

	hasFeature( name ) { } // return Boolean

	getInstanceCount( renderObject ) {

		const { object, geometry } = renderObject;

		return geometry.isInstancedBufferGeometry ? geometry.instanceCount : ( object.isInstancedMesh ? object.count : 1 );

	}

	getDrawingBufferSize() {

		vector2 = vector2 || new Vector2();

		return this.renderer.getDrawingBufferSize( vector2 );

	}

	getScissor() {

		vector4 = vector4 || new Vector4();

		return this.renderer.getScissor( vector4 );

	}

	getDomElement() {

		let domElement = this.domElement;

		if ( domElement === null ) {

			this.domElement = domElement = ( this.parameters.canvas !== undefined ) ? this.parameters.canvas : this.createCanvasElement();

		}

		return domElement;

	}

	createCanvasElement() {

		const canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
		canvas.style.display = 'block';
		return canvas;

	}

	// resource properties

	get( object ) {

		let map = this.data.get( object );

		if ( map === undefined ) {

			map = {};
			this.data.set( object, map );

		}

		return map;

	}

	delete( object ) {

		this.data.delete( object );

	}

}

class WebGPUUtils {

	constructor( backend ) {

		this.backend = backend;

	}

	getCurrentDepthStencilFormat( renderContext ) {

		let format;

		if ( renderContext.depthTexture !== null ) {

			format = this.getTextureFormatGPU( renderContext.depthTexture );

		} else if ( renderContext.depth && renderContext.stencil ) {

			format = GPUTextureFormat.Depth24PlusStencil8;

		} else if ( renderContext.depth ) {

			format = GPUTextureFormat.Depth24Plus;

		}

		return format;

	}

	getTextureFormatGPU( texture ) {

		return this.backend.get( texture ).texture.format;

	}

	getCurrentColorFormat( renderContext ) {

		let format;

		if ( renderContext.texture !== null ) {

			format = this.getTextureFormatGPU( renderContext.texture );

		} else {

			format = GPUTextureFormat.BGRA8Unorm; // default context format

		}

		return format;

	}

	getCurrentColorSpace( renderContext ) {

		if ( renderContext.texture !== null ) {

			return renderContext.texture.colorSpace;

		}

		return this.backend.renderer.outputColorSpace;

	}

	getPrimitiveTopology( object, material ) {

		if ( object.isPoints ) return GPUPrimitiveTopology.PointList;
		else if ( object.isLineSegments || ( object.isMesh && material.wireframe === true ) ) return GPUPrimitiveTopology.LineList;
		else if ( object.isLine ) return GPUPrimitiveTopology.LineStrip;
		else if ( object.isMesh ) return GPUPrimitiveTopology.TriangleList;

	}

	getSampleCount( renderContext ) {

		if ( renderContext.texture !== null ) {

			return 1;

		}

		return this.backend.parameters.sampleCount;

	}

}

const typedArraysToVertexFormatPrefix = new Map( [
	[ Int8Array, [ 'sint8', 'snorm8' ]],
	[ Uint8Array, [ 'uint8', 'unorm8' ]],
	[ Int16Array, [ 'sint16', 'snorm16' ]],
	[ Uint16Array, [ 'uint16', 'unorm16' ]],
	[ Int32Array, [ 'sint32', 'snorm32' ]],
	[ Uint32Array, [ 'uint32', 'unorm32' ]],
	[ Float32Array, [ 'float32', ]],
] );

const typedAttributeToVertexFormatPrefix = new Map( [
	[ Float16BufferAttribute, [ 'float16', ]],
] );

const typeArraysToVertexFormatPrefixForItemSize1 = new Map( [
	[ Int32Array, 'sint32' ],
	[ Uint32Array, 'uint32' ],
	[ Float32Array, 'float32' ]
] );

class WebGPUAttributeUtils {

	constructor( backend ) {

		this.backend = backend;

	}

	createAttribute( attribute, usage ) {

		const bufferAttribute = this._getBufferAttribute( attribute );

		const backend = this.backend;
		const device = backend.device;

		const array = bufferAttribute.array;
		const size = array.byteLength + ( ( 4 - ( array.byteLength % 4 ) ) % 4 ); // ensure 4 byte alignment, see #20441

		const buffer = device.createBuffer( {
			label: bufferAttribute.name,
			size: size,
			usage: usage,
			mappedAtCreation: true
		} );

		new array.constructor( buffer.getMappedRange() ).set( array );

		buffer.unmap();

		backend.get( attribute ).buffer = buffer;

	}

	updateAttribute( attribute ) {

		const bufferAttribute = this._getBufferAttribute( attribute );

		const backend = this.backend;
		const device = backend.device;

		const buffer = backend.get( attribute ).buffer;

		const array = bufferAttribute.array;
		const updateRange = bufferAttribute.updateRange;

		if ( updateRange.count === - 1 ) {

			// Not using update ranges

			device.queue.writeBuffer(
				buffer,
				0,
				array,
				0
			);

		} else {

			device.queue.writeBuffer(
				buffer,
				0,
				array,
				updateRange.offset * array.BYTES_PER_ELEMENT,
				updateRange.count * array.BYTES_PER_ELEMENT
			);

			updateRange.count = - 1; // reset range

		}

	}

	createShaderAttributes( renderObject ) {

		const attributes = renderObject.getAttributes();
		const shaderAttributes = [];

		for ( let slot = 0; slot < attributes.length; slot ++ ) {

			const geometryAttribute = attributes[ slot ];
			const bytesPerElement = geometryAttribute.array.BYTES_PER_ELEMENT;

			const format = this._getVertexFormat( geometryAttribute );

			let arrayStride = geometryAttribute.itemSize * bytesPerElement;
			let offset = 0;

			if ( geometryAttribute.isInterleavedBufferAttribute === true ) {

				// @TODO: It can be optimized for "vertexBuffers" on RenderPipeline

				arrayStride = geometryAttribute.data.stride * bytesPerElement;
				offset = geometryAttribute.offset * bytesPerElement;

			}

			shaderAttributes.push( {
				geometryAttribute,
				arrayStride,
				offset,
				format,
				slot
			} );

		}

		return shaderAttributes;

	}

	destroyAttribute( attribute ) {

		const backend = this.backend;
		const data = backend.get( attribute );

		data.buffer.destroy();

		backend.delete( attribute );

	}

	async getArrayBuffer( attribute ) {

		const backend = this.backend;
		const device = backend.device;

		const data = backend.get( attribute );

		//const bufferAttribute = this._getBufferAttribute( attribute );

		const bufferGPU = data.buffer;
		const size = bufferGPU.size;

		let readBufferGPU = data.readBuffer;
		let needsUnmap = true;

		if ( readBufferGPU === undefined ) {

			readBufferGPU = device.createBuffer( {
				label: attribute.name,
				size,
				usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
			} );

			needsUnmap = false;

			data.readBuffer = readBufferGPU;

		}

		const cmdEncoder = device.createCommandEncoder( {} );

		cmdEncoder.copyBufferToBuffer(
			bufferGPU,
			0,
			readBufferGPU,
			0,
			size
		);

		if ( needsUnmap ) readBufferGPU.unmap();

		const gpuCommands = cmdEncoder.finish();
		device.queue.submit( [ gpuCommands ] );

		await readBufferGPU.mapAsync( GPUMapMode.READ );

		const arrayBuffer = readBufferGPU.getMappedRange();

		return arrayBuffer;

	}

	_getVertexFormat( geometryAttribute ) {

		const { itemSize, normalized } = geometryAttribute;
		const ArrayType = geometryAttribute.array.constructor;
		const AttributeType = geometryAttribute.constructor;

		let format;

		if ( itemSize == 1 ) {

			format = typeArraysToVertexFormatPrefixForItemSize1.get( ArrayType );

		} else {

			const prefixOptions = typedAttributeToVertexFormatPrefix.get( AttributeType ) || typedArraysToVertexFormatPrefix.get( ArrayType );
			const prefix = prefixOptions[ normalized ? 1 : 0 ];

			if ( prefix ) {

				const bytesPerUnit = ArrayType.BYTES_PER_ELEMENT * itemSize;
				const paddedBytesPerUnit = Math.floor( ( bytesPerUnit + 3 ) / 4 ) * 4;
				const paddedItemSize = paddedBytesPerUnit / ArrayType.BYTES_PER_ELEMENT;

				if ( paddedItemSize % 1 ) {

					throw new Error( 'THREE.WebGPUAttributeUtils: Bad vertex format item size.' );

				}

				format = `${prefix}x${paddedItemSize}`;

			}

		}

		return format;

	}

	_getBufferAttribute( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		return attribute;

	}

}

class WebGPUBindingUtils {

	constructor( backend ) {

		this.backend = backend;

	}

	createBindings( bindings, pipeline ) {

		const backend = this.backend;
		const bindingsData = backend.get( bindings );

		// setup (static) binding layout and (dynamic) binding group

		const pipelineGPU = backend.get( pipeline ).pipeline;

		const bindLayoutGPU = pipelineGPU.getBindGroupLayout( 0 );
		const bindGroupGPU = this.createBindGroup( bindings, bindLayoutGPU );

		bindingsData.layout = bindLayoutGPU;
		bindingsData.group = bindGroupGPU;
		bindingsData.bindings = bindings;

	}

	updateBinding( binding ) {

		const backend = this.backend;
		const device = backend.device;

		const buffer = binding.buffer;
		const bufferGPU = backend.get( binding ).buffer;

		device.queue.writeBuffer( bufferGPU, 0, buffer, 0 );

	}

	createBindGroup( bindings, layoutGPU ) {

		const backend = this.backend;
		const device = backend.device;

		let bindingPoint = 0;
		const entriesGPU = [];

		for ( const binding of bindings ) {

			if ( binding.isUniformBuffer ) {

				const bindingData = backend.get( binding );

				if ( bindingData.buffer === undefined ) {

					const byteLength = binding.byteLength;

					const usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST;

					const bufferGPU = device.createBuffer( {
						label: 'bindingBuffer',
						size: byteLength,
						usage: usage
					} );

					bindingData.buffer = bufferGPU;

				}

				entriesGPU.push( { binding: bindingPoint, resource: { buffer: bindingData.buffer } } );

			} else if ( binding.isStorageBuffer ) {

				const bindingData = backend.get( binding );

				if ( bindingData.buffer === undefined ) {

					const attribute = binding.attribute;
					//const usage = GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX | /*GPUBufferUsage.COPY_SRC |*/ GPUBufferUsage.COPY_DST;

					//backend.attributeUtils.createAttribute( attribute, usage ); // @TODO: Move it to universal renderer

					bindingData.buffer = backend.get( attribute ).buffer;

				}

				entriesGPU.push( { binding: bindingPoint, resource: { buffer: bindingData.buffer } } );

			} else if ( binding.isSampler ) {

				const textureGPU = backend.get( binding.texture );

				entriesGPU.push( { binding: bindingPoint, resource: textureGPU.sampler } );

			} else if ( binding.isSampledTexture ) {

				const textureData = backend.get( binding.texture );

				let dimensionViewGPU;

				if ( binding.isSampledCubeTexture ) {

					dimensionViewGPU = GPUTextureViewDimension.Cube;

				} else {

					dimensionViewGPU = GPUTextureViewDimension.TwoD;

				}

				let resourceGPU;

				if ( textureData.externalTexture !== undefined ) {

					resourceGPU = device.importExternalTexture( { source: textureData.externalTexture } );

				} else {

					const aspectGPU = GPUTextureAspect.All;

					resourceGPU = textureData.texture.createView( { aspect: aspectGPU, dimension: dimensionViewGPU } );

				}

				entriesGPU.push( { binding: bindingPoint, resource: resourceGPU } );

			}

			bindingPoint ++;

		}

		return device.createBindGroup( {
			layout: layoutGPU,
			entries: entriesGPU
		} );

	}

}

class WebGPUPipelineUtils {

	constructor( backend ) {

		this.backend = backend;

	}

	createRenderPipeline( renderObject ) {

		const { object, material, geometry, pipeline } = renderObject;
		const { vertexProgram, fragmentProgram } = pipeline;

		const backend = this.backend;
		const device = backend.device;
		const utils = backend.utils;

		const pipelineData = backend.get( pipeline );

		// determine shader attributes

		const shaderAttributes = backend.attributeUtils.createShaderAttributes( renderObject );

		// vertex buffers

		const vertexBuffers = [];

		for ( const attribute of shaderAttributes ) {

			const geometryAttribute = attribute.geometryAttribute;
			const stepMode = ( geometryAttribute !== undefined && geometryAttribute.isInstancedBufferAttribute ) ? GPUInputStepMode.Instance : GPUInputStepMode.Vertex;

			vertexBuffers.push( {
				arrayStride: attribute.arrayStride,
				attributes: [ { shaderLocation: attribute.slot, offset: attribute.offset, format: attribute.format } ],
				stepMode: stepMode
			} );

		}

		// blending

		let alphaBlend = {};
		let colorBlend = {};

		if ( material.transparent === true && material.blending !== NoBlending ) {

			alphaBlend = this._getAlphaBlend( material );
			colorBlend = this._getColorBlend( material );

		}

		// stencil

		let stencilFront = {};

		if ( material.stencilWrite === true ) {

			stencilFront = {
				compare: this._getStencilCompare( material ),
				failOp: this._getStencilOperation( material.stencilFail ),
				depthFailOp: this._getStencilOperation( material.stencilZFail ),
				passOp: this._getStencilOperation( material.stencilZPass )
			};

		}

		//

		const vertexModule = backend.get( vertexProgram ).module;
		const fragmentModule = backend.get( fragmentProgram ).module;

		const primitiveState = this._getPrimitiveState( object, geometry, material );
		const colorWriteMask = this._getColorWriteMask( material );
		const depthCompare = this._getDepthCompare( material );
		const colorFormat = utils.getCurrentColorFormat( renderObject.context );
		const depthStencilFormat = utils.getCurrentDepthStencilFormat( renderObject.context );
		const sampleCount = utils.getSampleCount( renderObject.context );

		pipelineData.pipeline = device.createRenderPipeline( {
			vertex: Object.assign( {}, vertexModule, { buffers: vertexBuffers } ),
			fragment: Object.assign( {}, fragmentModule, { targets: [ {
				format: colorFormat,
				blend: {
					alpha: alphaBlend,
					color: colorBlend
				},
				writeMask: colorWriteMask
			} ] } ),
			primitive: primitiveState,
			depthStencil: {
				format: depthStencilFormat,
				depthWriteEnabled: material.depthWrite,
				depthCompare: depthCompare,
				stencilFront: stencilFront,
				stencilBack: {}, // three.js does not provide an API to configure the back function (gl.stencilFuncSeparate() was never used)
				stencilReadMask: material.stencilFuncMask,
				stencilWriteMask: material.stencilWriteMask
			},
			multisample: {
				count: sampleCount
			},
			layout: 'auto'
		} );

	}

	createComputePipeline( pipeline ) {

		const backend = this.backend;
		const device = backend.device;

		const computeProgram = backend.get( pipeline.computeProgram ).module;

		const pipelineGPU = backend.get( pipeline );

		pipelineGPU.pipeline = device.createComputePipeline( {
			compute: computeProgram,
			layout: 'auto'
		} );

	}

	_getAlphaBlend( material ) {

		const blending = material.blending;
		const premultipliedAlpha = material.premultipliedAlpha;

		let alphaBlend = undefined;

		switch ( blending ) {

			case NormalBlending:

				if ( premultipliedAlpha === false ) {

					alphaBlend = {
						srcFactor: GPUBlendFactor.One,
						dstFactor: GPUBlendFactor.OneMinusSrcAlpha,
						operation: GPUBlendOperation.Add
					};

				}

				break;

			case AdditiveBlending:

				alphaBlend = {
					srcFactor: GPUBlendFactor.Zero,
					dstFactor: GPUBlendFactor.One,
					operation: GPUBlendOperation.Add
				};

				break;

			case SubtractiveBlending:

				if ( premultipliedAlpha === true ) {

					alphaBlend = {
						srcFactor: GPUBlendFactor.OneMinusSrcColor,
						dstFactor: GPUBlendFactor.OneMinusSrcAlpha,
						operation: GPUBlendOperation.Add
					};

				}

				break;

			case MultiplyBlending:

				if ( premultipliedAlpha === true ) {

					alphaBlend = {
						srcFactor: GPUBlendFactor.Zero,
						dstFactor: GPUBlendFactor.SrcAlpha,
						operation: GPUBlendOperation.Add
					};

				}

				break;

			case CustomBlending:

				const blendSrcAlpha = material.blendSrcAlpha;
				const blendDstAlpha = material.blendDstAlpha;
				const blendEquationAlpha = material.blendEquationAlpha;

				if ( blendSrcAlpha !== null && blendDstAlpha !== null && blendEquationAlpha !== null ) {

					alphaBlend = {
						srcFactor: this._getBlendFactor( blendSrcAlpha ),
						dstFactor: this._getBlendFactor( blendDstAlpha ),
						operation: this._getBlendOperation( blendEquationAlpha )
					};

				}

				break;

		}

		return alphaBlend;

	}

	_getBlendFactor( blend ) {

		let blendFactor;

		switch ( blend ) {

			case ZeroFactor:
				blendFactor = GPUBlendFactor.Zero;
				break;

			case OneFactor:
				blendFactor = GPUBlendFactor.One;
				break;

			case SrcColorFactor:
				blendFactor = GPUBlendFactor.SrcColor;
				break;

			case OneMinusSrcColorFactor:
				blendFactor = GPUBlendFactor.OneMinusSrcColor;
				break;

			case SrcAlphaFactor:
				blendFactor = GPUBlendFactor.SrcAlpha;
				break;

			case OneMinusSrcAlphaFactor:
				blendFactor = GPUBlendFactor.OneMinusSrcAlpha;
				break;

			case DstColorFactor:
				blendFactor = GPUBlendFactor.DstColor;
				break;

			case OneMinusDstColorFactor:
				blendFactor = GPUBlendFactor.OneMinusDstColor;
				break;

			case DstAlphaFactor:
				blendFactor = GPUBlendFactor.DstAlpha;
				break;

			case OneMinusDstAlphaFactor:
				blendFactor = GPUBlendFactor.OneMinusDstAlpha;
				break;

			case SrcAlphaSaturateFactor:
				blendFactor = GPUBlendFactor.SrcAlphaSaturated;
				break;

			case BlendColorFactor:
				blendFactor = GPUBlendFactor.BlendColor;
				break;

			case OneMinusBlendColorFactor:
				blendFactor = GPUBlendFactor.OneMinusBlendColor;
				break;

		}

		return blendFactor;

	}

	_getColorBlend( material ) {

		const blending = material.blending;
		const premultipliedAlpha = material.premultipliedAlpha;

		const colorBlend = {
			srcFactor: null,
			dstFactor: null,
			operation: null
		};

		switch ( blending ) {

			case NormalBlending:
				colorBlend.srcFactor = ( premultipliedAlpha === true ) ? GPUBlendFactor.One : GPUBlendFactor.SrcAlpha;
				colorBlend.dstFactor = GPUBlendFactor.OneMinusSrcAlpha;
				colorBlend.operation = GPUBlendOperation.Add;
				break;

			case AdditiveBlending:
				colorBlend.srcFactor = ( premultipliedAlpha === true ) ? GPUBlendFactor.One : GPUBlendFactor.SrcAlpha;
				colorBlend.dstFactor = GPUBlendFactor.One;
				colorBlend.operation = GPUBlendOperation.Add;
				break;

			case SubtractiveBlending:
				colorBlend.srcFactor = GPUBlendFactor.Zero;
				colorBlend.dstFactor = ( premultipliedAlpha === true ) ? GPUBlendFactor.Zero : GPUBlendFactor.OneMinusSrcColor;
				colorBlend.operation = GPUBlendOperation.Add;
				break;

			case MultiplyBlending:
				colorBlend.srcFactor = GPUBlendFactor.Zero;
				colorBlend.dstFactor = GPUBlendFactor.SrcColor;
				colorBlend.operation = GPUBlendOperation.Add;
				break;

			case CustomBlending:
				colorBlend.srcFactor = this._getBlendFactor( material.blendSrc );
				colorBlend.dstFactor = this._getBlendFactor( material.blendDst );
				colorBlend.operation = this._getBlendOperation( material.blendEquation );
				break;

		}

		return colorBlend;

	}

	_getStencilCompare( material ) {

		let stencilCompare;

		const stencilFunc = material.stencilFunc;

		switch ( stencilFunc ) {

			case NeverStencilFunc:
				stencilCompare = GPUCompareFunction.Never;
				break;

			case AlwaysStencilFunc:
				stencilCompare = GPUCompareFunction.Always;
				break;

			case LessStencilFunc:
				stencilCompare = GPUCompareFunction.Less;
				break;

			case LessEqualStencilFunc:
				stencilCompare = GPUCompareFunction.LessEqual;
				break;

			case EqualStencilFunc:
				stencilCompare = GPUCompareFunction.Equal;
				break;

			case GreaterEqualStencilFunc:
				stencilCompare = GPUCompareFunction.GreaterEqual;
				break;

			case GreaterStencilFunc:
				stencilCompare = GPUCompareFunction.Greater;
				break;

			case NotEqualStencilFunc:
				stencilCompare = GPUCompareFunction.NotEqual;
				break;

		}

		return stencilCompare;

	}

	_getStencilOperation( op ) {

		let stencilOperation;

		switch ( op ) {

			case KeepStencilOp:
				stencilOperation = GPUStencilOperation.Keep;
				break;

			case ZeroStencilOp:
				stencilOperation = GPUStencilOperation.Zero;
				break;

			case ReplaceStencilOp:
				stencilOperation = GPUStencilOperation.Replace;
				break;

			case InvertStencilOp:
				stencilOperation = GPUStencilOperation.Invert;
				break;

			case IncrementStencilOp:
				stencilOperation = GPUStencilOperation.IncrementClamp;
				break;

			case DecrementStencilOp:
				stencilOperation = GPUStencilOperation.DecrementClamp;
				break;

			case IncrementWrapStencilOp:
				stencilOperation = GPUStencilOperation.IncrementWrap;
				break;

			case DecrementWrapStencilOp:
				stencilOperation = GPUStencilOperation.DecrementWrap;
				break;

		}

		return stencilOperation;

	}

	_getBlendOperation( blendEquation ) {

		let blendOperation;

		switch ( blendEquation ) {

			case AddEquation:
				blendOperation = GPUBlendOperation.Add;
				break;

			case SubtractEquation:
				blendOperation = GPUBlendOperation.Subtract;
				break;

			case ReverseSubtractEquation:
				blendOperation = GPUBlendOperation.ReverseSubtract;
				break;

			case MinEquation:
				blendOperation = GPUBlendOperation.Min;
				break;

			case MaxEquation:
				blendOperation = GPUBlendOperation.Max;
				break;

		}

		return blendOperation;

	}

	_getPrimitiveState( object, geometry, material ) {

		const descriptor = {};
		const utils = this.backend.utils;

		descriptor.topology = utils.getPrimitiveTopology( object, material );

		if ( object.isLine === true && object.isLineSegments !== true ) {

			const count = ( geometry.index ) ? geometry.index.count : geometry.attributes.position.count;
			descriptor.stripIndexFormat = ( count > 65535 ) ? GPUIndexFormat.Uint32 : GPUIndexFormat.Uint16; // define data type for primitive restart value

		}

		switch ( material.side ) {

			case FrontSide:
				descriptor.frontFace = GPUFrontFace.CW;
				descriptor.cullMode = GPUCullMode.Front;
				break;

			case BackSide:
				descriptor.frontFace = GPUFrontFace.CW;
				descriptor.cullMode = GPUCullMode.Back;
				break;

			case DoubleSide:
				descriptor.frontFace = GPUFrontFace.CW;
				descriptor.cullMode = GPUCullMode.None;
				break;

		}

		return descriptor;

	}

	_getColorWriteMask( material ) {

		return ( material.colorWrite === true ) ? GPUColorWriteFlags.All : GPUColorWriteFlags.None;

	}

	_getDepthCompare( material ) {

		let depthCompare;

		if ( material.depthTest === false ) {

			depthCompare = GPUCompareFunction.Always;

		} else {

			const depthFunc = material.depthFunc;

			switch ( depthFunc ) {

				case NeverDepth:
					depthCompare = GPUCompareFunction.Never;
					break;

				case AlwaysDepth:
					depthCompare = GPUCompareFunction.Always;
					break;

				case LessDepth:
					depthCompare = GPUCompareFunction.Less;
					break;

				case LessEqualDepth:
					depthCompare = GPUCompareFunction.LessEqual;
					break;

				case EqualDepth:
					depthCompare = GPUCompareFunction.Equal;
					break;

				case GreaterEqualDepth:
					depthCompare = GPUCompareFunction.GreaterEqual;
					break;

				case GreaterDepth:
					depthCompare = GPUCompareFunction.Greater;
					break;

				case NotEqualDepth:
					depthCompare = GPUCompareFunction.NotEqual;
					break;

			}

		}

		return depthCompare;

	}

}

class WebGPUTextureMipmapUtils {

	constructor( device ) {

		this.device = device;

		const mipmapVertexSource = `
struct VarysStruct {
	@builtin( position ) Position: vec4<f32>,
	@location( 0 ) vTex : vec2<f32>
};

@vertex
fn main( @builtin( vertex_index ) vertexIndex : u32 ) -> VarysStruct {

	var Varys : VarysStruct;

	var pos = array< vec2<f32>, 4 >(
		vec2<f32>( -1.0,  1.0 ),
		vec2<f32>(  1.0,  1.0 ),
		vec2<f32>( -1.0, -1.0 ),
		vec2<f32>(  1.0, -1.0 )
	);

	var tex = array< vec2<f32>, 4 >(
		vec2<f32>( 0.0, 0.0 ),
		vec2<f32>( 1.0, 0.0 ),
		vec2<f32>( 0.0, 1.0 ),
		vec2<f32>( 1.0, 1.0 )
	);

	Varys.vTex = tex[ vertexIndex ];
	Varys.Position = vec4<f32>( pos[ vertexIndex ], 0.0, 1.0 );

	return Varys;

}
`;

		const mipmapFragmentSource = `
@group( 0 ) @binding( 0 )
var imgSampler : sampler;

@group( 0 ) @binding( 1 )
var img : texture_2d<f32>;

@fragment
fn main( @location( 0 ) vTex : vec2<f32> ) -> @location( 0 ) vec4<f32> {

	return textureSample( img, imgSampler, vTex );

}
`;

		this.sampler = device.createSampler( { minFilter: GPUFilterMode.Linear } );

		// We'll need a new pipeline for every texture format used.
		this.pipelines = {};

		this.mipmapVertexShaderModule = device.createShaderModule( {
			label: 'mipmapVertex',
			code: mipmapVertexSource
		} );

		this.mipmapFragmentShaderModule = device.createShaderModule( {
			label: 'mipmapFragment',
			code: mipmapFragmentSource
		} );

	}

	getMipmapPipeline( format ) {

		let pipeline = this.pipelines[ format ];

		if ( pipeline === undefined ) {

			pipeline = this.device.createRenderPipeline( {
				vertex: {
					module: this.mipmapVertexShaderModule,
					entryPoint: 'main'
				},
				fragment: {
					module: this.mipmapFragmentShaderModule,
					entryPoint: 'main',
					targets: [ { format } ]
				},
				primitive: {
					topology: GPUPrimitiveTopology.TriangleStrip,
					stripIndexFormat: GPUIndexFormat.Uint32
				},
				layout: 'auto'
			} );

			this.pipelines[ format ] = pipeline;

		}

		return pipeline;

	}

	generateMipmaps( textureGPU, textureGPUDescriptor, baseArrayLayer = 0 ) {

		const pipeline = this.getMipmapPipeline( textureGPUDescriptor.format );

		const commandEncoder = this.device.createCommandEncoder( {} );
		const bindGroupLayout = pipeline.getBindGroupLayout( 0 ); // @TODO: Consider making this static.

		let srcView = textureGPU.createView( {
			baseMipLevel: 0,
			mipLevelCount: 1,
			dimension: GPUTextureViewDimension.TwoD,
			baseArrayLayer
		} );

		for ( let i = 1; i < textureGPUDescriptor.mipLevelCount; i ++ ) {

			const dstView = textureGPU.createView( {
				baseMipLevel: i,
				mipLevelCount: 1,
				dimension: GPUTextureViewDimension.TwoD,
				baseArrayLayer
			} );

			const passEncoder = commandEncoder.beginRenderPass( {
				colorAttachments: [ {
					view: dstView,
					loadOp: GPULoadOp.Clear,
					storeOp: GPUStoreOp.Store,
					clearValue: [ 0, 0, 0, 0 ]
				} ]
			} );

			const bindGroup = this.device.createBindGroup( {
				layout: bindGroupLayout,
				entries: [ {
					binding: 0,
					resource: this.sampler
				}, {
					binding: 1,
					resource: srcView
				} ]
			} );

			passEncoder.setPipeline( pipeline );
			passEncoder.setBindGroup( 0, bindGroup );
			passEncoder.draw( 4, 1, 0, 0 );
			passEncoder.end();

			srcView = dstView;

		}

		this.device.queue.submit( [ commandEncoder.finish() ] );

	}

}

const _compareToWebGPU = {
	[ NeverCompare ]: 'never',
	[ AlwaysCompare ]: 'less',
	[ LessCompare ]: 'equal',
	[ LessEqualCompare ]: 'less-equal',
	[ EqualCompare ]: 'greater',
	[ GreaterEqualCompare ]: 'not-equal',
	[ GreaterCompare ]: 'greater-equal',
	[ NotEqualCompare ]: 'always'
};

class WebGPUTextureUtils {

	constructor( backend ) {

		this.backend = backend;

		this.mipmapUtils = null;

		this.defaultTexture = null;
		this.defaultCubeTexture = null;

	}

	createSampler( texture ) {

		const backend = this.backend;
		const device = backend.device;

		const textureGPU = backend.get( texture );

		const samplerDescriptorGPU = {
			addressModeU: this._convertAddressMode( texture.wrapS ),
			addressModeV: this._convertAddressMode( texture.wrapT ),
			addressModeW: this._convertAddressMode( texture.wrapR ),
			magFilter: this._convertFilterMode( texture.magFilter ),
			minFilter: this._convertFilterMode( texture.minFilter ),
			mipmapFilter: this._convertFilterMode( texture.minFilter ),
			maxAnisotropy: texture.anisotropy
		};

		if ( texture.isDepthTexture && texture.compareFunction !== null ) {

			samplerDescriptorGPU.compare = _compareToWebGPU[ texture.compareFunction ];

		}

		textureGPU.sampler = device.createSampler( samplerDescriptorGPU );

	}

	createDefaultTexture( texture ) {

		let textureGPU;

		if ( texture.isCubeTexture ) {

			textureGPU = this._getDefaultCubeTextureGPU();

		} else {

			textureGPU = this._getDefaultTextureGPU();

		}

		this.backend.get( texture ).texture = textureGPU;

	}

	createTexture( texture, options = {} ) {

		const backend = this.backend;
		const textureData = backend.get( texture );

		if ( textureData.initialized ) {

			throw new Error( 'WebGPUTextureUtils: Texture already initialized.' );

		}

		const { width, height, depth } = this._getSize( texture );

		const needsMipmaps = this._needsMipmaps( texture );
		const dimension = this._getDimension( texture );
		const mipLevelCount = this._getMipLevelCount( texture, width, height, needsMipmaps );
		const format = texture.internalFormat || this._getFormat( texture );
		//const sampleCount = texture.isRenderTargetTexture || texture.isDepthTexture ? backend.utils.getSampleCount( renderContext ) : 1;
		const sampleCount = options.sampleCount !== undefined ? options.sampleCount : 1;

		let usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC;

		if ( texture.isCompressedTexture !== true ) {

			usage |= GPUTextureUsage.RENDER_ATTACHMENT;

		}

		const textureDescriptorGPU = {
			label: texture.name,
			size: {
				width: width,
				height: height,
				depthOrArrayLayers: depth,
			},
			mipLevelCount: mipLevelCount,
			sampleCount: sampleCount,
			dimension: dimension,
			format: format,
			usage: usage
		};

		// texture creation

		if ( texture.isVideoTexture ) {

			const video = texture.source.data;
			const videoFrame = new VideoFrame( video );

			textureDescriptorGPU.size.width = videoFrame.displayWidth;
			textureDescriptorGPU.size.height = videoFrame.displayHeight;

			videoFrame.close();

			textureData.externalTexture = video;

		} else {

			textureData.texture = backend.device.createTexture( textureDescriptorGPU );

		}

		textureData.initialized = true;

		textureData.needsMipmaps = needsMipmaps;
		textureData.textureDescriptorGPU = textureDescriptorGPU;

	}

	destroyTexture( texture ) {

		const backend = this.backend;
		const textureData = backend.get( texture );

		textureData.texture.destroy();

		backend.delete( texture );

	}

	destroySampler( texture ) {

		const backend = this.backend;
		const textureData = backend.get( texture );

		delete textureData.sampler;

	}

	generateMipmaps( texture ) {

		const textureData = this.backend.get( texture );

		if ( texture.isCubeTexture ) {

			for ( let i = 0; i < 6; i ++ ) {

				this._generateMipmaps( textureData.texture, textureData.textureDescriptorGPU, i );

			}

		} else {

			this._generateMipmaps( textureData.texture, textureData.textureDescriptorGPU );

		}

	}

	updateTexture( texture ) {

		const textureData = this.backend.get( texture );

		const { needsMipmaps, textureDescriptorGPU } = textureData;

		// transfer texture data

		if ( texture.isDataTexture || texture.isDataArrayTexture || texture.isData3DTexture ) {

			this._copyBufferToTexture( texture.image, textureData.texture, textureDescriptorGPU, needsMipmaps );

		} else if ( texture.isCompressedTexture ) {

			this._copyCompressedBufferToTexture( texture.mipmaps, textureData.texture, textureDescriptorGPU );

		} else if ( texture.isCubeTexture ) {

			if ( texture.image.length === 6 ) {

				this._copyCubeMapToTexture( texture.image, texture, textureData.texture, textureDescriptorGPU, needsMipmaps );

			}

		} else if ( texture.isRenderTargetTexture ) {

			if ( needsMipmaps === true ) this._generateMipmaps( textureData.texture, textureDescriptorGPU );

		} else if ( texture.isVideoTexture ) {

			const video = texture.source.data;

			textureData.externalTexture = video;

		} else if ( texture.image !== null ) {

			this._copyImageToTexture( texture.image, texture, textureData.texture, textureDescriptorGPU, needsMipmaps );

		} else ;

		//

		textureData.version = texture.version;

	}

	_isEnvironmentTexture( texture ) {

		const mapping = texture.mapping;

		return ( mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping ) || ( mapping === CubeReflectionMapping || mapping === CubeRefractionMapping );

	}

	_getDefaultTextureGPU() {

		let defaultTexture = this.defaultTexture;

		if ( defaultTexture === null ) {

			const texture = new Texture();
			texture.minFilter = NearestFilter;
			texture.magFilter = NearestFilter;

			this.createTexture( texture );

			this.defaultTexture = defaultTexture = texture;

		}

		return this.backend.get( defaultTexture ).texture;

	}

	_getDefaultCubeTextureGPU() {

		let defaultCubeTexture = this.defaultTexture;

		if ( defaultCubeTexture === null ) {

			const texture = new CubeTexture();
			texture.minFilter = NearestFilter;
			texture.magFilter = NearestFilter;

			this.createTexture( texture );

			this.defaultCubeTexture = defaultCubeTexture = texture;

		}

		return this.backend.get( defaultCubeTexture ).texture;

	}

	_copyImageToTexture( image, texture, textureGPU, textureDescriptorGPU, needsMipmaps, originDepth ) {

		if ( this._isHTMLImage( image ) ) {

			this._getImageBitmapFromHTML( image, texture ).then( imageBitmap => {

				this._copyExternalImageToTexture( imageBitmap, textureGPU, textureDescriptorGPU, needsMipmaps, originDepth );

			} );

		} else {

			// assume ImageBitmap

			this._copyExternalImageToTexture( image, textureGPU, textureDescriptorGPU, needsMipmaps, originDepth );

		}

	}

	_isHTMLImage( image ) {

		return ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) || ( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement );

	}

	_copyCubeMapToTexture( images, texture, textureGPU, textureDescriptorGPU, needsMipmaps ) {

		for ( let i = 0; i < 6; i ++ ) {

			const image = images[ i ];

			if ( image.isDataTexture ) {

				this._copyBufferToTexture( image.image, textureGPU, textureDescriptorGPU, needsMipmaps, i );

			} else {

				this._copyImageToTexture( image, texture, textureGPU, textureDescriptorGPU, needsMipmaps, i );

			}

		}

	}

	_copyExternalImageToTexture( image, textureGPU, textureDescriptorGPU, needsMipmaps, originDepth = 0 ) {

		const device = this.backend.device;

		device.queue.copyExternalImageToTexture(
			{
				source: image
			}, {
				texture: textureGPU,
				mipLevel: 0,
				origin: { x: 0, y: 0, z: originDepth }
			}, {
				width: image.width,
				height: image.height,
				depthOrArrayLayers: 1
			}
		);

		if ( needsMipmaps ) this._generateMipmaps( textureGPU, textureDescriptorGPU, originDepth );

	}

	_generateMipmaps( textureGPU, textureDescriptorGPU, baseArrayLayer = 0 ) {

		if ( this.mipmapUtils === null ) {

			this.mipmapUtils = new WebGPUTextureMipmapUtils( this.backend.device );

		}

		this.mipmapUtils.generateMipmaps( textureGPU, textureDescriptorGPU, baseArrayLayer );

	}

	_getImageBitmapFromHTML( image, texture ) {

		const width = image.width;
		const height = image.height;

		const options = {};

		options.imageOrientation = ( texture.flipY === true ) ? 'flipY' : 'none';
		options.premultiplyAlpha = ( texture.premultiplyAlpha === true ) ? 'premultiply' : 'default';

		return createImageBitmap( image, 0, 0, width, height, options );

	}

	_copyBufferToTexture( image, textureGPU, textureDescriptorGPU, needsMipmaps, originDepth = 0 ) {

		// @TODO: Consider to use GPUCommandEncoder.copyBufferToTexture()
		// @TODO: Consider to support valid buffer layouts with other formats like RGB

		const device = this.backend.device;

		const data = image.data;

		const bytesPerTexel = this._getBytesPerTexel( textureDescriptorGPU.format );
		const bytesPerRow = image.width * bytesPerTexel;

		device.queue.writeTexture(
			{
				texture: textureGPU,
				mipLevel: 0,
				origin: { x: 0, y: 0, z: originDepth }
			},
			data,
			{
				offset: 0,
				bytesPerRow
			},
			{
				width: image.width,
				height: image.height,
				depthOrArrayLayers: ( image.depth !== undefined ) ? image.depth : 1
			} );

		if ( needsMipmaps === true ) this._generateMipmaps( textureGPU, textureDescriptorGPU, originDepth );

	}

	_copyCompressedBufferToTexture( mipmaps, textureGPU, textureDescriptorGPU ) {

		// @TODO: Consider to use GPUCommandEncoder.copyBufferToTexture()

		const device = this.backend.device;

		const blockData = this._getBlockData( textureDescriptorGPU.format );

		for ( let i = 0; i < mipmaps.length; i ++ ) {

			const mipmap = mipmaps[ i ];

			const width = mipmap.width;
			const height = mipmap.height;

			const bytesPerRow = Math.ceil( width / blockData.width ) * blockData.byteLength;

			device.queue.writeTexture(
				{
					texture: textureGPU,
					mipLevel: i
				},
				mipmap.data,
				{
					offset: 0,
					bytesPerRow
				},
				{
					width: Math.ceil( width / blockData.width ) * blockData.width,
					height: Math.ceil( height / blockData.width ) * blockData.width,
					depthOrArrayLayers: 1
				}
			);

		}

	}

	_getBlockData( format ) {

		// this method is only relevant for compressed texture formats

		if ( format === GPUTextureFormat.BC1RGBAUnorm || format === GPUTextureFormat.BC1RGBAUnormSRGB ) return { byteLength: 8, width: 4, height: 4 }; // DXT1
		if ( format === GPUTextureFormat.BC2RGBAUnorm || format === GPUTextureFormat.BC2RGBAUnormSRGB ) return { byteLength: 16, width: 4, height: 4 }; // DXT3
		if ( format === GPUTextureFormat.BC3RGBAUnorm || format === GPUTextureFormat.BC3RGBAUnormSRGB ) return { byteLength: 16, width: 4, height: 4 }; // DXT5
		if ( format === GPUTextureFormat.BC4RUnorm || format === GPUTextureFormat.BC4RSNorm ) return { byteLength: 8, width: 4, height: 4 }; // RGTC1
		if ( format === GPUTextureFormat.BC5RGUnorm || format === GPUTextureFormat.BC5RGSnorm ) return { byteLength: 16, width: 4, height: 4 }; // RGTC2
		if ( format === GPUTextureFormat.BC6HRGBUFloat || format === GPUTextureFormat.BC6HRGBFloat ) return { byteLength: 16, width: 4, height: 4 }; // BPTC (float)
		if ( format === GPUTextureFormat.BC7RGBAUnorm || format === GPUTextureFormat.BC7RGBAUnormSRGB ) return { byteLength: 16, width: 4, height: 4 }; // BPTC (unorm)

		if ( format === GPUTextureFormat.ETC2RGB8Unorm || format === GPUTextureFormat.ETC2RGB8UnormSRGB ) return { byteLength: 8, width: 4, height: 4 };
		if ( format === GPUTextureFormat.ETC2RGB8A1Unorm || format === GPUTextureFormat.ETC2RGB8A1UnormSRGB ) return { byteLength: 8, width: 4, height: 4 };
		if ( format === GPUTextureFormat.ETC2RGBA8Unorm || format === GPUTextureFormat.ETC2RGBA8UnormSRGB ) return { byteLength: 16, width: 4, height: 4 };
		if ( format === GPUTextureFormat.EACR11Unorm ) return { byteLength: 8, width: 4, height: 4 };
		if ( format === GPUTextureFormat.EACR11Snorm ) return { byteLength: 8, width: 4, height: 4 };
		if ( format === GPUTextureFormat.EACRG11Unorm ) return { byteLength: 16, width: 4, height: 4 };
		if ( format === GPUTextureFormat.EACRG11Snorm ) return { byteLength: 16, width: 4, height: 4 };

		if ( format === GPUTextureFormat.ASTC4x4Unorm || format === GPUTextureFormat.ASTC4x4UnormSRGB ) return { byteLength: 16, width: 4, height: 4 };
		if ( format === GPUTextureFormat.ASTC5x4Unorm || format === GPUTextureFormat.ASTC5x4UnormSRGB ) return { byteLength: 16, width: 5, height: 4 };
		if ( format === GPUTextureFormat.ASTC5x5Unorm || format === GPUTextureFormat.ASTC5x5UnormSRGB ) return { byteLength: 16, width: 5, height: 5 };
		if ( format === GPUTextureFormat.ASTC6x5Unorm || format === GPUTextureFormat.ASTC6x5UnormSRGB ) return { byteLength: 16, width: 6, height: 5 };
		if ( format === GPUTextureFormat.ASTC6x6Unorm || format === GPUTextureFormat.ASTC6x6UnormSRGB ) return { byteLength: 16, width: 6, height: 6 };
		if ( format === GPUTextureFormat.ASTC8x5Unorm || format === GPUTextureFormat.ASTC8x5UnormSRGB ) return { byteLength: 16, width: 8, height: 5 };
		if ( format === GPUTextureFormat.ASTC8x6Unorm || format === GPUTextureFormat.ASTC8x6UnormSRGB ) return { byteLength: 16, width: 8, height: 6 };
		if ( format === GPUTextureFormat.ASTC8x8Unorm || format === GPUTextureFormat.ASTC8x8UnormSRGB ) return { byteLength: 16, width: 8, height: 8 };
		if ( format === GPUTextureFormat.ASTC10x5Unorm || format === GPUTextureFormat.ASTC10x5UnormSRGB ) return { byteLength: 16, width: 10, height: 5 };
		if ( format === GPUTextureFormat.ASTC10x6Unorm || format === GPUTextureFormat.ASTC10x6UnormSRGB ) return { byteLength: 16, width: 10, height: 6 };
		if ( format === GPUTextureFormat.ASTC10x8Unorm || format === GPUTextureFormat.ASTC10x8UnormSRGB ) return { byteLength: 16, width: 10, height: 8 };
		if ( format === GPUTextureFormat.ASTC10x10Unorm || format === GPUTextureFormat.ASTC10x10UnormSRGB ) return { byteLength: 16, width: 10, height: 10 };
		if ( format === GPUTextureFormat.ASTC12x10Unorm || format === GPUTextureFormat.ASTC12x10UnormSRGB ) return { byteLength: 16, width: 12, height: 10 };
		if ( format === GPUTextureFormat.ASTC12x12Unorm || format === GPUTextureFormat.ASTC12x12UnormSRGB ) return { byteLength: 16, width: 12, height: 12 };

	}

	_convertAddressMode( value ) {

		let addressMode = GPUAddressMode.ClampToEdge;

		if ( value === RepeatWrapping ) {

			addressMode = GPUAddressMode.Repeat;

		} else if ( value === MirroredRepeatWrapping ) {

			addressMode = GPUAddressMode.MirrorRepeat;

		}

		return addressMode;

	}

	_convertFilterMode( value ) {

		let filterMode = GPUFilterMode.Linear;

		if ( value === NearestFilter || value === NearestMipmapNearestFilter || value === NearestMipmapLinearFilter ) {

			filterMode = GPUFilterMode.Nearest;

		}

		return filterMode;

	}

	_getSize( texture ) {

		const image = texture.image;

		let width, height, depth;

		if ( texture.isCubeTexture ) {

			const faceImage = image.length > 0 ? image[ 0 ].image || image[ 0 ] : null;

			width = faceImage ? faceImage.width : 1;
			height = faceImage ? faceImage.height : 1;
			depth = 6; // one image for each side of the cube map

		} else if ( image !== null ) {

			width = image.width;
			height = image.height;
			depth = ( image.depth !== undefined ) ? image.depth : 1;

		} else {

			width = height = depth = 1;

		}

		return { width, height, depth };

	}

	_needsMipmaps( texture ) {

		if ( this._isEnvironmentTexture( texture ) ) return true;

		return ( texture.isCompressedTexture !== true ) /*&& ( texture.generateMipmaps === true )*/ && ( texture.minFilter !== NearestFilter ) && ( texture.minFilter !== LinearFilter );

	}

	_getBytesPerTexel( format ) {

		if ( format === GPUTextureFormat.R8Unorm ) return 1;
		if ( format === GPUTextureFormat.R16Float ) return 2;
		if ( format === GPUTextureFormat.RG8Unorm ) return 2;
		if ( format === GPUTextureFormat.RG16Float ) return 4;
		if ( format === GPUTextureFormat.R32Float ) return 4;
		if ( format === GPUTextureFormat.RGBA8Unorm || format === GPUTextureFormat.RGBA8UnormSRGB ) return 4;
		if ( format === GPUTextureFormat.RG32Float ) return 8;
		if ( format === GPUTextureFormat.RGBA16Float ) return 8;
		if ( format === GPUTextureFormat.RGBA32Float ) return 16;

	}

	_getDimension( texture ) {

		let dimension;

		if ( texture.isData3DTexture ) {

			dimension = GPUTextureDimension.ThreeD;

		} else {

			dimension = GPUTextureDimension.TwoD;

		}

		return dimension;

	}

	_getMipLevelCount( texture, width, height, needsMipmaps ) {

		let mipLevelCount;

		if ( texture.isCompressedTexture ) {

			mipLevelCount = texture.mipmaps.length;

		} else if ( needsMipmaps ) {

			mipLevelCount = Math.floor( Math.log2( Math.max( width, height ) ) ) + 1;

		} else {

			mipLevelCount = 1; // a texture without mipmaps has a base mip (mipLevel 0)

		}

		return mipLevelCount;

	}

	_getFormat( texture ) {

		const format = texture.format;
		const type = texture.type;
		const colorSpace = texture.colorSpace;

		let formatGPU;

		if ( /*texture.isRenderTargetTexture === true ||*/ texture.isFramebufferTexture === true ) {

			formatGPU = GPUTextureFormat.BGRA8Unorm;

		} else if ( texture.isCompressedTexture === true ) {

			switch ( format ) {

				case RGBA_S3TC_DXT1_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.BC1RGBAUnormSRGB : GPUTextureFormat.BC1RGBAUnorm;
					break;

				case RGBA_S3TC_DXT3_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.BC2RGBAUnormSRGB : GPUTextureFormat.BC2RGBAUnorm;
					break;

				case RGBA_S3TC_DXT5_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.BC3RGBAUnormSRGB : GPUTextureFormat.BC3RGBAUnorm;
					break;

				case RGB_ETC2_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ETC2RGB8UnormSRGB : GPUTextureFormat.ETC2RGB8Unorm;
					break;

				case RGBA_ETC2_EAC_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ETC2RGBA8UnormSRGB : GPUTextureFormat.ETC2RGBA8Unorm;
					break;

				case RGBA_ASTC_4x4_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC4x4UnormSRGB : GPUTextureFormat.ASTC4x4Unorm;
					break;

				case RGBA_ASTC_5x4_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC5x4UnormSRGB : GPUTextureFormat.ASTC5x4Unorm;
					break;

				case RGBA_ASTC_5x5_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC5x5UnormSRGB : GPUTextureFormat.ASTC5x5Unorm;
					break;

				case RGBA_ASTC_6x5_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC6x5UnormSRGB : GPUTextureFormat.ASTC6x5Unorm;
					break;

				case RGBA_ASTC_6x6_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC6x6UnormSRGB : GPUTextureFormat.ASTC6x6Unorm;
					break;

				case RGBA_ASTC_8x5_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC8x5UnormSRGB : GPUTextureFormat.ASTC8x5Unorm;
					break;

				case RGBA_ASTC_8x6_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC8x6UnormSRGB : GPUTextureFormat.ASTC8x6Unorm;
					break;

				case RGBA_ASTC_8x8_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC8x8UnormSRGB : GPUTextureFormat.ASTC8x8Unorm;
					break;

				case RGBA_ASTC_10x5_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC10x5UnormSRGB : GPUTextureFormat.ASTC10x5Unorm;
					break;

				case RGBA_ASTC_10x6_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC10x6UnormSRGB : GPUTextureFormat.ASTC10x6Unorm;
					break;

				case RGBA_ASTC_10x8_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC10x8UnormSRGB : GPUTextureFormat.ASTC10x8Unorm;
					break;

				case RGBA_ASTC_10x10_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC10x10UnormSRGB : GPUTextureFormat.ASTC10x10Unorm;
					break;

				case RGBA_ASTC_12x10_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC12x10UnormSRGB : GPUTextureFormat.ASTC12x10Unorm;
					break;

				case RGBA_ASTC_12x12_Format:
					formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.ASTC12x12UnormSRGB : GPUTextureFormat.ASTC12x12Unorm;
					break;

			}

		} else {

			switch ( format ) {

				case RGBAFormat:

					switch ( type ) {

						case UnsignedByteType:
							formatGPU = ( colorSpace === SRGBColorSpace ) ? GPUTextureFormat.RGBA8UnormSRGB : GPUTextureFormat.RGBA8Unorm;
							break;

						case HalfFloatType:
							formatGPU = GPUTextureFormat.RGBA16Float;
							break;

						case FloatType:
							formatGPU = GPUTextureFormat.RGBA32Float;
							break;

					}

					break;

				case RedFormat:

					switch ( type ) {

						case UnsignedByteType:
							formatGPU = GPUTextureFormat.R8Unorm;
							break;

						case HalfFloatType:
							formatGPU = GPUTextureFormat.R16Float;
							break;

						case FloatType:
							formatGPU = GPUTextureFormat.R32Float;
							break;

					}

					break;

				case RGFormat:

					switch ( type ) {

						case UnsignedByteType:
							formatGPU = GPUTextureFormat.RG8Unorm;
							break;

						case HalfFloatType:
							formatGPU = GPUTextureFormat.RG16Float;
							break;

						case FloatType:
							formatGPU = GPUTextureFormat.RG32Float;
							break;

					}

					break;

				case DepthFormat:

					switch ( type ) {

						case UnsignedShortType:
							formatGPU = GPUTextureFormat.Depth16Unorm;
							break;

						case UnsignedIntType:
							formatGPU = GPUTextureFormat.Depth24Plus;
							break;

						case FloatType:
							formatGPU = GPUTextureFormat.Depth32Float;
							break;

					}

					break;

				case DepthStencilFormat:

					switch ( type ) {

						case UnsignedInt248Type:
							formatGPU = GPUTextureFormat.Depth24PlusStencil8;
							break;

						case FloatType:

							if ( this.device.features.has( GPUFeatureName.Depth32FloatStencil8 ) === false ) ;

							formatGPU = GPUTextureFormat.Depth32FloatStencil8;

							break;

					}

					break;

			}

		}

		return formatGPU;

	}

}

/*// debugger tools
import 'https://greggman.github.io/webgpu-avoid-redundant-state-setting/webgpu-check-redundant-state-setting.js';
//*/

// statics

/*let _staticAdapter = null;

if ( navigator.gpu !== undefined ) {

	_staticAdapter = await navigator.gpu.requestAdapter();

}*/

let _deferFeatures = [];
//

class WebGPUBackend extends Backend {

	constructor( parameters = {} ) {

		super( parameters );

		// some parameters require default values other than "undefined"

		this.parameters.antialias = ( parameters.antialias === true );

		if ( this.parameters.antialias === true ) {

			this.parameters.sampleCount = ( parameters.sampleCount === undefined ) ? 4 : parameters.sampleCount;

		} else {

			this.parameters.sampleCount = 1;

		}

		this.parameters.requiredLimits = ( parameters.requiredLimits === undefined ) ? {} : parameters.requiredLimits;

		this.adapter = null;
		this.device = null;
		this.context = null;
		this.colorBuffer = null;

		this.depthBuffers = new WeakMap();

		this.utils = new WebGPUUtils( this );
		this.attributeUtils = new WebGPUAttributeUtils( this );
		this.bindingUtils = new WebGPUBindingUtils( this );
		this.pipelineUtils = new WebGPUPipelineUtils( this );
		this.textureUtils = new WebGPUTextureUtils( this );

	}

	async init( renderer ) {

		//console.log("INIT1", _staticAdapter);

		await super.init( renderer );


		const parameters = this.parameters;

		const adapterOptions = {
			powerPreference: parameters.powerPreference
		};

		const adapter = await navigator.gpu.requestAdapter( adapterOptions );

		if ( adapter === null ) {

			throw new Error( 'WebGPUBackend: Unable to create WebGPU adapter.' );

		}

	

		// feature support

		const features = Object.values( GPUFeatureName );

		const supportedFeatures = [];

		for ( const name of features ) {

			if ( adapter.features.has( name ) ) {

				supportedFeatures.push( name );

			}

		}

		const deviceDescriptor = {
			requiredFeatures: supportedFeatures,
			requiredLimits: parameters.requiredLimits
		};

		const device = await adapter.requestDevice( deviceDescriptor );

		const context = ( parameters.context !== undefined ) ? parameters.context : renderer.domElement.getContext( 'webgpu' );

		this.adapter = adapter;
		this.device = device;
		this.context = context;

		
		//resolve deferred adapter features
		//https://github.com/mrdoob/three.js/pull/26242
		if (_deferFeatures.length) {	
			_deferFeatures.forEach(resolve => resolve());
			_deferFeatures = [];
		}

		this.updateSize();

	}

	get coordinateSystem() {

		return WebGPUCoordinateSystem;

	}

	async getArrayBuffer( attribute ) {

		return await this.attributeUtils.getArrayBuffer( attribute );

	}

	beginRender( renderContext ) {

		const renderContextData = this.get( renderContext );

		const device = this.device;

		const descriptor = {
			colorAttachments: [ {
				view: null
			} ],
			depthStencilAttachment: {
				view: null
			}
		};

		const colorAttachment = descriptor.colorAttachments[ 0 ];
		const depthStencilAttachment = descriptor.depthStencilAttachment;

		const antialias = this.parameters.antialias;

		if ( renderContext.texture !== null ) {

			const textureData = this.get( renderContext.texture );
			const depthTextureData = this.get( renderContext.depthTexture );

			// @TODO: Support RenderTarget with antialiasing.

			colorAttachment.view = textureData.texture.createView( {
				baseMipLevel: 0,
				mipLevelCount: 1,
				baseArrayLayer: renderContext.activeCubeFace,
				dimension: GPUTextureViewDimension.TwoD
			} );

			depthStencilAttachment.view = depthTextureData.texture.createView();

			if ( renderContext.stencil && renderContext.depthTexture.format === DepthFormat ) {

				renderContext.stencil = false;

			}

		} else {

			if ( antialias === true ) {

				colorAttachment.view = this.colorBuffer.createView();
				colorAttachment.resolveTarget = this.context.getCurrentTexture().createView();

			} else {

				colorAttachment.view = this.context.getCurrentTexture().createView();
				colorAttachment.resolveTarget = undefined;

			}

			depthStencilAttachment.view = this._getDepthBufferGPU( renderContext ).createView();

		}

		if ( renderContext.clearColor ) {

			colorAttachment.clearValue = renderContext.clearColorValue;
			colorAttachment.loadOp = GPULoadOp.Clear;
			colorAttachment.storeOp = GPUStoreOp.Store;

		} else {

			colorAttachment.loadOp = GPULoadOp.Load;
			colorAttachment.storeOp = GPUStoreOp.Store;

		}

		//

		if ( renderContext.depth ) {

			if ( renderContext.clearDepth ) {

				depthStencilAttachment.depthClearValue = renderContext.clearDepthValue;
				depthStencilAttachment.depthLoadOp = GPULoadOp.Clear;
				depthStencilAttachment.depthStoreOp = GPUStoreOp.Store;

			} else {

				depthStencilAttachment.depthLoadOp = GPULoadOp.Load;
				depthStencilAttachment.depthStoreOp = GPUStoreOp.Store;

			}

		}

		if ( renderContext.stencil ) {

			if ( renderContext.clearStencil ) {

				depthStencilAttachment.stencilClearValue = renderContext.clearStencilValue;
				depthStencilAttachment.stencilLoadOp = GPULoadOp.Clear;
				depthStencilAttachment.stencilStoreOp = GPUStoreOp.Store;

			} else {

				depthStencilAttachment.stencilLoadOp = GPULoadOp.Load;
				depthStencilAttachment.stencilStoreOp = GPUStoreOp.Store;

			}

		}

		//

		const encoder = device.createCommandEncoder( { label: 'renderContext_' + renderContext.id } );
		const currentPass = encoder.beginRenderPass( descriptor );

		//

		renderContextData.descriptor = descriptor;
		renderContextData.encoder = encoder;
		renderContextData.currentPass = currentPass;
		renderContextData.currentAttributesSet = {};

		//

		if ( renderContext.viewport ) {

			this.updateViewport( renderContext );

		}

		if ( renderContext.scissor ) {

			const { x, y, width, height } = renderContext.scissorValue;

			currentPass.setScissorRect( x, y, width, height );

		}

	}

	finishRender( renderContext ) {

		const renderContextData = this.get( renderContext );

		renderContextData.currentPass.end();

		this.device.queue.submit( [ renderContextData.encoder.finish() ] );

		//

		if ( renderContext.texture !== null && renderContext.texture.generateMipmaps === true ) {

			this.textureUtils.generateMipmaps( renderContext.texture );

		}

	}

	updateViewport( renderContext ) {

		const { currentPass } = this.get( renderContext );
		const { x, y, width, height, minDepth, maxDepth } = renderContext.viewportValue;

		currentPass.setViewport( x, y, width, height, minDepth, maxDepth );

	}

	clear( renderContext, color, depth, stencil ) {

		const device = this.device;
		const renderContextData = this.get( renderContext );

		const { descriptor } = renderContextData;

		depth = depth && renderContext.depth;
		stencil = stencil && renderContext.stencil;

		const colorAttachment = descriptor.colorAttachments[ 0 ];

		const antialias = this.parameters.antialias;

		// @TODO: Include render target in clear operation.
		if ( antialias === true ) {

			colorAttachment.view = this.colorBuffer.createView();
			colorAttachment.resolveTarget = this.context.getCurrentTexture().createView();

		} else {

			colorAttachment.view = this.context.getCurrentTexture().createView();
			colorAttachment.resolveTarget = undefined;

		}

		descriptor.depthStencilAttachment.view = this._getDepthBufferGPU( renderContext ).createView();

		if ( color ) {

			colorAttachment.loadOp = GPULoadOp.Clear;
			colorAttachment.clearValue = renderContext.clearColorValue;

		}

		if ( depth ) {

			descriptor.depthStencilAttachment.depthLoadOp = GPULoadOp.Clear;
			descriptor.depthStencilAttachment.depthClearValue = renderContext.clearDepthValue;

		}

		if ( stencil ) {

			descriptor.depthStencilAttachment.stencilLoadOp = GPULoadOp.Clear;
			descriptor.depthStencilAttachment.stencilClearValue = renderContext.clearStencilValue;

		}

		renderContextData.encoder = device.createCommandEncoder( {} );
		renderContextData.currentPass = renderContextData.encoder.beginRenderPass( descriptor );

		renderContextData.currentPass.end();

		device.queue.submit( [ renderContextData.encoder.finish() ] );

	}

	// compute

	beginCompute( computeGroup ) {

		const groupGPU = this.get( computeGroup );

		groupGPU.cmdEncoderGPU = this.device.createCommandEncoder( {} );
		groupGPU.passEncoderGPU = groupGPU.cmdEncoderGPU.beginComputePass();

	}

	compute( computeGroup, computeNode, bindings, pipeline ) {

		const { passEncoderGPU } = this.get( computeGroup );

		// pipeline

		const pipelineGPU = this.get( pipeline ).pipeline;
		passEncoderGPU.setPipeline( pipelineGPU );

		// bind group

		const bindGroupGPU = this.get( bindings ).group;
		passEncoderGPU.setBindGroup( 0, bindGroupGPU );

		passEncoderGPU.dispatchWorkgroups( computeNode.dispatchCount );

	}

	finishCompute( computeGroup ) {

		const groupData = this.get( computeGroup );

		groupData.passEncoderGPU.end();
		this.device.queue.submit( [ groupData.cmdEncoderGPU.finish() ] );

	}

	// render object

	draw( renderObject, info ) {

		const { object, geometry, context, pipeline } = renderObject;

		const bindingsData = this.get( renderObject.getBindings() );
		const contextData = this.get( context );
		const pipelineGPU = this.get( pipeline ).pipeline;
		const attributesSet = contextData.currentAttributesSet;

		// pipeline

		const passEncoderGPU = contextData.currentPass;
		passEncoderGPU.setPipeline( pipelineGPU );

		// bind group

		const bindGroupGPU = bindingsData.group;
		passEncoderGPU.setBindGroup( 0, bindGroupGPU );

		// attributes

		const index = renderObject.getIndex();

		const hasIndex = ( index !== null );

		// index

		if ( hasIndex === true ) {

			if ( attributesSet.index !== index ) {
			
				const buffer = this.get( index ).buffer;
				const indexFormat = ( index.array instanceof Uint16Array ) ? GPUIndexFormat.Uint16 : GPUIndexFormat.Uint32;

				passEncoderGPU.setIndexBuffer( buffer, indexFormat );

				attributesSet.index = index;

			}

		}

		// vertex buffers

		const attributes = renderObject.getAttributes();

		for ( let i = 0, l = attributes.length; i < l; i ++ ) {

			const attribute = attributes[ i ];

			if ( attributesSet[ i ] !== attribute ) {

				const buffer = this.get( attribute ).buffer;
				passEncoderGPU.setVertexBuffer( i, buffer );

				attributesSet[ i ] = attribute;

			}

		}

		// draw

		const drawRange = geometry.drawRange;
		const firstVertex = drawRange.start;

		const instanceCount = this.getInstanceCount( renderObject );

		if ( hasIndex === true ) {

			const indexCount = ( drawRange.count !== Infinity ) ? drawRange.count : index.count;

			passEncoderGPU.drawIndexed( indexCount, instanceCount, firstVertex, 0, 0 );

			info.update( object, indexCount, instanceCount );

		} else {

			const positionAttribute = geometry.attributes.position;
			const vertexCount = ( drawRange.count !== Infinity ) ? drawRange.count : positionAttribute.count;

			passEncoderGPU.draw( vertexCount, instanceCount, firstVertex, 0 );

			info.update( object, vertexCount, instanceCount );

		}

	}

	// cache key

	needsUpdate( renderObject ) {

		const renderObjectGPU = this.get( renderObject );

		const { object, material } = renderObject;

		const utils = this.utils;

		const sampleCount = utils.getSampleCount( renderObject.context );
		const colorSpace = utils.getCurrentColorSpace( renderObject.context );
		const colorFormat = utils.getCurrentColorFormat( renderObject.context );
		const depthStencilFormat = utils.getCurrentDepthStencilFormat( renderObject.context );
		const primitiveTopology = utils.getPrimitiveTopology( object, material );

		let needsUpdate = false;

		if ( renderObjectGPU.sampleCount !== sampleCount || renderObjectGPU.colorSpace !== colorSpace ||
			renderObjectGPU.colorFormat !== colorFormat || renderObjectGPU.depthStencilFormat !== depthStencilFormat ||
            renderObjectGPU.primitiveTopology !== primitiveTopology ) {

			renderObjectGPU.sampleCount = sampleCount;
			renderObjectGPU.colorSpace = colorSpace;
			renderObjectGPU.colorFormat = colorFormat;
			renderObjectGPU.depthStencilFormat = depthStencilFormat;
			renderObjectGPU.primitiveTopology = primitiveTopology;

			needsUpdate = true;

		}

		return needsUpdate;

	}

	getCacheKey( renderObject ) {

		const { object, material } = renderObject;

		const utils = this.utils;
		const renderContext = renderObject.context;

		return [
			utils.getSampleCount( renderContext ),
			utils.getCurrentColorSpace( renderContext ), utils.getCurrentColorFormat( renderContext ), utils.getCurrentDepthStencilFormat( renderContext ),
			utils.getPrimitiveTopology( object, material )
		].join();

	}

	// textures

	createSampler( texture ) {

		this.textureUtils.createSampler( texture );

	}

	destroySampler( texture ) {

		this.textureUtils.destroySampler( texture );

	}

	createDefaultTexture( texture ) {

		this.textureUtils.createDefaultTexture( texture );

	}

	createTexture( texture ) {

		this.textureUtils.createTexture( texture );

	}

	updateTexture( texture ) {

		this.textureUtils.updateTexture( texture );

	}

	destroyTexture( texture ) {

		this.textureUtils.destroyTexture( texture );

	}

	// node builder

	createNodeBuilder( object, renderer ) {

		return new WebGPUNodeBuilder( object, renderer );

	}

	// program

	createProgram( program ) {

		const programGPU = this.get( program );

		programGPU.module = {
			module: this.device.createShaderModule( { code: program.code, label: program.stage } ),
			entryPoint: 'main'
		};

	}

	destroyProgram( program ) {

		this.delete( program );

	}

	// pipelines

	createRenderPipeline( renderObject ) {

		this.pipelineUtils.createRenderPipeline( renderObject );

	}

	createComputePipeline( computePipeline ) {

		this.pipelineUtils.createComputePipeline( computePipeline );

	}

	// bindings

	createBindings( bindings, pipeline ) {

		this.bindingUtils.createBindings( bindings, pipeline );

	}

	updateBindings( bindings, pipeline ) {

		this.bindingUtils.createBindings( bindings, pipeline );

	}

	updateBinding( binding ) {

		this.bindingUtils.updateBinding( binding );

	}

	// attributes

	createIndexAttribute( attribute ) {

		this.attributeUtils.createAttribute( attribute, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST );

	}

	createAttribute( attribute ) {

		this.attributeUtils.createAttribute( attribute, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST );

	}

	createStorageAttribute( attribute ) {

		this.attributeUtils.createAttribute( attribute, GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST );

	}

	updateAttribute( attribute ) {

		this.attributeUtils.updateAttribute( attribute );

	}

	destroyAttribute( attribute ) {

		this.attributeUtils.destroyAttribute( attribute );

	}

	// canvas

	updateSize() {

		this._configureContext();
		this._setupColorBuffer();

	}

	// utils public

	hasFeature( name ) {
		return new Promise((resolve, reject) => {
			
			if (this.adapter) {
				//const adapter = this.adapter || _staticAdapter;
				//const features = Object.values( GPUFeatureName );

				//if ( features.includes( name ) === false ) {

				//	resolve(false);

					//reject( 'THREE.WebGPURenderer: Unknown WebGPU GPU feature: ' + name );
					//throw new Error( 'THREE.WebGPURenderer: Unknown WebGPU GPU feature: ' + name );

				//}
				resolve(this.adapter.features.has( name ));
			} else {
				_deferFeatures.push(() => resolve(this.hasFeature(name)));
			}
		});
	}

	copyFramebufferToTexture( texture, renderContext ) {

		const renderContextData = this.get( renderContext );

		const { encoder, descriptor } = renderContextData;

		let sourceGPU = null;

		if ( texture.isFramebufferTexture ) {

			sourceGPU = this.context.getCurrentTexture();

		} else if ( texture.isDepthTexture ) {

			sourceGPU = this._getDepthBufferGPU( renderContext );

		}

		const destinationGPU = this.get( texture ).texture;

		renderContextData.currentPass.end();

		encoder.copyTextureToTexture(
			{
				texture: sourceGPU,
				origin: { x: 0, y: 0, z: 0 }
			},
			{
				texture: destinationGPU
			},
			[
				texture.image.width,
				texture.image.height
			]
		);

		if ( texture.generateMipmaps ) this.textureUtils.generateMipmaps( texture );

		descriptor.colorAttachments[ 0 ].loadOp = GPULoadOp.Load;
		if ( renderContext.depth ) descriptor.depthStencilAttachment.depthLoadOp = GPULoadOp.Load;
		if ( renderContext.stencil ) descriptor.depthStencilAttachment.stencilLoadOp = GPULoadOp.Load;

		renderContextData.currentPass = encoder.beginRenderPass( descriptor );
		renderContextData.currentAttributesSet = {};

	}

	// utils

	_getDepthBufferGPU( renderContext ) {

		const { depthBuffers } = this;
		const { width, height } = this.getDrawingBufferSize();

		let depthTexture = depthBuffers.get( renderContext );

		if ( depthTexture !== undefined && depthTexture.image.width === width && depthTexture.image.height === height ) {

			return this.get( depthTexture ).texture;

		}

		this._destroyDepthBufferGPU( renderContext );

		depthTexture = new DepthTexture();
		depthTexture.name = 'depthBuffer';

		if ( renderContext.stencil  ) {

			depthTexture = new DepthTexture();
			depthTexture.format = DepthStencilFormat;
			depthTexture.type = UnsignedInt248Type;

		} else if ( renderContext.depth ) {

			depthTexture = new DepthTexture();
			depthTexture.format = DepthFormat;
			depthTexture.type = UnsignedIntType;

		}

		depthTexture.image.width = width;
		depthTexture.image.height = height;

		this.textureUtils.createTexture( depthTexture, { sampleCount: this.parameters.sampleCount } );

		depthBuffers.set( renderContext, depthTexture );

		return this.get( depthTexture ).texture;

	}

	_destroyDepthBufferGPU( renderContext ) {

		const { depthBuffers } = this;

		const depthTexture = depthBuffers.get( renderContext );

		if ( depthTexture !== undefined ) {

			this.textureUtils.destroyTexture( depthTexture );

			depthBuffers.delete( renderContext );

		}

	}

	_configureContext() {

		this.context.configure( {
			device: this.device,
			format: GPUTextureFormat.BGRA8Unorm,
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
			alphaMode: 'premultiplied'
		} );

	}

	_setupColorBuffer() {

		if ( this.colorBuffer ) this.colorBuffer.destroy();

		const { width, height } = this.getDrawingBufferSize();
		//const format = navigator.gpu.getPreferredCanvasFormat(); // @TODO: Move to WebGPUUtils

		this.colorBuffer = this.device.createTexture( {
			label: 'colorBuffer',
			size: {
				width: width,
				height: height,
				depthOrArrayLayers: 1
			},
			sampleCount: this.parameters.sampleCount,
			format: GPUTextureFormat.BGRA8Unorm,
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
		} );

	}

}

/*
const debugHandler = {

	get: function ( target, name ) {

		// Add |update
		if ( /^(create|destroy)/.test( name ) ) console.log( 'WebGPUBackend.' + name );

		return target[ name ];

	}

};
*/
class WebGPURenderer extends Renderer {

	constructor( parameters = {} ) {

		const backend = new WebGPUBackend( parameters );
		//const backend = new Proxy( new WebGPUBackend( parameters ), debugHandler );

		super( backend );

		this.isWebGPURenderer = true;

	}

}

export { WebGPU, WebGPURenderer, equirectUV, texture };
