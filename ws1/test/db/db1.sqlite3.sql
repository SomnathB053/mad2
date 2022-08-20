BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "role" (
	"id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "roles_users" (
	"id"	INTEGER,
	"user_id"	INTEGER,
	"role_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("role_id") REFERENCES "role"("id"),
	FOREIGN KEY("user_id") REFERENCES "auth"("id")
);
CREATE TABLE IF NOT EXISTS "auth" (
	"id"	INTEGER,
	"username"	TEXT,
	"email"	TEXT UNIQUE,
	"password"	TEXT,
	"active"	INTEGER,
	"fs_uniquifier"	TEXT UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "dummy" (
	"f1"	INTEGER,
	"f2"	TEXT,
	"f3"	TEXT,
	PRIMARY KEY("f1")
);
CREATE TABLE IF NOT EXISTS "logs" (
	"id"	INTEGER,
	"time"	TEXT NOT NULL,
	"value"	TEXT NOT NULL,
	"notes"	TEXT,
	"tid"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("tid") REFERENCES "trackers"("id")
);
CREATE TABLE IF NOT EXISTS "test" (
	"Field1"	INTEGER,
	"Field2"	INTEGER,
	PRIMARY KEY("Field2")
);
CREATE TABLE IF NOT EXISTS "trackers" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"uid"	INTEGER NOT NULL,
	"desc"	INTEGER,
	"ttype"	INTEGER,
	"options"	TEXT,
	"last_update"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("uid") REFERENCES "auth"("id")
);
INSERT INTO "auth" ("id","username","email","password","active","fs_uniquifier") VALUES (1,NULL,'abc@gmail.com','$2b$12$9dlmljD5mDGbUg5ThfjQW.akffeV.g6A7HL.rEr4tPvnrjp4zAXs6',1,'wdjkbjkcb');
INSERT INTO "dummy" ("f1","f2","f3") VALUES (1,'abcd','a@123');
INSERT INTO "dummy" ("f1","f2","f3") VALUES (2,'bcde','fd@432');
INSERT INTO "dummy" ("f1","f2","f3") VALUES (3,'dfwe','re@g543');
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (3,'2022-08-13T11:41','12','hahaha',1);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (4,'2022-08-14T15:15','op3','vbvb','undefined');
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (5,'2022-08-14T15:26','op1','effcw',6);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (6,'2022-08-15T11:19','6','laaaaa',17);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (7,'2022-08-15T11:55','5','qwer',17);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (8,'2022-08-15T11:57','21','none',17);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (9,'2022-08-15T12:11','54','qqqq',17);
INSERT INTO "logs" ("id","time","value","notes","tid") VALUES (10,'2022-08-15T12:14','12','ddd',17);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (1,'haha',1,'random',1,NULL,NULL);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (2,'name',1,'desc',1,'options',NULL);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (4,'changedRANDOM',1,'random_changed',1,NULL,NULL);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (6,'options check',1,'randoom',2,'op1,op2,op3,op4',NULL);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (16,'New_random_tracker',1,'dshjkdfbjksd',1,NULL,NULL);
INSERT INTO "trackers" ("id","name","uid","desc","ttype","options","last_update") VALUES (17,'tracker1xd',1,'fjijiiu',1,NULL,'2022-08-15 12:14');
COMMIT;
