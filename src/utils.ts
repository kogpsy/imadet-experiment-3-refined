/**
 * Utilities used throughout the project.
 *
 * Author: Robin Bürkli <robuba.jr@gmx.ch>
 * License: MIT
 */

// Import gabor plugin config type
import { GaborStimulusPluginConfig } from '@kogpsy/jspsych-gabor-stimulus-plugin';

/**
 * Abstracts fairly complex gabor stimulus plugin config to solely 4 params.
 *
 * @param stimulusSize Stimulus size in pixels
 * @param backgroundNoiseFrames Background noise frames. String array containing
 * paths or data urls.
 * @param opacity Opacity of stimulus
 * @param rotation Rotation of stimulus
 * @returns Gabor stimulus plugin config
 */
export const getGaborPluginConfig = (
  stimulusSize: number,
  backgroundNoiseFrames: string[],
  opacity: number,
  rotation: number
): GaborStimulusPluginConfig => {
  return {
    stimulus: {
      size: stimulusSize,
      density: 6,
      opacity: opacity,
      rotation: rotation,
      blendMode: 'overlay',
    },
    aperture: {
      radius: stimulusSize / 3,
      blur: stimulusSize / 12,
    },
    background: {
      type: 'animation',
      frames: backgroundNoiseFrames,
      fps: 10,
    },
    choices: ['f', 'j'],
    fixationCross: {},
  };
};
