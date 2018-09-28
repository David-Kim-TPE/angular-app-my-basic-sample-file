#!/bin/bash
export COMPOSER_PROVIDERS=`cat passport-google.json`
echo $COMPOSER_PROVIDERS
composer-rest-server -c admin@my-basic-sample -n never -a true -m true -w true --port 3000