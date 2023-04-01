class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :f_name, :l_name, :email, :session_token, presence: true
  validates :f_name, :l_name, format: { with: /\A[a-z]+\z/i, message: "contains invalid characters." }
  validates :email, :session_token, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid." }
  validates :password, length: { in: 8..255 }, allow_nil: true

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

