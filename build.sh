#!/bin/bash

# create quotes json file
cd my-clippings
# python main.py
python ids.py
cd ..
cp my-clippings/quotes_complete_indexed.json book-quotes/data/

# build nextjs
cd book-quotes
npm run build