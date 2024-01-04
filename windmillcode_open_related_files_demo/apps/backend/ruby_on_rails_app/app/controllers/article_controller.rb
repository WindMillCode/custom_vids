class ArticlesController < ApplicationController
  include SearchesHelper
  before_action :set_query, only: %i[index]

  def index
    if @query.present?
      @articles = Article.search(@query).includes(:user)

      update_or_create_search(@query, current_user) if search_valid?(@query)
    else
      @articles = Article.all.includes(:user)
    end
  end

  private

  def set_query
    @query = params[:query]
  end
end
