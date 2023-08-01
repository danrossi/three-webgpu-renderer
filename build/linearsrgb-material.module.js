/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
import { MeshBasicMaterial, LinearSRGBColorSpace } from 'three';

class LinearSRGBMaterial extends MeshBasicMaterial {

    constructor(parameters) {
        super(parameters);

        //set texture colorSpace to linear for SRGB performance fix
        if (this.map) this.map.colorSpace = LinearSRGBColorSpace;
    }

    onBeforeCompile(shader) {
        //fix shader for SRGB performance fix
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            `
            #ifdef USE_MAP
            
                vec4 sampledDiffuseColor = texture2D( map, vMapUv );
            
                // inline sRGB decode
                sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.a );

                diffuseColor *= sampledDiffuseColor;

            #endif

                            `
        );

    }
}

export { LinearSRGBMaterial };
