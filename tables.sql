Create database KeyBattle; Use KeyBattle;

Create Table auth_user(
id serial primary key,
email varchar(80) unique NOT NULL,
username varchar(20) NOT NULL,
password varchar(100)NOT NULL);

Create Table league(id serial primary key,
name varchar(20) NOT NULL,
adm BIGINT UNSIGNED NOT NULL, foreign key (adm) references auth_user(id));

Create Table scores_player(id serial primary key,
score int NOT NULL,
date datetime NOT NULL,
league BIGINT UNSIGNED NOT NULL NOT NULL,
foreign key (league) references league(id),
player BIGINT UNSIGNED NOT NULL NOT NULL,
foreign key (player) references auth_user(id));

Create Table league_player(player BIGINT UNSIGNED NOT NULL NOT NULL,
foreign key (player) references auth_user(id),
league BIGINT UNSIGNED NOT NULL NOT NULL,
foreign key (league) references league(id)
);