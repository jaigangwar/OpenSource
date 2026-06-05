import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class FocusTracker {
  private faceLandmarker: FaceLandmarker | null = null;
  private video: HTMLVideoElement;
  private lastVideoTime = -1;
  private focusScore = 100;
  private scoreHistory: number[] = [];
  private readonly historyLimit = 15; // Smoother transitions

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

      let rawFocus = 100;

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];
        
        // 1. Gaze Analysis (using blendshapes)
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
            const shapes = results.faceBlendshapes[0].categories;
            const getScore = (name: string) => shapes.find(s => s.categoryName === name)?.score || 0;

            const lookLeft = Math.max(getScore('eyeLookOutLeft'), getScore('eyeLookInRight'));
            const lookRight = Math.max(getScore('eyeLookOutRight'), getScore('eyeLookInLeft'));
            const lookUp = Math.max(getScore('eyeLookUpLeft'), getScore('eyeLookUpRight'));
            const lookDown = Math.max(getScore('eyeLookDownLeft'), getScore('eyeLookDownRight'));
            const blink = (getScore('eyeBlinkLeft') + getScore('eyeBlinkRight')) / 2;

            // Penalty for looking away
            const maxGaze = Math.max(lookLeft, lookRight, lookUp, lookDown);
            if (maxGaze > 0.3) {
                rawFocus -= (maxGaze - 0.3) * 100; // Proportional penalty
            }

            // Penalty for blinking/closed eyes (drowsiness)
            if (blink > 0.6) {
                rawFocus -= (blink - 0.6) * 150;
            }
        }

        // 2. Head Pose (Yaw/Pitch)
        // Yaw (Horizontal) - Index 1 is nose tip, 234 is left ear, 454 is right ear
        const nose = landmarks[1];
        const leftEar = landmarks[234];
        const rightEar = landmarks[454];
        const faceWidth = Math.abs(rightEar.x - leftEar.x);
        const noseYaw = (nose.x - leftEar.x) / faceWidth;

        if (noseYaw < 0.35 || noseYaw > 0.65) {
            const yawPenalty = Math.abs(noseYaw - 0.5) * 150;
            rawFocus -= yawPenalty;
        }

        // Pitch (Vertical) - Using nose Y relative to eye level and mouth
        const eyeCenterY = (landmarks[159].y + landmarks[386].y) / 2; // Midpoint of top eyelids
        const mouthY = landmarks[13].y; // Inner lip
        const faceHeight = Math.abs(mouthY - eyeCenterY);
        const nosePitch = (nose.y - eyeCenterY) / faceHeight;

        if (nosePitch < 0.3 || nosePitch > 0.7) {
            const pitchPenalty = Math.abs(nosePitch - 0.5) * 100;
            rawFocus -= pitchPenalty;
        }

      } else {
        // No face detected
        rawFocus = 0;
      }

      // Final raw clamp
      rawFocus = Math.max(0, Math.min(100, rawFocus));

      // 3. Smoothing (Moving Average)
      this.scoreHistory.push(rawFocus);
      if (this.scoreHistory.length > this.historyLimit) {
        this.scoreHistory.shift();
      }
      
      this.focusScore = this.scoreHistory.reduce((a, b) => a + b, 0) / this.scoreHistory.length;
    }

    return Math.round(this.focusScore);
  }
}
