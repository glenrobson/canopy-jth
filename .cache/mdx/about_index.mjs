import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    p: "p",
    ..._provideComponents(),
    ...props.components
  }, {Card} = _components;
  if (!Card) _missingMdxReference("Card", true);
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h2, {
      children: "Who was John Thomas?"
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.a, {
        href: "http://yba.llgc.org.uk/en/s1-THOM-JOH-1838.html",
        children: "John Thomas"
      }), " was a labourer's son from Cellan, Ceredigion. In\n1853 he moved to Liverpool to work in a draper's shop. Over a period of ten years the work had a detrimental\neffect on his health and he was forced to find employment in the open air. Therefore, at the beginning of the\n1860s, he became a traveller for a firm dealing in writing materials and photographs of famous people. At that\ntime publishing and selling small photographs of celebrities (carte-de-visite photographs) was a very lucrative\nbusiness. When he realised how few of the photographs he had to sell were of Welsh celebrities he undertook to\nchange things himself."]
    }), "\n", _jsx(_components.p, {
      children: "He learnt the rudiments of photography and in 1863 he began taking photographs of the famous by inviting a number\nof well-known preachers to sit for their portraits. The enterprise was a success and by 1867 he was confident\nenough to establish his own photographic business, The Cambrian Gallery. He worked as a photographer for about\nforty years, and during that time he travelled widely in north, mid and south Wales taking photographs of\nlandscapes as well as people."
    }), "\n", _jsx(Card, {
      href: "/works/ffestiniog.html",
      src: "https://damsssl.llgc.org.uk/iiif/2.0/image/1127134/full/,1024/0/default.jpg",
      alt: "Street scene in Ffestiniog by John Thomas",
      title: "Street scene in Ffestiniog by John Thomas"
    }), "\n", _jsx(_components.h2, {
      children: "Using John Thomas' photographs in ‘Cymru’"
    }), "\n", _jsxs(_components.p, {
      children: ["When he retired from business a collection of over three thousand of his negatives was bought by\n", _jsx(_components.a, {
        href: "http://yba.llgc.org.uk/en/s-EDWA-MOR-1858.html",
        children: "Sir O M Edwards"
      }), " to illustrate the magazine Cymru.\nJohn Thomas had worked with OM for many years by supplying him\nwith illustrations and articles for the magazine. OM paid the following tribute to him for help in\nillustrating the magazine, \"... you can well understand my joy in receiving an offer of help from\nMr John Thomas, in his own modest style. I knew that no-one has such a complete collection of views of Welsh\nhistoric sites. Whenever he visits a particular area, he adds to his collection the picturesque, famous or\nunusual that he finds there. His rich gallery has been made available to me to use with the warmest of\nwelcomes... It is good to know that the Cambrian Gallery contains a collection of views from nearly every\npart of Wales, and of the characters who lived in those parts in recent years.\" (Translated from Welsh,\n", _jsx(_components.em, {
        children: "Cymru"
      }), " 17 (1899), p.134)"]
    }), "\n", _jsx(_components.p, {
      children: "John Thomas died in October 1905."
    }), "\n", _jsx(_components.p, {
      children: "Today the negatives which O M Edwards bought from John Thomas form part of the photographic collection\nof the National Library of Wales."
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
