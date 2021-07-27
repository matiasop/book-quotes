import requests
import time


def correct_title(title):
    correct = {
        "El hombre unidimensional (Herbert Marcuse)": "One-Dimensional Man",
        "Richard Taylor (Restoring Pride The Lost Virtue of Our Age (1995, Prometheus Books))": "Restoring Pride The Lost Virtue of Our Age",
        "Rudiger Safranski (Nietzsche A Philosophical Biography (2003, W. W. Norton;Company))": "Nietzsche A Philosophical Biography (Rudiger Safranski)",
        "La cultura (Dietrich Schwanitz)": "culture (Dietrich Schwanitz)",
        "En defensa de la Ilustración (Steven Pinker)": "enlightenment now (steven pinker)",
        "La tabla rasa (Steven Pinker)": "The Blank Slate (steven pinker)",
        "Conjuración de Catilina y otros textos (Salustio;Pseudo Salustio;Pseudo Cicerón)": "Conjuración de Catilina",
        "How to DeFi (CoinGecko;Lau, Darren;Lau, Daryl;Teh, Sze Jin;Kho, Kristian;Azmi, Erina;Lee, TM;Ong, Bobby)": "How To Defi",
        "Que_es_el_hombre_martin_buber (Martin Buber)": "Que es el hombre (Martin Buber)"
    }

    if title not in correct:
        return title
    return correct[title]


def get_book_info(title):
    print(f"Getting data for:\n{title}")
    initial_time = time.time()
    url = "https://www.googleapis.com/books/v1/volumes?q=intitle:"

    title = correct_title(title)
    title = title.replace(" ", "%20")
    complete_url = f'{url}{title}'
    print(complete_url)

    r = requests.get(complete_url)
    if r.status_code == 200:
        data = r.json()

        if data["totalItems"] == 0:
            print(f"totalItems for {title} is equal to 0")
            raise Exception
            return ("", "", "", "", "", "", "", "", "")

        book_info = data["items"][0]
        book_title = book_info["volumeInfo"]["title"]
        author = book_info["volumeInfo"]["authors"][0]
        published_date = book_info["volumeInfo"]["publishedDate"]
        page_count = ""
        if "pageCount" in book_info["volumeInfo"]:
            page_count = book_info["volumeInfo"]["pageCount"]
        language = book_info["volumeInfo"]["language"]
        isbn_10 = ""
        isbn_13 = ""
        for id in book_info["volumeInfo"]["industryIdentifiers"]:
            if id["type"] == "ISBN_10":
                isbn_10 = id["identifier"]
            elif id["type"] == "ISBN_13":
                isbn_10 = id["identifier"]

        # Get book thumbnail
        small_thumbnail = ""
        thumbnail = ""
        if "imageLinks" in book_info["volumeInfo"]:
            small_thumbnail = book_info["volumeInfo"]["imageLinks"]["smallThumbnail"]
            thumbnail = book_info["volumeInfo"]["imageLinks"]["thumbnail"]

        # print(book_title)
        # print(author)
        # print(published_date)
        # print(page_count)
        # print(language)
        # print(small_thumbnail)
        # print(thumbnail)
        # print(isbn_10)
        # print(isbn_13)

        print(f"Time elapsed: {time.time() - initial_time}\n")
        return book_title, author, published_date, page_count, language, small_thumbnail, thumbnail, isbn_10, isbn_13

    print(f"Could not get info for {title}")
    raise Exception
    return ("", "", "", "", "", "", "", "", "")


if __name__ == "__main__":
    title = "Anna Karénina (Lev Nikoláievich Tolstói)"
    title = "Augustus (Williams, John)"
    title = "Elogio de la Ociosidad y otros ensayos (Bertrand Russell)"
    get_book_info(title)
