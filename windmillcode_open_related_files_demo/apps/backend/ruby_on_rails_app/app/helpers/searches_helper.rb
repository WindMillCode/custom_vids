module SearchesHelper
  def search_valid?(input)
    words = input.strip.split

    # Questions must be at least 3 words long because of the structure of a question in English language
    return false unless words.length >= 3

    # Only save searches where the first word is at least 2 characters long for questions(Is it, Do you) and last word is at least 2 characters long so that questions doesn't end with single character

    words[-1].length >= 2 && words[0].length >= 2
  end

  def update_or_create_search(query, user)
    existing_search = Search.find_by(query: query.strip, user_id: user.id)

    if existing_search
      existing_search.update(count: existing_search.count + 1)
    else
      Search.create(query:, user:)
    end
  end
end
