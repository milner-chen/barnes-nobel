# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :first_name, :last_name, :email, :session_token, presence: true
  # validates :first_name, :last_name, format: { with: /\A[a-z]+\z/i, message: "contains invalid characters." }
  validates :email, :session_token, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid." }
  validates :password, length: { in: 8..255 }, allow_nil: true

  has_many :cart_items,
  dependent: :destroy

  def User.find_by_credentials(email, password)
    user = User.find_by(email: email);
    if user && user.authenticate(password)
      return user
    end
    return false
  end
  
  def reset_session_token!
    # self.session_token = generate_unique_session_token
    # self.save!
    self.update!({session_token: generate_unique_session_token})
    self.session_token
  end
  
  private
  
  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64
    end
    token
  end
  
  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
  
end

