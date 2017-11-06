# Beyond the Ant Brotherhood : A synoptic View of Tolstoy's Intellectual Life

Project repo

Contains zips of letters / diaries and ES import scripts

11/17 -- Now contains colloquy text parsing / cleaning scripts.

The front end app is adapted from webpack-searchkit-es6-boilerplate.

DJE

To clone on localhost :

1. Download and run elasticsearch 2.4.6 : https://www.elastic.co/downloads/past-releases/elasticsearch-2-4-6

2. Create mappings in ES by running esImport.sh

3. Import data by :
  * unzip lettersParsed.zip and run ingest.sh (n.b. change JSON_FILE_IN and JSON_FILE_OUT)
  * unzip diaries.zip and run es_import.py

4. Check data at:
  * http://localhost:9200/tolstoy/_search?pretty
  * http://localhost:9200/tolstoy/diary/_search?pretty
  * http://localhost:9200/tolstoy/letter/_search?pretty
  * http://localhost:9200/tolstoy/_mapping?pretty

5. Download install node / npm. Navigate to SearchkitApp folder and install dependencies.

6. npm start. n.b. when running w/ localhost, need to disable CORS.
