class WebGPU {

	async isAvailable() {
		if (navigator.gpu !== undefined) {

			const adapter = await navigator.gpu.requestAdapter();

			if (adapter !== null) {
				if (window.GPUShaderStage === undefined) {

					window.GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };

				}

				return true;
			}

		}

		return false;
	}
}

export default WebGPU;
