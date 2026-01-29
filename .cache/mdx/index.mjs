import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    ..._provideComponents(),
    ...props.components
  }, {Container, Interstitials, Map, Slider} = _components;
  if (!Container) _missingMdxReference("Container", true);
  if (!Interstitials) _missingMdxReference("Interstitials", false);
  if (!Interstitials.Hero) _missingMdxReference("Interstitials.Hero", true);
  if (!Map) _missingMdxReference("Map", true);
  if (!Slider) _missingMdxReference("Slider", true);
  return _jsxs(_Fragment, {
    children: [_jsx(Interstitials.Hero, {
      headline: "Use this Canopy IIIF template to create a new digital project",
      description: "This starter is yours to configure, add context to, and publish a collection that fits your project.",
      background: "theme",
      random: true,
      links: [{
        href: "/about/get-started",
        title: "Get Started",
        type: "primary"
      }, {
        href: "https://canopy-iiif.github.io/app/docs/",
        title: "Read documentation",
        type: "secondary"
      }]
    }), "\n", _jsxs(Container, {
      children: [_jsx(_components.h2, {
        children: "John Thomas Photographs"
      }), _jsxs(_components.p, {
        children: ["This collection contains photographs taken by John Thomas (1838-1905) in Wales in the late 19th century.\nThis site uses ", _jsx(_components.a, {
          href: "https://canopy-iiif.github.io/app/docs/",
          children: "Canopy IIIF"
        }), " to present the collection. Metadata\nis enriched with additional information from Wikidata."]
      }), _jsx(_components.h2, {
        children: "Locations"
      }), _jsx(Map, {
        iiifContent: "https://api.npoint.io/9ec1b84f2efa65a61a75",
        height: "600px"
      }), _jsx(_components.h2, {
        children: "Items"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/person.json"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/cleric.json"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/place.json"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/church-building.json"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/chapel.json"
      }), _jsx(Slider, {
        iiifContent: "/api/facet/Subject/locomotive.json"
      })]
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ..._provideComponents(),
    ...props.components
  };
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
