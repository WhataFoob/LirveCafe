import csv
import json
def write_csv_file(data, path, mode):
    with open(path, mode, encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        for row in data:
            writer.writerow(row)
def write_json_file(data, path, mode):
    json_string = json.dumps(data)
    with open(path, mode, encoding='utf-8') as f:
        f.write(json_string)
        
def read_json_file(path):
    data = {}
    with open(path, 'r', encoding="utf8") as f:
        data = json.load(f)
    return data
    

