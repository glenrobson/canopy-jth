import json
import os
import requests
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

def load_xml(url: str, name=None, headers=None, timeout=10) -> ET.Element:
    path = name

    if path.exists():
        xml_bytes = path.read_bytes()
    else:
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        xml_bytes = response.content
        path.write_bytes(xml_bytes)

    return ET.fromstring(xml_bytes)

def extract_nlw_id(url, ident):
    """Extract nlw_id from XML URL using XPath /rdf:RDF/rdf:Description/nlw:nlw_id"""
    try:
        # Fetch the XML content
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        root = load_xml(url, name=Path(f"./scripts/data/rdf/{ident}.xml"), headers=headers, timeout=10)
        
        # Define namespaces
        namespaces = {
            'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            'nlw': 'http://dev.llgc.org.uk/digitisation/identifiers/'
        }
        
        # Search for the XPath
        nlw_id_element = root.find('./rdf:Description/nlw:nlw_id', namespaces)
        if nlw_id_element is not None:
            return nlw_id_element.text.replace("WlAbNL", "")
        else:
            return None
            
    except requests.RequestException as e:
        return f"Request error: {e}"
    except ET.ParseError as e:
        return f"XML parse error: {e}"
    except Exception as e:
        return f"Error: {e}"

def list_and_open_manifests():
    """List all JSON files in .cache/iiif/manifests/ and open each one"""

    # read scripts/data/wikidata.csv 
    with open("scripts/data/wikidata.csv", "r") as f:
        lines = f.readlines()
        # turn into a dictonary ordered by the second column
        wikidata = {}
        for line in lines:
            parts = line.split(",")
            if len(parts) > 1:
                wikidata[parts[1]] = {
                    "item": parts[0],
                    "nlw_id": parts[1],
                    "dipicts": parts[2],
                    "type": parts[3],
                    "depictsLabel": parts[4],
                    "coordinates": parts[5],
                    "itemLabel": parts[6]
                }

    
    # Path to the manifests directory
    manifests_dir = Path(".cache/iiif/manifests")
    
    if not manifests_dir.exists():
        print(f"Directory {manifests_dir} does not exist")
        return
    
    # Get all JSON files
    json_files = list(manifests_dir.glob("*.json"))
    
    # Limit to first 5 files for testing
    #json_files = json_files[:5]
    
    print(f"Processing {len(json_files)} JSON files in {manifests_dir}")
    print("=" * 50)
    
    # Open and process each JSON file
    for json_file in sorted(json_files):
        print(f"\nProcessing: {json_file.name}")
        print("-" * 30)
        
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Extract key information
            title = data.get('label', {}).get('none', ['No title'])[0]
            manifest_id = data.get('id', 'No ID')
            
            # Get metadata
            metadata = data.get('metadata', [])
            author = "Unknown"
            date = "Unknown"
            
            for item in metadata:
                label = item.get('label', {}).get('en', [''])[0]
                if label == "Author":
                    author = item.get('value', {}).get('none', ['Unknown'])[0]
                elif label == "Date":
                    date = item.get('value', {}).get('none', ['Unknown'])[0]
            
            print(f"Title: {title}")
            print(f"Author: {author}")
            print(f"Date: {date}")
            print(f"ID: {manifest_id}")

            ident = manifest_id.replace("https://damsssl.llgc.org.uk/iiif/2.0/", "").replace("/manifest.json", "")

            url = f"https://dams.llgc.org.uk/behaviour/llgc-id:{ident}/fedora-bdef:metadata/rels-ext"
            nlw_id = extract_nlw_id(url, ident)
            if nlw_id in wikidata:
                if wikidata[nlw_id]["depictsLabel"] in ("human", "child","man","woman","girl","boy", "elderly people","group of humans", "schoolchild","family", "choir", "academic dress"):
                    subject = "People"
                elif wikidata[nlw_id]["depictsLabel"] in ("cleric","deacon","priest","bishop", "clergy"):
                    subject = "Clergy"
                elif wikidata[nlw_id]["depictsLabel"] in ("house","monument","mill","school","home","cottage","clock tower","shop","tombstone", "castle"):
                    subject = "Buildings"
                elif wikidata[nlw_id]["depictsLabel"] in ("bull","dog", "goat", "horse"):
                    subject = "Animals"
                elif wikidata[nlw_id]["depictsLabel"] in ("boxer","fishing", "joiner", "plasterer", "Ploughing match", "town crier", "milk deliverer"):
                    subject = "Activities"
                elif wikidata[nlw_id]["depictsLabel"] == "locomotive":
                    subject = "Trains"
                elif wikidata[nlw_id]["depictsLabel"] in ("chapel", "church building"):
                    subject = wikidata[nlw_id]["depictsLabel"] 
                elif wikidata[nlw_id]["coordinates"] or wikidata[nlw_id]["depictsLabel"] == "village":
                    subject = "Places"
                elif wikidata[nlw_id]["type"] == "human":
                    subject = "Famous people"
                else:
                    subject = "Other" #wikidata[nlw_id]["depictsLabel"]

                print(f"Wikidata: {wikidata[nlw_id]["depictsLabel"]} - {subject}")
                # Check subject isn't already added in the manifest
                subject_exists = any(item.get('label', {}).get('en', ['']) == ['Subject'] for item in data.get('metadata', []))
                if subject_exists:
                    # update it
                    for item in data['metadata']:
                        if item.get('label', {}).get('en', ['']) == ['Subject']:
                            item['value'] = {'en': [subject]}
                            break
                else:
                    # add a subject to the manifest metadata
                    data['metadata'].append({
                        'label': {'en': ['Subject']},
                        'value': {'en': [subject]}
                    })

                if wikidata[nlw_id]["coordinates"] and "navPlace" not in data:
                    data["@context"] = [
                        "http://iiif.io/api/extension/navplace/context.json",
                        "http://iiif.io/api/presentation/2/context.json"
                    ]
                    print(f"Adding navPlace for {nlw_id}")
                    (lat, lon) = wikidata[nlw_id]["coordinates"].replace("Point(", "").replace(")", "").split()
                    # add a location to the manifest metadata
                    data["navPlace"] = {
                        "id": "http://example.com/feature-collection/1",
                        "type": "FeatureCollection",
                        "features":[
                            {
                                "id": "http://example.com/feature/1",
                                "type": "Feature",
                                "properties":{},
                                "geometry":{
                                    "type": "Point",
                                    "coordinates":[
                                        lat,
                                        lon
                                    ]
                                }
                            }
                        ]
                    }

            # save the enhanced manifest
            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                
        except json.JSONDecodeError as e:
            print(f"Error reading {json_file.name}: {e}")
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")

if __name__ == "__main__":
    list_and_open_manifests()