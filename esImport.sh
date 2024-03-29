#!/bin/sh

curl -XPUT 'http://localhost:9200/tolstoy/' -d '{
    "settings" :
    {
  "analysis": {
    "char_filter": {
       "replace": {
        "type": "mapping",
        "mappings": [
          "&=> and "
        ]
      }
    },
    "filter": {
      "word_delimiter" : {
        "type" : "word_delimiter",
        "split_on_numerics" : false,
        "split_on_case_change" : true,
        "generate_word_parts" : true,
        "generate_number_parts" : true,
        "catenate_all" : true,
        "preserve_original":true,
        "catenate_numbers":true
      }
    },
    "analyzer": {
      "default": {
        "type": "custom",
        "char_filter": [
          "html_strip",
          "replace"
        ],
        "tokenizer": "whitespace",
        "filter": [
            "lowercase",
            "word_delimiter"
        ]
      }
    }
  }
  }
}
'

curl -XPUT 'http://localhost:9200/tolstoy/letters/_mapping' -d '
{
    "letters" : {
        "properties" : {
          "content" : {
            "type" : "string"
          },
          "date" : {
            "type" : "long"
          },
          "notes" : {
            "type" : "string"
          },
          "place" : {
            "type" : "string",
            "fields" : {
              "raw" : {
                "type" : "string",
                "index" : "not_analyzed"
              }
            }
          },
          "source" : {
            "type" : "string"
          },
          "to" : {
            "properties" : {
              "firstName" : {
                "type" : "string"
              },
              "lastName" : {
                "type" : "string"
              },
              "originalEntry" : {
                "type" : "string"
              },
              "paternalName" : {
                "type" : "string"
              }
            }
          }
        }
      }
}
'


curl -XPUT 'http://localhost:9200/tolstoy/diaries/_mapping' -d '
{
"diaries" : {
    "properties" : {
      "date" : {
        "type" : "long"
      },
      "entry" : {
        "type" : "string"
      },
      "place" : {
        "type" : "string",
        "fields" : {
          "raw" : {
            "type" : "string",
            "index" : "not_analyzed"
          }
        }
      },
      "source" : {
        "type" : "string"
      }
    }
  }
}
'
