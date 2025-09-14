# DualComponents

This is a small project dedicated to an experiment in how to author webcomponents

This approach is heavily inspired by the creator of [gomakethings.com](gomakethings.com), Chris Ferdinandi and his video on [HTML Web Components](https://www.youtube.com/watch?v=2I7uX8m0Ta0&pp=ygUTaHRtbCB3ZWIgY29tcG9uZW50cw%3D%3D).

It involves using as little html rendering in the component as is possible and relying on the child elements of the web component more, treating the webcomponent more like a wrapper which provides custom functionality.

To use this component super class, simply create elements that extend the DualComponent class rather than the HTMLElement and provide the following options:

 - "shadowed" - boolean: Append elements to the shadow dom if true, leave in light dom if false
 - "shadowRootOpen" - boolean: Use "mode": "open" if true, otherwise use "mode": "closed" for the shadowRoot.
 - "style" - string: Custom styles for this custom element that will override global styles when component is not shadowed.
