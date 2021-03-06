CREATE TABLE IF NOT EXISTS user(
    uid VARCHAR(80) PRIMARY KEY,
    handle VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    bio VARCHAR(150),
    is_verified BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    p_img_url VARCHAR(255)
)