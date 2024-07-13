create table activity
(
    id              serial
        primary key,
    description     text    not null,
    completed       boolean not null,
    creation_date   date    not null,
    conclusion_date date
);

create sequence activity_id_seq
    as integer;