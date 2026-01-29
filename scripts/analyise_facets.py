# read in the json files in .cache/facets/subjects/

import json
import os

# make facet a command line argument
import sys
facet = sys.argv[1]

# Get all json files in .cache/facets/subjects/
facet_dir = f"site/api/facet/{facet}"
files = os.listdir(facet_dir)

# Read each file and extract the subject
subjects = []
for file in files:
    with open(f"{facet_dir}/{file}", "r") as f:
        data = json.load(f)
        # count the number of items in the data
        print(f"{len(data["items"])} - {file}")

