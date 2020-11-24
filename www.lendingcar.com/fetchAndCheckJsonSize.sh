#!/bin/bash
curl -o bayArea.json "https://nenjzsiib0.execute-api.us-west-2.amazonaws.com/v1/leasingInventory/bayArea.json?orderBy=%22availability%22&equalTo=%22available%22"

file=bayArea.json
minimumsize=90000
actualsize=$(wc -c <"$file")
if [ $actualsize -ge $minimumsize ]; then
    aws s3 cp bayArea.json s3://img.lendingcar.com/api/
    aws cloudfront create-invalidation --distribution-id EALIAB9NBVDL0 --paths /api/bayArea.json
    echo file uploaded
else
    echo file size is under $minimumsize bytes, please check if corrupted
fi
