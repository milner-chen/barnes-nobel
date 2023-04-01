json.user do
    json.extract! @user, :id, :f_name, :l_name, :email, :created_at, :updated_at
end