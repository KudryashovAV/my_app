Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createList, function: Resolvers::CreateList.new
end
