const supportsFrameCallback = 'requestVideoFrameCallback' in HTMLVideoElement.prototype,
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let lastTime;

export default class VideoAnimation {
    constructor(callback, video) {
        this.callback = callback,
        this.video = video,
        this.animationID = null,
        this.running = false;
    }

    setCallback(callback) {
        this.callback = callback;
    }

    async animateLegacy() {
        const now = this.video.currentTime;
        if (now > lastTime){
            const fps = (1/(now-lastTime)).toFixed();
            await this.callback(now, { width: this.video.videoWidth, height: this.video.videoHeight });
        }

        lastTime = now;
        this.animationID = requestAnimationFrame(async() => await this.animateLegacy());
    }

    async animate(now, metadata) {
        await this.callback(now, metadata);
        this.video.requestVideoFrameCallback(this.animateRef);
    }

    initAnimate() {
        this.animateRef = async(now, metadata) => await this.animate(now, metadata);
        this.video.requestVideoFrameCallback(this.animateRef);
    }

    initLegacyAnimate() {
        this.animateLegacy();
    }

    start() {
        this.stop();

        if (supportsFrameCallback) {
            this.initAnimate();
        } else {
            lastTime = new Date();
            this.initLegacyAnimate();
        }
        
        this.running = true;
    }

    stop() {
        this.running = false;

        if (supportsFrameCallback) {
            this.animateRef = () => {};
        } else {
            cancelAnimationFrame(this.animationID && this.animationID.data && this.animationID.data.handleId || this.animationID);
        }
    }
}