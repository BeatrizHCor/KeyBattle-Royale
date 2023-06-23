Create database KeyBattle; Use KeyBattle;

Create Table auth_user(id varchar(36) primary key,
email varchar(80) unique NOT NULL,
username varchar(20) NOT NULL,
password varchar(100)NOT NULL);

Create Table league(id varchar(36) primary key,
name varchar(20) NOT NULL,
adm varchar(36) NOT NULL, foreign key (adm) references auth_user(id));

Create Table scores_player(id varchar(36) primary key,
score int NOT NULL,
date date NOT NULL,
league varchar(36) NOT NULL,
foreign key (league) references league(id),
player varchar(36) NOT NULL,
foreign key (player) references auth_user(id)
);