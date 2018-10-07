require './test/test_helper'

class Resolvers::CreateListTest < ActiveSupport::TestCase
  def perform(**args)
    Resolvers::CreateList.new.call(nil, args, {})
  end

  test "success" do
    list = perform(title: "title", excerpt: "excerpt")

    assert(list.persisted?)
    assert_equal(list.title, "title")
    assert_equal(list.excerpt, "excerpt")
  end
end
