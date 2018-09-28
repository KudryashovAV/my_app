Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :allLists, !types[Types::ListType] do
    resolve -> (obj, args, ctx) { List.all }
  end
end
