class Resolvers::CreateList < GraphQL::Function
  # arguments passed as "args"
  argument :title, types.String
  argument :description, types.String
  argument :excerpt, types.String
  argument :upvotes, types.String

  # return type from the mutation
  type Types::ListType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    List.create!(title: args[:title], description: args[:description],
                 excerpt: args[:excerpt], upvotes: args[:upvotes])
  end
end
