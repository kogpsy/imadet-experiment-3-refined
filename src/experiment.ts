/**
 * @title Template Experiment
 * @description A template experiment to build upon.
 * @version 1.0.0
 *
 * The following lines specify which media directories will be packaged and
 * preloaded by jsPsych. Modify them to arbitrary paths (or comma-separated
 * lists of paths) within the `media` directory, or just delete them.
 * @imageDir images
 * @audioDir audio
 * @videoDir video
 */

// Terser requires license comments not to be in the toplevel scope, which is
// why we need to create a function to make terser extract to comment.
export function licenseComment() {
  /*! **************************************************************************
  Copyright © Robin Bürkli and the University of Bern

  This software is released under the MIT license:

  ---
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the “Software”), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ---

  License notices from modules used in this project are listed below.
  *************************************************************************** */
}

// Import stylesheets (.scss or .css).
import '../styles/main.scss';

// Import jsPsych
import { initJsPsych } from 'jspsych';

// Import jsPsych plugins
import PreloadPlugin from '@jspsych/plugin-preload';
import GaborStimulusPlugin, {
  GaborStimulusPluginConfig,
  generateNoiseFrames,
} from '@kogpsy/jspsych-gabor-stimulus-plugin';
import { getGaborPluginConfig } from './utils';

/**
 * This method will be executed by jsPsych Builder and is expected to run the
 * jsPsych experiment
 *
 * @param {object} options Options provided by jsPsych Builder
 * @param {any} [options.input] A custom object that can be specified via the
 * JATOS web interface ("JSON study input").
 * @param {"development"|"production"|"jatos"} options.environment The context
 * in which the experiment is run: `development` for `jspsych run`, `production`
 * for `jspsych build`, and "jatos" if served by JATOS
 * @param {{images: string[]; audio: string[]; video: string[];, misc:
 * string[];}} options.assetPaths An object with lists of file paths for the
 * respective `@...Dir` pragmas
 */
export async function run({ assetPaths, input = {}, environment }) {
  // Initiate the jsPsych object
  const jsPsych = initJsPsych();

  // Define the main timeline array
  const timeline = [];

  // Define stimulus size in pixels
  const stimulusSize = 250;

  // Generate noise frames for stimulus background
  const backgroundNoiseFrames = generateNoiseFrames(
    stimulusSize,
    stimulusSize,
    30
  );

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: backgroundNoiseFrames,
  });

  // Gabor patch stimulus
  timeline.push({
    type: GaborStimulusPlugin,
    config: getGaborPluginConfig(stimulusSize, backgroundNoiseFrames, 0.3, 45),
  });

  // Run the experiment
  await jsPsych.run(timeline);

  // Get the resulting data
  const resultData = jsPsych.data.get();
  // If the experiment is run by JATOS, pass the resulting data to the server
  // in CSV form.
  if (environment === 'jatos') {
    // Some editors may throw errors here if TypeScript is used, since the jatos
    // object is not created here but injected at runtime. This is why for the
    // following line, TypeScript errors are ignored.
    // @ts-ignore
    jatos.submitResultData(resultData.json(), jatos.startNextComponent);
  }
  // In every other environment, print the data to the browser console in JSON
  // form. Here you can adjust what should happen to the data if the experiment
  // is served, e.g. by a common httpd server.
  else {
    // Trigger browser download
    resultData.localSave('json', 'data.json');
    // And log to console
    console.log('End of experiment. Results:');
    console.log(resultData);
  }
}
