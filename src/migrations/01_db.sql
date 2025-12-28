DROP DATABASE IF EXISTS ur_commit;
CREATE DATABASE ur_commit;
use ur_commit;

CREATE TABLE users(
	id 
		binary(16) 
        PRIMARY KEY 
        NOT NULL 
        DEFAULT (UUID_TO_BIN(UUID())),
	password varchar(80),
    email varchar(100),
    name varchar(150),
    github_username varchar(150),
    phone varchar(10),
	current_strike int,
    longest_strike int,
    public_profile boolean,
    member_since 
		timestamp 
        NOT NULL 
        DEFAULT current_timestamp,
    is_admin boolean
);

CREATE TABLE friends_request (
	id int auto_increment primary key not null,
    status 
		ENUM('pending', 'rejected', 'accepted') 
        not null 
        default 'pending',
    sending_date 
		timestamp 
        NOT NULL 
        default current_timestamp,
    addressee_id binary(16),
    sender_id binary(16),
    foreign key (addressee_id) REFERENCES users(id),
    foreign key (sender_id) REFERENCES users(id)
);

CREATE TABLE notification_config(
	id int auto_increment primary key not null,
    fk_id_user binary(16),
    active boolean default true,
    set_hour timestamp not null,
    whatsapp_notify boolean,
    email_notify boolean,
    mobile_app_notigy boolean,
    tittle_message varchar(20),
    description_message varchar(70),
    strike boolean,
    foreign key (fk_id_user) REFERENCES users(id)
);

CREATE TABLE dashboard_config(
	id int auto_increment primary key not null,
    fk_id_user binary(16),
    properties json
);