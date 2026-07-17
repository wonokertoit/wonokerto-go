import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

export interface PdfData {
  type: string;
  nomorSurat: string | null;
  nama: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string | Date;
  warganegaraan: string;
  agama: string;
  pekerjaan: string;
  alamat: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  nik: string;
  kk: string;
  keperluan: string;
  detailUsaha: string | null;
  keteranganLain: string | null;
  tanggalPengajuan: string | Date;
  tanggalBerlakuMulai: string | Date | null;
  tanggalBerlakuSampai: string | Date | null;
}

export interface SettingsData {
  namaKepalaDesa: string;
  kopSurat: string;
  jabatan: string;
  kodeDesa: string;
  namaDesa: string;
  alamat: string;
  telepon: string;
  fax: string;
  email: string;
  website: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  logoUrl?: string | null;
}

export interface Props {
  data: PdfData;
  settings: SettingsData;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 12,
    fontFamily: 'Times-Roman',
    lineHeight: 1.15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  logoBox: {
    width: 90,
    height: 100,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextBlock: {
    flex: 1,
    alignItems: 'center',
  },
  headerLineKabKec: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    lineHeight: 1.15,
    marginBottom: 0,
  },
  headerLineJabatan: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    lineHeight: 1.15,
    marginBottom: 0,
  },
  contactRow: {
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 1.0,
    marginTop: 1,
  },
  contactRowBold: {
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 1.0,
    marginTop: 1,
    fontFamily: 'Times-Bold',
  },
  thinDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 2,
    marginBottom: 2,
  },
  kodeDesa: {
    fontSize: 11,
    marginBottom: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  nomorSurat: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13,
    marginBottom: 3,
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  colNumber: {
    width: '8%',
    fontSize: 13,
    paddingLeft: 20,
  },
  colSubLabel: {
    width: '32%',
    fontSize: 13,
  },
  colSubValue: {
    width: '60%',
    fontSize: 13,
  },
  colSubLabelIndented: {
    width: '32%',
    fontSize: 13,
    paddingLeft: 20,
  },
  colonLine: {
    flexDirection: 'row',
    marginBottom: 0,
    paddingLeft: 20,
  },
  colonLabel: {
    width: '40%',
    fontSize: 13,
  },
  colonValue: {
    width: '60%',
    fontSize: 13,
  },
  signatureBlock: {
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 40,
    width: 200,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 0,
  },
  signatureTitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 72,
  },
  signatureName: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    textDecoration: 'underline',
  },
  closing: {
    marginTop: 6,
    fontSize: 13,
    marginBottom: 2,
  },
});

