import json
import time
from collections import defaultdict
from isbn import get_book_info


def read_quote(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        quote = []
        for line in file:
            if '=========' in line:
                yield quote
                quote = []
            else:
                fixed_line = line.replace('\n', '')
                quote.append(fixed_line)


def write_quotes(filename, json_string):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(json_string)


def parse_position(data):
    return data.split()[-1].split("-")


def parse_datetime(data):
    month_dict = {
        "enero": "01",
        "febrero": "02",
        "marzo": "03",
        "abril": "04",
        "mayo": "05",
        "junio": "06",
        "julio": "07",
        "agosto": "08",
        "septiembre": "09",
        "octubre": "10",
        "noviembre": "11",
        "diciembre": "12"
    }

    day, month_name, year, timestring = data.replace(
        "de", "").split(",")[-1].split()
    month = month_dict[month_name]
    date = f"{year}-{month}-{day}"
    return date, timestring


def main():
    initial_time = time.time()
    quote_dict = defaultdict(list)
    quote_complete_dict = defaultdict(list)
    quote_list = []
    quote_iterator = read_quote('My Clippings.txt')
    titles = set()
    ignore_set = {"Mis recortes  ", "Unknown (Usuario de Microsoft Office)",
                  "Pina Polo, Ciceron_triunfo_y_frustracion_de_un_homo  ",
                  "How to DeFi (CoinGecko;Lau, Darren;Lau, Daryl;Teh, Sze Jin;Kho, Kristian;Azmi, Erina;Lee, TM;Ong, Bobby)",
                  }

    for q in quote_iterator:
        title = q[0]
        if title in ignore_set:
            continue
        titles.add(title)
        metadata = q[1]
        quote = q[3]

        position_data, date_data = metadata.split('|')
        initial_pos, final_pos = parse_position(position_data)
        date, timestring = parse_datetime(date_data)

        quote_dict[title].append({'title': title, 'metadata': metadata, 'quote': quote,
                                 'initial_pos': initial_pos, 'final_pos': final_pos,
                                  'date': date, 'time': timestring})

    for title in quote_dict:
        # Get addiotional data
        book_title, author, published_date, page_count, language, small_thumbnail, thumbnail, isbn_10, isbn_13 = get_book_info(
            title)
        for q in quote_dict[title]:
            data = {'title': q['title'], 'metadata': q['metadata'], 'quote': q['quote'],
                    'initial_pos': q['initial_pos'], 'final_pos': q['final_pos'],
                    'date': q['date'], 'time': q['time'], 'book_title': book_title,
                    'author': author, 'published_date': published_date,
                    'page_count': page_count, 'language': language,
                    'small_thumbnail': small_thumbnail, 'thumbnail': thumbnail,
                    'isbn_10': isbn_10, 'isbn_13': isbn_13}
            quote_complete_dict[title].append(data)
            quote_list.append(data)

    # Create json file with titles as keys
    json_quotes = json.dumps(
        quote_dict, ensure_ascii=False, indent=4, sort_keys=True)
    write_quotes('quotes.json', json_quotes)

    # Create json file with additional info
    json_complete_quotes = json.dumps(
        quote_complete_dict, ensure_ascii=False, indent=4, sort_keys=True)
    write_quotes('quotes_complete.json', json_complete_quotes)

    # Create json file with an array with all quotes
    json_quotes_list = json.dumps(
        quote_list, ensure_ascii=False, indent=4, sort_keys=False)
    write_quotes('quotes_list.json', json_quotes_list)

    print(f"Total time ellapsed: {time.time() - initial_time}")


if __name__ == "__main__":
    main()
