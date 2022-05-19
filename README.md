# imadet-experiment-3-refined

## TODO

- Adapt main timeline
- Write final survey
- Collect or generate participant ID
- Curate data as far as possible

This is the code of a project which aims to refine the experiment 3 of the IMADET study by [Dijkstra et al. (2021)][original-study]. It is based on the [refactored version][original-study-refactored] of the original code, and ported to TypeScript.

## Changes that have been made

**Stimuli**

In the original study, gabor patches - the main stimuli - are faded in during a 2 second period in front of an animated noise background. After the 2 seconds, a response screen is displayed. In that way, it is practically impossible to analyse reaction times. This has been changed. The stimuli are still displayed in front of an animated noise background, but their visibility is stable, and they are displayed until the participant responds.

The stimuli themselves were also changed out. The gabor patches used in the original study are not really sinusoidal and the aperture applied is almost not blurred at all. They were replaced by more typical gabor patches found in visual decision experiments, generated using [jspsych-gabor-stimulus-plugin][gabor-plugin].

**Timing**

Since the stimuli are no longer displayed for a fixed amount of time, the next stimulus is displayed right after the response (with a 200ms fixation cross in between). This makes the experiment quite hectic, which is why an inter trial interval was introduced. It is a randomly chosen interval between 600ms and 2000ms.

[original-study]: https://doi.org/10.1016/j.cognition.2021.104719
[original-study-refactored]: https://github.com/kogpsy/imadet-replication-experiment-3
[gabor-plugin]: https://github.com/kogpsy/jspsych-gabor-stimulus-plugin
[gabor-patches]: https://duckduckgo.com/?q=gabor+patch&iax=images&ia=images
