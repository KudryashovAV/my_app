Types::ListType = GraphQL::ObjectType.define do
  name "List"

  field :id, !types.ID
  field :title, types.String
  field :excerpt, types.String
  field :description, types.String
  field :upvotes, types.Int
end
