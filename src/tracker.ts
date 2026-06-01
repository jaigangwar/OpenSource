import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class FocusTracker {
  private faceLandmarker: FaceLandmarker | null = null;
  private video: HTMLVideoElement;
  private lastVideoTime = -1;
  private focusScore = 100;

  constructor(videoElement: HTMLVideoElement) {
    this.video = videoElement;
  }

  async initialize() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1
    });
  }

  calculateFocus(): number {
    if (!this.faceLandmarker || this.video.readyState < 2) return this.focusScore;

    const startTimeMs = performance.now();
    if (this.lastVideoTime !== this.video.currentTime) {
      this.lastVideoTime = this.video.currentTime;
      const results = this.faceLandmarker.detectForVideo(this.video, startTimeMs);

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];
        
        // Simple Focus Logic:
        // 1. Head Pose (Yaw/Pitch) - Landmarks for nose, eyes, ears can determine if looking away
        // 2. Eye Gaze (simplified) - MediaPipe blendshapes for eye look directions
        
        let currentFocus = 100;
        
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
            const shapes = results.faceBlendshapes[0].categories;
            const lookLeft = shapes.find(s => s.categoryName === 'eyeLookOutLeft')?.score || 0;
            const lookRight = shapes.find(s => s.categoryName === 'eyeLookOutRight')?.score || 0;
            const lookUp = shapes.find(s => s.categoryName === 'eyeLookUpLeft')?.score || 0;
            const lookDown = shapes.find(s => s.categoryName === 'eyeLookDownLeft')?.score || 0;

            // If eyes are looking too far away from center
            if (lookLeft > 0.4 || lookRight > 0.4 || lookUp > 0.4 || lookDown > 0.5) {
                currentFocus -= 40;
            }
        }

        // Check if head is turned too much (using x-coordinates of ears vs nose as a proxy)
        const nose = landmarks[1];
        const leftEar = landmarks[234];
        const rightEar = landmarks[454];
        const faceWidth = Math.abs(rightEar.x - leftEar.x);
        const nosePos = (nose.x - leftEar.x) / faceWidth;

        if (nosePos < 0.3 || nosePos > 0.7) {
            currentFocus -= 50;
        }

        this.focusScore = Math.max(0, Math.min(100, currentFocus));
      } else {
        // No face detected = distracted
        this.focusScore = Math.max(0, this.focusScore - 5);
      }
    }

    return this.focusScore;
  }
}
