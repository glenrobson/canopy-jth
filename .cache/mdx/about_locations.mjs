import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    h3: "h3",
    p: "p",
    ..._provideComponents(),
    ...props.components
  }, {Map, MapPoint} = _components;
  if (!Map) _missingMdxReference("Map", true);
  if (!MapPoint) _missingMdxReference("MapPoint", true);
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h3, {
      children: "Locations of images"
    }), "\n", _jsx(_components.p, {
      children: "See map:"
    }), "\n", _jsxs(Map, {
      children: [_jsx(MapPoint, {
        lat: "52.918354003468046",
        lng: "-4.095195986251733",
        title: "Castell Deudraeth, Penrhyndeudraeth",
        summary: "Castell Deudraeth looking towards the front entrance.",
        referencedManifests: ["https://damsssl.llgc.org.uk/iiif/2.0/1123647/manifest.json"]
      }), _jsx(MapPoint, {
        lat: "51.79869952676566",
        lng: "-4.744346945244962",
        title: "Bethesda Chapel (Bapt), Narberth",
        summary: "[Bethesda Chapel (Bapt), Narberth]",
        referencedManifests: ["https://damsssl.llgc.org.uk/iiif/2.0/1123650/manifest.json"]
      }), _jsx(MapPoint, {
        lat: "52.59058053213282",
        lng: "-3.853364663160345",
        title: "Machynlleth clock tower",
        summary: "[Machynlleth]",
        referencedManifests: ["https://damsssl.llgc.org.uk/iiif/2.0/1123305/manifest.json"]
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
