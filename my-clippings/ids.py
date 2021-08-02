import json

def write_quotes(filename, json_string):
  with open(filename, 'w', encoding='utf-8') as file:
    file.write(json_string)

def get_book_ids(file):
  with open(file, 'r', encoding='utf-8') as f:
    data = json.load(f)
    quote_counter = 0
    if file in ['quotes_complete.json', 'quotes.json']:
      books = data.keys()
      for index, book in enumerate(books):
        for quote in range(len(data[book])):
          data[book][quote]["book_id"] = index
          data[book][quote]["quote_id"] = quote_counter
          quote_counter += 1

    else:
      raise ValueError('Wrong filename')
    
    data_string = json.dumps(data, ensure_ascii=False, indent=2, sort_keys=False)
    write_quotes(file.replace('.json', '_indexed.json'), data_string)
    


if __name__ == '__main__':
  get_book_ids('quotes_complete.json')
  get_book_ids('quotes.json')