function formatDate(dateStr: string | Date | null) {
  if (!dateStr) return '-';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateShort(dateStr: string | Date | null) {
  if (!dateStr) return '-';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export function SuratContent({ data, settings }: Props) {
  const isSKU = data.type === 'SKU';
  const title = isSKU ? 'SURAT KETERANGAN USAHA' : 'SURAT PENGANTAR SKCK';

  const keteranganLain = data.keteranganLain ||
    (isSKU
      ? `Orang tersebut di atas benar penduduk kami sesuai data yang ada dan menurut yang bersangkutan memiliki usaha ${data.detailUsaha || '...'}.`
      : 'Orang tersebut di atas benar penduduk kami sesuai data yang ada dan berkelakuan baik.');

  const berlaku = data.tanggalBerlakuMulai && data.tanggalBerlakuSampai
    ? `${formatDate(data.tanggalBerlakuMulai)} s/d ${formatDate(data.tanggalBerlakuSampai)}`
    : formatDate(data.tanggalPengajuan);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>
            <Image
              style={{ width: 80, height: 90, objectFit: 'contain' }}
              src={settings.logoUrl || '/Logo%20wonogiti.png'}
            />
          </View>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerLineKabKec}>PEMERINTAH KABUPATEN {settings.kabupaten.toUpperCase()}</Text>
            <Text style={styles.headerLineKabKec}>KECAMATAN {settings.kecamatan.toUpperCase()}</Text>
            <Text style={styles.headerLineJabatan}>{settings.kopSurat.toUpperCase()}</Text>
            <Text style={styles.contactRow}>{settings.alamat} KODE POS {settings.kodePos}</Text>
            <Text style={styles.contactRow}>Telp. {settings.telepon || '-'}   Faxs. {settings.fax || '-'}</Text>
            <Text style={styles.contactRowBold}>
              Email : {settings.email}   Website : {settings.website}
            </Text>
          </View>
        </View>

        <View style={styles.thinDivider} />

        <Text style={styles.kodeDesa}>No. Kode Desa : {settings.kodeDesa}</Text>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.nomorSurat}>Nomor : {data.nomorSurat || '...../...../...../......'}</Text>

        {/* PENANDATANGAN */}
        <Text style={styles.paragraph}>Yang bertanda tangan di bawah ini :</Text>

        <View style={styles.colonLine}>
          <Text style={styles.colonLabel}>a. Nama</Text>
          <Text style={styles.colonValue}>: {settings.namaKepalaDesa}</Text>
        </View>
        <View style={styles.colonLine}>
          <Text style={styles.colonLabel}>b. Jabatan</Text>
          <Text style={styles.colonValue}>: {settings.jabatan}</Text>
        </View>

        <Text style={{ ...styles.paragraph, marginTop: 4 }}>
          dengan ini menerangkan bahwa :
        </Text>

        {/* DATA PEMOHON */}
        <View style={styles.row}>
          <Text style={styles.colNumber}>1.</Text>
          <Text style={styles.colSubLabel}>Nama</Text>
          <Text style={styles.colSubValue}>: {data.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>2.</Text>
          <Text style={styles.colSubLabel}>Jenis Kelamin</Text>
          <Text style={styles.colSubValue}>: {data.jenisKelamin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>3.</Text>
          <Text style={styles.colSubLabel}>Tempat & Tgl. Lahir</Text>
          <Text style={styles.colSubValue}>: {data.tempatLahir}, {formatDateShort(data.tanggalLahir)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>4.</Text>
          <Text style={styles.colSubLabel}>Warganegaraan</Text>
          <Text style={styles.colSubValue}>: {data.warganegaraan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>5.</Text>
          <Text style={styles.colSubLabel}>Agama</Text>
          <Text style={styles.colSubValue}>: {data.agama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>6.</Text>
          <Text style={styles.colSubLabel}>Pekerjaan</Text>
          <Text style={styles.colSubValue}>: {data.pekerjaan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>7.</Text>
          <Text style={styles.colSubLabel}>Tempat Tinggal</Text>
          <Text style={styles.colSubValue}>: {data.alamat}, RT.{data.rt}/RW.{data.rw}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}></Text>
          <Text style={styles.colSubLabelIndented}>Desa</Text>
          <Text style={styles.colSubValue}>: {data.desa}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}></Text>
          <Text style={styles.colSubLabelIndented}>Kecamatan</Text>
          <Text style={styles.colSubValue}>: {data.kecamatan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}></Text>
          <Text style={styles.colSubLabelIndented}>Kabupaten</Text>
          <Text style={styles.colSubValue}>: {data.kabupaten}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}></Text>
          <Text style={styles.colSubLabelIndented}>Provinsi</Text>
          <Text style={styles.colSubValue}>: {data.provinsi}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>8.</Text>
          <Text style={styles.colSubLabel}>Surat Bukti Diri</Text>
          <Text style={styles.colSubValue}>: NIK. {data.nik}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}></Text>
          <Text style={styles.colSubLabel}></Text>
          <Text style={styles.colSubValue}>KK. {data.kk}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>9.</Text>
          <Text style={styles.colSubLabel}>Keperluan</Text>
          <Text style={styles.colSubValue}>: {data.keperluan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>10.</Text>
          <Text style={styles.colSubLabel}>Berlaku</Text>
          <Text style={styles.colSubValue}>: {berlaku}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colNumber}>11.</Text>
          <Text style={styles.colSubLabel}>Keterangan Lain</Text>
          <Text style={styles.colSubValue}>: {keteranganLain}</Text>
        </View>

        <Text style={styles.closing}>
          Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.
        </Text>

        {/* TANDA TANGAN */}
        <View style={styles.signatureBlock}>
          <Text style={styles.signatureText}>
            {settings.namaDesa}, {formatDate(data.tanggalPengajuan)}
          </Text>
          <Text style={styles.signatureTitle}>{settings.jabatan}</Text>
          <Text style={styles.signatureName}>{settings.namaKepalaDesa}</Text>
        </View>
      </Page>
    </Document>
  );
}
