export function isVideoPlaying(video:HTMLVideoElement) {
    return !video.paused && !video.ended && video.readyState > 2;
}