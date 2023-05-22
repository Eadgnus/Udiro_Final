-- 유저 테이블 만들기
create table tb_user(
user_idx int primary key,
user_name varchar(10) not null,
user_id	varchar(20) unique key,
user_pw	varchar(20) not null,
user_nickname varchar(20) unique key,
user_email varchar(20) unique key,
user_phone varchar(20) unique key,
user_area varchar(20),
user_status	int not null
);
-- 유저 테이블 끝

-- 유저 dib table idx가 foreign키임
create table tb_user_dibs(
user_dibs_idx int primary key,
user_idx int,
user_dibs_area varchar(1000) not null,
user_dibs_address varchar(1000) not null,
user_dibs_coordinate varchar(1000) not null,
foreign key (user_idx) references tb_user(user_idx)
);

-- 유저 밴 테이블
create table tb_user_ban(
user_ban_idx	int primary key,
user_idx	int,
user_ban_start	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
user_ban_end	date not null,
user_ban_reason	varchar(1000) not null,
foreign key (user_idx) references tb_user(user_idx)
);









