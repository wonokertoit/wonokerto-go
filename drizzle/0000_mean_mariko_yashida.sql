CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(10) NOT NULL,
	"nama" varchar(255) NOT NULL,
	"jenis_kelamin" varchar(20) NOT NULL,
	"tempat_lahir" varchar(100) NOT NULL,
	"tanggal_lahir" date NOT NULL,
	"warganegaraan" varchar(50) DEFAULT 'Indonesia' NOT NULL,
	"agama" varchar(50) NOT NULL,
	"pekerjaan" varchar(100) NOT NULL,
	"alamat" varchar(255) NOT NULL,
	"rt" varchar(10) NOT NULL,
	"rw" varchar(10) NOT NULL,
	"desa" varchar(100) NOT NULL,
	"kecamatan" varchar(100) NOT NULL,
	"kabupaten" varchar(100) NOT NULL,
	"provinsi" varchar(100) NOT NULL,
	"nik" varchar(20) NOT NULL,
	"kk" varchar(20) NOT NULL,
	"keperluan" text NOT NULL,
	"detail_usaha" text,
	"keterangan_lain" text,
	"status" varchar(20) DEFAULT 'DIAJUKAN' NOT NULL,
	"nomor_surat" varchar(100),
	"alasan_penolakan" text,
	"tanggal_pengajuan" timestamp DEFAULT now() NOT NULL,
	"tanggal_disetujui" timestamp,
	"tanggal_berlaku_mulai" timestamp,
	"tanggal_berlaku_sampai" timestamp,
	"tanggal_selesai" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" varchar(50) PRIMARY KEY DEFAULT 'default' NOT NULL,
	"nama_kepala_desa" varchar(255) DEFAULT 'SUYANTO' NOT NULL,
	"jabatan" varchar(255) DEFAULT 'KEPALA DESA WONOKERTO' NOT NULL,
	"kode_desa" varchar(50) DEFAULT '12122013' NOT NULL,
	"nama_desa" varchar(100) DEFAULT 'Wonokerto' NOT NULL,
	"alamat" varchar(255) DEFAULT 'JALAN RAYA TIMANG WETAN WONOGIRI KODE POS 57651' NOT NULL,
	"telepon" varchar(50) DEFAULT '--' NOT NULL,
	"fax" varchar(50) DEFAULT '--' NOT NULL,
	"email" varchar(255) DEFAULT 'wonokerto702@gmail.com' NOT NULL,
	"website" varchar(255) DEFAULT 'https://wonokerto-wonogiri.desa.id' NOT NULL,
	"kecamatan" varchar(100) DEFAULT 'Wonogiri' NOT NULL,
	"kabupaten" varchar(100) DEFAULT 'Wonogiri' NOT NULL,
	"provinsi" varchar(100) DEFAULT 'Jawa Tengah' NOT NULL,
	"kode_pos" varchar(20) DEFAULT '57651' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'warga' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;