import Renderer from '../common/Renderer.js';
import WebGPUBackend from './WebGPUBackend.js';
import WebGLBackend from '../webgl/WebGLBackend.js';
import WebGPU from '../capabilities/WebGPU';

class WebGPUGLRenderer extends Renderer {

	constructor( parameters = {}, useWebGL = false ) {

		let BackendClass;

		if ( WebGPU.isAvailable() && !useWebGL) {

			BackendClass = WebGPUBackend;

			this.isWebGPUBackend = true;

		} else {

			BackendClass = WebGLBackend;

			this.isWebGLBackend = true;

			//console.warn( 'THREE.WebGPURenderer: WebGPU is not available, running under WebGL2 backend.' );

		}

		const backend = new BackendClass( parameters );

		//super( new Proxy( backend, debugHandler ) );
		super( backend );

		this.isWebGPURenderer = true;

	}

}

export default WebGPUGLRenderer;